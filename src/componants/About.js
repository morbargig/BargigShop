import React, { Component } from 'react';
// import Button from '@material-ui/core/Button'
import '../CSS/About.css'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class About extends Component {


  render() {

    return <div>
      <div><a href="tel:+972 52-888-9657"> <i class="fa fa-phone fa-fw"></i><span dir="ltr"> +972 52-888-9657</span></a>
        <br></br>
        <a href="mailto:issacbar92@gmail.com"><i class="fa fa-envelope-o fa-fw"></i> issacbar92@gmail.com</a></div>
    </div>


  }

}

export default About;

