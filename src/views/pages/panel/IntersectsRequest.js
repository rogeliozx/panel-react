import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  // FormGroup,
  Table
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
// import Loader from '../../../components/loaders/Loader'

import openSocket from 'socket.io-client'

const collections = [
  'venues',
  'segments',
  'cities',
  'nodes',
  'mapComments',
  'roadClosures',
  'bigJunctions',
  'junctions',
  'managedAreas',
  'mapUpdateRequests',
  'restrictedAreas',
  'problems',
  'gpids',
]

class IntersectsRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counts:{},
      intersectLoadings:[]
    }
    const socket = openSocket();
		
		socket.on('connect', () => {
      [...collections, 'substate'].map(c=>{
        socket.emit('countIntersects', c, (objs) => {
          // console.log(objs)
          const { counts } = this.state
          const newCounts = {...counts, [objs.collection]:{
            countC:objs.countC,
            countCI:objs.countCI
          }}
          this.setState({
            counts:newCounts,
            intersectLoadings:objs.intersectLoadings
          })
        })
        return null
      })
		});

		this.socket = socket
  }
  
  intersectCollection = (collection) => {
    this.socket.emit('createIntersects', collection, (objs) => {
      const { counts } = this.state
      console.log(objs)
      const newCounts = {...counts, [objs.collection]:{
        countC:objs.countC,
        countCI:objs.countCI
      }}
      this.setState({
        counts:newCounts,
        intersectLoadings:objs.intersectLoadings
      })
    })
  }

  render() {
    const { counts, intersectLoadings } = this.state
    const { 'substate':substate={countC:0, countCI:0} } = counts

    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h1">
                    Intersects
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                      <tr>
                        <th>Collection</th>
                        <th>MongoDB</th>
                        <th>Postgres</th>
                        <th>
                          {/* <a
                            className="table-action"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="far fa-sync"></i>
                          </a> */}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-user">
                          <b>Sub States</b>
                        </td>
                        <td>
                          <span className="text-muted">{substate.countC}</span>
                        </td>
                        <td>
                          <span className="text-muted">{substate.countCI}</span>
                        </td>
                        <td className="table-actions">
                          {/* <a
                            className="table-action"
                            href="#pablo"
                            id="tooltip564981685"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-user-edit" />
                          </a>
                          <a
                            className="table-action"
                            href="#pablo"
                            id="tooltip564981685"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-cog"></i>
                          </a> */}
                        </td>
                      </tr>
                    </tbody>
                    <thead className="thead-light">
                      <tr>
                        <th>Collection</th>
                        <th>Total</th>
                        <th>Total with Sub State</th>
                        <th>
                          {/* <a
                            className="table-action"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="far fa-sync"></i>
                          </a> */}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {collections.map((c,k)=>{
                        const { [c]:col={countC:0, countCI:0} } = counts
                        return (
                          <tr key={k}>
                            <td className="table-user">
                              <b>{c}</b>
                            </td>
                            <td>
                              <span className="text-muted">{col.countC}</span>
                            </td>
                            <td>
                              <span className="text-muted">{col.countCI}</span>
                            </td>
                            <td className="table-actions">
                              <Button
                                className="btn-slack btn-icon-only rounded-circle"
                                color="default"
                                type="button"
                                onClick={()=>this.intersectCollection(c)}
                              >
                                <span className="btn-inner--icon">
                                  <i className="fas fa-repeat" />
                                </span>
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
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

export default IntersectsRequest;
