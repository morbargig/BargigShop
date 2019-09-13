import React, { Component } from 'react';
import axios from 'axios'
// import alertify from 'alertify.js'
import route from '../config/route'

class Item extends Component {
    constructor() {
        super()
        this.state = {
            business: [],
            displayAppo: false,
        }
    }


    componentDidMount = async () => {
        await this.getItem()
    }

    getItem = async () => {
        let item = await axios.get(`${route}getbyname/${this.props.name}`)
        console.log(item, item.data)
        this.setState({ item: item.data }, function () {
        }, function () { console.log(this.state.item) })
    }




    makeRequestToMail = async (email, time, date) => {
        await alert("Congratulations!! the order is send :)")
        window.location.reload()
        let item = this.state.item[0]
        console.log("got To APP.js")
        let mail = {
            from: `Bargig Shop < bargigshop@gmail.com>`,
            to: "morbargig@gmail.com", //email
            subject: `You made it! you have an order`,
            text: `we've created for you an order for ${item.name}`
        }
        await axios.post(`${route}sendEmail`, mail)
    }


    //   googleMapLocation = () => {
    //     let b = this.state.business[0]
    //     window.open(`http://google.com/maps/search/${i.city + " " + i.address}%E2%80%AD/@${i.location.hight},${i.location.wight}`)
    //   }

    //   googleEarthLocation = () => {
    //     let b = this.state.business[0]

    //     window.open(` https://earth.google.com/web/search/${i.address.replace(" ", "%20") + "," + i.city.replace(" ", "%20")}@${i.location.hight},${i.location.wight},34.10008876a,4820.53237024d,35y,0.00000001h,45.00123153t,-0r/data=CigiJgokCYXl_8M40D9AEbv3D5wdxT9AGUKWKNz_WEFAIe-0dx4IUEFA `)
    //   }

    render() {
        // const MapWrapped = withScriptjs(withGoogleMap(Maps))
        console.log(this.state.item)
        return <div className="stores">
            {this.state.item ? this.state.item.map(i => <div className="details">
                <div className="flip-card-back">
                    <h2>{i.name}</h2>
                    <img className="itemImage" src={i.image} class="busImg"></img>
                    {/* <p> <a> Address : </a>  {i.city}, {i.address}</p> */}
                    {/* <span id="cardTitle" className="card-title"> Name : {i.name}</span> */}
                    <br></br>
                    {i.color !== undefined ? <div> <a>Color</a> : {Object.keys(i.color).map(o =>
                        <button id={i.id} name={i.name} value={i.color[o]} onClick={this.colorImage} className="left" style={{
                            backgroundColor: o,
                            width: '15px',
                            height: '15px',
                        }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`choose ${o} color`}> </button>
                    )}</div> : null
                    }
                    <p> <a> Name :  </a> {i.name} </p>
                    <p> <a> Price :  </a> {i.price} ₪ </p>
                    <p> <a> Categories : </a> {i.Category.map(c => <span> {" "} {c},</span>)} </p>
                    <p> <a> Sizes : </a> {i.sizes.map(c => <span> {" "} {c},</span>)} </p>
                    <p> <a> Collection :  </a> {i.Collection}  </p>
                    <p> <a> Discraption :  </a> {i.Discraption}  </p>
                    {this.props.state.isAdmin ? <p> <a> ID :  </a> {i.id}  </p> : null}
                    <a> Cell Me :</a>  <a href="tel:+97252-861-2379"> <i class="fa fa-phone fa-fw"></i><span dir="ltr"> +972 52-861-2379</span> </a>
                    <br></br><br></br>
                    <a>Email Me :</a>  <a href="mailto:morbargig@gmail.com"><i class="fa fa-envelope-o fa-fw"></i> morbargig@gmail.com</a>
                    <br></br><br></br>
                    <a className="waves-effect waves-light btn-small" onClick={this.makeRequestToMail}>Make an oerder</a>
                </div>
            </div>) : null


            }
        </div>
    }
}

export default Item;
