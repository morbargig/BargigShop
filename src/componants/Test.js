import React, { Component } from 'react';
import route from '../config/route';
import axios from 'axios';


class Test extends Component {
    constructor() {
        super()

    }

    fn = async () => {
        let name = 'Itzik'
        let email = 'issacbar92@gmail.com'
        let password = 'bargig123456'
        let from = "Bargig Shop"
        let to = `972528612379`
        let text = `Hi ${name} Welcome to our store, your email is : ${email}, and your password end with ${password.slice(password.length - 4, password.length - 1)}, we are Recommend to write it somewhere :)
        
        
        
        
        
        
        

        .`
        console.log(from,to,text)
        await axios.get(`${route}sendSms/${from}/${to}/${text}`)
    }
    render() {
        return <div>

            <button onClick={this.fn}>gsdgsfdgsdfg </button>
        </div>
    }

}

export default Test;
