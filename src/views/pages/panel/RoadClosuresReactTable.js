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


class RoadClosuresReactTable extends React.Component {
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
    const { match={} } = this.props
    const { params={}} = match
    const { id:qid, property } = params

    // this.requestPage(this.state.page)
    this.getCountries()
    this.getQuerys()
    this.getFilters()
    if (qid) {
      this.requestPage()
    }
  }
  
	getFilters = () => {
    fetch('/api/roadclosures/filters')
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
    fetch('/api/roadclosures/querys')
    .then(res => res.json())
    .then(querys => {
      console.log(querys)
      this.setState({querys})
    })
    .catch(error => console.error('Error:', error))
  }
  
	querySelected = ({target:{value:query}}) => {
    // console.log(query)
		this.setState({ querysSelect: query})
  }
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
    const { match={} } = this.props
    const { params={}} = match
    const { id, property } = params
    // debugger
    fetch('/api/roadclosures', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
          query:querysSelect,
          qid : id,
          qproperty : property,
          filter,
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
            let data = response.data.map((road, k1)=>{
              let ENV = "row"
              switch (road.Env) {
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
              // debugger
              var bounds = this.boundsGeometrysegment(road.geometry);
              const lat = bounds.latMin+((bounds.latMax-bounds.latMin)/2);
              const lon = bounds.lonMin+((bounds.lonMax-bounds.lonMin)/2);
              const link = `https://www.waze.com/editor/?env=${ENV}&zoom=8&lon=${lat}&lat=${lon}&segments=${road.segID}&marker=true`

              const {majorTrafficEvents:[event={}]=[]} = road
              const {names:[{value:evName=''}={}]=[]} = event
              return {
                segID : road.segID, // 118176783,
                active : road.active?'Yes':'No', // false,
                eventId : evName, // "170983617.1709639559.142288",
                createdBy : road._createdBy, // 11773771,
                createdOn : (new Date(road.createdOn).toLocaleDateString()), // 1570540527887.0,
                startDate : road.startDate, // "2019-10-13 08:00",
                endDate : road.endDate, // "2019-10-13 14:00",
                location : road.location, // "Av. División del Norte",
                permanent : road.permanent?'Yes':'No', // false,
                reason : road.reason, // "Muévete en Bici CDMX ",
                updatedBy : road._updatedBy, // null,
                updatedOn : (road.updatedOn !==null?new Date(road.updatedOn).toLocaleDateString():''), // null,

                link:link,
                actions: this.renderActions( k1, link, road, false, false),
              }
            })

            const headers = [
              {label:'segID',key:'segID'},
              {label:'active',key:'active'},
              {label:'eventId',key:'eventId'},
              {label:'createdBy',key:'createdBy'},
              {label:'createdOn',key:'createdOn'},
              {label:'startDate',key:'startDate'},
              {label:'endDate',key:'endDate'},
              {label:'location',key:'location'},
              {label:'permanent',key:'permanent'},
              {label:'reason',key:'reason'},
              {label:'updatedBy',key:'updatedBy'},
              {label:'updatedOn',key:'updatedOn'},
              {label:'link',key:'link'},
            ]
            // data = data.reduce((p, c)=>[...p, ...c], [])
            console.log(data)
            this.setState({data, headers})
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
        data=[],
        headers=[],
        countrySelect,
        stateSelect
    } = this.state

    const { match={} } = this.props
    const { params={}} = match
    const { id:qid, property } = params

    const canSearch = true // countrySelect !== '_ALL_' && stateSelect !== '_ALL_'?true:false
    
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                       ( {this.state.data.length} ) 
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
                  { (canSearch || qid) && 
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
                  }
        					{data.length>0 && <Col md="1" sm="1" style={{textAlign: "center",alignSelf: "center"}}>
                    <CSVLink data={data} headers={headers} filename={`${(new Date()).getTime()}.csv`}>
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
                      dataField: "segID",
                      text: "segment ID",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "active",
                      text: "active",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "eventId",
                      text: "MTE",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {/*{
                      dataField: "createdBy",
                      text: "createdBy",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "createdOn",
                      text: "createdOn",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },*/},
                    {
                      dataField: "startDate",
                      text: "start Date",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "endDate",
                      text: "end Date",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "location",
                      text: "location",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "permanent",
                      text: "permanent",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "reason",
                      text: "reason",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {/*{
                      dataField: "updatedBy",
                      text: "updatedBy",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "updatedOn",
                      text: "updatedOn",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },*/},
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

export default RoadClosuresReactTable;
