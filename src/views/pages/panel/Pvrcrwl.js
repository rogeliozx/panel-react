
import React, { Component, useState } from 'react';

import { geolocated } from 'react-geolocated';

// import UbicationForm from './UbicationForm';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow } from "react-google-maps"

import Select2 from "react-select2-wrapper";
import {
  Card,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Button,
  CardBody} from "reactstrap";

// import PanelHeader from 'components/PanelHeader/PanelHeader';

const io = require('socket.io-client');

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
	var requests = [];
	var centerDefault = {
		lat:18.57206481834034,lng:-100.03717342211421
	};

	var _requests = props.requests.coordsObjs?props.requests.coordsObjs:[];
	var center = props.requests.center?props.requests.center:centerDefault;
	var updatedTiles = props.requests.updatedTiles?props.requests.updatedTiles:{};

	center.lat = parseFloat(center.lat)
	center.lng = parseFloat(center.lng)

	for (var i = 0; i < _requests.length; i++) {
		var obj = _requests[i];
        var color = "grey";
        let upTile = {}
		if (updatedTiles[obj.id]) {
            upTile = updatedTiles[obj.id]
			if (upTile.is_empty) {
				color = "red";
			}else{
				color = "green";
			}
		}
		var req = {
            ...upTile,
            ...obj,
			paths:obj.coords,
			fillColor:color
		}
		requests.push(req);
	}
	// console.log(requests);
    var markerOptions = {
        icon: {
            url: 'http://1x1px.me/FFFFFF-0.png'
        },
    }
    var onCenterChanged = props.onCenterChanged;
    
    const [idSelected, setIdSelected] = useState(null);

	return (<GoogleMap
		defaultOptions={{scrollwheel: true}}
		onCenterChanged={function(){
			var c = this.getCenter();
			onCenterChanged({
				lat:c.lat(),
				lng:c.lng()
			})
		}}
		zoom={props.zoom}
		center={center}
		>
		{requests.map((obj,index) =>
			<>
                <Polygon key={"line-"+index} paths={obj.paths} options={obj} onClick={()=>setIdSelected(obj.id)}/>,
                {idSelected === obj.id &&
                <Marker key={"marker-" + index} position={{
                    lat:obj.coords[3].lat - 0.025,
                    lng:obj.coords[3].lng + 0.025,
                }} options={markerOptions} >
                    <InfoWindow onCloseClick={props.segmentDeSelected}>
                        <div>
                            {Object.keys(obj).map(k=>Number.isInteger(obj[k])?(
                                <>
                                    <span>{k}:{obj[k]}</span>
                                    <br/>
                                </>
                            ):null)}
                        </div>
                    </InfoWindow>
                </Marker>}
            </>
		)}
		<Marker
	      position={center}
	    />
	</GoogleMap>)
}
))

class Recrawl extends Component {

