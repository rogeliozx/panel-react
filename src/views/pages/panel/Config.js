import React from "react"
import openSocket from 'socket.io-client';
import ss from 'socket.io-stream'

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col,
	Form,
	Progress,

	Button,
	
	Badge,
	ListGroupItem,
	ListGroup
} from "reactstrap"

import { Link } from "react-router-dom";
class Config extends React.Component {
	
	render() {
		return (
      <>
        <div className="content">
			<Card>
        		<CardHeader >
        			<CardTitle tag="h2">
                    Config <small></small>
        			</CardTitle>
        		</CardHeader>
				<CardBody>
					<ListGroup flush>
						<Link to='/admin/home'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="far fa-comment-dots text-primary" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Home</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
						<Link to='/admin/importer'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="far fa-upload" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Importer</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
						<Link to='/admin/Mapcities'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="far fa-draw-polygon" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Geom Maps</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
						<Link to='/admin/Pvrcrwl'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="far fa-draw-polygon" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Pvrcrwl</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
						<Link to='/admin/CrawlerForm'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="far fa-file-plus" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Add Crawler</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
						<Link to='/admin/Crawls'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="far fa-spider" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Crawls</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
						<Link to='/admin/Intersects'>
							<ListGroupItem
								className="list-group-item-action"
								tag="a"
							>
								<Row className="align-items-center">
								<Col className="col-auto">
									<span className="btn-inner--icon">
										<i className="fab fa-facebook" />
									</span>
								</Col>
								<div className="col ml--2">
									<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="mb-0 text-sm">Intersects</h4>
									</div>
									</div>
								</div>
								</Row>
							</ListGroupItem>
						</Link>
					</ListGroup>
                </CardBody>
              </Card>
        </div>
      </>
		)
	}
}

export default Config

