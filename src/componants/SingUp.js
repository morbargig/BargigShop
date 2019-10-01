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
    return <div className='col-md-6 right'>
      <div>
        <div>
          <label>שם מלא</label>
          <input placeholder='שם מלא' value={this.props.state.name} onChange={this.props.handle} type='text' name='name' />
          <label>טלפון</label>
          <div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c">
            {this.props.state.isMobile ? <input type="tel" pattern="\d*" className="numbers-only" maxlength="10" name="phone" autocomplete="off" value={this.props.state.phone} onChange={this.props.handle}></input> : <input type="number"  min="0520000000" max="0549999999" name="phone" autocomplete="off" value={this.props.state.phone} onChange={this.props.handle}></input>}

          </div>
          {/* <input placeholder='Phone' value={this.props.state.phone} onChange={this.props.handle} type='text' name='phone' /> */}

          <div>
            <label>מין</label>
            <select className="browser-default col s2" onChange={this.props.handle} name='gender'>
              <option value='male'>זכר</option>
              <option value='female'>נקבה</option>
              <option value='other'>אחר</option>
            </select>
          </div>
          <label>עיר</label>
          <input placeholder='עיר' value={this.props.state.city} onChange={this.props.handle} type='text' name='city' />
          <label>תמונת פרופיל</label>
          <br></br>
          <input type="file" onChange={this.props.handleImg} />
          <button onClick={this.props.upload}>העלה תמונה</button>
          <br></br><br></br>
          <label>דואר אלקטרוני</label>
          <input placeholder='דואר אלקטרוני' value={this.props.state.email} onChange={this.props.handle} type='email' name='email' />
          <small className='form-text text-muted'>אנחנו לעולם לא נשתף או נעשה כל שימוש בפרטים שלך</small>
        </div>
        <div>
          <label>סיסמה</label>
          <input placeholder='סיסמה' value={this.props.state.password} onChange={this.props.handle} type='password' name='password' />

          <button href="/" onClick={this.signup}  >הירשם</button>
        </div>
      </div>
    </div>
  }

}

export default SignUp;
