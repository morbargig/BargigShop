import React, { Component } from 'react';
import firebase from 'firebase'
// import axios from 'axios'
// import route from '../config/route';
// import { Link } from 'react-router-dom'
import Search from './Search';
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import route from '../config/route';



@inject("UsersStore", "ItemsStore")

@observer
class Admin extends Component {
    constructor() {
        super()
        this.state = {
            stringInputs: ['name', 'id', 'Discraption', 'Collection'],
            numberInputs: ['price'],
            inputsWithFewInputs: ['sizes', 'Category'],
            newItem: { sizes: [], Category: [], color: {} },
            itemArry: {},
            colorSData: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal', 'white', 'yellow'],
            CategoryList: [],
            sizesList: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"]
        }

    }

    componentDidMount = async () => {
        if (this.state.CategoryList.length === 0) {
            const res = await axios.get(`${route}Catgories/0`)
            res.data[0].Catgories.map(i => i.name)
            if (res.data[0] === undefined) {
               let res2 = await axios.get(`${route}Catgories/1`)
                this.setState({ CategoryList: res2.data[0].Catgories.map(i => i.name) })
            } else {
                this.setState({ CategoryList: res.data[0].Catgories.map(i => i.name) }, function () { console.log(this.state.CategoryList) })
            }
        }
    }

    addNewitem = async () => {
        let newItem = { ...this.state.newItem }
        newItem['image'] = this.state.img
        console.log(this.state)
        let inputsLength = this.state.stringInputs.length + this.state.numberInputs.length + this.state.inputsWithFewInputs.length + 1
        let objLength = Object.keys(this.state.newItem).length
        console.log(inputsLength)
        console.log(newItem, objLength)
        if (inputsLength === objLength) {
            this.props.ItemsStore.addItem(newItem)
        } else { alert("not all field are valid") }
    }

    handleUpload = (e) => {
        let img = "img"
        let name = e.target.name
        if (name === "color") {
            img = "colorImg"
        }
        console.log(img, name)

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
                            [img]: url
                        })
                        console.log(this.state[img])
                        if (img !== 'img') {
                            alert("now you can continue to button 2")
                        }
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

    updateItemdetails = (e) => {
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

    addImageByColor = () => {
        let color = this.state.color
        let imageByColor = this.state.colorImg
        let newItem = { ...this.state.newItem }
        // newItem["color"] = []
        newItem.color[color] = imageByColor
        this.setState({ newItem, color: "" }, function () { console.log(this.state) })
        alert("color for Item Add Successfully")
    }




    render() {
        // console.log(this.props.state.user)
        // let data = ["black", "red", "blue"]
        return <div>  <h5>{this.props.state.user ? 'Hello Admin ' + this.props.state.user.email : null} </h5>
            <br></br>
            <h5> ** הוסף מוצר חדש כל השדות חובה חוץ מתמונה לפי צבע **</h5>
            {this.state.stringInputs.map(i => <label>{i} <input type='text' placeholder={i} name={i} value={this.state.newItem[i]} onChange={this.updateItemdetails} /> </label>)}
            <br></br>
            {/* <br></br> */}
            <br></br>
            {/* {this.props.state.isMobile ? <input type="tel"  name="phone"  value={this.props.state.phone} onChange={this.props.handle}></input> : <input type="number" pattern="\d*" className="numbers-only" maxlength="10" name="phone" autocomplete="off" value={this.props.state.phone} onChange={this.props.handle}></input>} */}
            {this.state.numberInputs.map(i =>  <label>{i} <input type='number' autocomplete="off" placeholder={i} pattern="\d*"  maxlength="4" name={i} value={this.state.newItem[i]} onChange={this.updateItemdetails} /> </label> )}
            {/* {this.state.numberInputs.map(i => <label>{i} <input type='number' placeholder={i} name={i} value={this.state.newItem[i]} onChange={this.updateItemdetails} /> </label>)} */}
            <br></br>
            <h5>קטגוריה ומידות  </h5>
            <br></br>
            {this.state.inputsWithFewInputs.map(i => <label id={i}>** אחד אחרי השני  {i} אתה צריך להוסיף **
            <div>
                    {i} : <datalist id={`search${i}`} className='select-input' onChange={this.updateItemdetails}>
                        {this.state[i + 'List'].map(c => <option className={`options${c}`} value={c}>{c}  </option>)}
                    </datalist>
                    <input id="arry" autoComplete="on" list={`search${i}`} name={i}
                        value={this.state[i]}
                        placeholder={i} onChange={this.updateItemdetails} className='select-input' />
                </div>
                <button onClick={this.pushNewValue}> {i} הוסף </button><br></br> </label>
            )}
            <br></br>
            {/* <label id='Category'>** אחד אחרי השני  Category אתה צריך להוסיף ** */}
            {/* <div>
                    קטגוריות : <datalist id="searchCategory" className='select-input' onChange={this.updateItemdetails}>
                        {this.state.Category.map(c => <option className="optionsColor" value={c}>{c}  </option>)}
                    </datalist>
                    <input id="arry" autoComplete="on" list="searchCategory" name='Category'
                        value={this.state.Category}
                        placeholder='קטגוריה' onChange={this.updateItemdetails} className='select-input' />
                </div>
                <button onClick={this.pushNewValue}> {"Category"} הוסף </button><br></br> </label> */}
            {/* <input type='text' id='arry' name={'Category'} placeholder={'Category'} value={this.state.Category} onChange={this.updateItemdetails} /> */}
            <br></br>
            <h5>הוסף תמונה ראשית</h5>
            <br></br>
            <input type="file" onChange={this.handleImage} />

            <h5>1 הוסף תמונה ראשית שלב</h5>
            <br></br>
            <button onClick={this.handleUpload}>*  לחץ עליי להעלות תמונה ראשית  *</button>
            <br></br>
            <br></br>
            <h5>הוסף תמונה לפי צבע </h5>
            <br></br>

            <label>  ** הוסף תמונה לפי צבע... צבע חייב לרשום באנגלית באותיות קטנות  **
                {/* <input id="arry" type='text' placeholder='color' name='color' value={this.state.color} onChange={this.updateItemdetails} /> */}
            </label>
            <div>
                צבע מוצר : <datalist id="searchColor" className='select-input' onChange={this.updateItemdetails}>
                    {this.state.colorSData.map(c => <option className="optionsColor"  value={c}>{c}  </option>)}
                </datalist>

                <input id="arry" autoComplete="on" list="searchColor" name='color'
                    value={this.state.color}
                    placeholder='צבע' onChange={this.updateItemdetails} className='select-input' />
            </div>
            <input type="file" onChange={this.handleImage} />
            <br></br>
            <h5> 1   הוסף תמונה לפי צבע שלב</h5>
            <br></br>
            <button name="color" onClick={this.handleUpload} > 1 לחץ עליי ראשון כדי להעלות את התמונה ולקבל כתובת יורל לתמונה והמתן כשתי שניות  </button>
            <br></br>
            <h5>2 הוסף תמונה לפי צבע שלב </h5>
            <br></br>
            <button onClick={this.addImageByColor}>
                2 לחץ עליי שני כדי להוסיף את התמונה והצבע שבחרת למוצר  </button>
            <br></br>
            <h5>סיום ושליחת מוצר</h5>
            <br></br>
            <button class="waves-effect waves-dark btn" onClick={this.addNewitem} >  לחץ עליי להעלות מוצר רק כאשר כל הפרטים תקינים </button>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <Search />
        </div>
    }

}

export default Admin;

