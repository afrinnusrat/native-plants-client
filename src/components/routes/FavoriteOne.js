import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OutlineButton from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
// import Typography from '@material-ui/core/Typography';

import messages from '../AutoDismissAlert/messages'

class FavoriteOne extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/favorites/${this.props.match.params.id}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      // .then(res => console.log(this.state.favorite))
      .then(res => this.setState({ favorite: res.data.favorite }))
      .catch(console.error)
  }
  destroyList = () => {
    axios({
      url: `${apiUrl}/favorites/${this.props.match.params.id}/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(res => this.props.msgAlert({
        heading: 'List Deleted Successfully',
        message: messages.ListDeleteSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    if (this.state.deleted) {
      return <Redirect to={ '/favorites'
      } />
    }

    let favorite = ''
    if (this.state.favorite) {
      favorite = (
        <div key={this.state.favorite.id}>
          <div className="row">
            <div className="mx-auto mt-5">
              <Card border="info" style={{ width: '18rem' }}>
                <Card.Header><h4>{this.state.favorite.list_name}</h4></Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    State: {this.state.favorite.state}<br/>
                    Grow Zone: {this.state.favorite.ecoregion}<br/>
                    Species: {this.state.favorite.type}<br/>
                    Common Name: {this.state.favorite.common_name}<br/>
                  </Card.Text>
                  <Link to={`/favorites-edit/${this.props.match.params.id}`}>
                    <OutlineButton variant='outline-info' type="button">Edit List</OutlineButton></Link>
                  <Link to={'/favorites'}>
                    <OutlineButton variant='outline-secondary' type="button">All Lists</OutlineButton></Link>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
                  Delete List
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.destroyList}>🛑  Permanently Delete 🛑</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='Card'>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'className="justify-content-center">{favorite}</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(FavoriteOne)
