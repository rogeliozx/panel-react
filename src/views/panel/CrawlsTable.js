import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import openSocket from 'socket.io-client'

class CrawlsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crawls: [],
    };
    const socket = openSocket('http://localhost:3000');
		
		socket.on('connect', () => {
			this.getCrawls()
		});

		this.socket = socket
	}
	getCrawls = () => {
		this.socket.emit('getcrawls', (res) => {
			this.setState({crawls:res})
		});
  }
  render() {
    const {crawls= []} = this.state
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Crawls</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Frecuency</th>
                        <th>Scheduled Time</th>
                        <th>Sub States</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crawls.map((crawl,k0) => (
                        <tr key={k0}>
                          <td>{crawl.crawlerName}</td>
                          <td>{crawl.crawlerHours}</td>
                          <td>{(new Date(crawl.run)).toLocaleString()}</td>
                          {/* <td>{crawl.substates_docs.reduce((past, current, i) => {
                            if ( i === 1 ){
                              return `${past.Country}-${past.State}-${past.SubState}, ${current.Country}-${current.State}-${current.SubState}`
                            }else {
                              return `${past}, ${current.Country}-${current.State}-${current.SubState}`
                            }
                          })}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CrawlsTable;
