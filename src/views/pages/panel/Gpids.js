import React from "react";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
import ReactTable from "react-table";

class Gpids extends React.Component {
    state = {
        count:0,
        page:1,
        data:[],
        limit:0
    }
    componentWillMount(){
        this.requestPage(this.state.page)
    }
  requestPage = page => {
    fetch('/api/gpids', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({page}), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
            let dataReact = response.data.map((gpid, k0)=>gpid.venues.map((venue, k1)=>{
              return {
                id: (
                  <a target="_blank" href={`https://www.google.com/maps/place/?q=place_id:${gpid._id}`}>
                      {gpid._id}
                  </a>
                ),
                name:venue.name,
                categories:venue.categories.reduce((vi, va)=>`${vi}, ${va}`),
                createdBy:venue._createdBy,
                updatedBy:venue._updatedBy,
              }
            }))
            dataReact = dataReact.reduce((p, c)=>[...p, ...c])
            console.log(dataReact)
            this.setState({dataReact, ...response})
        });
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
  boundsGeometryVenue = (geometry) => {
        var latMax=undefined,lonMax=undefined,latMin=undefined,lonMin=undefined;
        
        var coords = [];
        if (geometry.type === "Point") {
            coords = [geometry.coordinates];
        }else{
            coords = geometry.coordinates[0];
        }

        for (var i = 0; i < coords.length; i++) {
            var coor = coords[i];
            if (latMax===undefined) {
                latMax=coor[0];
            }else if(latMax<coor[0]){
                latMax=coor[0];
            }
            if (lonMax===undefined) {
                lonMax=coor[1];
            }else if(lonMax<coor[1]){
                lonMax=coor[1];
            }
            if (latMin===undefined) {
                latMin=coor[0];
            }else if(latMin>coor[0]){
                latMin=coor[0];
            }
            if (lonMin===undefined) {
                lonMin=coor[1];
            }else if(lonMin>coor[1]){
                lonMin=coor[1];
            }
        }
        return{
            latMax,
            lonMax,
            latMin,
            lonMin,
        }
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

  cleanGpids = () => {
    fetch('/api/cleangpids')
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.sucess){
              this.requestPage(1)
            }
            this.notify("Gpids updated")
            // this.setState(response)
        })
        .catch(error => this.notify(error.message, "danger"))
  }
  
  render() {
    const {
        count,
        page,
        data,
        limit
    } = this.state
    const totalPages = Math.floor(count/limit) +1
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Gpids ( {count} - repeated ) 
                    <Button
                        color="success"
                        type="button"
                        size="sm"
                        onClick={this.cleanGpids}
                    >
                      Clean
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <ReactTable
                    data={this.state.dataReact}
                    filterable
                    columns={[
                      {
                        Header: "ID",
                        accessor: "id"
                      },
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Categories",
                        accessor: "categories"
                      },
                      {
                        Header: "Created By",
                        accessor: "createdBy"
                      },
                      {
                        Header: "Updated By",
                        accessor: "updatedBy",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom
                    /*
                      You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                    */
                    className="-striped -highlight primary-pagination"
                  />

                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">GPID</th>
                        <th>NAME</th>
                        <th>CATEGORY</th>
                        <th>CREATED BY</th>
                        <th>UPDATED BY</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                        {data.map((gpid, k0)=>gpid.venues.map((venue, k1)=>{
                            if (venue.id === undefined) return null
                            let ENV = "row"
                            
                            switch (venue.Env) {
                                case 'na':
                                    ENV = "usa"
                                    break;
                                case 'row':
                                    ENV = 'row'
                                    break;
                                case 'il':
                                    ENV = 'il'
                                    break;
                                default:
                                    ENV = 'row'
                                    break;
                            }
                            var bounds = this.boundsGeometryVenue(venue.geometry);
                            const lat = bounds.latMin+((bounds.latMax-bounds.latMin)/2);
                            const lon = bounds.lonMin+((bounds.lonMax-bounds.lonMin)/2);
                            const link = `https://www.waze.com/editor/?env=${ENV}&zoom=8&lon=${lat}&lat=${lon}&venues=${venue.id}&marker=true`
                            return (
                            <tr key={`${k0}-${k1}`}>
                                <td className="text-center">
                                    <a target="_blank" href={`https://www.google.com/maps/place/?q=place_id:${gpid._id}`}>
                                        {gpid._id}
                                    </a>
                                </td>
                                <td>{venue.name}</td>
                                <td>{venue.categories.reduce((vi, va)=>`${vi}, ${va}`)}</td>
                                <td>{venue._createdBy}</td>
                                <td>{venue._updatedBy}</td>
                                <td className="text-right" style={{minWidth:"110px"}}>
                                    
                                    
                                </td>
                            </tr>
                        )}))}
                    </tbody>
                  </Table>
                  <Pagination>
                    {page > 1 ? (
                        <PaginationItem>
                            <PaginationLink
                            aria-label="Previous"
                            href="#pablo"
                            onClick={e => this.requestPage(1)}
                            >
                            <span aria-hidden={true}>
                                <i
                                aria-hidden={true}
                                className="fa fa-angle-double-left"
                                />
                            </span>
                            </PaginationLink>
                        </PaginationItem>
                    ) : null }
                    {page > 1 ? (
                        <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => this.requestPage(page-1)}
                        >
                          {page-1}
                        </PaginationLink>
                      </PaginationItem>
                    ) : null }
                      
                      
                      <PaginationItem className="active">
                        <PaginationLink>
                          {page}
                        </PaginationLink>
                      </PaginationItem>


                    {page < totalPages ? (
                        <PaginationItem>
                        <PaginationLink
                          onClick={e => this.requestPage(page+1)}
                        >
                          {page+1}
                        </PaginationLink>
                      </PaginationItem>
                    ) : null }
                    
                    {page < totalPages ? (
                        <PaginationItem>
                        <PaginationLink
                          aria-label="Next"
                          onClick={e => this.requestPage(totalPages)}
                        >
                          <span aria-hidden={true}>
                            <i
                              aria-hidden={true}
                              className="fa fa-angle-double-right"
                            />
                          </span>
                        </PaginationLink>
                      </PaginationItem>
                    ) : null }
                      
                      
                    </Pagination>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Gpids;
