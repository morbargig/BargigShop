import React, { Component } from 'react';
import firebase from 'firebase'
// import axios from 'axios'
// import route from '../config/route';
// import { Link } from 'react-router-dom'
import Search from './Search';
import { observer, inject } from 'mobx-react'


@inject("UsersStore", "ItemsStore")

@observer
class Admin extends Component {
    constructor() {
        super()
        this.state = {
            stringInputs: ['name', 'id', 'Discraption', 'Collection'],
            numberInputs: ['price'],
            inputsWithFewInputs: ['sizes', 'Category'],
            newItem: { sizes: [], Category: [] },
            itemArry: {}
        }

    }

    addNewitem = async () => {
        let newItem = { ...this.state.newItem }
        newItem['image'] = this.state.img
        console.log(this.state)
        let inputsLength = this.state.stringInputs.length + this.state.numberInputs.length + this.state.inputsWithFewInputs.length
        let objLength = Object.keys(this.state.newItem).length
        console.log(inputsLength)
        console.log(newItem, objLength)
        if (inputsLength === objLength) {
            this.props.ItemsStore.addItem(newItem)
        } else { alert("not all field are valid") }
    }

    handleUpload = () => {
        console.log("kjgjyfjukguyv")
        const { uploadedImage } = this.state
        if (this.state.uploadedImage === null) {
            alert('Please pick a valid image!')
        }
        else {
            const uploadTask = firebase.storage().ref(`/BargigShopItems/${uploadedImage.name}`).put(uploadedImage)
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress function
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    firebase.storage().ref('BargigShopItems').child(uploadedImage.name).getDownloadURL().then(url => {
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

    handleImage = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            this.setState({
                uploadedImage: image
            })
        }
    }

    pushNewValue = (e) => {
        let name = e.target.parentElement.id
        let newItem = { ...this.state.newItem }
        newItem[name].push(this.state[name])
        this.setState({
            newItem: newItem,
            [name]: ''
        })
        console.log(name)
        console.log(this.state)
        alert(name + ' was added secsecfuly')
    }

    updeBesniiesText = (e) => {
        let name = e.target.name
        let id = e.target.id
        let text = e.target.value
        console.log(text, name, id, e.target)
        if (id === 'arry') {
            this.setState({ [name]: text })
        } else {
            let newItem = { ...this.state.newItem }
            newItem[name] = text
            this.setState({
                newItem: newItem
            })
        }
    }






    render() {
        // console.log(this.props.state.user)
        return <div>  <h5>{this.props.state.user ? 'Hello Admin ' + this.props.state.user.email : null} </h5>
            <br></br>
            <h5> הוסף מוצר חדש</h5>
            {this.state.stringInputs.map(i => <label>{i} <input type='text' placeholder={i} name={i} value={this.state.newItem[i]} onChange={this.updeBesniiesText} /> </label>)}
            <br></br>
            {/* <br></br> */}
            <br></br>
            {this.state.numberInputs.map(i => <label>{i} <input type='number' placeholder={i} name={i} value={this.state.newItem[i]} onChange={this.updeBesniiesText} /> </label>)}
            <br></br>
            <br></br>
            {this.state.inputsWithFewInputs.map(i => <label id={i}> you need to add {i} one by one  <input type='text' id='arry' name={i} placeholder={i} value={this.state[i]} onChange={this.updeBesniiesText} />  <button onClick={this.pushNewValue}> add  </button><br></br> </label>)}
            <br></br>
            <br></br>
            <br></br>
            <input type="file" onChange={this.handleImage} />
            <button onClick={this.handleUpload}>Upload Image</button>
            <br></br>

            <br></br>
            <button onClick={this.addNewitem} > Add new Item</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Search />
        </div>
    }

}

export default Admin;
