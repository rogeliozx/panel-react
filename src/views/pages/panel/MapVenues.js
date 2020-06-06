import React, { useState } from "react";
// react plugin used to create google maps

import { Polyline, withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polygon } from "react-google-maps"
import NotificationAlert from "react-notification-alert"
// reactstrap components
import { Card, Container, Row } from "reactstrap";
import {
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  // Input,
  // Collapse,
} from "reactstrap";

import Select2 from "react-select2-wrapper";

// core components
// import SimpleHeader from "components/Headers/SimpleHeader.jsx";


function getUrlWaze(env) {
  let e = env==='na'?'usa':env
  
  return `https://www.waze.com/editor/?env=${e}&zoom=7`
}

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
	var segments = [];
	var venues = [];

  const [selfCenter, setSelfCenter] = useState(null);
  const [countCenter, setCountCenter] = useState(0);

	var centerDefault = {
		lat: 18.57206481834034, lng: -100.03717342211421
	};
	var _center = centerDefault
	var center = props.center ? props.center : centerDefault;

	center.lat = parseFloat(center.lat)
	center.lng = parseFloat(center.lng)


	var greenTime = new Date();
	greenTime.setDate(greenTime.getDate() - 180);
	var yellowTime = new Date();
	yellowTime.setDate(yellowTime.getDate() - 360);

	var _segments = props.segments ? props.segments : [];
	var _venues = props.venues ? props.venues : [];

	var _selected = props.selected ? props.selected : {};
	var segmentSelected = props.segmentSelected;
	for (var { geometry: { type: tipo, coordinates }, id, updatedOn, urlServer, _WZstreetName, name, Env, tile, residential = false } of _venues) {
		var venueObj = { tipo, id, updatedOn, urlServer, _WZstreetName, name, tile, Env }
		let latcen = null, lngcen = null
		if (tipo === 'Polygon') {
			venueObj.path = []
			for (var polygons of coordinates) {
				for (let [lng, lat] of polygons) {
					venueObj.path.push({ lat, lng })
					_center = { lat, lng };
					if (latcen === null) {
						latcen = lat
					} else {
						latcen = latcen + ((lat - latcen) / 2)
					}
					if (lngcen === null) {
						lngcen = lng
					} else {
						lngcen = lngcen + ((lng - lngcen) / 2)
					}
				}
			}
		}
		if (tipo === 'Point') {
			let [lng, lat] = coordinates
			venueObj.position = { lat:lat, lng }
			latcen = lat
			lngcen = lng
			_center = { lat, lng };
		}
		venueObj.center = { lat: latcen, lng: lngcen }
		let color = '#FF0000'
		var colorPin = '/red-dot.png'
		if (greenTime <= updatedOn) {
			color = "#00FF00";
			colorPin = '/green-dot.png'
		} else if (yellowTime <= updatedOn && greenTime > updatedOn) {
			color = "#FFFF00";
			colorPin = '/yellow-dot.png'
		}
		venueObj.options = { strokeColor: color, fillColor: color }
		venueObj.colorPin = colorPin
		// console.log("residential", residential)
		if (residential === true) {
			venueObj.colorPin = '/home_red.png'
			if (greenTime <= updatedOn) {
				venueObj.colorPin = '/home_green.png'
			} else if (yellowTime <= updatedOn && greenTime > updatedOn) {
				venueObj.colorPin = '/home_yellow.png'
			}
		}
		venueObj.updatedOn = new Date(updatedOn)
		venues.push(venueObj)
	}
