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
  FormGroup
} from "reactstrap";
import NotificationAlert from "react-notification-alert"
// import ReactTable from "react-table";
// import Select from "react-select";
import Select2 from "react-select2-wrapper";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import { dataTable } from "variables/general";
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


class GpidsReactTable extends React.Component {
  state = {
      dataReact:[],

      countrySelect:"_ALL_",
      stateSelect:"_ALL_",
      substateSelect:"_ALL_",
      countries:[],
      states:[],
      substates:[],
      verClicked:{},
      dataReactKey:0,
      filter:{},
      filters:[]
  }
  componentWillMount(){
    // this.requestPage(this.state.page)
    this.getCountries()
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
  renderActions = (k0, k1, link, venue, firstClicked, secondClicked) => (
    [<a
      key={`${k0}-${k1}-${0}`}
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
                  const {dataReact} = this.state
                  const newDataReact = dataReact.map(ven=>{
                    if(ven._id===venue.id){
                      ven.actions = this.renderActions(k0, k1, link, venue, true, secondClicked)
                      return ven
                    }else{
                      return ven
                    }
                  })
                  this.setState({dataReact: newDataReact})
                }
              }
          >
              <i className="fa fa-link" />
          </Button>
      </a>,
      <Button
          key={`${k0}-${k1}-${1}`}
          color={secondClicked?"warning":"success"}
          type="button"
          size="sm"
          onClick={() => {
              const {dataReact} = this.state
              const newDataReact = dataReact.map(ven=>{
                if(ven._id===venue.id){
                  ven.actions = this.renderActions(k0, k1, link, venue, firstClicked, true)
                  return ven
                }else{
                  return ven
                }
              })
              this.setState({dataReact: newDataReact})
              this.recrwalTile(venue.tile, venue.centroid)
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
    } = this.state
    fetch('/api/gpidsreact', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          country:countrySelect,
          state:stateSelect,
          substate:substateSelect,
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
            let dataReact = response.data.map((gpid, k0)=>gpid.venues.map((venue, k1)=>{
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
                id: (
                  <a key={`${k0}-${k1}`} rel="noopener noreferrer" target="_blank" href={`https://www.google.com/maps/place/?q=place_id:${gpid._id}`}>
                      {gpid._id}
                  </a>
                ),
                _id:venue.id,
                name:venue.name,
                categories:venue.categories.map(c=>CATEGORIES[c]).reduce((vi, va)=>`${vi}, ${va}`),
                createdBy:venue._createdBy,
                updatedBy:venue._updatedBy,
                stateName:venue._WZstateName,
                linkPlace:`https://www.google.com/maps/place/?q=place_id:${gpid._id}`,
                link,
                actions: this.renderActions(k0, k1, link, venue, false, false),
              }
            }))


            const headers = [
              
              {label:'id',key:'linkPlace'},
              {label:'name',key:'name'},
              {label:'categories',key:'categories'},
              {label:'stateName',key:'stateName'},
              {label:'link',key:'link'},
            ]

            dataReact = dataReact.reduce((p, c)=>[...p, ...c], [])
            console.log(dataReact)
            this.setState({dataReact, ...response, headers})
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
        substateSelect=null,
        countries=[],
        states=[],
        substates=[],
        dataReact,
        headers=[],
        countrySelect,
        stateSelect
    } = this.state

    const canSearch = countrySelect !== '_ALL_'?true:false
    
    return (
      <div>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Gpids ( {this.state.dataReact.length} - repeated ) 
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
                        onClick={this.cleanGpids}
                    >
                      Search
                    </Button>
        					</Col>
                  }
        					{dataReact.length>0 && <Col md="1" sm="1" style={{textAlign: "center",alignSelf: "center"}}>
                    <CSVLink data={dataReact} headers={headers} filename={`GPIDS_${(new Date()).getTime()}.csv`}>
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
                  data={dataReact}
                  keyField="name"
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
                      dataField: "stateName",
                      text: "State",
                      sort: true,
                      style: { 
                        whiteSpace: 'unset',
                        maxWidth: '150px',
                        minWidth: '100px'
                      }
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
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default GpidsReactTable;
