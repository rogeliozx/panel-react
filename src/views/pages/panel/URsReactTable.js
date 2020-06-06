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
const UR_TYPES= {
	"6":{
    icon:"fas fa-directions",
    label:"Incorrect turn"
  },
	"7":{
    icon:"fas fa-address-card",
    label:"Incorrect address"
  },
	"8":{
    icon:"fas fa-route",
    label:"Incorrect route"
  },
	"9":{
    icon:"fas fa-sync",
    label:"Missing roundabout"
  },
	"10":{
    icon:"fas fa-exclamation-triangle",
    label:"General error"
  },
	"11":{
    icon:"fas fa-directions",
    label:"Turn not allowed"
  },
	"12":{
    icon:null,
    label:"Incorrect junction"
  },
	"13":{
    icon:null,
    label:"Missing bridge overpass"
  },
	"14":{
    icon: "far fa-route",
    label:"Improper / Poor navigation instructions"
  },
	"15":{
    icon: "far fa-road",
    label:"Missing exit"
  },
	"16":{
    icon: "far fa-road",
    label:"Missing road"
  },
	"18":{
    icon: "fas fa-store-alt",
    label:"Missing Place"
  },
	"19":{
    icon: "fas fa-do-not-enter",
    label:"Closed road"
  },
	"21":{
    icon: "fas fa-map-signs",
    label:"Missing street name"
  },
	"22":{
    icon: "fas fa-address-card",
    label:"Incorrect street prefix or suffix"
  },
	"23":{
    icon: "fas fa-tachometer-alt-slow",
    label:"Missing or invalid speed limit"
  },
}
const SECTIONS={
  0:'no messages',
  1:'message with answer',
  2:'waiting for answer',
}
class URsReactTable extends React.Component {
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
    fetch('/api/mapupdaterequests', {
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
              const link = `https://www.waze.com/editor?zoom=7&lat=${lat}&lon=${lon}&mapUpdateRequest=${map._id}`
              return {
                ...map,
                link
              }
            })
            data = data.sort((a,b)=>a.updatedOn-b.updatedOn)
            this.setState({data})
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
  
  changeGroupState = value => {
    const {group = 0} = this.state
    this.setState({group:value})
  }
  getRow = (greenTime, yellowTime)=>(d,k)=>{
    const { updatedOn:_updatedOn, driveDate } = d
    const updatedOn = _updatedOn === null?driveDate:_updatedOn
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
    // debugger
    const { type, _id:name="", comments=[]} = d

    let icon = null
    let alt=UR_TYPES[`${type}`].label
    icon=UR_TYPES[`${type}`].icon
    let fname = name
    fname = fname ===''?"[No Name]":fname
    const component = (
        <a
        key={`${k}`}
        href={d.link}
        target="_wme"
        onClick={()=>this.setState({clicked:{...clicked, [d._id]:true}})}
        // rel="noopener noreferrer"
        >
            <Button className={classNames} id={'Tooltip-' + name} key={k} color={color} type="button" style={{margin:"5px"}}>
            {icon !==null ? 
              <span className="btn-inner--icon mr-1">
                  <i style={{fontSize:"large"}} className={icon} />
              </span>:
              <span className="btn-inner--icon mr-1">
                  <i style={{fontSize:"large"}} className='fas fa-directions' />
              </span>}
            <span className="btn-inner--text" >{fname}</span><br/>
            <span className="btn-inner--text" >{comments.length} comments</span>
            </Button>
            <UncontrolledTooltip placement='bottom' target={'Tooltip-' + name}>
              {alt}
            </UncontrolledTooltip>
        </a>
    )
    return {
      key :type,
      component
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
        data,
        group = 0
    } = this.state
    // debugger
    var greenTime = new Date();
    greenTime.setDate(greenTime.getDate() - 2);
    var yellowTime = new Date();
    yellowTime.setDate(yellowTime.getDate() - 9);
    
    let rows=null
    // debugger
    if (group === 1 ) {
      // debugger
      let groups = {}
      for (let indexGroup = 0; indexGroup < data.length; indexGroup++) {
        const d = data[indexGroup];
        const { key, component } = this.getRow(greenTime, yellowTime)(d,indexGroup)
        const {[key]:g=[]} = groups
        g.push(component)
        groups[key] = g
      }
      rows = Object.keys(groups).map((gr, grKey)=>{
        const gg = groups[gr]
        return (
          <Row key={grKey}>
            <Col md="12" sm="12">
              <span>{UR_TYPES[`${gr}`]?UR_TYPES[`${gr}`].label:'No Type'} ({gg.length})</span><br/>
              {gg}
            </Col>
          </Row>
        )
      })
      console.log(rows)
    }else if (group === 2 ) {
      // debugger
      let groups = {}
      for (let indexGroup = 0; indexGroup < data.length; indexGroup++) {
        const d = data[indexGroup];
        const {_section=0} = d
        const { key, component } = this.getRow(greenTime, yellowTime)(d,indexGroup)
        const {[_section]:g=[]} = groups
        g.push(component)
        groups[_section] = g
      }
      rows = Object.keys(groups).map((gr, grKey)=>{
        const gg = groups[gr]
        return (
          <Row key={grKey}>
            <Col md="12" sm="12">
              <span>{SECTIONS[grKey]} ({gg.length})</span><br/>
              {gg}
            </Col>
          </Row>
        )
      })
      console.log(rows)
    } else {
      rows = <Row>{data.map((d,k)=>{
        const { component } = this.getRow(greenTime, yellowTime)(d,k)
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
                    Map Updates Requests ( {this.state.data.length} ) 
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
                          className={`mb-sm-3 mb-md-0 ${group===0?'active':''}`}
                          onClick={()=>this.changeGroupState(0)}
                          href="#pablo"
                          role="tab"
                        >
                          Date
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.navPills === 2}
                          className={`mb-sm-3 mb-md-0 ${group===1?'active':''}`}
                          onClick={()=>this.changeGroupState(1)}
                          href="#pablo"
                          role="tab"
                        >
                          Type
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.navPills === 3}
                          className={`mb-sm-3 mb-md-0 ${group===2?'active':''}`}
                          onClick={()=>this.changeGroupState(2)}
                          href="#pablo"
                          role="tab"
                        >
                          Section
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

export default URsReactTable;