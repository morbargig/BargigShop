import React, { Component } from 'react';
import firebase from '../config/firebase'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor() {
        super()
        this.state = {

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
        return <div className='col-md-6'>
            <div>
                <h3>
                    Welcome to Bargig Shop
                </h3>
                <br></br>
                <h1>Login: </h1>
                <div>
                    <label>Email Address</label>
                    <input placeholder='Enter email' value={this.state.email} onChange={this.handleChange} type='email' name='email' />

                </div>
                <div>
                    <label>Password</label>
                    <input placeholder='Password' value={this.state.password} onChange={this.handleChange} type='password' name='password' />
                    <button onClick={this.login} className='btn btn-primary'>Login</button>

                </div>
                <h1>Don`t have a user?</h1>
                <br></br>
                <Link to="/Signup" className='btn btn-success'>CLICK HERE</Link>
            </div>
        </div>
    }
}


export default Login;
