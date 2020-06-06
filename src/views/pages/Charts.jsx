import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
// core components
import CardsHeader from "components/Headers/CardsHeader.jsx";

import {
  chartOptions,
  parseOptions,
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5,
  chartExample6,
  chartExample7
} from "variables/charts.jsx";

class Charts extends React.Component {
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <CardsHeader name="Charts" parentName="Charts" />
        <Container className="mt--6" fluid>
          <Row>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Overview</h6>
                  <h5 className="h3 mb-0">Total sales</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample3.data}
                      options={chartExample3.options}
                      id="chart-sales"
                      className="chart-canvas"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Performance</h6>
                  <h5 className="h3 mb-0">Total orders</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Growth</h6>
                  <h5 className="h3 mb-0">Sales value</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                      id="chart-points"
                      className="chart-canvas"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Users</h6>
                  <h5 className="h3 mb-0">Audience overview</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Doughnut
                      data={chartExample5.data}
                      options={chartExample5.options}
                      className="chart-canvas"
                      id="chart-doughnut"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Partners</h6>
                  <h5 className="h3 mb-0">Affiliate traffic</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Pie
                      data={chartExample6.data}
                      options={chartExample6.options}
                      className="chart-canvas"
                      id="chart-pie"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Overview</h6>
                  <h5 className="h3 mb-0">Product comparison</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample7.data}
                      options={chartExample7.options}
                      className="chart-canvas"
                      id="chart-bar-stacked"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Charts;