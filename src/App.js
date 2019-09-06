import React, { Component } from 'react';
import './App.css';
import firebase from './config/firebase'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './componants/Login'
import SignUp from './componants/SingUp';
import Home from './componants/Home';
import Admin from './componants/Admin';
import About from './componants/About';
import route from './config/route'
import axios from 'axios'
import Filter from './componants/Filter';
import Item from './componants/Item';




@observer
class App extends Component {
  constructor() {
    super()
    this.state = {
      AdminIn: true
    }
  }

  componentDidMount = () => {
    this.authListener()
  }


  logout = () => {
    firebase.auth().signOut()
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, userEmail: user.email }, function () {
          console.log(this.state.user)
        })
      } else {
        this.setState({ user: null }, function () {
          console.log(this.state.user)
        })
      }
    })
  }

 

  saveNewUserToDb = async () => {
    // await this.handleUpload()
    console.log(this.state.user.uid)
    console.log(this.state.img)
    let saveStatus = await axios.post(`${route}addnewuser`, {
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

  handleImage = (e) => {
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

  Admin = (x) => {
    if (this.state.user) {
      if (x === 1) { return this.state.user.email.includes('issacbar') ? <Admin state={this.state} /> : null } else {
        return this.state.user.email.includes('issacbar') ? <li ><Link to="/Admin" >Admin</Link></li> : null
      }
    } else return null
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })

}

  render() {

    return (
      <Router>
        <nav>
          <div class="nav-wrapper navBar #e53935 black darken-1">
            <a href="/About" class="brand-logo right"> Bargig Shop</a> {/* also a link but in html syntax */}
            <ul id="nav-mobile" class="left hide-on-med-and-down">

              {/* <li ><Link to="/SingUp">singup  </Link></li> */}
              <li ><Link to="/" >Home</Link></li>
              <li ><Link to="/About">About </Link></li>
              {/* {this.state.AdminIn ? <li ><Link to="/Admin" >Admin</Link></li> : null} */}
              {this.Admin()}
              <li onClick={this.logout} > <Link to='/'> Logout</Link> </li>
            </ul>
          </div>
        </nav>
        {console.log(this.state.user)}
        <Route path="/" exact render={() => this.state.user ? <Home  state={this.state}   /> : <Login handle={this.handleChange} email={this.state.email} password={this.state.password} />} />
        {/* <Route path="/Home" render={() => <Home returnCatgories={this.returnCatgories} reaseCatgories={this.reaseCatgories} state={this.state} Catgories={this.state.Catgories} userEmail={this.state.userEmail} />} /> */}
        {/* <Route path="/About" render={() => <About state={this.state} />} /> */}
        <Route path="/Admin" render={() => this.Admin(1)} />
        <Route path="/About" render={() => <About />} />

        <Route path="/Filter/:CatgoryName" exact render={({ match }) => <Filter name={match.params.CatgoryName} />} />
        <Route path="/Item/:ItemName" exact render={({ match }) => <Item state={this.state} name={match.params.ItemName} />} />
        <Route path="/Signup" exact render={() => this.state.user ? <Home  state={this.state}   /> : <SignUp handle={this.handleChange} state={this.state} saveUser={this.saveNewUserToDb} handleImg={this.handleImage} upload={this.handleUpload} />} />
        {/* <Route path="/OpenBisnnes" render={() => this.state.user ? <Home returnCatgories={this.returnCatgories} reaseCatgories={this.reaseCatgories} state={this.state} Catgories={this.state.Catgories} userEmail={this.state.userEmail} /> : <OpenBisnnes Catgories={this.state.Catgories} saveNew={this.saveNewBiz} state={this.state} handleImg={this.handleImage} upload={this.handleUpload} />} /> */}
        {/* <Route path="/Test" render={() => <Tset />} /> */}

      </Router >
    );
  }
}
export default App;
