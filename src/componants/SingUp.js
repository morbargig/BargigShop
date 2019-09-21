import React, { Component } from 'react';
import firebase from '../config/firebase'
import route from '../config/route';
import axios from 'axios';
// import Button from '@material-ui/core/Button'
// import indigo from '@material-ui/core/colors/indigo'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'



// const primary = indigo[500]
// const secondary = indigo[50]
class SignUp extends Component {
  constructor() {
    super()
    this.state = {

    }

  }



  signup = async (e) => {
    e.preventDefault()
    await firebase.auth().createUserWithEmailAndPassword(this.props.state.email, this.props.state.password).catch((error) => {
      console.log(error)
    })
    this.props.saveUser()
    // sendSms/:from/:to/:text
    // this.props.getName()
    let from = "Bargig Shop"
    let to = `972${this.props.state.phone.slice(1, 10)}`
    console.log(to)
    // 972528612379
    let text = `Hi ${this.props.state.name} Welcome to our store, your email is : ${this.props.state.email}, and your password end with ${this.props.state.password.slice(this.props.state.password.length - 4, this.props.state.password.length - 1)}, we are Recommend to write it somewhere :)
     
    
    
    
    
    
    
    .`
    await axios.get(`${route}sendSms/${from}/${to}/${text}`)
  }



  render() {
    return <div className='col-md-6'>
      <div>
        <div>
          <label>Full Name</label>
          <input placeholder='Full Name' value={this.props.state.name} onChange={this.props.handle} type='text' name='name' />
          <label>Phone</label>
          <div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c">
            {this.props.state.isMobile ? <input type="tel" pattern="\d*" className="numbers-only" maxlength="10" name="phone" autocomplete="off" value={this.props.state.phone} onChange={this.props.handle}></input> : <input type="number"  maxlength="10" name="phone" autocomplete="off" value={this.props.state.phone} onChange={this.props.handle}></input>}

          </div>
          {/* <input placeholder='Phone' value={this.props.state.phone} onChange={this.props.handle} type='text' name='phone' /> */}

          <div>
            <label>Gender</label>
            <select className="browser-default col s2" onChange={this.props.handle} name='gender'>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <label>City</label>
          <input placeholder='City' value={this.props.state.city} onChange={this.props.handle} type='text' name='city' />
          <label>Photo</label>
          <br></br>
          <input type="file" onChange={this.props.handleImg} />
          <button onClick={this.props.upload}>Upload Image</button>
          <br></br><br></br>
          <label>Email Address</label>
          <input placeholder='Enter email' value={this.props.state.email} onChange={this.props.handle} type='email' name='email' />
          <small className='form-text text-muted'>We`ll Never Share Your Email With Anyone Else</small>
        </div>
        <div>
          <label>Password</label>
          <input placeholder='Password' value={this.props.state.password} onChange={this.props.handle} type='password' name='password' />

          <button href="/" onClick={this.signup}  >Signup</button>
        </div>
      </div>
    </div>
  }

}

export default SignUp;
