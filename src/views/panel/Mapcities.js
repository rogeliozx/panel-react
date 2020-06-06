import React from "react"
import openSocket from 'socket.io-client';
import ss from 'socket.io-stream'
import Select from "react-select";

import Switch from "react-bootstrap-switch"

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col,
	Label,
	FormGroup,
	Form,
	Input,
	FormText,
	Button,
	Progress
} from "reactstrap"
import FileUpload from "components/CustomUpload/FileUpload"
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	Polygon,
	Rectangle
  } from "react-google-maps";


const SatelliteMap = withScriptjs(
	withGoogleMap(props => (
	  <GoogleMap
		defaultZoom={3}
		mapTypeId={"satellite"}
		defaultCenter={{ lat: 29.0616461, lng: -110.9650211 }}
		defaultOptions={{
		  scrollwheel: false
		}}
	  >
		<Marker position={{ lat: 29.0616461, lng: -110.9650211 }} />
	  </GoogleMap>
	))
  );
  
  const RegularMap = withScriptjs(
	withGoogleMap(props => (
	  <GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: 29.0616461, lng: -110.9650211 }}
		defaultOptions={{
		  scrollwheel: false
		}}
	  >
		<Marker position={{ lat: 29.0616461, lng: -110.9650211 }} />
	  </GoogleMap>
	))
  );
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

  const CustomSkinMap = withScriptjs(
	withGoogleMap(props => (
	  <GoogleMap
		defaultZoom={13}
		defaultCenter={{ lat: 29.0616461, lng: -110.9650211 }}
		defaultOptions={{
		  scrollwheel: true,
		  disableDefaultUI: false,
		  zoomControl: true,
		  styles: [
			{
			  featureType: "water",
			  stylers: [
				{ saturation: 43 },
				{ lightness: -11 },
				{ hue: "#0088ff" }
			  ]
			},
			{
			  featureType: "road",
			  elementType: "geometry.fill",
			  stylers: [
				{ hue: "#ff0000" },
				{ saturation: -100 },
				{ lightness: 99 }
			  ]
			},
			{
			  featureType: "road",
			  elementType: "geometry.stroke",
			  stylers: [{ color: "#808080" }, { lightness: 54 }]
			},
			{
			  featureType: "landscape.man_made",
			  elementType: "geometry.fill",
			  stylers: [{ color: "#ece2d9" }]
			},
			{
			  featureType: "poi.park",
			  elementType: "geometry.fill",
			  stylers: [{ color: "#ccdca1" }]
			},
			{
			  featureType: "road",
			  elementType: "labels.text.fill",
			  stylers: [{ color: "#767676" }]
			},
			{
			  featureType: "road",
			  elementType: "labels.text.stroke",
			  stylers: [{ color: "#ffffff" }]
			},
			{ featureType: "poi", stylers: [{ visibility: "off" }] },
			{
			  featureType: "landscape.natural",
			  elementType: "geometry.fill",
			  stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
			},
			{ featureType: "poi.park", stylers: [{ visibility: "on" }] },
			{
			  featureType: "poi.sports_complex",
			  stylers: [{ visibility: "on" }]
			},
			{ featureType: "poi.medical", stylers: [{ visibility: "on" }] },
			{
			  featureType: "poi.business",
			  stylers: [{ visibility: "simplified" }]
			}
		  ]
		}}
	  >
		{(props.tileswitch)?props.tiles.map((tile, k0) => {
			
			var rectangle = <Rectangle options={{
								strokeColor: '#FF0000',
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: '#FF0000',
								fillOpacity: 0.35,
								
							}} key={`${k0}`} bounds={{
									north: tile.north,
									south: tile.south,
									east: tile.east,
									west: tile.west,
								}} />
			
			return rectangle
		}):null}

		

		{ (props.substateSelect != null && props.geoswitch) ? props.substateSelect.intersect.map((feature, k0) => {
			
			
				if (feature.type === "Polygon") {
					return feature.coordinates.map((coordinate, k2) => {
						var paths = coordinate.map(coord => {
							return {
								lat: coord[1], lng: coord[0]
							}
						})
						return (
							<Polygon options={{
								strokeColor: "#0000FF",
								strokeOpacity: 1,
								strokeWeight: 0.5,
								fillColor: "#0000FF",
								fillOpacity: 0.4
							}} key={`${k0}-${k2}`} paths={paths} />
						)
					})
				} else if (feature.type === "Feature") {
					
					if(feature.geometry.type === 'MultiPolygon'){
							return feature.geometry.coordinates.map((coordinate, k2) => {
									return coordinate.map((coordinateP, k3) => {
										var paths = coordinateP.map(coord => {
											return {
												lat: coord[1], lng: coord[0]
											}
										})
										{/* console.log(paths, feature) */}
										
										return (
											<Polygon options={{
												strokeColor: "#0000FF",
												strokeOpacity: 1,
												strokeWeight: 0.5,
												fillColor: "#0000FF",
												fillOpacity: 0.4
											}} key={`${k0}-${k2}-${k3}`} paths={paths} />
										)
									})
								}) 
						}else if(feature.geometry.type === 'Polygon'){
							return feature.geometry.coordinates.map((coordinate, k2) => {
								var paths = coordinate.map(coord => {
									return {
										lat: coord[1], lng: coord[0]
									}
								})
								{/* console.log(paths, feature) */}
								
								return (
									<Polygon options={{
										strokeColor: "#0000FF",
										strokeOpacity: 1,
										strokeWeight: 0.5,
										fillColor: "#0000FF",
										fillOpacity: 0.4
									}} key={`${k0}-${k2}`} paths={paths} />
								)
							})
						}else {
							{/* console.log(feature) */}
							return null
						}
				} else {
					return null
				}
				
		}) :null}

	  </GoogleMap>
	))
  );

  
