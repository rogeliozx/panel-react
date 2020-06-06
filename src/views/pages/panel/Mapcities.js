import React from "react"
import openSocket from 'socket.io-client';
// import ss from 'socket.io-stream'
// import Select from "react-select";
import Select2 from "react-select2-wrapper";
// import Switch from "react-bootstrap-switch"

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col,
	// Label,
	// FormGroup,
	Form,
	// Input,
	// FormText,
	// Button,
	Progress
} from "reactstrap"
// import FileUpload from "components/CustomUpload/FileUpload"
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	// Marker,
	Polygon,
	Rectangle
  } from "react-google-maps";

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
		center={props.center}
		zoom={8}
	  >
		
		{(props.tileswitch)?props.tiles.map((tile, k0) => {
			
			let color = '#FF0000'
			switch(tile.zoom){
				case 4: color = '#FF0000';break;
				case 2: color = '#FFFF00';break;
				case 1: color = '#0000FF';break;
				default : color = '#FF0000';break;
			}
			var rectangle = <Rectangle options={{
								strokeColor: color,
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: color,
								fillOpacity: 0.35,
								
							}} key={`${k0}`} bounds={{
									north: tile.north,
									south: tile.south,
									east: tile.east,
									west: tile.west,
								}} />
			
			return rectangle
		}):null}

		
{/* 
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
							return null
						}
				} else {
					return null
				}
				
		}) :null}  */}

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
		let socket
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			socket = openSocket('127.0.0.1:3000');
		} else {
			socket = openSocket();
		}
		
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
					label: s.Country,
					text: s.Country,
					id: s.Country
				}
			})
			this.setState({countries})

		});
	}
	getStates = ({target:{value:country}}) => {
		// debugger
		this.setState({ countrySelect:country, stateSelect: null, substateSelect:null })

		this.socket.emit('getstates', country, (newstates) => {
			console.log(newstates, country)
			// debugger
			const states = newstates.map((s)=>{
				return {
					value: s.State,
					label: s.State,
					country:country,
					text: s.State,
					id: s.State
				}
			})
			this.setState({states})

		});
	}
	getSubStates = ({target:{value:state}}) => {
		const { countrySelect } = this.state
		this.setState({ stateSelect: state, substateSelect:null })
		this.socket.emit('getsubstates', countrySelect, state, (newsubstates) => {
			// console.log(newsubstates)
			const substates = newsubstates.map((s)=>{
				return {
					value: s._id,
					label: s.SubState,
					text: s.SubState,
					id: s._id,
					...s
				}
			})
			this.setState({substates})
		});
	}

	getTiles = (e) => {
		const {target:{value:selected}} = e
		// console.log(selected)
		const { countrySelect, stateSelect, substates } = this.state
		// debugger
		console.log(selected)
		this.setState({ substateSelect: selected })
		// debugger
		this.socket.emit('gettiles', selected, stateSelect, (tiles) => {
			console.log(tiles)
			// debugger
			let center = tiles.reduce(function(past, curr){
				let px = ((past.east + past.west)/2)
				let py = ((past.north + past.south)/2)
				let cx = ((curr.east + curr.west)/2)
				let cy = ((curr.north + curr.south)/2)
				return {
					  east:(px+cx) /2,
					  west:(px+cx) /2,
			  
					  north:(py+cy) /2,
					  south:(py+cy) /2,
				  }
			  })
			center = {
				lng:center.east,
				lat:center.north
			}
			console.log(center)
			this.setState({tiles, center})

		});
	}	
	render() {
		const { 
						files,
						countries=[],
						states=[],
						substates=[],
						tiles=[],
						substateSelect=null,
						tileswitch=true,
						geoswitch=true,
						center={ lat: 29.0616461, lng: -110.9650211 }
					} = this.state

		const subsSelect = substates.filter(s=>s.id === substateSelect)
		const intersectSelect = (subsSelect.length>0)?subsSelect[0]:null
		console.log("intersectSelect",intersectSelect, tiles)
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
										<Select2
                        className="form-control"
                        defaultValue="1"
                        options={{
                          placeholder: "Select"
                        }}
                        data={countries}
												name="countrySelect"
												value={this.state.countrySelect}
												onSelect={this.getStates}
                      />
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="countrySelect"
											value={this.state.countrySelect}
											onChange={this.getStates}
											options={countries}
											placeholder="Single Select"
										/> */}
        					</Col>
									
        					<Col md="3" sm="3">
										<Select2
                        className="form-control"
                        defaultValue="1"
                        options={{
                          placeholder: "Select"
                        }}
                        data={states}
												name="stateSelect"
												value={this.state.stateSelect}
												onSelect={this.getSubStates}
                      />
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="stateSelect"
											value={this.state.stateSelect}
											onChange={this.getSubStates}
											options={states}
											placeholder="Single Select"
										/> */}
        					</Col>
									
        					<Col md="3" sm="3">
										<Select2
                        className="form-control"
                        defaultValue="1"
                        options={{
                          placeholder: "Select"
                        }}
                        data={substates}
												name="substateSelect"
												value={this.state.substateSelect}
												onSelect={this.getTiles}
                      />
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="substateSelect"
											value={substateSelect}
											onChange={this.getTiles}
											options={substates}
											placeholder="Single Select"
										/> */}
        					</Col> 
									<Col md="4">
										<label className="custom-toggle custom-toggle-success mr-1">
											<input defaultChecked type="checkbox" 
												onChange={({target:{checked}}) =>
													this.setState({ tileswitch: checked===true })
												}
											 />
											<span
												className="custom-toggle-slider rounded-circle"
												data-label-off="No"
												data-label-on="Yes"
											/>
										</label>
										<label className="custom-toggle custom-toggle-success mr-1">
											<input defaultChecked type="checkbox" 
												onChange={({target:{checked}}) =>
													this.setState({ geoswitch: checked===true })
												}
											/>
											<span
												className="custom-toggle-slider rounded-circle"
												data-label-off="No"
												data-label-on="Yes"
											/>
										</label>
										{/* <Switch
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
										/> */}
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
								containerElement={<div style={{ height: `800px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								tiles={tiles}
								center={center}
								substateSelect={intersectSelect}
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
