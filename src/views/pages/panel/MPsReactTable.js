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
  Collapse,
  Tooltip,
  UncontrolledTooltip,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
// import ReactTable from "react-table";
// import Select from "react-select";
import Select2 from "react-select2-wrapper";
import {
	CSVLink
} from 'react-csv';
const MP_TYPES = {
	"1":{
    icons:[],
    label:"Segment with abnormal geometry detected"
  },
	"2":{
    icons:[],
    label:"Segment with no connections detected"
  },
	"3":{
    icons:[],
    label:"Missing junction detected"
  },
	"5":{
    icons:[],
    label:"Overlapping segments detected"
  },
	"6":{
    icons:[],
    label:"Routing problem detected (segment with no exit)"
  },
	"7":{
    icons:[],
    label:"Inconsistent road type detected"
  },
	"8":{
    icons:[],
    label:"Short segment detected"
  },
	"10":{
    icons:[],
    label:"Junction with more than 5 connected segments detected"
  },
	"11":{
    icons:[],
    label:"Inconsistent segment direction detected"
  },
	"12":{
    icons:[],
    label:"Unnecessary junctions detected"
  },
	"13":{
    icons:[],
    label:"Improper ramp connection detected"
  },
	"14":{
    icons:[],
    label:"Wrong road elevation detected"
  },
	"15":{
    icons:[],
    label:"Very sharp turn detected"
  },
	"16":{
    icons:[],
    label:"Irregular toll road detected"
  },
	"17":{
    icons:[],
    label:"Segment without details detected"
  },
	"19":{
    icons:[],
    label:"Irregular roundabout segment detected"
  },
	"20":{
    icons:[],
    label:"Irregular roundabout segment detected"
  },
	"21":{
    icons:[],
    label:"Wrong street name detected"
  },
	"22":{
    icons:[],
    label:"Invalid dead end detected"
  },
	"23":{
    icons:[],
    label:"Routing problem"
  },
	"50":{
    icons:[],
    label:"Parking Lot set as a Point"
  },
	"51":{
    icons:[],
    label:"Place not reachable"
  },
	"52":{
    icons:[],
    label:"Place missing from Waze map"
  },
	"53":{
    icons:[],
    label:"Unmatched Places"
  },
	"70":{
    icons:[],
    label:"Missing Parking Lot Place"
  },
	"71":{
    icons:[],
    label:"Missing Parking Lot Place"
  },
	"101":{
    icons:[],
    label:"Driving direction mismatch"
  },
	"102":{
    icons:[],
    label:"Missing junction"
  },
	"103":{
    icons:[],
    label:"Missing road"
  },
	"104":{
    icons:[],
    label:"Crossing roads with no junction node"
  },
	"105":{
    icons:[],
    label:"Road type mismatch"
  },
	"106":{
    icons:[],
    label:"Disallowed turn might be allowed"
  },
	"200":{
    icons:[],
    label:"Suggested route frequently ignored"
  },
	"300":{
    icons:['fas fa-sync','fas fa-ban fa-stack-2x'],
    label:"Road Closure Request"
  },
}

class MPsReactTable extends React.Component {
  state = {
      data:[],
      querysSelect:"ALL",

      querys:{},

      countrySelect:"_ALL_",
      stateSelect:"_ALL_",
      substateSelect:"_ALL_",
      countries:[],
      states:[],
      substates:[],
      filter:{},
      filters:[],
      openedCollapses: [],
      counter:0
  }
  componentWillMount(){
    // this.requestPage(this.state.page)
    this.getCountries()
    this.getQuerys()
    this.getFilters()
  }

	getQuerys = () => {
    fetch('/api/venues/querys')
    .then(res => res.json())
    .then(querys => {
      console.log(querys)
      this.setState({querys})
    })
    .catch(error => console.error('Error:', error))
  }





	getFilters = () => {
    fetch('/api/venues/filters')
    .then(res => res.json())
    .then(filters => {
      console.log(filters)
      this.setState({filters})
    })
    .catch(error => console.error('Error:', error))
  }

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
					country:country
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