	constructor(props) {
	    super(props);
	    
		this.state = {
			latlon:"",
   			coordsObjs:[],
   			updatedTiles:{},
   			zoom:4,
   			server:'ROW',
			serverOption:'production',
			
			countrySelect:"_ALL_",
			stateSelect:"_ALL_",
			substateSelect:"_ALL_",
			countries:[],
			states:[],
			substates:[],
		};
		this.requestTile = this.requestTile.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	getCountries = () => {
		fetch('/api/getcountries')
		.then(res => res.json())
		.then(newcountries => {
		  const countries = newcountries.map((s)=>{
			return {
			  value: s.Country,
			  label: s.Country,
			  id: s.Country,
			  text: s.Country
			}
		  })
		  console.log(countries)
		  this.setState({countries:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...countries]})
		})
		.catch(error => console.error('Error:', error))
		}
		countrySelected = ({target:{value:country}}) => {
			this.setState({ countrySelect: country, stateSelect: "_ALL_", substateSelect:"_ALL_" })
		fetch(`/api/getstates/${country}`)
		.then(res => res.json())
		.then(newstates => {
		  const states = newstates.map((s)=>{
					return {
						value: s.State,
						label: s.State,
			  text: s.State,
			  id: s.State,
			  country:country,
					}
				})
				this.setState({states:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...states]})
		})
		.catch(error => console.error('Error:', error))
		}
		stateSelected = ({target:{value:state}}) => {
		const {countrySelect} = this.state
		this.setState({ stateSelect: state, substateSelect:"_ALL_" })
		fetch(`/api/getsubstates/${countrySelect}/${state}`)
		.then(res => res.json())
		.then(newsubstates => {
		  const substates = newsubstates.map((s)=>{
					return {
						value: s.SubState,
			  label: s.SubState,
			  text: s.SubState,
						id: s.SubState,
					}
				})
				this.setState({substates:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...substates]})
		})
		.catch(error => console.error('Error:', error))
	  }
	  substateSelected = ({target:{value:substate}}) => {
		this.setState({ substateSelect:substate })
	  }

	onCenterChanged = (center) => {
		// console.log(center)
		this.setState({
		   		latlon:center.lat+','+center.lng,
		   		center:center,
		   	})
	}
	componentWillReceiveProps(nextProps){
		var location = !nextProps.isGeolocationAvailable? {}
      			: !nextProps.isGeolocationEnabled ? {}
			        : nextProps.coords ? nextProps.coords
			          : {};

	    this.setState({	    	
            center:{lat:location.latitude,lng:location.longitude},
            latlon:location.latitude+','+location.longitude,
   			zoom:11,
	    })
	}
	componentDidMount() {
		this.socket = io();
	    this.socket.on('updatedTiles', data => {
	    	console.log(data);
	    	this.setState({
		   		updatedTiles:{...this.state.updatedTiles, ...{[data.tile]:data} }
		   	})
	    	// this.setState({...data});
		});
		this.getCountries()
	}
	componentWillUnmount(){
		this.socket.close();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
    }
    onCenterText = ()=>{
        const { latlon } = this.state
        const [ lat, lng] = latlon.split(',')
        const center = {
            lat,
            lng
        }
        this.setState({
            center:center,
        })
    }
	requestTile(server) {
		var lat = this.state.latlon.split(',')[1];
		var lon = this.state.latlon.split(',')[0];
		if (lat === undefined || lon === undefined) {
			return
		}
		fetch("/api/requestLatLon",{
			method: 'post',
			credentials: "same-origin",
			headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
			body:JSON.stringify({
				lat:lat,
				lon:lon,
				server:server,
				serverOption:this.state.serverOption
			})	
		})
		 .then(res => res.json())
		 .then(
		   (result) => {
		   	console.log(result);
		   	this.setState({
	   			coordsObjs:[...this.state.coordsObjs, ...result.coordsObjs],
				
				zoom:11
		   	})
		   },
		 );
	}

	requestTileLocation = ()=>{
		
		const {
			substateSelect=null,
			countrySelect=null,
			stateSelect=null
		} = this.state

		fetch("/api/requesttilelocation",{
			method: 'post',
			credentials: "same-origin",
			headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
			body:JSON.stringify({
				country:countrySelect,
				state:stateSelect,
				substate:substateSelect,
			})	
		})
		 .then(res => res.json())
		 .then(
		   (result) => {
		   	console.log(result);
		   	this.setState({
	   			coordsObjs:[...this.state.coordsObjs, ...result.coordsObjs],
				   center:result.center,
				zoom:11
		   	})
		   },
		 );
	}
	requestCity = (tileType) => {

		let params = this.props.match.params;
		let state = params.state?params.state:0;
		let city = params.city?params.city:0;

		if (state && state !== 0) {
			fetch("/requestCity",{
				method: 'post',
				credentials: "same-origin",
				headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			  },
				body:JSON.stringify({
					stateID:state,
					cityID:city,
					tileType:tileType
				})
			})
			 .then(res => res.json())
			 .then(
			   (result) => {
			   	console.log(result);
			   	this.setState({
		   			coordsObjs:[...this.state.coordsObjs, ...result.coordsObjs],
					center:result.center,
					zoom:11
			   	})
			   },
			 );
		}
		
	}
	render() {


		let params = this.props.match.params;
		let state = params.state?params.state:0;

		const {
			substateSelect=null,
			countries=[],
			states=[],
			substates=[],
			countrySelect,
			stateSelect
		} = this.state

	    return (

      <>
        
        <div className="content">
          <Card>

            <Row>
              <Col xs={12}>
              	<CardHeader>
                  <CardTitle>PvRcrwl</CardTitle>
                </CardHeader>
                <CardBody>

		  <div className="row">
	          <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light ">
	          	<div className="row">
	          		<div className="col-sm-12">
						<div className="form-group">
							<label htmlFor="latlon_query">Lat,Lon</label>
							<input className="form-control" id="latlon_query" name="latlon" value={this.state.latlon} onChange={this.handleInputChange}/>
                            <button className="btn btn-primary btn-block" onClick={this.onCenterText} type="button">Search</button>
						</div>
						{/* <div className="row">
							<div className="col-sm-1"/>
							<div className="col-sm-5">
								<div className="form-check form-check-inline">
								  <input 
								  		checked={this.state.serverOption === 'production'} 
							            onChange={this.handleInputChange}
							            className="form-check-input" type="radio" name="serverOption" id="inlineRadio1" value="production"/>
								  <label className="form-check-label" htmlFor="inlineRadio1">PROD</label>
								</div>
							</div>
							<div className="col-sm-5">
								<div className="form-check form-check-inline">
								  <input 
								  		checked={this.state.serverOption === 'beta'} 
							            onChange={this.handleInputChange}
							            className="form-check-input" type="radio" name="serverOption" id="inlineRadio2" value="beta"/>
								  <label className="form-check-label" htmlFor="inlineRadio2">BETA</label>
								</div>
							</div>
						</div> */}
						<div className='row'>
							<div className='col-12'>
								<div style={{display:'flex'}}>
									<button className="btn btn-primary" onClick={()=>this.requestTile('row')} type="button">ROW</button>
									<button className="btn btn-primary" onClick={()=>this.requestTile('na')} type="button">NA</button>
									<button className="btn btn-primary" onClick={()=>this.requestTile('il')} type="button">IL</button>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-12'>
								<label
									className="form-control-label"
									htmlFor="country_select"
								>
									Country
								</label>
								<Select2
									id="country_select"
									className="form-control"
									// defaultValue="1"
									options={{
									placeholder: "Select"
									}}
									data={countries}
									name="countrySelect"
									value={this.state.countrySelect}
									onSelect={this.countrySelected}
								/>
							</div>
							<div className='col-12'>
								<label
									className="form-control-label"
									htmlFor="state_select"
								>
									State
								</label>
								<Select2
									id="state_select"
									className="form-control"
									// defaultValue="1"
									options={{
									placeholder: "Select"
									}}
									data={states}
									name="stateSelect"
									value={stateSelect}
									onSelect={this.stateSelected}
								/>
							</div>
							<div className='col-12'>
								<label
									className="form-control-label"
									htmlFor="substates_select"
								>
									Sub State
								</label>
								<Select2
									id="substates_select"
									className="form-control"
									// defaultValue="1"
									options={{
									placeholder: "Select"
									}}
									data={substates}
									name="substateSelect"
									value={substateSelect}
									onSelect={this.substateSelected}
								/>
							</div>
							<Col md="12" sm="12" style={{textAlign: "center",alignSelf: "center"}}>
								<Button
									color="success"
									type="button"
									size="md"
									onClick={this.requestTileLocation}
								>
									Get Tiles
								</Button>
        					</Col>
						</div>
                        
			          	{state && state !== 0? (
			          		<div className="row">
								<div className="col-sm-4"><button className="btn btn-primary btn-block" onClick={()=>this.requestCity('all')} type="button">All</button></div>
								<div className="col-sm-4"><button className="btn btn-success btn-block" onClick={()=>this.requestCity('full')} type="button">Full</button></div>
								<div className="col-sm-4" style={{paddingLeft: '5px'}}><button className="btn btn-danger btn-block" onClick={()=>this.requestCity('empty')} type="button">Empty</button></div>
							</div>
			          	):(<div/>)}
			        </div>
			    </div>
	          </nav>

	          <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
				<MyMapComponent
					zoom={this.state.zoom}
					onCenterChanged={this.onCenterChanged}
					requests={this.state}
					isMarkerShown
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4y9EhOdWJxIZ9IQV4ytuNFUfMX_ZrGzE&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `800px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
	          </main>
		  </div>

				</CardBody>
			  </Col>
			</Row>
	  	</Card>
      </div>
    </>
		)
	}
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Recrawl);

// export default Recrawl
