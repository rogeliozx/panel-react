import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Input,
  Collapse
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
// import ReactTable from "react-table";
// import Select from "react-select";
import Select2 from "react-select2-wrapper";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
	CSVLink
} from 'react-csv';


const pagination = paginationFactory({
  page: 1,
  sizePerPage:25,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={e => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  )
});

const { SearchBar } = Search;


class SubstatesReactTable extends React.Component {
  state = {
      data:[],
      querys:{},
      countrySelect:"_ALL_",
      stateSelect:"_ALL_",
      substateSelect:"_ALL_",
      querysSelect:"ALL",
      countries:[],
      states:[],
      substates:[],
      filter:{},
      filters:[],
      openedCollapses: []
  }
  componentDidMount(){
    // this.requestPage(this.state.page)
    this.getCountries()
    this.getQuerys()
    this.getFilters()
  }
  
	getFilters = () => {
    fetch('/api/substates/filters')
    .then(res => res.json())
    .then(filters => {
      console.log(filters)
      this.setState({filters})
    })
    .catch(error => console.error('Error:', error))
  }

	getCountries = () => {
    fetch('/api/getcountries')
    .then(res => res.json())
    .then(newcountries => {
      const countries = newcountries.map((s)=>{
        return {
          value: s.Country,
          label: s.Country,
          id: s.Country,
          text: s.Country
        }
      })
      console.log(countries)
      this.setState({countries:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...countries]})
    })
    .catch(error => console.error('Error:', error))
	}
	countrySelected = ({target:{value:country}}) => {
		this.setState({ countrySelect: country, stateSelect: "_ALL_", substateSelect:"_ALL_" })
    fetch(`/api/getstates/${country}`)
    .then(res => res.json())
    .then(newstates => {
      const states = newstates.map((s)=>{
				return {
					value: s.State,
					label: s.State,
          text: s.State,
          id: s.State,
          country:country,
				}
			})
			this.setState({states:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...states]})
    })
    .catch(error => console.error('Error:', error))
	}
	stateSelected = ({target:{value:state}}) => {
    const {countrySelect} = this.state
    this.setState({ stateSelect: state, substateSelect:"_ALL_" })
    fetch(`/api/getsubstates/${countrySelect}/${state}`)
    .then(res => res.json())
    .then(newsubstates => {
      const substates = newsubstates.map((s)=>{
				return {
					value: s.SubState,
          label: s.SubState,
          text: s.SubState,
					id: s.SubState,
				}
			})
			this.setState({substates:[{label: "All",value:"_ALL_",id:"_ALL_",text:"All"},...substates]})
    })
    .catch(error => console.error('Error:', error))
  }
  substateSelected = ({target:{value:substate}}) => {
    this.setState({ substateSelect:substate })
  }
  
	getQuerys = () => {
    fetch('/api/substates/querys')
    .then(res => res.json())
    .then(querys => {
      console.log(querys)
      this.setState({querys})
    })
    .catch(error => console.error('Error:', error))
  }
  
	// querySelected = (query) => {
  //   // console.log(query)
	// 	this.setState({ querysSelect: query})
  // }
  
	querySelected = ({target:{value:query}}) => {
    // console.log(query)
		this.setState({ querysSelect: query})
  }
	// getCountries = () => {
  //   fetch('/api/getcountries')
  //   .then(res => res.json())
  //   .then(newcountries => {
  //     const countries = newcountries.map((s)=>{
  //       return {
  //         value: s.Country,
  //         label: s.Country
  //       }
  //     })
  //     console.log(countries)
  //     this.setState({countries:[{label: "ALL",value:"_ALL_"},...countries]})
  //   })
  //   .catch(error => console.error('Error:', error))
  // }
  
	// countrySelected = (country) => {
	// 	this.setState({ countrySelect: country, stateSelect: {label: "ALL",value:"_ALL_"}, substateSelect:{label: "ALL",value:"_ALL_"} })
  //   fetch(`/api/getstates/${country.value}`)
  //   .then(res => res.json())
  //   .then(newstates => {
  //     const states = newstates.map((s)=>{
	// 			return {
	// 				value: s.State,
	// 				label: s.State,
	// 				country:country.value
	// 			}
	// 		})
	// 		this.setState({states:[{label: "ALL",value:"_ALL_"},...states]})
  //   })
  //   .catch(error => console.error('Error:', error))
	// }
	// stateSelected = (state) => {

  //   this.setState({ stateSelect: state, substateSelect:{label: "ALL",value:"_ALL_"} })
  //   fetch(`/api/getsubstates/${state.country}/${state.value}`)
  //   .then(res => res.json())
  //   .then(newsubstates => {
  //     const substates = newsubstates.map((s)=>{
	// 			return {
	// 				value: s.SubState,
	// 				label: s.SubState,
	// 			}
	// 		})
	// 		this.setState({substates:[{label: "ALL",value:"_ALL_"},...substates]})
  //   })
  //   .catch(error => console.error('Error:', error))
  // }
  // substateSelected = (substate) => {
  //   this.setState({ substateSelect:substate })
  // }

  renderActions = (k1, link, segment, firstClicked, secondClicked) => (
    [<a
      key={`${k1}-${0}`}
      href={link}
      target="_wme"
      // rel="noopener noreferrer"
      >
          <Button
              color={firstClicked?"warning":"info"}
              type="button"
              size="sm"
              onClick={(e) => {
                  // e.preventDefault()
                  const {data} = this.state
                  const newdata = data.map(ven=>{
                    if(ven.id===segment._id){
                      ven.actions = this.renderActions(k1, link, segment, true, secondClicked)
                      return ven
                    }else{
                      return ven
                    }
                  })
                  this.setState({data: newdata})
                }
              }
          >
              <i className="fa fa-link" />
          </Button>
      </a>,
      <Button
          key={`${k1}-${1}`}
          color={secondClicked?"warning":"success"}
          type="button"
          size="sm"
          onClick={() => {
              const {data} = this.state
              const newdata = data.map(ven=>{
                if(ven.id===segment._id){
                  ven.actions = this.renderActions(k1, link, segment, firstClicked, true)
                  return ven
                }else{
                  return ven
                }
              })
              this.setState({data: newdata})
              this.recrwalTile(segment.tile, segment.centroid)
            }
          }
      >
          <i className="fa fa-sync" />
      </Button>]
  )

  requestPage = () => {
    const {
      countrySelect=null,
      stateSelect=null,
      substateSelect=null,
      querysSelect,
      filter
    } = this.state
    fetch('/api/substates', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
          query:querysSelect,
          filter
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            // console.log(response)
            let data = response.data.map((substate, k1)=>{
              return {
                ...substate,
                segments:<Link to={`/admin/Segments/_geoSubStateId/${substate._id}`}>{substate.segments}</Link>,
                venues:<Link to={`/admin/Venues/_geoSubStateId/${substate._id}`}>{substate.venues}</Link>
              }
            })
            // // data = data.reduce((p, c)=>[...p, ...c], [])
            // console.log(data)
            this.setState({data:data})
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
  boundsGeometrysegment = (geometry) => {
        var latMax=undefined,lonMax=undefined,latMin=undefined,lonMin=undefined;
        
        var coords = [];
        if (geometry.type === "Point") {
          coords = [geometry.coordinates];
        }else if (geometry.type === "LineString") {
            coords = geometry.coordinates;
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

  collapsesToggle = collapse => {
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: []
      });
    } else {
      this.setState({
        openedCollapses: [collapse]
      });
    }
  }

  render() {
    const {
        substateSelect=null,
        countries=[],
        states=[],
        substates=[],
        querys={},
        querysSelect = "ALL",
        filters=[],
        data=[]
    } = this.state
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Cities ( {this.state.data.length} ) 
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <Row>
        					<Col md="3" sm="3">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="countrySelect"
											value={this.state.countrySelect}
											onChange={this.countrySelected}
											options={countries}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="country_select"
                            >
                              Country
                            </label>
                        <Select2
                            id="country_select"
                            className="form-control"
                            // defaultValue="1"
                            options={{
                              placeholder: "Select"
                            }}
                            data={countries}
                            name="countrySelect"
                            value={this.state.countrySelect}
                            onSelect={this.countrySelected}
                          />
                      </FormGroup>
        					</Col>
        					<Col md="3" sm="3">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="stateSelect"
											value={this.state.stateSelect}
											onChange={this.stateSelected}
											options={states}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="state_select"
                      >
                        State
                      </label>
                      <Select2
                          id="state_select"
                          className="form-control"
                          // defaultValue="1"
                          options={{
                            placeholder: "Select"
                          }}
                          data={states}
                          name="stateSelect"
                          value={this.state.stateSelect}
                          onSelect={this.stateSelected}
                        />
                    </FormGroup>
        					</Col>
        					<Col md="3" sm="3">
										{/* <Select
											className="react-select primary"
											classNamePrefix="react-select"
											name="substateSelect"
											value={substateSelect}
											onChange={this.substateSelected}
											options={substates}
											placeholder="Single Select"
										/> */}
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="substate_select"
                      >
                        Sub State
                      </label>
                      <Select2
                          id="substate_select"
                          className="form-control"
                          // defaultValue="1"
                          options={{
                            placeholder: "Select"
                          }}
                          data={substates}
                          name="substateSelect"
                          value={this.state.substateSelect}
                          onSelect={this.substateSelected}
                        />
                      </FormGroup>
        					</Col>
        					<Col md="2" sm="2" style={{textAlign: "center",alignSelf: "center"}}>
                    <Button
                        color="success"
                        type="button"
                        size="md"
                        onClick={this.requestPage}
                    >
                      Search
                    </Button>
        					</Col>
        					{data.length>0 && <Col md="1" sm="1" style={{textAlign: "center",alignSelf: "center"}}>
                    <CSVLink data={data} filename={'fileName.csv'}>
                        <Button
                            color="info"
                            type="button"
                            size="md"
                        >
                          CSV
                        </Button>
                    </CSVLink>
        					</Col> }
                  
        				</Row>
        			
                <div className="accordion">
                  <Card className="card-plain">
                    <CardHeader
                      role="tab"
                      onClick={() => this.collapsesToggle("collapseOne")}
                      aria-expanded={this.state.openedCollapses.includes(
                        "collapseOne"
                      )}
                    >
                      <h5 className="mb-0">Show Problems</h5>
                    </CardHeader>
                    <Collapse
                      role="tabpanel"
                      isOpen={this.state.openedCollapses.includes("collapseOne")}
                    >
                      <CardBody>
                        <Row>
                          <Col md="12" sm="12">
                              <Button
                                  color="info"
                                  type="button"
                                  size="md"
                                  onClick={()=>this.setState({querysSelect:"All"})}
                              >
                                Clear
                              </Button>
                            </Col>
                        </Row>
                        <Row>
                          {Object.keys(querys).map(group=>(
                            <Col sm="3">
                              <Card>
                                <CardHeader><h3>{group}</h3></CardHeader>
                                <CardBody>
                                {querys[group].map(q=>(
                                  <div className="custom-control custom-radio mb-3">
                                    <input
                                      className="custom-control-input"
                                      id={`${group}-${q.label}`}
                                      name="custom-radio-1"
                                      type="radio"
                                      checked={querysSelect === q.label}
                                      onChange={()=>this.setState({querysSelect:q.label})}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={`${group}-${q.label}`}
                                    >
                                      {q.label}
                                    </label>
                                  </div>
                                ))}
                                </CardBody>
                              </Card>
                              </Col>
                            
                          ))}
                          </Row>
                        {/* <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="querys_select"
                          >
                            Query
                          </label>
                          <Select2
                              id="querys_select"
                              className="form-control"
                              // defaultValue="1"
                              options={{
                                placeholder: "Select"
                              }}
                              data={querys}
                              name="querysSelect"
                              value={querysSelect}
                              onSelect={this.querySelected}
                            />
                        </FormGroup> */}
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="card-plain">
                    <CardHeader
                      role="tab"
                      onClick={() => this.collapsesToggle("collapseTwo")}
                      aria-expanded={this.state.openedCollapses.includes(
                        "collapseTwo"
                      )}
                    >
                      <h5 className="mb-0">Show Filters</h5>
                    </CardHeader>
                    <Collapse
                      role="tabpanel"
                      isOpen={this.state.openedCollapses.includes("collapseTwo")}
                    >
                      <CardBody>
                        <Row>
                          <Col md="12" sm="12">
                              <Button
                                  color="info"
                                  type="button"
                                  size="md"
                                  onClick={()=>this.setState({filter:{}})}
                              >
                                Clear
                              </Button>
                            </Col>
                        </Row>
                        <Row>
                            {filters.map((f,i)=>(
                              <Col md="3" sm="3" key={`filters-${i}`}>
                                {f.type === 'buttons' &&
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor={`${f.name}-${i}`}
                                    >
                                      {f.label}
                                    </label>
                                    <div style={{display : "flex",flexWrap: "wrap"}}>
                                      {Object.keys(f.options).map((k,v)=>(
                                        <div key={k}
                                          style={{
                                            backgroundColor: this.state.filter[f.name] === k?"lightblue":"lightgrey",
                                            borderRadius: "15px",
                                            margin: "5px",
                                            padding: "5px"
                                          }}
                                          onClick={()=>{
                                            const newFilter = {...this.state.filter, [f.name]:k}
                                            this.setState({filter:newFilter})
                                          }}
                                        >
                                          {f.options[k]} 
                                        </div>
                                      ))}
                                    </div>
                                    
                                  </FormGroup>
                                }
                                {f.type === 'select' &&
                                <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor={`${f.name}-${i}`}
                                    >
                                      {f.label}
                                    </label>
                                  <Select2
                                    id={`${f.name}-${i}`}
                                    className="form-control"
                                    options={{
                                      placeholder: f.label
                                    }}
                                    data={Object.keys(f.options).map((k,v)=>{
                                      return {
                                        text:f.options[k],
                                        id:k
                                      }
                                    })}
                                    name={f.name}
                                    value={this.state.filter[f.name]}
                                    onSelect={({target:{value}})=>{
                                      const newFilter = {...this.state.filter, [f.name]:value}
                                      this.setState({filter:newFilter})
                                    }}
                                  />
                                  </FormGroup>
                                }
                                {f.type === 'boolean' &&
                                  <React.Fragment>
                                    <h4>{f.label} {this.state.filter[f.name]===undefined && "(inactive)"}</h4>
                                    <label className="custom-toggle mr-1">
                                      <input defaultChecked={false} type="checkbox" 
                                        checked={this.state.filter[f.name] ===true}
                                        onChange={({target:{checked}}) =>{
                                          const newFilter = {...this.state.filter, [f.name]:checked===true}
                                          this.setState({filter:newFilter})
                                        }}
                                      />
                                      <span
                                        className="custom-toggle-slider rounded-circle"
                                        data-label-off="No"
                                        data-label-on="Yes"
                                      />
                                    </label>
                                  </React.Fragment>
                                }
                                {f.type === 'text' &&
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor={`${f.name}-${i}`}
                                    >
                                      {f.label}
                                    </label>
                                    <Input
                                      id={`${f.name}-${i}`}
                                      placeholder={f.label}
                                      type="text"
                                      value={this.state.filter[f.name]===undefined ? "":this.state.filter[f.name]}
                                      onChange={({target:{value}}) =>{
                                        const newFilter = {...this.state.filter, [f.name]:value}
                                        this.setState({filter:newFilter})
                                      }}
                                    />
                                  </FormGroup>
                                }
                              </Col>
                            ))}
                        </Row>
                        
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                
                
                </CardBody>
              </Card>
              
            </Col>
          </Row>
          <Card>
                
                <ToolkitProvider
                  data={this.state.data}
                  keyField="id"
                  columns={[
                    {
                      dataField: "_id",
                      text: "id",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "SubState",
                      text: "SubState",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "State",
                      text: "State",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "Country",
                      text: "Country",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "venues",
                      text: "venues",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      },
                      sortFunc: (a, b, order, dataField, rowA, rowB) => {
                        const {props:{children:achildren=0}={}} = a
                        const {props:{children:bchildren=0}={}} = b
                        if (order === 'asc') {
                          return bchildren - achildren;
                        }
                        return achildren - bchildren; // desc
                      },
                    },
                    {
                      dataField: "segments",
                      text: "segments",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      },
                      sortFunc: (a, b, order, dataField, rowA, rowB) => {
                        const {props:{children:achildren=0}={}} = a
                        const {props:{children:bchildren=0}={}} = b
                        if (order === 'asc') {
                          return bchildren - achildren;
                        }
                        return achildren - bchildren; // desc
                      },
                    },
                    {
                      dataField: "actions",
                      text: "actions",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    }
                  ]}
                  search
                >
                  {props => (
                    <div className="py-4 table-responsive">
                      <div
                        id="datatable-basic_filter"
                        className="dataTables_filter px-4 pb-1"
                      >
                        <label>
                          Search:
                          <SearchBar
                            className="form-control-sm"
                            placeholder=""
                            {...props.searchProps}
                          />
                        </label>
                      </div>
                      <BootstrapTable
                        {...props.baseProps}
                        bootstrap4={true}
                        pagination={pagination}
                        bordered={false}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </Card>
           
        </div>
      </>
    );
  }
}

export default SubstatesReactTable;
