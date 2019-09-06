import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
// import '../CSS/Filter.css'
import route from '../config/route';


class Filter extends Component {
    constructor() {
        super()
        this.state = {
            items: []
        }
    }

    componentDidMount = async () => {
        this.getBusinesses()
    }

    getBusinesses = async () => {
        console.log(this.props.name)
        let items = await axios.get(`${route}getbyfield/${this.props.name}`)
        console.log(items.data)
        this.setState({ items: items.data }, function () {
            console.log(this.state)
        })
    }

    render() {
        const itemCatgory = this.props.name
        console.log(this.state)

        return <div>
            <h2 id="catHead" className="center-align">{itemCatgory}</h2>
            <div>
                <div className="row">
                    {this.state.items.map(i => {
                        return <div>
                            <div id="filterGrid" className="col s3">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <img id="catImg" src={i.image}></img>
                                            <p> <a> Name :  </a> {i.name} ₪ </p>
                                            <p> <a> Price :  </a> {i.price} ₪ </p>
                                            <p> <a> Categories : </a> {i.Category.map(c => <span> {" "} {c},</span>)} </p>
                                            <p> <a> Sizes : </a> {i.sizes.map(c => <span> {" "} {c},</span>)} </p>
                                            <p> <a> Collection :  </a> {i.Collection} ₪ </p>
                                            <p> <a> Discraption :  </a> {i.Discraption} ₪ </p>
                                            <Link to={`/Item/${i.name}`}> <button className="waves-effect waves-dark btn" > See Item</button> </Link>
                                            {/* <p id="catDescription"> {i.Discraption}</p> */}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    })}
                </div>
            </div>
        </div>
    }

}

export default Filter;
