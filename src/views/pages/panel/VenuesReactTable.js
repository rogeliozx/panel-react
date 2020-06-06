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
const CATEGORIES = {
    'AIRPORT': 'Airport',
    'ART_GALLERY': 'Art Gallery',
    'ARTS_AND_CRAFTS': 'Arts & Crafts',
    'ATM': 'ATM',
    'BAKERY': 'Bakery',
    'BANK_FINANCIAL': 'Bank / Financial',
    'BAR': 'Bar',
    'BEACH': 'Beach',
    'BED_AND_BREAKFAST': 'Bed & Breakfast',
    'BOOKSTORE': 'Bookstore',
    'BRIDGE': 'Bridge',
    'BUS_STATION': 'Bus Station',
    'CAFE': 'Coffee shop',
    'CAMPING_TRAILER_PARK': 'Camping / Trailer Park',
    'CANAL': 'Canal',
    'CAR_DEALERSHIP': 'Car Dealership',
    'CAR_RENTAL': 'Car Rental',
    'CAR_SERVICES': 'Car services',
    'CAR_WASH': 'Car Wash',
    'CARPOOL_SPOT': 'Carpool Spot',
    'CASINO': 'Casino',
    'CEMETERY': 'Cemetery',
    'CHARGING_STATION': 'Charging Station',
    'CITY_HALL': 'City Hall',
    'CLUB': 'Club',
    'COLLEGE_UNIVERSITY': 'College / University',
    'CONSTRUCTION_SITE': 'Construction Site',
    'CONVENIENCE_STORE': 'Convenience Store',
    'CONVENTIONS_EVENT_CENTER': 'Conventions / Event Center',
    'COTTAGE_CABIN': 'Cottage / Cabin',
    'COURTHOUSE': 'Courthouse',
    'CULTURE_AND_ENTERTAINEMENT': 'Culture & entertainment',
    'CURRENCY_EXCHANGE': 'Currency Exchange',
    'DAM': 'Dam',
    'DEPARTMENT_STORE': 'Department Store',
    'DESSERT': 'Dessert',
    'DOCTOR_CLINIC': 'Doctor / Clinic',
    'ELECTRONICS': 'Electronics',
    'EMBASSY_CONSULATE': 'Embassy / Consulate',
    'EMERGENCY_SHELTER': 'Emergency Shelter',
    'FACTORY_INDUSTRIAL': 'Factory / Industrial',
    'FARM': 'Farm',
    'FASHION_AND_CLOTHING': 'Fashion and Clothing',
    'FAST_FOOD': 'Fast Food',
    'FERRY_PIER': 'Ferry Pier',
    'FIRE_DEPARTMENT': 'Fire Department',
    'FLOWERS': 'Flowers',
    'FOOD_AND_DRINK': 'Food and Drink',
    'FOOD_COURT': 'Food Court',
    'FOREST_GROVE': 'Forest / Grove',
    'FURNITURE_HOME_STORE': 'Furniture / Home Store',
    'GAME_CLUB': 'Game Club',
    'GARAGE_AUTOMOTIVE_SHOP': 'Garage / Automotive Shop',
    'GAS_STATION': 'Gas Station',
    'GIFTS': 'Gifts',
    'GOLF_COURSE': 'Golf Course',
    'GOVERNMENT': 'Government',
    'GYM_FITNESS': 'Gym / Fitness',
    'HARDWARE_STORE': 'Hardware Store',
    'HOSPITAL_URGENT_CARE': 'Hospital / Urgent Care',
    'HOSTEL': 'Hostel',
    'HOTEL': 'Hotel',
    'ICE_CREAM': 'Ice Cream',
    'INFORMATION_POINT': 'Information Point',
    'ISLAND': 'Island',
    'JEWELRY': 'Jewelry',
    'JUNCTION_INTERCHANGE': 'Junction / Interchange',
    'KINDERGARDEN': 'Kindergarten',
    'LAUNDRY_DRY_CLEAN': 'Laundry / Dry Clean',
    'LIBRARY': 'Library',
    'LODGING': 'Lodging',
    'MARKET': 'Market',
    'MILITARY': 'Military',
    'MOVIE_THEATER': 'Movie Theater',
    'MUSEUM': 'Museum',
    'MUSIC_STORE': 'Music Store',
    'MUSIC_VENUE': 'Music Venue',
    'NATURAL_FEATURES': 'Natural Features',
    'OFFICES': 'Offices',
    'ORGANIZATION_OR_ASSOCIATION': 'Organization or Association',
    'OTHER': 'Other',
    'OUTDOORS': 'Outdoors',
    'PARK': 'Park',
    'PARKING_LOT': 'Parking Lot',
    'PERFORMING_ARTS_VENUE': 'Performing Arts Venue',
    'PERSONAL_CARE': 'Personal Care',
    'PET_STORE_VETERINARIAN_SERVICES': 'Pet Store / Veterinarian Services',
    'PHARMACY': 'Pharmacy',
    'PHOTOGRAPHY': 'Photography',
    'PLAYGROUND': 'Playground',
    'PLAZA': 'Plaza',
    'POLICE_STATION': 'Police Station',
    'POOL': 'Pool',
    'POST_OFFICE': 'Post Office',
    'PRISON_CORRECTIONAL_FACILITY': 'Prison / Correctional Facility',
    'PROFESSIONAL_AND_PUBLIC': 'Professional and public',
    'PROMENADE': 'Promenade',
    'RACING_TRACK': 'Racing Track',
    'RELIGIOUS_CENTER': 'Religious Center',
    'RESIDENCE_HOME': 'Residence / Home',
    'REST_AREAS': 'Rest area',
    'RESTAURANT': 'Restaurant',
    'RIVER_STREAM': 'River / Stream',
    'SCENIC_LOOKOUT_VIEWPOINT': 'Scenic Lookout / Viewpoint',
    'SCHOOL': 'School',
    'SEA_LAKE_POOL': 'Sea / Lake / Pool',
    'SEAPORT_MARINA_HARBOR': 'Seaport / Marina / Harbor',
    'SHOPPING_AND_SERVICES': 'Shopping and services',
    'SHOPPING_CENTER': 'Shopping Center',
    'SKI_AREA': 'Ski Area',
    'SPORTING_GOODS': 'Sporting Goods',
    'SPORTS_COURT': 'Sports Court',
    'STADIUM_ARENA': 'Stadium / Arena',
    'SUBWAY_STATION': 'Subway Station',
    'SUPERMARKET_GROCERY': 'Supermarket / Grocery',
    'SWAMP_MARSH': 'Swamp / Marsh',
    'SWIMMING_POOL': 'Swimming Pool',
    'TAXI_STATION': 'Taxi Station',
    'TELECOM': 'Telecom',
    'THEATER': 'Theater',
    'THEME_PARK': 'Theme Park',
    'TOURIST_ATTRACTION_HISTORIC_SITE': 'Tourist Attraction / Historic Site',
    'TOY_STORE': 'Toy Store',
    'TRAIN_STATION': 'Train Station',
    'TRANSPORTATION': 'Transportation',
    'TRASH_AND_RECYCLING_FACILITIES': 'Trash & recycling facility',
    'TRAVEL_AGENCY': 'Travel Agency',
    'TUNNEL': 'Tunnel',
    'ZOO_AQUARIUM': 'Zoo / Aquarium'
}

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

