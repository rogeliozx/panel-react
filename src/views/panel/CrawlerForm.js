import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin that creates an input with badges
import TagsInput from "react-tagsinput";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";
// plugin that creates slider
import Slider from "nouislider";

import openSocket from 'socket.io-client'
import NotificationAlert from "react-notification-alert"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  FormGroup,
  Progress,
  Row,
  Col, 
  Button,
  ButtonGroup,
  Label,
  Input,
  Table,
  FormText,
  UncontrolledTooltip
} from "reactstrap";

// core components
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

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
    };
    const socket = openSocket('http://localhost:3000');
		
		socket.on('connect', () => {
			this.getCountries()
		});

		this.socket = socket
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
  
	selectedStates = (state) => {
    const { substatesCached } = this.state
    if (substatesCached[state.State]) {
      const substates = substatesCached[state.State]
      this.setState({substates, stateSelect:state.State, substateSelect:null})
    }else{
      this.socket.emit('getsubstates', state.Country, state.State, (substates) => {
        const newSubstatesCached = {...substatesCached,[state.State]:substates}
        this.setState({substatesCached:newSubstatesCached, substates, stateSelect: state.State, substateSelect:null })
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

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  resetForm = ()  => {
    this.setState({
      substatesTags:{},
      crawlerName:"",
      crawlerHours:0,
    })
  }
  saveForm = ()  => {
    const { crawlerName, crawlerHours, substatesTags } = this.state
    if (crawlerName !== "" && Object.keys(substatesTags).length > 0) {
      this.socket.emit('savecrawler', crawlerName, crawlerHours, substatesTags, (crawl) => {
        console.log(crawl)
        this.notify("msj")
      });
    }else{
      this.notify("The form is incomplete", "danger")
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
    const {
			countries=[],
			states=[],
      substates=[],
      countrySelect=null,
			stateSelect=null,
      substateSelect=null,
      statesCached,
      substatesCached,
      substatesTags,
      crawlerName,
      crawlerHours,
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
                        <Input type="number" 
                          name="crawlerHours"
                          value={crawlerHours}
                          onChange={this.handleInputChange}  />
                        <FormText color="default" tag="span">
                          the crawler will restart after the selected frencuency, * 0 for run just one time
                        </FormText>
                      </FormGroup>
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
                  <Row>
                    <Col md="4">
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Country</th>
                          </tr>
                        </thead>
                        <tbody>
                          {countries.map((country, k) => (
                            <tr key={k} className={country.Country===countrySelect?'table-info':''}
                              onClick={() => this.selectedCountry(country)}
                            >
                              <td>{country.Country}</td>
                            </tr>
                          ))}
                        
                        </tbody>
                      </Table>
                    </Col>
                    <Col md="4">
                      <Table >
                        <thead className="text-primary">
                          <tr>
                            <th>State</th>
                          </tr>
                        </thead>
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
                    <Col md="4">
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Sub State</th>
                          </tr>
                        </thead>
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
