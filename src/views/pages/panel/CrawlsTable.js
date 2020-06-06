import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
import openSocket from 'socket.io-client'
import { Link } from "react-router-dom";

class CrawlsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crawls: [],
    };
    const socket = openSocket();
		
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
    this.refs.notificationAlert.notificationAlert(options);
  }

  startCrawl = (crawlid)=>()=>{
    this.socket.emit('startcrawls', crawlid, (res) => {
			this.notify("Crawl Activated")
		});
  }
  removeCrawl = (crawlid)=>()=>{
    var r = window.confirm("did you want to delete this crawl?");
    if (r === true) {
      this.socket.emit('removeCrawl', crawlid, (res) => {
        this.notify("Crawl removed")
        this.getCrawls()
      })
    }
    
  }
  render() {
    const {crawls= []} = this.state
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
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Frecuency</th>
                        <th>Scheduled Time</th>
                        <th>Sub States</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crawls.map((crawl,k0) => (
                        <tr key={k0}>
                          <td>{crawl.crawlerName}</td>
                          <td>{crawl.crawlerHours}</td>
                          <td>{(new Date(crawl.run)).toLocaleString()}</td>
                          <td>{crawl.substates.length}</td>
                          <td>
                            <Button
                              className="btn-slack btn-icon-only rounded-circle"
                              color="default"
                              type="button"
                              onClick={this.startCrawl(crawl._id)}
                            >
                              <span className="btn-inner--icon">
                                <i className="fas fa-repeat" />
                              </span>
                            </Button>
                            <Button
                              className="btn-icon-only rounded-circle"
                              color="danger"
                              type="button"
                              onClick={this.removeCrawl(crawl._id)}
                            >
                              <span className="btn-inner--icon">
                                <i className="fas fa-trash" />
                              </span>
                            </Button>
                            <Link to={`/admin/CrawlerForm/${crawl._id}`}>
                              <Button
                                className="btn-icon-only rounded-circle"
                                color="info"
                                type="button"
                              >
                                <span className="btn-inner--icon">
                                  <i className="fas fa-edit" />
                                </span>
                              </Button>
                            </Link>
                          </td>
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