class VenuesReactTable extends React.Component {
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
  componentDidMount(){
    // this.requestPage(this.state.page)

    const { match={} } = this.props
    const { params={}} = match
    const { id:qid, property } = params

    this.getCountries()
    this.getQuerys()
    this.getFilters()
    if (qid) {
      this.requestPage()
    }
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
    const { match={} } = this.props
    const { params={}} = match
    const { id, property } = params
    fetch('/api/venues', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
          query:querysSelect,
          qid : id,
          qproperty : property,
          filter
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
            let data = response.data.map((venue, k1)=>{
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
              return {
                id: venue._id,
                name:venue.name,
                categories:venue.categories.map(c=>CATEGORIES[c]).reduce((vi, va)=>`${vi}, ${va}`),
                createdBy:venue._createdBy,
                createdOn:(new Date(venue.createdOn).toLocaleDateString()),
                updatedBy:venue._updatedBy,
                updatedOn:(new Date(venue.updatedOn).toLocaleDateString()),
                city:venue._WZcityName,
                state:venue._WZstateName,
                link:link,
                actions: this.renderActions( k1, link, venue, false, false),
              }
            })
            const headers = [
              {label:'id',key:'id'},
              {label:'name',key:'name'},
              {label:'categories',key:'categories'},
              {label:'createdBy',key:'createdBy'},
              {label:'createdOn',key:'createdOn'},
              {label:'updatedBy',key:'updatedBy'},
              {label:'updatedOn',key:'updatedOn'},
              {label:'city',key:'city'},
              {label:'state',key:'state'},
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
    // debugger

    const canSearch = countrySelect !== '_ALL_' && stateSelect !== '_ALL_'?true:false
    
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Venues ( {this.state.data.length} ) 
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
                  { canSearch && 
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
                    <CSVLink headers={headers} data={data} filename={`venues_${(new Date()).getTime()}.csv`}>
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
              <Card>
                {/*<CardHeader>
                  <h3 className="mb-0">React Bootstrap Table 2</h3>
                  <p className="text-sm mb-0">
                    This is an exmaple of data table using the well known
                    react-bootstrap-table2 plugin. This is a minimal setup in
                    order to get started fast.
                  </p>
                </CardHeader>*/}
                <ToolkitProvider
                  key={this.state.counter}
                  data={this.state.data}
                  keyField="id"
                  columns={[
                    {
                      dataField: "id",
                      text: "id",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "name",
                      text: "name",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "categories",
                      text: "categories",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "state",
                      text: "State",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "city",
                      text: "City",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "createdBy",
                      text: "Created By",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "createdOn",
                      text: "Created On",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    /*{
                      dataField: "updatedBy",
                      text: "Updated By",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },
                    {
                      dataField: "updatedOn",
                      text: "Updated On",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
                    },*/
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
           
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default VenuesReactTable;
