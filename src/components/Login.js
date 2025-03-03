import React, { Component } from 'react';
import firebase from '../config/firebase'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "guest@gmail.com",
            password: "123456"
        }
    }
    login = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            console.error(error)
            // console.log(error)
            alert(error.message)
        })
        // this.props.getName()
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    render() {
        return <div className='col-md-6 right'>
            <div>
                <h3>
                    Bargig Shop - ברוך הבא ל
                </h3>
                <br></br>
                <h1>: היתחבר  </h1>
                <div>
                    {/* <input placeholder='Enter email' value={this.state.email} onChange={this.handleChange} type='email' name='email' /> */}

                </div>
                <form onSubmit={this.login}>
                    <div className="input-group">
                        <input className="form-control" value={this.state.email} onChange={this.handleChange} type='email' name='email' placeholder="אמייל"></input>
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    </div>
                    <div className="input-group">
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange} suggested="current-password" name='password' placeholder="סיסמה"></input>
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    </div>
                    <button  className='btn btn-primary'>התחבר </button>
                </form>
                <div>
                    {/* <input placeholder='Password' value={this.state.password} onChange={this.handleChange} type='password' name='password' /> */}

                </div>
                <h1>  ? אין לך משתמש   </h1>
                <br></br>
                <Link to="/Singup" className='btn btn-success'>הירשם</Link>
            </div>
        </div>
    }
}


export default Login;
