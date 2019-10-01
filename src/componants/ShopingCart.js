import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import route from '../config/route';

class ShopingCart extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount = () => {
        if (this.state.ItemShopingCard === undefined) {

            console.log(this.props.state.ItemShopingCard)
            if (this.props.state.ItemShopingCard !== undefined) {
                this.setState({ ItemShopingCard: this.props.state.ItemShopingCard })
            } if (this.props.state.ItemShopingCard === undefined) {
                this.asyncShopingCart()
            }
        }
    }

    asyncShopingCart = async () => {
        console.log(this.state.ItemShopingCard)
        if (this.state.ItemShopingCard === undefined) {
            console.log(this.props.state.user)
            if (this.props.state.user) {
                let value = this.props.state.user.uid
                let filed = "_id"
                let Collection = 'User'
                const res = await axios.get(`${route}getSomethinPopulateBySomeFiedAndValue/${Collection}/${filed}/${value}`)
                if (res.data.ShopingCard) {
                    if (res.data.ShopingCard.length > 0) {
                        this.setState({ ItemShopingCard: res.data.ShopingCard })
                        console.log(res.data.ShopingCard)
                    }
                }
            }
            // console.log("kjbkjbkjbkjb")

        }
    }
    ShopingCart = () =>{ 
        this.asyncShopingCart()
    }

    render() {
        return <div>
            <h3> סל הקניות שלך</h3>
            {this.ShopingCart()}
            {this.state.ItemShopingCard ?
                <div className="categories">
                    {/* // <div> {i.name}  <img src={i.image} alt={i.name}  ></img> </div>)} </div>  */}
                    {this.state.ItemShopingCard.map(c =>
                        <div className="category">

                            <div class="card">
                                <div class="card-image">
                                    <img src={c.image}></img>
                                    <span class="card-title">{c.name}</span>
                                </div>
                                <div class="card-content">
                                    {/* <p>{c.description}</p> */}
                                </div>
                                <div class="card-action">
                                    <Link to={`/Item/${c.name}`}> {c.name} </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                : null}
        </div>
    }

}

export default ShopingCart;
