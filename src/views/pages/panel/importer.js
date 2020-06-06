import React from "react"
import openSocket from 'socket.io-client';
import ss from 'socket.io-stream'

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col,
	Form,
	Progress
} from "reactstrap"
// import FileUpload from "components/CustomUpload/FileUpload"

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

class Importer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			test:null,
			files:{
			}
		}
		let socket
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			socket = openSocket('127.0.0.1:3000');
		} else {
			socket = openSocket();
		}
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

	fileSelected = ({target:{files}}) => {
		// debugger
		for (const file of files) {
			let stream = ss.createStream()
			ss(this.socket).emit('file', stream, {size: file.size, name:file.name});
			ss.createBlobReadStream(file).pipe(stream);	
		}
		

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
		const { totalTiles, files } = this.state
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
        						{/* <FileUpload avatar fileSelected={this.fileSelected}/> */}
										<Form>
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          id="customFileLang"
                          lang="en"
                          type="file"
													onChange={this.fileSelected}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileLang"
                        >
                          Select file
                        </label>
                      </div>
                    </Form>

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
