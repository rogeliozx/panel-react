import React from "react"
import openSocket from 'socket.io-client';
import ss from 'socket.io-stream'

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
	Polygon
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
		{Object.keys(props.files).map((fileKey, k0) => {
			const file = props.files[fileKey]
			
			
			return file.polygons.map((feature, k1) => {
				if (feature.type === "Polygon") {
					return feature.coordinates.map((coordinate, k2) => {
						var paths = coordinate.map(coord => {
							return {
								lat: coord[1], lng: coord[0]
							}
						})
						{/* console.log(paths) 
							var rectangle = new google.maps.Rectangle({
								strokeColor: '#FF0000',
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: '#FF0000',
								fillOpacity: 0.35,
								map: map,
								bounds: {
									north: 33.685,
									south: 33.671,
									east: -116.234,
									west: -116.251
								}
							});
						*/}
						return (
							<Polygon options={{
								strokeColor: file.color,
								strokeOpacity: 1,
								strokeWeight: 0.5,
								fillColor: file.color,
								fillOpacity: 0.4
							}} key={`${k0}-${k1}-${k2}`} paths={paths} />
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
												strokeColor: file.color,
												strokeOpacity: 1,
												strokeWeight: 0.5,
												fillColor: file.color,
												fillOpacity: 0.4
											}} key={`${k0}-${k1}-${k2}-${k3}`} paths={paths} />
										)
									})
								}) 
						}else {
							return feature.geometry.coordinates.map((coordinate, k2) => {
								var paths = coordinate.map(coord => {
									return {
										lat: coord[1], lng: coord[0]
									}
								})
								{/* console.log(paths, feature) */}
								
								return (
									<Polygon options={{
										strokeColor: file.color,
										strokeOpacity: 1,
										strokeWeight: 0.5,
										fillColor: file.color,
										fillOpacity: 0.4
									}} key={`${k0}-${k1}-${k2}`} paths={paths} />
								)
							})
						}
				} else {
					return null
				}
				
			})
		})}
	  </GoogleMap>
	))
  );

  
class Importer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			test:null,
			files:{
			}
		}
		const socket = openSocket('http://localhost:3000');
		socket.on('uploading',  (name, porcent, tiles=0, polygons=[]) => {
			
			const { files } = this.state
			const { [name]:file={ tiles:0,porcent:0, polygons:[]} } = files
			const newfile = {
				tiles:file.tiles+tiles,
				// polygons:[...file.polygons,...polygons],
				porcent:porcent===null?file.porcent:porcent,
				color:file.color?file.color:getRandomColor()
			}
			const newFiles = {...files, ...{[name]:newfile}}
			// console.log(newfile)
			this.setState({files:newFiles})
			// socket.emit('my other event', { my: 'data' });
		});
		socket.on('connect', function(socket){
			
		});

		this.socket = socket
	}

	fileSelected = (file) => {
		var stream = ss.createStream()
		ss(this.socket).emit('file', stream, {size: file.size, name:file.name});
		ss.createBlobReadStream(file).pipe(stream);

		// var formData  = new FormData();
		// formData.append("file", file);
		// this.socket.emit('addFile', file);

		// fetch('/api/kml', { // Your POST endpoint
		// 	method: 'POST',
		// 	body: formData // This is your file object
		// }).then(
		// 	response => response.json() // if the response is a JSON object
		// ).then(
		// 	success => this.setState(success) // Handle the success response object
		// ).catch(
		// 	error => console.log(error) // Handle the error response object
		// );
	}
	render() {
		const { test, geo={features:[]}, totalTiles, percent=0, files } = this.state
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
        					<Col md="4" sm="4">
        						<FileUpload avatar fileSelected={this.fileSelected}/>
        					</Col>
        					<Col md="4" sm="4">
        						{totalTiles}
        					</Col>
{/* 							
        					<Col md="4" sm="4">
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
					{/* <Card>
						<CardBody>
							<CustomSkinMap
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMru2up_k5MpHpAE30xg0EtS6lL_Qp66Q"
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: `500px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								geo={geo}
								files={files}
							/>
						</CardBody>
					</Card> */}
        </div>
      </>
		)
	}
}

export default Importer
