import axios from 'axios';
import { Component } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// import '../CSS/Filter.css'
import route from '../config/route';
import UpDateItem from './UpDateItem';

export function FilterWarper({ state }) {
    const { CategoryName } = useParams()
    return (
        <Filter state={state} name={CategoryName} />
    )
}

class Filter extends Component {
    constructor(state) {
        super(state)
        this.state = {
            ...state,
            items: []
        }
    }

    componentDidMount = async () => {
        this.getItem()
    }

    getItem = async () => {
        console.log(this.props.name)
        let items = await axios.get(`${route()}getbyfield/${this.props.name}`)
        console.log(items.data)
        this.setState({ items: items.data }, function () {
            console.log(this.state)
        })
    }

    Admin = (c) => {
        if (this.props.state.user) {
            return this.props.state.user.email.includes('issacbar') ? <div id={c._id}> <button onClick={this.editItem}> ערוך </button>  <br></br> <button name={c.name} id={c._id} onClick={this.deleteItem}> מחק מוצר </button> </div> : null
        }
    }

    editItem = (e) => {
        let id = e.target.parentElement.id
        console.log(id)
        let x = this.state.editItem
        x = !x
        console.log(x)
        let items = this.state.items
        let itemToUpdate = items.find(u => u._id === id)

        this.setState({
            itemToUpdateId: id,
            itemToUpdate: itemToUpdate,
            editItem: x
        })
        // console.log(this.state, this.state.userToUpdate)
    }

    deleteItem = async (e) => {
        let id = e.target.id
        let name = e.target.name
        console.log(id, name)
        let answer = window.confirm(`are you sure you want to delete ${name}?`)
        if (answer === true) {
            await axios.delete(`${route()}deleteItem/${id}`)
        }
    }

    afterUpdateItem = () => {
        let x = this.state.editItem
        x = !x
        this.setState({
            editItem: x
        })
    }

    colorImage = (e) => {
        let name = e.target.parentElement.name
        // let id = e.target.id
        let value = e.target.parentElement.value
        // if (this.state[id]  ){
        // this.setState({ })
        // }
        console.log(name, value)
        this.setState({ [name]: value }, function () { console.log(this.state[name]) })
    }

