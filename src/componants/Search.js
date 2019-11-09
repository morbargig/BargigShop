import React, { Component } from 'react';
import axios from 'axios'
import route from '../config/route';
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'


@inject("UsersStore", "ItemsStore")

@observer
class Search extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  serachForItem = async (e) => {
    let value = e.target.value
    if (value === '') {
      this.setState({ Items: undefined })
    } else {
      let filed = "id"
      const res = await axios.get(`${route}getItem/${filed}/${value}`)

      console.log(res.data)

      this.setState({
        Items: res.data
      })

    }
  }

  render() {
    return <div>
      <h5> ID חפש מוצר לפי  </h5>
      <input type='text' name='searchItem' placeholder='אפשר לראות תעודת זהות בבקשה' value={this.state.search} onChange={this.serachForItem} />
      {this.state.Items !== undefined ? this.state.Items.map(c =>
        <div className="category">
          <div class="card">
            <div class="card-image">
              <img alt="" className='searchImg' src={c.image}></img>
              <span class="card-title">{c.name}</span>
            </div>
            <div class="card-content">
              <p> <a> Price :  </a> {c.price} ₪ </p>
              <p>{c.description}</p>
            </div>
            <div class="card-action">
              <Link to={`/Item/${c.name}`}> {c.name} </Link>
            </div>
          </div>
        </div>) : null}
    </div>
  }
}
export default Search;
