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
  
	var managedAreas = [];

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

	var _managedAreas = props.managedAreas ? props.managedAreas : [];

	var _selected = props.selected ? props.selected : {};
	var segmentSelected = props.segmentSelected;
	for (var { geometry: { type: tipo, coordinates }, centroid, createdOn, startTime, endTime, _area, userName, id, updatedOn, urlServer, _WZstreetName, name, Env, tile, residential = false } of _managedAreas) {
    var venueObj = { tipo, updatedOn, urlServer, _WZstreetName, tile, Env,centroid,
      id,
      userName,
      name,
      _area,
      createdOn,
      startTime,
      endTime
    }
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
		managedAreas.push(venueObj)
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
  
		{managedAreas.map((obj) => {
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
			var link = `${urlWaze}&lon=${obj.center.lng}&lat=${obj.center.lat}&zoom=5`
			if (_selected[obj.id]) {
				options.strokeColor = 'blue'
				info = (
					<InfoWindow onCloseClick={props.segmentDeSelected}>
						<div>
							<span style={{ color: 'blue', fontWeight: 'bold' }}>Name: {obj.id}</span><br />
							<span>User Name: {obj.userName}</span><br />
							<span>Area Name: {obj.name}</span><br />
							<span>Area mt2: {(parseFloat(obj._area)).toFixed(2)}</span><br />
							<span>createdOn: {(obj.createdOn !== null) ? (new Date(obj.createdOn)).toLocaleString() : 'Not modified'}</span><br />
              <span>startTime: {(obj.startTime !== null) ? (new Date(obj.startTime)).toLocaleString() : 'Not modified'}</span><br />
              <span>endTime: {(obj.endTime !== null) ? (new Date(obj.endTime)).toLocaleString() : 'Not modified'}</span><br />
							
							<a href={link} target="_wme" style={{ float: 'left' }}>Link</a>
							<a href="#recrawl" onClick={(e) => {
								e.stopPropagation();
								e.nativeEvent.stopImmediatePropagation();
								props.requestTile(obj.tile, obj.centroid);
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


class MapManagedAreas extends React.Component {
  state = {
      data:[],
      querysSelect:"ALL",

      querys:{},
      
      userSelect:"_ALL_",
      users:[],
      filter:{},
      filters:[],
      openedCollapses: [],
      counter:0,
      zoom: 6,
      getCenter: 0
  }
  componentDidMount(){
    this.getUsers()
  }

	getUsers = () => {
    fetch('/api/getusers')
    .then(res => res.json())
    .then(newusers => {
      const users = newusers.map((s)=>{
        return {
          value: s._id,
          label: s.userName,
          id: s._id,
          text: s.userName
        }
      })
      console.log(users)
      this.setState({users:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...users]})
    })
    .catch(error => console.error('Error:', error))
  }
  
  userSelected=({target:{value:user}})=>{
    this.setState({ userSelect:user })
  }


  requestPage = () => {
    const {
      userSelect=null,
    } = this.state
    fetch('/api/managedareas', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          userId:userSelect,
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({managedAreas:response.data, getCenter: this.state.getCenter +1})
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
  
  
  requestTile = (tileId, centroid) => {
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

  render() {
    const {
      users=[]
  } = this.state
  const {collection:col} = this.props
  let collection = col === 'segments'?'segments':'managedAreas'
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <Container className="mt--6" fluid>
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Managed Areas 
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <Row>
        					<Col md="3" sm="3">
                    <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="users_select"
                            >
                              users
                            </label>
                        <Select2
                            id="users_select"
                            className="form-control"
                            // defaultValue="1"
                            options={{
                              placeholder: "Select"
                            }}
                            data={users}
                            name="userSelect"
                            value={this.state.userSelect}
                            onSelect={this.userSelected}
                          />
                      </FormGroup>
        					</Col>
        					<Col md="4" sm="4" style={{textAlign: "center",alignSelf: "center"}}>
                      <Button
                          color="success"
                          type="button"
                          size="md"
                          onClick={this.requestPage}
                      >
                        Search
                      </Button>
                    
        					</Col>
        				</Row>
        			
                
                </CardBody>
              </Card>
              
            </Col>
          </Row>
          <Row>
            <div className="col">
              <Card className="border-0">
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
                        managedAreas={this.state.managedAreas}
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

export default MapManagedAreas;
