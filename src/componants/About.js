import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import '../CSS/About.css'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class About extends Component {


  render() {

    return <div>
      <div><a href="tel:+972 52-888-9657"> <i class="fa fa-phone fa-fw"></i><span dir="ltr"> +972 52-888-9657</span></a>
        <br></br>
        <a href="mailto:issacbar92@gmail.com"><i class="fa fa-envelope-o fa-fw"></i> issacbar92@gmail.com</a></div>
      <img className="bg" src="https://www.dentons.com/-/media/images/website/background-images/practices/employment-and-labor/office-work.jpg" />
      <h1 id="About" className="center-align">About Us</h1>
      <div className="row">
        <div id="whoWeR" className="col s3 left">
          <div className="card panel grey">
            <span className="card-title white-text text-darken-4">Who we are</span>
            <blockquote>
              <p>Smallbiz is a platform for connecting small business owners with clients.</p>
              <p>With our platform, you can assign appointments, message business owners and get discounts!</p>
            </blockquote>
          </div>
        </div>
        <div id="firststimg" className="col s3 right">
          <div className="card">
            <div className="card-image">
              <img src="https://www.metasource.co/wp-content/uploads/2017/11/Startup-tech-team2-800x400.jpg"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div id="howDoesItWork" className="col s3 right">
          <div className="card panel grey">
            <span className="card-title white-text text-darken-4">How does it work?</span>
            <blockquote>
              <p >Every client can search for the business of thier choice and immediately assign an apponitment.</p>
              <p >If you came to the apponitment, you will get points which can be trasnformed into discounts!</p>
            </blockquote>
          </div>
        </div>
        <div className="col s3 left">
          <div className="card">
            <div className="card-image">
              <img height="200" width="200" src="https://www.designsmag.com/wp-content/uploads/2014/02/support-small-business.jpg" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div id="Signup" className="col s3 left">
          <div className="card panel grey">
            <span className="card-title white-text text-darken-4">"Wow your website is great! How do I signup?"</span>
            <blockquote>
              <p>Click the "Signup" button below and fill in the form.</p>
              <p id="arrow1" className="btn pulse">↓</p>
              <p>{this.props.state.user ? <Button className="black-text text-darken-1" href='/' >Sign-Up</Button> : <Button className="black-text text-darken-1" href='/Signup'>Sign-Up</Button>}</p>
            </blockquote>
          </div>
        </div>
        <div className="col s3 right">
          <div className="card">
            <div className="card-image">
              <img src="https://spondyinfo.com/wp-content/uploads/2013/11/Kozzi-Two_hands_working_on_the_silver_keyboard-442x293.jpg" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div id="OpenBusiness" className="col s3 right">
          <div className="card panel grey">
            <span className="card-title white-text text-darken-4">"But wait! I don't want a regular account! How do I sign up as a new business?"</span>
            <blockquote>
              <p>What a great question! Click on the "Open your Business Page" button below and enjoy an endless stream of clients for the rest of your life!</p>
              <p id="arrow2" className="btn pulse">↓</p>
              <p><Button className="black-text text-darken-1" href="/OpenBisnnes">Open your Business Page</Button></p>
            </blockquote>
          </div>
        </div>
        <div className="col s3 left">
          <div className="card">
            <div className="card-image">
              <img height="350" src="https://greggfraley.com/wp-content/uploads/2015/03/Open-for-business.jpg" />
            </div>
          </div>
        </div>
      </div>

    </div>


  }

}

export default About;