// debugger
	for (var i = 0; i < _segments.length; i++) {
		var seg = _segments[i];
		var coords = []
		let latcen = null, lngcen = null
		for (var i2 = 0; i2 < seg.geometry.coordinates.length; i2++) {
			try {
				var coord = seg.geometry.coordinates[i2];
				coords.push({
					lat: coord[1], lng: coord[0]
				})
				_center = { lat: coord[1], lng: coord[0] };
				if (latcen === null) {
					latcen = coord[1]
				} else {
					latcen = latcen + ((coord[1] - latcen) / 2)
				}
				if (lngcen === null) {
					lngcen = coord[0]
				} else {
					lngcen = lngcen + ((coord[0] - lngcen) / 2)
				}
				// latcen = coord[1]
				// lngcen = coord[0]
			} catch (err) { }
		}
		var color = '#FF0000'
		if (greenTime <= seg.updatedOn) {
			color = "#00FF00";
		} else if (yellowTime <= seg.updatedOn && greenTime > seg.updatedOn) {
			color = "#FFFF00";
		}
		if (coords.length > 0) {
			segments.push({
        Env:seg.Env,
				coords: coords,
				options: {
					strokeColor: color,
				},
				center: { lat: latcen, lng: lngcen },
				id: seg.id,
				urlServer: seg.urlServer,
				_WZstreetName: seg._WZstreetName,
				updatedOn: new Date(seg.updatedOn),
				tile: seg.tile
			});
		}
	}

	
  if (selfCenter) {
    center = selfCenter
  }
  if (countCenter < props.getCenter) {
    // center = _center
    setCountCenter(props.getCenter)
    setSelfCenter(_center)
  }
	console.log("center", center)
	return (<GoogleMap
		defaultOptions={{ scrollwheel: true }}
		onCenterChanged={function(){
			var c = this.getCenter();
      setSelfCenter(c)
			// onCenterChanged({
			// 	lat:c.lat(),
			// 	lng:c.lng()
			// })
		}}
		defaultZoom={4}
		center={center}
		zoom={props.zoom}
	>
		{segments.map((obj, index) => {
			var mark = null
			var options = obj.options
			var urlWaze = getUrlWaze(obj.Env)
			var markerOptions = {
				icon: {
					url: 'http://1x1px.me/FFFFFF-0.png'
				},
			}
			var link = `${urlWaze}&lon=${obj.center.lng}&lat=${obj.center.lat}&segments=${obj.id}&marker=true`

			if (_selected[obj.id]) {
				options.strokeColor = 'blue'
				mark = (
					<Marker key={"marker-" + index} position={obj.center} options={markerOptions} >
						<InfoWindow onCloseClick={props.segmentDeSelected}>
							<div>

								<span>Street Name: {obj._WZstreetName}</span><br />
								<span>Segment ID: {obj.id}</span><br />
								<span>Last Update: {(!isNaN(obj.updatedOn.getTime())) ? obj.updatedOn.toLocaleString() : 'Not modified'}</span><br />
								<a href={link} target="_wme" style={{ float: 'left' }}>Link</a>
								<a href="#recrawl" onClick={(e) => {
									e.stopPropagation();
									e.nativeEvent.stopImmediatePropagation();
									props.requestTile(obj.tile);
								}} style={{ float: 'right' }}>Recrawl</a>
							</div>

						</InfoWindow>
					</Marker>
				)
			}
			return (
				[<Polyline key={"line-" + index} path={obj.coords} onClick={() => segmentSelected(obj.id)} options={options} />,
					mark]
			)
		}
		)}
		{venues.map((obj) => {
			var mark = null
			var info = null
			var options = obj.options
			var markerOptions = {
				icon: {
					url: obj.colorPin
				}
			}
			if (obj.tipo === 'Polygon') {
				markerOptions = {
					icon: {
						url: 'http://1x1px.me/FFFFFF-0.png'
					},
				}
			}

			var urlWaze = getUrlWaze(obj.Env)
			var link = `${urlWaze}&lon=${obj.center.lng}&lat=${obj.center.lat}&venues=${obj.id}&marker=true`

			if (_selected[obj.id]) {
				options.strokeColor = 'blue'
				// if (obj.tipo === 'Point') {
				//	markerOptions = {
				//		icon: {
				//			url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
				//		},
				//	}
				//}
				info = (
					<InfoWindow onCloseClick={props.segmentDeSelected}>
						<div>
							<span style={{ color: 'blue', fontWeight: 'bold' }}>Name: {obj.name}</span><br />
							<span>Street Name: {obj._WZstreetName}</span><br />
							<span>Venue ID: {obj.id}</span><br />
							<span>Last Update: {(!isNaN(obj.updatedOn.getTime())) ? obj.updatedOn.toLocaleString() : 'Not modified'}</span><br />
							<a href={link} target="_wme" style={{ float: 'left' }}>Link</a>
							<a href="#recrawl" onClick={(e) => {
								e.stopPropagation();
								e.nativeEvent.stopImmediatePropagation();
								props.requestTile(obj.tile);
							}} style={{ float: 'right' }}>Recrawl</a>
						</div>
					</InfoWindow>
				)
			}
			mark = (
				<Marker key={"marker-" + obj.id} position={obj.center} options={markerOptions} onClick={() => segmentSelected(obj.id)}>
					{info}
				</Marker>
			)
			if (obj.tipo === 'Polygon') {

				return ([<Polygon key={"Polygon-" + obj.id} onClick={() => segmentSelected(obj.id)} {...obj} />,
					mark])
			} else if (obj.tipo === 'Point') {
				return mark
			} else {
				return null
			}
		}
		)}
	</GoogleMap>)
}
))


