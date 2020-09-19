import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import OutlineButton from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'

class Favorite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/favorites/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ favorite: res.data.favorite }))
      .catch(console.error)
  }

  render () {
    const favorite = null
    if (this.state.favorite) {
      const favorite = this.state.favorite.map(favorite => (
        <div key={favorite.id}>
          <h4>{favorite.list_name}:</h4>
          <h5>State: </h5>{favorite.state}<br/>
          <h5>EcoRegion: </h5>{favorite.ecoregion}<br/>
          <h5>Species: </h5>{favorite.type}<br/>
          <h5>Common Name: </h5>{favorite.common_name}<br/>
          <Link to={`/favorites/${favorite.id}`}>
            <OutlineButton variant='outline-primary' type="button">See List</OutlineButton></Link>
        </div>
      ))
      return favorite
    }
    return (
      <div className='long'>
        <h1>Create New List</h1>
        {favorite}
      </div>
    )
  }
}

export default withRouter(Favorite)
