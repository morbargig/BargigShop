import React, { Component } from 'react';

class Data extends Component {
    constructor() {
        super()
        this.state = {
            inputs: ['catgory']
        }

    }

    render() {
        return <div>
            {this.state.inputs.map(i =>  <input type='text' name={i}  > </input>)}
        </div>
    }

}

export default Data;