const MapCustom = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#5e72e4" }, { visibility: "on" }]
          }
        ]
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

const MapDefault = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

class Google extends React.Component {
  state = {
      data:[],
      querysSelect:"ALL",

      querys:{},
      
      countrySelect:"_ALL_",
      stateSelect:"_ALL_",
      substateSelect:"_ALL_",
      citySelect:"_ALL_",
      countries:[],
      states:[],
      substates:[],
      cities:[],
      filter:{},
      filters:[],
      openedCollapses: [],
      counter:0,
      zoom: 11,
      getCenter: 0
  }
  componentDidMount(){
    this.getCountries()
  }
  // static getDerivedStateFromProps(props, state){
  //   var centerDefault = {
	// 		latitude: 18.57206481834034, longitude: -100.03717342211421
	// 	};
	// 	var location = !props.isGeolocationAvailable ? centerDefault
	// 		: !props.isGeolocationEnabled ? centerDefault
	// 			: props.coords ? props.coords
	// 				: centerDefault;
	// 	return {
	// 		center: { lat: location.latitude, lng: location.longitude },
	// 		zoom: 11,
	// 	}
  // }
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
					country:country
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
    // this.setState({ substateSelect:substate })

    const {countrySelect, stateSelect} = this.state
    const {collection} = this.props
    this.setState({ substateSelect:substate, citySelect:"_ALL_" },()=>{

      let q = collection === 'segments'?'segments':'venues'
      fetch(`/api/getcities${q}/${countrySelect}/${stateSelect}/${substate}`)
      .then(res => res.json())
      .then(newcities => {
        console.log(newcities)
        const cities = newcities.map((s)=>{
          return {
            value: s,
            label: s,
            text: s,
            id: s,
          }
        })
        this.setState({cities:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...cities]})
      })
      .catch(error => console.error('Error:', error))
    })
  }
  citySelected=({target:{value:city}})=>{
    this.setState({ citySelect:city })
  }

  requestPageVenues = () => {
    const {
      countrySelect=null,
      stateSelect=null,
      substateSelect=null,
      citySelect=null,
      querysSelect,
      filter
    } = this.state
    fetch('/api/venues', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
          city:citySelect,
          query:querysSelect,
          filter
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({venues:response.data, getCenter: this.state.getCenter +1})
        });
  }

  requestPageSegments = () => {
    const {
      countrySelect=null,
      stateSelect=null,
      substateSelect=null,
      citySelect=null,
      querysSelect,
      filter
    } = this.state
    fetch('/api/segments', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
          query:querysSelect,
          city:citySelect,
          filter
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({segments:response.data, getCenter: this.state.getCenter +1})
        });
  }
	segmentSelected = (id) => {
		this.setState({
      // getCenter: false,
			selected: {
				[id]: 1
      },
      // center:undefined
		})
	}
	segmentDeSelected = () => {
		this.setState({
      // getCenter: false,
      selected: {},
      // center:undefined
		})
  }
  
  
  recrwalTile = (tileId, centroid) => {
    fetch('/api/recrawl', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          tileId, 
          centroid
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.notify(response.msj)
            // this.setState(response)
        })
        .catch(error => this.notify(error.message, "danger"))
  }


  notify = (message, type="success") => {
    var options = {};
    options = {
      place: 'tc',
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };
    // debugger
    this.refs.notificationAlert.notificationAlert(options);
  }

  render() {
    const {
      substateSelect=null,
      countries=[],
      states=[],
      substates=[],
      cities=[],
      querys={},
      querysSelect = "ALL",
      filters=[]
  } = this.state
  const {collection:col} = this.props
  let collection = col === 'segments'?'segments':'venues'
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <Container className="mt--6" fluid>
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Map 
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <Row>
        					<Col md="2" sm="2">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="countrySelect"
											value={this.state.countrySelect}
											onChange={this.countrySelected}
											options={countries}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
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
                      </FormGroup>
        					</Col>
        					<Col md="2" sm="2">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="stateSelect"
											value={this.state.stateSelect}
											onChange={this.stateSelected}
											options={states}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
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
                          value={this.state.stateSelect}
                          onSelect={this.stateSelected}
                        />
                    </FormGroup>
        					</Col>
        					<Col md="2" sm="2">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="substateSelect"
											value={substateSelect}
											onChange={this.substateSelected}
											options={substates}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="substate_select"
                      >
                        Sub State
                      </label>
                      <Select2
                          id="substate_select"
                          className="form-control"
                          // defaultValue="1"
                          options={{
                            placeholder: "Select"
                          }}
                          data={substates}
                          name="substateSelect"
                          value={this.state.substateSelect}
                          onSelect={this.substateSelected}
                        />
                      </FormGroup>
        					</Col>

        					<Col md="2" sm="2">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="substateSelect"
											value={substateSelect}
											onChange={this.substateSelected}
											options={substates}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="cities_select"
                      >
                        Cities
                      </label>
                      <Select2
                          id="cities_select"
                          className="form-control"
                          // defaultValue="1"
                          options={{
                            placeholder: "Select"
                          }}
                          data={cities}
                          name="citySelect"
                          value={this.state.citySelect}
                          onSelect={this.citySelected}
                        />
                      </FormGroup>
        					</Col>
        					<Col md="4" sm="4" style={{textAlign: "center",alignSelf: "center"}}>
                    {collection === 'segments' && this.state.citySelect !== '_ALL_' &&
                      <Button
                          color="success"
                          type="button"
                          size="md"
                          onClick={this.requestPageSegments}
                      >
                        Segments
                      </Button>
                    }
                    {collection === 'venues' && this.state.citySelect !== '_ALL_' &&
                    <Button
                        color="success"
                        type="button"
                        size="md"
                        onClick={this.requestPageVenues}
                    >
                      Venues
                    </Button>
                    }
        					</Col>
        				</Row>
        			
                
                </CardBody>
              </Card>
              
            </Col>
          </Row>
          <Row>
            <div className="col">
              <Card className="border-0">
                {/* <MapDefault
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4y9EhOdWJxIZ9IQV4ytuNFUfMX_ZrGzE"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{ height: `600px` }}
                      className="map-canvas"
                      id="map-default"
                    />
                  }
                  mapElement={
                    <div style={{ height: `100%`, borderRadius: "inherit" }} />
                  }
                /> */}
                <MyMapComponent
												getCenter={this.state.getCenter}
												onCenterChanged={this.onCenterChanged}
												// center={this.state.center}
												segmentDeSelected={this.segmentDeSelected}
												requestTile={this.requestTile}
												segmentSelected={this.segmentSelected}
												selected={this.state.selected}
												zoom={this.state.zoom}
												isMarkerShown
												googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyANtRFP2TL3uvCStla2nblAZw41CuKpu34&v=3.exp&libraries=geometry,drawing,places"
												loadingElement={<div style={{ height: `100%` }} />}
												containerElement={<div style={{ height: `700px` }} />}
												mapElement={<div style={{ height: `100%` }} />}
                        venues={this.state.venues}
                        segments={this.state.segments}
											/>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Google;