    render() {
        const itemCategory = this.props.name
        console.log(this.state)



        return <div>
            {
                this.state.editItem ? <UpDateItem upDateItem={this.upDateItem} item={this.state.itemToUpdate} afterUpdateItem={this.afterUpdateItem} />
                    : null
            }
            <h2 id="catHead" className="center-align">{itemCategory}</h2>
            <div>
                {/* <div className="row"> */}
                {/* <div className="#f1f8e9 light-green lighten-5"> */}
                <div>
                    <div className={!this.props.state.isMobile ? "categories" : "categoriesMobile"}>
                        {/* <div> */}
                        {this.state.items.map(c => {
                            return (
                                <div className="category">
                                    <div class="card">
                                        <Link to={`/Item/${c.name}`}>
                                            <div class="card-image">
                                                <img src={this.state[c.name] !== undefined ? this.state[c.name] : c.image} alt={c.name}  ></img>
                                                {/* <span class="card-title">{c.name}</span> */}
                                            </div>
                                        </Link>
                                        <div class="card-content">

                                            <p>{c.description}</p>
                                        </div>
                                        <div class="card-action">
                                            {/* <button className="waves-effect waves-dark btn" > See Item</button> */}

                                            {c.color !== undefined ?
                                                <div >
                                                    <li id="color-154" class="item-color">

                                                        <button id={c.id} name={c.name} value={c.image} onClick={this.colorImage} type="button" class="choose-color-btn " title="choose color" aria-label={`בחר צבע רגיל`}>
                                                            <span class="color-box"
                                                            ></span>
                                                        </button>

                                                    </li>
                                                    <br></br><br></br>
                                                    <div class="meta-color-list-wrapp">
                                                        <ul class="color-list">
                                                            {Object.keys(c.color).map(o =>
                                                                <li id="color-154" class="item-color">

                                                                    <button name={c.name} value={c.color[o]} onClick={this.colorImage} type="button" class="choose-color-btn " title="choose color" aria-label={`choose ${o} color`}>
                                                                        <span class="color-box"
                                                                            style={{
                                                                                backgroundColor: o,
                                                                            }}
                                                                        // style="background-color: #fa2fa9;"
                                                                        ></span>
                                                                    </button>

                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                                : null
                                            }
                                            <p>₪{c.price}.00  </p>

                                            {/* <p> <a> Categories : </a> {c.Category.map(i => <span> {" "} {i},</span>)} </p>
                                            <p> <a> Sizes : </a> {c.sizes.map(i => <span> {" "} {i},</span>)} </p>
                                            <p> <a> Collection :  </a> {c.Collection}  </p>
                                            <p> <a> Description :  </a> {c.Description}  </p>
                                            <br></br> */}
                                            {this.Admin(c)}

                                        </div>
                                    </div>
                                </div>

                                // <div className="category">

                                //     <div className="card">
                                //         <div className="card-image">
                                //             <img src={this.state[c.name] !== undefined ? this.state[c.name] : c.image} alt={c.name}  ></img>
                                //             <span className="card-title">{c.name}</span>
                                //         </div>
                                //         <div className="card-content">
                                //             {/* <p>{c.description}</p> */}
                                //         </div>
                                //         <div className="card-action">
                                //             <Link to={`/Item/${c.name}`}> <button className="waves-effect waves-dark btn" > See Item</button> </Link>

                                //             {c.color !== undefined ? <div> <a> Regular color</a> :  <button id={c.id} name={c.name} value={c.image} onClick={this.colorImage} className="left" style={{
                                //                 backgroundColor: 'none',
                                //                 width: '15px',
                                //                 height: '15px',
                                //             }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`בחר תמונת רגילה`}> </button> <br></br><br></br><a>Color</a> : {Object.keys(c.color).map(o =>
                                //                 <button id={c.id} name={c.name} value={c.color[o]} onClick={this.colorImage} className="left" style={{
                                //                     backgroundColor: o,
                                //                     width: '15px',
                                //                     height: '15px',
                                //                 }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`choose ${o} color`}> </button>
                                //             )}</div> : null
                                //             }
                                //             <p> <a> Price :  </a> {c.price} ₪ </p>
                                //             <p> <a> Categories : </a> {c.Category.map(i => <span> {" "} {i},</span>)} </p>
                                //             <p> <a> Sizes : </a> {c.sizes.map(i => <span> {" "} {i},</span>)} </p>
                                //             <p> <a> Collection :  </a> {c.Collection}  </p>
                                //             <p> <a> Description :  </a> {c.Description}  </p>
                                //             <br></br>
                                //             {this.Admin(c)}

                                //         </div>
                                //     </div>
                                // </div>

                                // <div>
                                //     <div id="filterGrid" className="col s3">
                                //         <div className="flip-card">
                                //             <div className="flip-card-inner">
                                //                 <div className="flip-card-front">
                                //                     <img id="catImg" src={i.image}></img>
                                //                     <p> <a> Name :  </a> {i.name}  </p>
                                //                     <p> <a> Price :  </a> {i.price} ₪ </p>
                                //                     <p> <a> Categories : </a> {i.Category.map(c => <span> {" "} {c},</span>)} </p>
                                //                     <p> <a> Sizes : </a> {i.sizes.map(c => <span> {" "} {c},</span>)} </p>
                                //                     <p> <a> Collection :  </a> {i.Collection}  </p>
                                //                     <p> <a> Description :  </a> {i.Description}  </p>
                                //                     <Link to={`/Item/${i.name}`}> <button className="waves-effect waves-dark btn" > See Item</button> </Link>
                                //                     {/* <p id="catDescription"> {i.Description}</p> */}

                                //                 </div>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        </div >
    }

}

export default Filter;
