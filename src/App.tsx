// @ts-nocheck
import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase/compat'
import { Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import Login from './componants/Login'
import SignUp from './componants/SingUp';
import Home from './componants/Home';
import Admin from './componants/Admin';
// import About from './componants/About';
import route from './config/route'
import axios from 'axios'
import Filter, { FilterWarper } from './componants/Filter';
import Item from './componants/Item';
import ShopingCart from './componants/ShopingCart';
import Test from './componants/Test';
import whatsApp from './photos/whatsapp.png'
// import facebook from "./photos/facebook-logo.png";
import email from "./photos/close-envelope.png";
import cellphone from "./photos/telephone-symbol-button.png";
// import instagram from "./photos/instagram.png";
import { observer } from 'mobx-react';
// import { Switch } from 'react-router-dom';
@observer
class App extends Component {
  state: any
  constructor() {
    super()
    this.state = {
      // AdminIn: true,
      // openMenu: true
    }
  }

  componentDidMount = async () => {
    // let isMobile = false; //initiate as false
    // device detection
    if (this.state.isMobile === undefined) {
      if (/(cd|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(navigator.userAgent.substr(0, 4))) {
        this.setState({ isMobile: true })
      } else { this.setState({ isMobile: false }) }
    }
    this.authListener()
    // this.ShoppingCard()
  }

  // ShoppingCard = async () => {
  //   if (this.state.ShoppingCard === undefined) {
  //     console.log("hffjhfjhf")
  //     console.log(this.state.user)
  //     if (!this.state.user) { return this.ShoppingCard() }
  //     const res = await axios.get(`${route()}ShoppingCard/${this.state.user.uid}`)
  //     console.log(res)

  //   }
  //   // if(res )
  // }



  logout = () => {
    firebase.auth().signOut()
  }

  authListener() {
    let me = this
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, userEmail: user.email }, function () {
          console.log(me.state.user)
        })
      } else {
        this.setState({ user: null }, function () {
          console.log(me.state.user)
        })
      }
    })
  }



  saveNewUserToDb = async () => {
    // await this.handleUpload()
    console.log(this.state.user.uid)
    console.log(this.state.img)
    let saveStatus = await axios.post(`${route()}addnewuser`, {
      _id: this.state.user.uid,
      name: this.state.name,
      password: this.state.password,
      phone: this.state.phone,
      email: this.state.email,
      gender: this.state.gender,
      city: this.state.city,
      img: this.state.img
    })
    if (saveStatus.data === 'succes!') {
      alert('signed up successfully')
      this.setState({ ifBuisnuess: true })
    } else {
      alert('there was a problem with the sign up, please try again')
    }
  }

  handleImage = (e: any) => {
    // console.log("jhgchjhkjkljkhg")
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState({
        uploadedImage: image
      })
    }
  }

  handleUpload = () => {
    console.log("kjgjyfjukguyv")
    const { uploadedImage } = this.state
    if (this.state.uploadedImage === null) {
      alert('Please pick a valid image!')
    }
    else {
      const uploadTask = firebase.storage().ref(`/BargigShopUsers/${uploadedImage.name}`).put(uploadedImage)
      uploadTask.on('state_changed',
        (snapshot) => {
          // progress function
        },
        (error) => {
          console.log(error)
        },
        () => {
          firebase.storage().ref('BargigShopUsers').child(uploadedImage.name).getDownloadURL().then(url => {
            this.setState({
              img: url
            })
            console.log(this.state.img)

          })
        }
      )
    }
    console.log(this.state)
  }

  Admin = (x?: any) => {
    if (this.state.user) {
      if (this.state.isAdmin === undefined) {
        this.state.user.email.includes('issacbar') ? this.setState({ isAdmin: true }) : this.setState({ isAdmin: false })
      }
      if (x === 2) {
        return this.state.user.email.includes('issacbar') ? <a href="!#" ><Link to="/Test" >Test</Link></a> : null
      }
      if (x === 1) { return this.state.user.email.includes('issacbar') ? <Admin state={this.state} /> : null } else {
        return this.state.user.email.includes('issacbar') ? <a href="!#"><Link to="/Admin" >Admin</Link></a> : null
      }
    } else return null
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })

  }
  openMenu = () => {
    let x = this.state.openMenu
    this.setState({ openMenu: !x })
  }

  asyncShopingCart = async () => {
    console.log(this.state.ItemShopingCard)
    if (this.state.ItemShopingCard === undefined) {

      if (this.state.user) {
        let value = this.state.user.uid
        let filed = "_id"
        let Collection = 'User'
        const res = await axios.get(`${route()}getSomethinPopulateBySomeFiedAndValue/${Collection}/${filed}/${value}`)
        if (res.data.ShopingCard) {
          if (res.data.ShopingCard.length > 0) {
            this.state.shopingCard = true
            this.setState({ ItemShopingCard: res.data.ShopingCard })
            console.log(res.data.ShopingCard)
          }
        }
      }
    }
  }

  shopingCart = () => {
    this.asyncShopingCart()
  }
  // About = () => {
  //   if (this.state.user) {
  //     if (this.state.user.email.includes('issacbar92@gmail.com')) {
  //       return <About state={this.state} />
  //     }
  //   }
  // }


  render() {
    return (<BrowserRouter> <div className="topnav">
      <a href="!#" onClick={this.openMenu} className="active"><Link to="!#" >Menu</Link></a>

      {this.state.openMenu ?
        <div id="myLinks">
          {/* <ul id="nav-mobile" className="left hide-on-med-and-down"> */}

          <a href="!#"><Link to="/" >Home</Link></a>
          {/* {this.state.isAdmin ? <a href="!#"><Link to="/About">About </Link></a> : null} */}
          {this.Admin()}
          {this.Admin(2)}
          {/* {this.state.user ? */}
          {this.shopingCart()}
          {this.state.shopingCard ? <a href="!#"><Link to="/ShopingCart">Shopping Cart </Link></a> : null}
          {/* <a ><Link to="/shoppingCart">Shopping Cart </Link></a> */}
          {/* : null} */}
          {console.log(this.state.user)}
          {this.state.user === null ? <a href="!#"><Link to="/SingUp">Sing Up  </Link></a> : <a href="!#" onClick={this.logout} > <Link to='/'> Logout</Link> </a>}


        </div>
        : <a href="!#" className="right" ><Link to="/" >Bargig Shop</Link> </a>}
    </div>

      <Routes>
        <Route path="/" exact element={this.state.user ? <Home state={this.state} /> : <Login handle={this.handleChange} email={this.state.email} password={this.state.password} />} />
        {/* <Route path="/Home" render={() => <Home returnCatgories={this.returnCatgories} reaseCatgories={this.reaseCatgories} state={this.state} Catgories={this.state.Catgories} userEmail={this.state.userEmail} />} /> */}
        {/* <Route path="/About" render={() => <About state={this.state} />} /> */}
        <Route path="/Test" element={<Test state={this.state} />} />
        <Route path="/Admin" element={this.Admin(1)} />
        {/* <Route path="/About" element={this.About()} /> */}
        <Route path="/ShopingCart" element={<ShopingCart state={this.state} />} />
        <Route path="/Filter/:CatgoryName" exact element={<FilterWarper state={this.state} />
        } />
        <Route path="/Item/:ItemName" exact element={<Item state={this.state} />} />
        <Route path="/Singup" exact element={this.state.user ? <Home state={this.state} /> : <SignUp handle={this.handleChange} state={this.state} saveUser={this.saveNewUserToDb} handleImg={this.handleImage} upload={this.handleUpload} />} />
        {/* <Route path="/OpenBisnnes" render={() => this.state.user ? <Home returnCatgories={this.returnCatgories} reaseCatgories={this.reaseCatgories} state={this.state} Catgories={this.state.Catgories} userEmail={this.state.userEmail} /> : <OpenBisnnes Catgories={this.state.Catgories} saveNew={this.saveNewBiz} state={this.state} handleImg={this.handleImage} upload={this.handleUpload} />} /> */}
        {/* <Route path="/Test" render={() => <Tset />} /> */}

      </Routes>

      {/* <Routes>

    </Routes> */}

      <div className="contectIconsDiv">

        <ul >



          <li className="is-cellphone">
            <a href="tel:+972 52-888-9657" target="_blank" rel="noopener noreferrer">
              <img className='contectIcons' src={cellphone} alt="Cell Phone"></img>
            </a>
          </li>
          <li className="is-whatsapp">
            <a href="https://api.whatsapp.com/send?text=https://bargigshop.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <img className='contectIcons' src={whatsApp} alt="whatsapp"></img>

            </a>
          </li>

          <li className="is-mailto">
            <a href="mailto:issacbar92@gmail.com" target="_blank" rel="noopener noreferrer">
              <img className='contectIcons' src={email} alt="email"></img>
            </a>
          </li>
        </ul>


      </div></BrowserRouter>);
  }
}
export default App;
