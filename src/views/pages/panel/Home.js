import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  // CardBody,
  CardTitle,
  Table,
  Row,
  Col
  // Button
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
import openSocket from 'socket.io-client'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crawls: [],
      stats:{}
    };
    let socket
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        socket = openSocket('127.0.0.1:3000');
    } else {
        socket = openSocket();
    }
    socket.on('stats', (stats) => {
        // debugger
        this.setState(stats)
    });

    this.socket = socket
	
  }

  render() {
    const pretty = JSON.stringify(this.state, undefined, 4);

    const {
        venues= 0,
        tiles= 0,
        segments= 0,
        requests= 0,
        jsons= 0,
        gpids= 0,
        requestsWorking= 0,
        jsonsWorking= 0,
        intersects= 0,
        intersected= 0,
        processed=0,
        downloaded=0,
        intersectedFinish=false,
        processedIds
    } = this.state

    return (
      <>    
      <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Crawls</CardTitle>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>Type</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="text-muted">Pending requests</span></td>
                            <td><span className="text-muted">{requests}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">Downloading</span></td>
                            <td><span className="text-muted">{requestsWorking}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">Downloaded</span></td>
                            <td><span className="text-muted">{downloaded}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">Processing</span></td>
                            <td><span className="text-muted">{jsonsWorking}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">Processed</span></td>
                            <td><span className="text-muted">{processed}-{[...new Set(processedIds)].length}</span></td>
                        </tr>
                        <tr style={{color:(intersectedFinish?"green":"red")}}>
                            <td><span>Intersected</span></td>
                            <td><span>{intersected}</span></td>
                        </tr>
                        
                    </tbody>
                    </Table>

                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>Collection</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="text-muted">venues</span></td>
                            <td><span className="text-muted">{venues}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">tiles</span></td>
                            <td><span className="text-muted">{tiles}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">segments</span></td>
                            <td><span className="text-muted">{segments}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">jsons</span></td>
                            <td><span className="text-muted">{jsons}</span></td>
                        </tr>
                        <tr>
                            <td><span className="text-muted">gpids</span></td>
                            <td><span className="text-muted">{gpids}</span></td>
                        </tr>
                        
                    </tbody>
                    </Table>
                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Home;
