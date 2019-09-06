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
    let text = e.target.value
    let value = "name"
    const res = await axios.get(`${route}getItem/${value}/${text}`)

    console.log(res.data)

    this.setState({
      Items: res.data
    })

  }

  render() {
    return <div>
      <input type='text' name='searchItem' placeholder='search for Item' value={this.state['search']} onChange={this.serachForItem} />
      {this.state.Items !== undefined ? this.state.Items.map(c =>
        <div className="category">
          <div class="card">
            <div class="card-image">
              <img src={c.image}></img>
              <span class="card-title">{c.name}</span>
            </div>
            <div class="card-content">
              <p> <a> Price :  </a> {c.price} ₪ </p>
              <p>{c.description}</p>
            </div>
            <div class="card-action">
              <Link to={`/BargigShop/${c.name}`}> {c.name} </Link>
            </div>
          </div>
        </div>) : null}
    </div>
  }
}
export default Search;
