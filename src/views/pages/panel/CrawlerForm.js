import React from "react";
import TagsInput from "react-tagsinput";
import openSocket from 'socket.io-client'
import NotificationAlert from "react-notification-alert"

import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col, 
  Button,
  Label,
  Input,
  Table,
  FormText
} from "reactstrap";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CrawlerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleSelect: null,
      multipleSelect: null,
      tagsinput: ["Amsterdam", "Washington", "Sydney", "Beijing"],

			countries:[],
			states:[],
      substates:[],
      countrySelect:null,
			stateSelect:null,
      substateSelect:null,
      statesCached:{},
      substatesCached:{},
      substatesTags:{},
      crawlerName:"",
      crawlerHours:0,
      mapcomments : false,
      urs : false,
      venues : false,
      segments : false,
      managedareas : false,
      roadclosures : false,
      placeupdates : false,
      zoom:4
    };
    const socket = openSocket();
		
		socket.on('connect', () => {
			this.getCountries()
		});

		this.socket = socket
  }
  componentDidMount(){
    const {match:{params:{crawlId=null}={}}={}} = this.props
    if (crawlId !== null) {
      this.getCrawl(crawlId)
    }

  }
  getCrawl = crawlId => {
    this.socket.emit('getcrawl', crawlId, (crawl) => {
      console.log(crawl)
      this.setState({
        ...crawl
      })
		});
  }
	getCountries = () => {
		this.socket.emit('getcountries', (countries) => {
			this.setState({countries})
		});
  }
  
	selectedCountry = (country) => {
    const { statesCached } = this.state
    if (statesCached[country.Country]) {
      const states = statesCached[country.Country]
      this.setState({states, countrySelect:country.Country,stateSelect: null, substateSelect:null})
    }else{
      this.socket.emit('getstates', country.Country, (states) => {
        const newStatesCached = {...statesCached,[country.Country]:states}
        this.setState({statesCached:newStatesCached, states, countrySelect:country.Country,stateSelect: null, substateSelect:null})
      });
    }
		
  }
  
	selectedStates = (state,setTag=false) => {
    const { substatesCached } = this.state
    if (substatesCached[state.State]) {
      const substates = substatesCached[state.State]
      if (setTag) {
        let newTags = {...this.state.substatesTags}
        for (let index = 0; index < substates.length; index++) {
          const substate = substates[index];
          newTags[`${substate.Country}-${substate.State}-${substate.SubState}`] = substate
        }
        this.setState({substatesTags:newTags, substates, stateSelect:state.State, substateSelect:null})
      }else{
        this.setState({substates, stateSelect:state.State, substateSelect:null})
      }
    }else{
      this.socket.emit('getsubstates', state.Country, state.State, (substates) => {
        const newSubstatesCached = {...substatesCached,[state.State]:substates}
        if (setTag) {
          let newTags = {...this.state.substatesTags}
          for (let index = 0; index < substates.length; index++) {
            const substate = substates[index];
            newTags[`${substate.Country}-${substate.State}-${substate.SubState}`] = substate
          }
          this.setState({substatesTags:newTags, substatesCached:newSubstatesCached, substates, stateSelect: state.State, substateSelect:null })
        }else{
          this.setState({substatesCached:newSubstatesCached, substates, stateSelect: state.State, substateSelect:null })
        }
        
      });
    }
  }
  handleTagsinput = tagsinput => {
    const { substatesTags } = this.state
    let newTags = {}
    for (let index = 0; index < tagsinput.length; index++) {
      const substatetag = tagsinput[index];
      newTags[substatetag] = substatesTags[substatetag]
    }
    this.setState({ substatesTags:newTags });
  };
  toggleTag = substate => {
    const { substatesTags } = this.state
    let newTags = {...substatesTags}
    if (newTags[`${substate.Country}-${substate.State}-${substate.SubState}`]) {
      delete newTags[`${substate.Country}-${substate.State}-${substate.SubState}`]
    }else{
      newTags[`${substate.Country}-${substate.State}-${substate.SubState}`] = substate
    }
    this.setState({substatesTags:newTags})
  }
  addStateTags = state => {
    const { substatesTags, substatesCached } = this.state
    let newTags = {...substatesTags}
    if (substatesCached[state.State]) {
      const substates = substatesCached[state.State]
      for (let index = 0; index < substates.length; index++) {
        const substate = substates[index];
        newTags[`${substate.Country}-${substate.State}-${substate.SubState}`] = substate
      }
      this.setState({substatesTags:newTags})
    }
  }
  removeStateTags = state => {
    const { substatesTags, substatesCached } = this.state
    let newTags = {...substatesTags}
    if (substatesCached[state.State]) {
      const substates = substatesCached[state.State]
      for (let index = 0; index < substates.length; index++) {
        const substate = substates[index];
        delete newTags[`${substate.Country}-${substate.State}-${substate.SubState}`]
      }
      this.setState({substatesTags:newTags})
    }
  }

  addCountryTags = country => {
    const { substatesTags, substatesCached, statesCached } = this.state
    let newTags = {...substatesTags}
    debugger
    if (statesCached[country.Country]) {
      const states = statesCached[country.Country]
      for (let indexStates = 0; indexStates < states.length; indexStates++) {
          const state = states[indexStates];
          this.selectedStates(state, true)
      }
    }
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleOptionsChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value)
    this.setState({
      [name]: value,
      'placeupdates' : false,
      mapcomments : false,
      urs : false,
      zoom:4,
      managedareas : false,
    });
  }
  handlePlaceupdatesChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value)
    this.setState({
      [name]: value,
      venues : false,
      segments : false,
      roadclosures : false
    });
  }

  resetForm = ()  => {
    this.setState({
      substatesTags:{},
      crawlerName:"",
      crawlerHours:0,
    })
  }
  saveForm = () => {
    const self = this
    const {match:{params:{crawlId=null}={}}={}} = this.props
    const { crawlerName, crawlerHours, substatesTags,
      mapcomments,
      urs,
      venues,
      placeupdates,
      segments,
      managedareas,
      roadclosures, 
      zoom} = this.state
    if (mapcomments === true ||
        urs === true ||
        venues === true ||
        placeupdates === true ||
        segments === true ||
        managedareas === true ||
        roadclosures === true ) {
        if (crawlerName !== "" && Object.keys(substatesTags).length > 0) {
          this.socket.emit('savecrawler', {crawlerName, crawlerHours, substatesTags,
            mapcomments,
            urs,
            venues,
            placeupdates,
            segments,
            managedareas,
            roadclosures, zoom,
            crawlId}, async (crawl) => {
              console.log(crawl)
              this.notify("Added Successfully")
              const location = {
                pathname: '/admin/Crawls'
              }
              await sleep(1000)
              self.props.history.push(location)
          });
        }else{
          this.notify("The form is incomplete", "danger")
        }    
    }else {
      this.notify("You have to select at least one Download Option", "danger")
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

  render() {
    const {match:{params:{crawlId=null}={}}={}} = this.props
    const {
			countries=[],
			states=[],
      substates=[],
      countrySelect=null,
			stateSelect=null,
      substatesCached,
      substatesTags,
      crawlerName,
      crawlerHours,
      
      zoom,
      mapcomments,
      urs,
      venues,
      placeupdates,
      segments,
      managedareas,
      roadclosures,
      statesCached=[]
    } = this.state
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">

        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle>New Crawler</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <Button
                        className="btn-round float-left" color="info"
                        onClick={this.resetForm}
                      >
                        Reset
                      </Button>
                      <Button
                        className="btn-round float-right" color="success"
                        onClick={this.saveForm}
                      >
                        Save
                      </Button>
                      {crawlId !== null &&
                        <Link to='/admin/Crawls'>
                          <Button
                            className="btn-round float-right" color="danger"
                          >
                            Cancel
                          </Button>
                        </Link>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup className={crawlerName === "" ?'has-danger':''}>
                        <CardTitle tag="h6">Crawler Name</CardTitle>
                        <Input placeholder="name" type="text"  
                          name="crawlerName"
                          value={crawlerName}
                          onChange={this.handleInputChange}               
                        />
                        {crawlerName === "" ? (
                          <label className="error">
                            Please enter a name.
                          </label>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <CardTitle tag="h6">Crawl Frecuency</CardTitle>
                        <Input 
                          name="crawlerHours"
                          value={crawlerHours}
                          onChange={this.handleInputChange}  />
                        <FormText color="default" tag="span">
                          the crawler will restart after the selected frencuency, * 0 for run just one time
                        </FormText>
                      </FormGroup>
                      <CardTitle tag="h6">Download Options</CardTitle>
                      <Row>

                        <Col md="6">
                          <FormGroup check>
                            <Label check>
                              <Input 
                                name="venues"
                                value={venues}
                                checked = {venues}
                                onChange={this.handleOptionsChange} 
                                type="checkbox" />
                              <span className="form-check-sign" />
                              Venues
                            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input 
                                name="segments"
                                value={segments}
                                checked = {segments}
                                onChange={this.handleOptionsChange} 
                                type="checkbox" />
                              <span className="form-check-sign" />
                              Segments
                            </Label>
                          </FormGroup>


                          <FormGroup check>
                          <Label check>
                            <Input 
                              name="roadclosures"
                              value={roadclosures}
                              checked = {roadclosures}
                              onChange={this.handleOptionsChange} 
                              type="checkbox" />
                            <span className="form-check-sign" />
                            Road Closures and Major Traffic Events
                          </Label>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="exampleFormControlSelect1"
                            >
                              Select Zoom
                            </label>
                            <Input name="zoom" id="exampleFormControlSelect1" value={zoom} onChange={this.handlePlaceupdatesChange} type="select">
                              <option>1</option>
                              <option>2</option>
                              <option>4</option>
                            </Input>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input 
                                name="mapcomments"
                                value={mapcomments}
                                checked = {mapcomments}
                                onChange={this.handlePlaceupdatesChange} 
                                type="checkbox" />
                              <span className="form-check-sign" />
                              MapComments
                            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input 
                                name="urs"
                                value={urs}
                                checked = {urs}
                                onChange={this.handlePlaceupdatesChange} 
                                type="checkbox" />
                              <span className="form-check-sign" />
                              (URs) User Requests & (MPs) Map Problems
                            </Label>
                          </FormGroup>
                        
                          <FormGroup check>
                            <Label check>
                              <Input 
                                name="placeupdates"
                                value={placeupdates}
                                checked = {placeupdates}
                                onChange={this.handlePlaceupdatesChange} 
                                type="checkbox" />
                              <span className="form-check-sign" />
                              Place updates
                            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input 
                                name="managedareas"
                                value={managedareas}
                                checked = {managedareas}
                                onChange={this.handlePlaceupdatesChange } 
                                type="checkbox" />
                              <span className="form-check-sign" />
                              Managed Areas
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="4"><h5 style={{color: '#145583 !important', textAlign:'center'}}>Country</h5></Col>
                  <Col md="4"><h5 style={{color: '#145583 !important', textAlign:'center'}}>State</h5></Col>
                  <Col md="4"><h5 style={{color: '#145583 !important', textAlign:'center'}}>Sub State</h5></Col>
                  </Row>
                  <Row>
                    <Col md="4" style={{height:'300px', overflow:'scroll'}}>
                      <Table responsive>
                        <tbody>
                          {countries.map((country, k) => (
                            <tr key={k} className={country.Country===countrySelect?'table-info':''}
                              onClick={() => this.selectedCountry(country)}
                            >
                              <td>{country.Country}</td>
                              
                              <td className="text-right">
                                {(statesCached[country.Country])?(
                                  <>
                                    <Button
                                      className="btn-icon btn-neutral"
                                      color="info"
                                      size="sm"
                                      type="button"
                                      onClick={() => this.addCountryTags(country)}
                                    >
                                      <i className="fa fa-plus" />
                                    </Button>
                                    <Button
                                      className="btn-icon btn-neutral"
                                      color="error"
                                      size="sm"
                                      type="button"
                                      onClick={() => this.removeCountryTags(country)}
                                    >
                                      <i className="fa fa-minus" />
                                    </Button>
                                  </>
                                ):null}
                              </td>
                            </tr>
                          ))}
                        
                        </tbody>
                      </Table>
                    </Col>
                    <Col md="4" style={{height:'300px', overflow:'scroll'}}>
                      <Table>
                        <tbody>
                          {states.map((state, k) => (
                            <tr key={k} className={state.State===stateSelect?'table-info':''}
                              onClick={() => this.selectedStates(state)}
                            >
                              <td>{state.State}</td>
                              <td className="text-right">
                                {(substatesCached[state.State])?(
                                  <>
                                    <Button
                                      className="btn-icon btn-neutral"
                                      color="info"
                                      size="sm"
                                      type="button"
                                      onClick={() => this.addStateTags(state)}
                                    >
                                      <i className="fa fa-plus" />
                                    </Button>
                                    <Button
                                      className="btn-icon btn-neutral"
                                      color="error"
                                      size="sm"
                                      type="button"
                                      onClick={() => this.removeStateTags(state)}
                                    >
                                      <i className="fa fa-minus" />
                                    </Button>
                                  </>
                                ):null}
                              </td>
                            </tr>
                          ))}
                        
                        </tbody>
                      </Table>
                    </Col>
                    <Col md="4" style={{height:'300px', overflow:'scroll'}}>
                      <Table responsive>
                        <tbody>
                          {substates.map((substate, k) => (
                            <tr key={k} className={substatesTags[`${substate.Country}-${substate.State}-${substate.SubState}`]?'table-info':''}
                            onClick={() => this.toggleTag(substate)}>
                              <td>{substate.SubState}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup className={`has-label has-danger`}>
                        <CardTitle tag="h6">Sub States</CardTitle>
                        <TagsInput
                          value={Object.keys(this.state.substatesTags)}
                          onChange={this.handleTagsinput}
                          tagProps={{ className: "react-tagsinput-tag success" }}
                          renderInput={()=>null}
                        />
                        {Object.keys(this.state.substatesTags).length <= 0 ? (
                          <label className="error">
                            Please enter sub states.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CrawlerForm;