  renderActions = (k1, link, venue, firstClicked, secondClicked) => {
    return (
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
                      if(ven.id===venue._id){
                        console.log(`se clicleo ${venue.name}`)
                        ven.actions = this.renderActions(k1, link, venue, true, secondClicked)
                        return ven
                      }else{
                        return ven
                      }
                    })
                    this.setState({data: newdata, counter:this.state.counter+1})
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
                  if(ven.id===venue._id){
                    ven.actions = this.renderActions(k1, link, venue, firstClicked, true)
                    return ven
                  }else{
                    return ven
                  }
                })
                this.setState({data: newdata, counter:this.state.counter+1})
                this.recrwalTile(venue.tile, venue.centroid)
              }
            }
        >
            <i className="fa fa-sync" />
        </Button>]
    )
  }

  requestPage = () => {
    const {
      countrySelect=null,
      stateSelect=null,
      substateSelect=null,
      querysSelect,
      filter
    } = this.state
    fetch('/api/problems', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
          query:querysSelect,
          filter,
          placeupdates:true
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
            let data = response.data.map((map, k1)=>{
              let ENV = "row"
              switch (map.Env) {
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
              var bounds = this.boundsGeometryVenue(map.geometry);
              const lon = bounds.latMin+((bounds.latMax-bounds.latMin)/2);
              const lat = bounds.lonMin+((bounds.lonMax-bounds.lonMin)/2);
              const link = `https://www.waze.com/editor?zoom=7&lat=${lat}&lon=${lon}&mapProblem=${map._id}`
              return {
                ...map,
                link
              }
            })

            const headers = [
              {label:'id',key:'id'},
              {label:'subType',key:'subType'},
              {label:'_geoCountry',key:'_geoCountry'},
              {label:'_geoState',key:'_geoState'},
              {label:'_geoSubState',key:'_geoSubState'},
              {label:'link',key:'link'},
            ]
            // data = data.sort((a,b)=>a.updatedOn-b.updatedOn)
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

  changeGroupState = () => {
    const {group = false} = this.state
    this.setState({group:!group})
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
        group = false,
        headers=[]
    } = this.state
    // debugger
    var greenTime = new Date();
    greenTime.setDate(greenTime.getDate() - 2);
    var yellowTime = new Date();
    yellowTime.setDate(yellowTime.getDate() - 9);

    let rows = null

    const getRow = (d,k)=>{
      const { updatedOn } = d

      const { clicked={} }=this.state
      let classNames=""
      if (clicked[d._id]) {
        classNames ="active"
      }
          let color = 'danger'
          if (greenTime <= updatedOn) {
              color = "success";
          } else if (yellowTime <= updatedOn && greenTime > updatedOn) {
              color = "warning";
          }
          const { subType, _id:name=""} = d
  
          let icons = null
          let alt=MP_TYPES[`${subType}`].label
          icons=MP_TYPES[`${subType}`].icons
          let fname = name
          fname = fname ===''?"[No Name]":fname
          let icon = null
          if(icons.length >=2){
            icon = <span className="fa-stack">
                  <i style={{margin:'0px',ontSize:"large"}} className={icons[0]}></i>
                  <i style={{margin:'0px',ontSize:"large", color:'Tomato'}} className={icons[1]}></i>
                </span>
          }else if(icons.length ===1){
            icon =  <span className="btn-inner--icon mr-1">
                        <i style={{fontSize:"large"}} className={icons[0]} />
                    </span>
          }else{
            icon = <span className="fa-stack ">
                  <i style={{margin:'0px',ontSize:"large"}} className="fas fa-camera fa-stack-1x"></i>
                  <i style={{margin:'0px',ontSize:"large", color:'Tomato'}} className="fas fa-ban fa-stack-2x"></i>
                </span>
          }
          const component = (
              <a
              key={`${k}`}
              href={d.link}
              target="_wme"
              onClick={()=>this.setState({clicked:{...clicked, [d._id]:true}})}
              // rel="noopener noreferrer"
              >
                  <Button className={classNames} id={'Tooltip-' + k} key={k} color={color} type="button" style={{margin:"5px"}}>
                  {icon}
                  <span className="btn-inner--text" >{fname}</span>
  
                  </Button>
                  <UncontrolledTooltip placement='bottom' target={'Tooltip-' + k}>
                    {alt}
                  </UncontrolledTooltip>
              </a>
          )
        return {
          key :subType,
          component
        }
    } 

    if (group) {
      // debugger
      let groups = {}
      for (let indexGroup = 0; indexGroup < data.length; indexGroup++) {
        const d = data[indexGroup];
        const { key, component } = getRow(d,indexGroup)
        const {[key]:g=[]} = groups
        g.push(component)
        groups[key] = g
      }
      rows = Object.keys(groups).map((gr, grKey)=>{
        const gg = groups[gr]
        return (
          <Row key={grKey}>
            <Col md="12" sm="12">
              <span>{MP_TYPES[`${gr}`]?MP_TYPES[`${gr}`].label:''} ({gg.length})</span><br/>
              {gg}
            </Col>
          </Row>
        )
      })
      console.log(rows)
    } else {
      rows = <Row>{data.map((d,k)=>{
        const { component } = getRow(d,k)
        return component
      })}</Row>
    }
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Places Updates ( {this.state.data.length} )
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

                <Row>
                  <Col md="1" sm="1">
                    <label>Sort By :</label>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Nav
                      className="nav-fill flex-column flex-sm-row"
                      id="tabs-text"
                      pills
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.navPills === 1}
                          className={`mb-sm-3 mb-md-0 ${!group?'active':''}`}
                          onClick={this.changeGroupState}
                          href="#pablo"
                          role="tab"
                        >
                          Date
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.navPills === 2}
                          className={`mb-sm-3 mb-md-0 ${group?'active':''}`}
                          onClick={this.changeGroupState}
                          href="#pablo"
                          role="tab"
                        >
                          Type
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                    {rows}
                </CardBody>
            </Card>

            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MPsReactTable;