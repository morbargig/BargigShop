import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount = () => {
        console.log(this.props.state.ItemShoppingCart)
        this.setState({ ItemShoppingCart: this.props.state.ItemShoppingCart })
    }
    render() {
        return <div>
            <h3>Shopping Cart</h3>
            {this.state.ItemShoppingCart ?
                <div className="categories">
                    {/* // <div> {i.name}  <img src={i.image} alt={i.name}  ></img> </div>)} </div>  */}
                    {this.state.ItemShoppingCart.map(c =>
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

export default ShoppingCart;