class Importer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			test:null,
			stateSelect:null,
			substateSelect:null,
			countries:[],
			states:[],
			substates:[],
			tiles:[],
			files:{
			}
		}
		const socket = openSocket('http://localhost:3000');
		
		socket.on('connect', () => {
			this.getCountries()
		});

		this.socket = socket
	}
	getCountries = () => {
		this.socket.emit('getcountries', (newcountries) => {
			// console.log(newcountries)
			const countries = newcountries.map((s)=>{
				return {
					value: s.Country,
					label: s.Country
				}
			})
			this.setState({countries})

		});
	}
	getStates = (country) => {
		this.setState({ stateSelect: null, substateSelect:null })

		this.socket.emit('getstates', country.value, (newstates) => {
			// console.log(newstates)
			const states = newstates.map((s)=>{
				return {
					value: s.State,
					label: s.State,
					country:country.value
				}
			})
			this.setState({states})

		});
	}
	getSubStates = (state) => {

		this.setState({ stateSelect: state, substateSelect:null })
		this.socket.emit('getsubstates', state.country, state.value, (newsubstates) => {
			// console.log(newsubstates)
			const substates = newsubstates.map((s)=>{
				return {
					value: s.SubState,
					label: s.SubState,
					...s
				}
			})
			this.setState({substates})
		});
	}

	getTiles = (selected) => {
		// console.log(selected)
		this.setState({ substateSelect: selected })
		this.socket.emit('gettiles', selected.value, selected.State, (tiles) => {
			// console.log(tiles)
			this.setState({tiles})

		});
	}
	render() {
		const { test,
						geo={features:[]},
						totalTiles,
						percent=0,
						files,
						countries=[],
						states=[],
						substates=[],
						tiles=[],
						substateSelect=null,
						tileswitch=true,
						geoswitch=true
					} = this.state
		return (
      <>
        <div className="content">
			<Card>
        		<CardHeader >
        			<CardTitle tag="h2">
                    Importer <small></small>
        			</CardTitle>
        		</CardHeader>
				<CardBody>
        			<Form action="#" method="#">
        				<Row>
        					<Col md="3" sm="3">
										<Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="countrySelect"
											value={this.state.countrySelect}
											onChange={this.getStates}
											options={countries}
											placeholder="Single Select"
										/>
        					</Col>
        					<Col md="3" sm="3">
										<Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="stateSelect"
											value={this.state.stateSelect}
											onChange={this.getSubStates}
											options={states}
											placeholder="Single Select"
										/>
        					</Col>
        					<Col md="3" sm="3">
										<Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="substateSelect"
											value={substateSelect}
											onChange={this.getTiles}
											options={substates}
											placeholder="Single Select"
										/>
        					</Col>
									<Col md="4">
										<Switch
											offColor="primary"
											offText=""
											onColor="primary"
											onText="Tile"
											value={tileswitch}
											onChange={(el, state) =>
												this.setState({ tileswitch: state })
											}
										/>{" "}
										<Switch
											defaultValue={false}
											offColor="primary"
											offText=""
											onColor="primary"
											onText="Geo"

											value={geoswitch}
											onChange={(el, state) =>
												this.setState({ geoswitch: state })
											}
										/>
									</Col>
{/* 							{ value: "2", label: "Foobar" },
        					<Col md="3" sm="3">
								<Button className="btn-round" onClick={this.testJson}>
									Add File, 
								</Button>
        					</Col> */}
        				</Row>
        			</Form>
							{Object.keys(files).map((fileName, key)=>(
								<Row key={key}>
										<Col md="12">
											<CardTitle tag="h4">{fileName}-{files[fileName].tiles}</CardTitle>
											<Progress
													max="100"
													value={files[fileName].porcent}
												/>
										</Col>
								</Row>
							))}
							

						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<CustomSkinMap
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMru2up_k5MpHpAE30xg0EtS6lL_Qp66Q"
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: `500px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								tiles={tiles}
								substateSelect={substateSelect}
								tileswitch={tileswitch}
								geoswitch={geoswitch}
							/>
						</CardBody>
					</Card>
        </div>
      </>
		)
	}
}

export default Importer
