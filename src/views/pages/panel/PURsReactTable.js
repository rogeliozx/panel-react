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
  UncontrolledTooltip,
  NavItem,
  NavLink,
  Nav
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

const PUR_TYPES = {
  'WRONG_DETAILS':{
    icons:['fas fa-flag'],
    label:"Wrong details"
  },
  'CLOSED':{
    icons:['fas fa-flag'],
    label:"Closed"
  },
  'RESIDENTIAL':{
    icons:['fas fa-flag'],
    label:"Residential"
  },
  'LOW_QUALITY':{
    icons:['fas fa-flag'],
    label:'Low quality image'
  },
  'INAPPROPRIATE':{
    icons:['fas fa-flag'],
    label:'Inappropriate image'
  },
  'UNRELATED':{
    icons:['fas fa-flag'],
    label:"Unrelated image"
  },
  'DELETE':{
    icons:['far fa-trash-alt'],
    label:"Removed place"
  },
  'UPDATE':{
    icons:['far fa-map-marker-question'],
    label:"New details for place"
  },
  'VENUE':{
    icons:['far fa-map-marker-alt'],
    label:"New place"
  },
  'IMAGE':{
    icons:['far fa-image'],
    label:"New picture"
  },
}

class PURsReactTable extends React.Component {
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
    fetch('/api/venues', {
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
              const lon = bounds.latMin+((bounds.latMax-bounds.latMin)/2);
              const lat = bounds.lonMin+((bounds.lonMax-bounds.lonMin)/2);
              const link = `https://www.waze.com/editor/?env=${ENV}&zoom=8&lon=${lon}&lat=${lat}&venues=${venue.id}&marker=true`
              const venueUpdateRequests = Array.isArray(venue.venueUpdateRequests)?venue.venueUpdateRequests:[]
              return venueUpdateRequests.map((placeupdate,k2)=>{
                  return {
                    ...venue,
                    id: venue._id,
                    name:venue.name,
                    categories:venue.categories.map(c=>CATEGORIES[c]).reduce((vi, va)=>`${vi}, ${va}`),
                    _categories:venue.categories,
                    createdBy:venue._createdBy,
                    createdOn:(new Date(venue.createdOn).toLocaleDateString()),
                    updatedBy:venue._updatedBy,
                    updatedOn:(new Date(venue.updatedOn).toLocaleDateString()),
                    city:venue._WZcityName,
                    state:venue._WZstateName,
                    link,
                    ...placeupdate
                  }
              })
            })
            console.log(data)
            data = data.reduce((p, c)=>[...p, ...c], [])
            data = data.sort((a,b)=>a.dateAdded-b.dateAdded)

            const headers = [
              {label:'id',key:'id'},
              {label:'name',key:'name'},
              {label:'categories',key:'categories'},
              {label:'_categories',key:'_categories'},
              {label:'createdBy',key:'createdBy'},
              {label:'createdOn',key:'createdOn'},
              {label:'updatedBy',key:'updatedBy'},
              {label:'updatedOn',key:'updatedOn'},
              {label:'city',key:'city'},
              {label:'state',key:'state'},
              {label:'link',key:'link'},
            ]

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
    
    const getRow = (d,k)=>{
      const { dateAdded } = d

      const { clicked={} }=this.state
      let classNames=""
      if (clicked[d._id]) {
        classNames ="active"
      }
      let color = 'danger'
      if (greenTime <= dateAdded) {
          color = "success";
      } else if (yellowTime <= dateAdded && greenTime > dateAdded) {
          color = "warning";
      }
      const {_categories=[], type, subType, flagType, name=""} = d
      const residential   = d.residential === true
      
      const gasstation     = (_categories.indexOf("GAS_STATION") > -1)
      const parkinglot     = (_categories.indexOf("PARKING_LOT") > -1)
      console.log(d)
      let icon = ''
      if(flagType === 'WRONG_DETAILS'){
          icon = 'WRONG_DETAILS'
      }else if(flagType === 'CLOSED'){
          icon = 'CLOSED'
      }else if(flagType === 'RESIDENTIAL'){
          icon = 'RESIDENTIAL'
      }else if(flagType === 'LOW_QUALITY'){
          icon = 'LOW_QUALITY'
      }else if(flagType === 'INAPPROPRIATE'){
          icon = 'INAPPROPRIATE'
      }else if(flagType === 'UNRELATED'){
          icon = 'UNRELATED'
      }else if(subType === 'DELETE'){
          icon = 'DELETE'
      }else if(subType === 'UPDATE'){
          icon = 'UPDATE'
      }else if(type === 'VENUE'){
          icon = 'VENUE'
      }else if(type === 'IMAGE'){
          icon = 'IMAGE'
      }

      let icons = null
      let _icon = null
      let alt = ''
      if(PUR_TYPES[icon]){
        alt=PUR_TYPES[icon].label
        icons=PUR_TYPES[icon].icons
        

        if(icons.length >=2){
          _icon = <span className="fa-stack">
                <i style={{margin:'0px',ontSize:"large"}} className={icons[0]}></i>
                <i style={{margin:'0px',ontSize:"large", color:'Tomato'}} className={icons[1]}></i>
              </span>
        }else if(icons.length ===1){
          _icon =  <span className="btn-inner--icon mr-1">
                      <i style={{fontSize:"large"}} className={icons[0]} />
                  </span>
        }else{
          _icon = <span className="fa-stack ">
                <i style={{margin:'0px',ontSize:"large"}} className="fas fa-camera fa-stack-1x"></i>
                <i style={{margin:'0px',ontSize:"large", color:'Tomato'}} className="fas fa-ban fa-stack-2x"></i>
              </span>
        }
      }

      let fname = name.trim()
      fname = fname ===''?"[No Name]":fname
      const component = (
          <a
          key={`${k}`}
          href={d.link}
          target="_wme"
          onClick={()=>this.setState({clicked:{...clicked, [d._id]:true}})}
          // rel="noopener noreferrer"
          >
              <Button className={classNames} id={'Tooltip-' + k} key={k} color={color} type="button" style={{margin:"5px"}}>
              {residential && <span className="btn-inner--icon mr-1">
                  <i style={{fontSize:"large"}} className="fas fa-home" />
              </span>}
              {gasstation && <span className="btn-inner--icon mr-1">
                  <i style={{fontSize:"large"}} className="fas fa-gas-pump" />
              </span>}
              {parkinglot && <span className="btn-inner--icon mr-1">
                  <i style={{fontSize:"large"}} className="fas fa-parking-circle" />
              </span>}
              {_icon}
              <span className="btn-inner--text">{fname}</span>
              </Button>
              <UncontrolledTooltip placement='bottom' target={'Tooltip-' + k}>
                {alt}
              </UncontrolledTooltip>
          </a>
      )
      return {
        key :icon,
        component
      }
    }


    let rows = null
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
              <span>{PUR_TYPES[`${gr}`]?PUR_TYPES[`${gr}`].label:''} ({gg.length})</span><br/>
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

export default PURsReactTable;