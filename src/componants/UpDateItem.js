import React, { Component } from 'react';
import axios from 'axios'
import route from '../config/route'
import firebase from 'firebase'
import { colors } from '@material-ui/core';


class UpDateItem extends Component {
    constructor() {
        super()
        this.state = {
            itemToUpdate: { color: {} },
            ragularInput: [
                "name",
                "Discraption",
                "Collection",
                "image"],
            Category: [],
            sizes: [],
            color: {},
            colorSData: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal', 'white', 'yellow']
        }

    }

    componentWillMount = () => {
        // console.log(this.state.fullName)
        this.setState({
            itemToUpdate: this.props.item
        }
            , function () { console.log(this.state.itemToUpdate) }
        )
    }

    updateusersText = (e) => {
        let name = e.target.name
        let text = e.target.value
        // console.log(text)
        // this.state[name] = 0
        this.setState({
            [name]: text
        }, function () {
            console.log(this.state, this.state.itemToUpdate)
        })
    }
    getValue = (e) => {
        console.log(e.target.parentElement)
        console.log(this.state)

        let x = this.state
        let itemToUpdate = this.state.itemToUpdate
        let color
        x.color !== undefined ? color = x.color : color = itemToUpdate.color
        let name
        x.name !== undefined ? name = x.name : name = itemToUpdate.name
        let Discraption
        x.Discraption !== undefined ? Discraption = x.Discraption : Discraption = itemToUpdate.Discraption
        let Collection
        x.Collection !== undefined ? Collection = x.Collection : Collection = itemToUpdate.Collection
        let price
        x.price !== undefined ? price = x.price : price = itemToUpdate.price
        let image
        x.image !== undefined ? image = x.image : image = itemToUpdate.image
        let Category
        x.Category.length !== 0 ? Category = x.Category : Category = itemToUpdate.Category
        let sizes
        x.sizes.length !== 0 ? sizes = x.sizes : sizes = itemToUpdate.sizes

        console.log(name, this.state.itemToUpdate)
        let obj = {
            _id: this.state.itemToUpdate._id,
            color: color,
            name: name,
            Discraption: Discraption,
            Collection: Collection,
            price: price,
            image: image,
            sizes: sizes,
            Category: Category,
        }

        console.log(obj)
        this.setState({
            name: undefined,
            Discraption: undefined,
            Collection: undefined,
            price: undefined,
            image: undefined,
            Category: [],
            sizes: [],
            color: {}

        }
            , function () {
                console.log(obj)
                console.log(this.props.item)
                this.upDateItem(obj)
                console.log(this.state.itemToUpdate)
                this.afterUpdateItem()
            }
        )
    }

    upDateItem = async (obj) => {
        let id = obj._id
        let upDate = {
            'name': obj.name,
            "Discraption": obj.Discraption,
            "Collection": obj.Collection,
            "price": obj.price,
            "image": obj.image,
            "Category": obj.Category,
            "color": obj.color,
            "sizes": obj.sizes
        }
        console.log(upDate, id)
        await axios.put(`${route}upDateItem/${id}`, upDate)
        //   window.location.reload();
    }




    handleImage = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            this.setState({
                uploadedImage: image
            })
        }
    }

    handleUpload = (e) => {
        let img = "image"
        let name = e.target.name
        if (name === "color") {
            img = "colorImg"
        }
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
                        console.log(this.state.image)

                    })
                }
            )
        }
        console.log(this.state)
    }


    afterUpdateItem = () => {
        this.props.afterUpdateItem()
    }

    addToArry = (e) => {
        let name = e.target.name
        let value = e.target.value
        let id = e.target.id
        console.log(name, value, id, e.target)
        if (name === "color") {
            let obj = this.state[name]
            obj[value] = id
            this.setState({ [name]: obj }, function () { console.log(this.state[name]) })
        } else {
            let arry = this.state[name]
            arry.push(id)
            this.setState({ [name]: arry }, function () { console.log(this.state[name]) })
        }
    }

    AddNewToArry = (e) => {
        let name = e.target.name
        let arryName = name.slice(3, name.length)
        console.log(name, arryName)
        // console.log(name.slice(3, name.length))
        let newArry = [...this.state[arryName]]
        console.log(newArry)
        newArry.push(this.state[name])
        console.log(newArry)
        this.setState({ [arryName]: newArry })
    }

    addImageByColor = () => {

        let colorName = this.state.colorName
        let imageByColor = this.state.colorImg
        let color = { ...this.state.color }
        color[colorName] = imageByColor
        this.setState({ color: color, colorName: "" }, function () { console.log(this.state) })
        alert("color for Item Add Successfully")
    }

    // id={this.state.itemToUpdateId} itemToUpdate={this.itemToUpdate} newUser={this.state.newUser}

    render() {
        return <div class="newItem">
            <h6>עידכון מוצר <br></br>
                כאשר אתה משנה שדה מסויים רק הוא משתנה <br></br>
                {/* פרט לקטגוריות, מידות ,תמונות לפי צבע */}
            </h6>
            {/* {u = this.props.itemToUpdate} */}
            <label>price</label>  <input name="price" type="number" value={this.state.price} onChange={this.updateusersText} placeholder={`Price was "${this.props.item.price}" before`} />
            {this.state.ragularInput.map(r =>
                <div>  <label>{r}</label><input name={r} type="text" value={this.state[r]} onChange={this.updateusersText} placeholder={`${r} was "${this.props.item[r]}" before`} /></div>
            )}
            <h6>כאשר אתה רוצה לשנות אחד מהשדות הבאים
                 <br></br> עליך לבחור אם לשמר את הבחירות הקודמות
                 <br></br> אם ברצונך למחוק מהשדה תשמר הכל חוץ
                 <br></br>  מאותו דבר אותו תרצה למחוק
                 <br></br> אם תרצה להוסיף תשמר את הפרטים הקודמים
                 <br></br> ותרשום את הדבר חדש ותלץ כל הכתפור
                 </h6>

            <h6> קטגוריות : </h6>
            {this.state.itemToUpdate.Category.map(i => <button name="Category" id={i} onClick={this.addToArry}>   לפני לחץ כדי לשמר  "{i}" היה  <i class="material-icons left">add</i> </button>)}
            <input name='newCategory' onChange={this.updateusersText} type='text' placeholder='קטגוריה חדשה' value={this.state.newCategory} />
            <button name='newCategory' onClick={this.AddNewToArry}>הוסף קטגוריה </button>

            <h6> מידות :</h6>
            {/* <br></br> */}
            {this.state.itemToUpdate.sizes.map(i => <button name="sizes" id={i} onClick={this.addToArry}> לפני לחץ כדי לשמר  "{i}" היה  <i class="material-icons left">add</i> </button>)}
            <input name='newsizes' type='text' placeholder='מידה חדשה' value={this.state.newsizes} onChange={this.updateusersText} />
            <button name='newsizes' onClick={this.AddNewToArry}>הוסף מידה </button>
            <br></br>
            <br></br>
            <h5> ערוך תמונה ראשית</h5>
            <br></br>
            <input type="file" onChange={this.handleImage} />
            <button onClick={this.handleUpload}> עדכן תמונה ראשית  </button>
            <br></br>
            <br></br>

            {this.props.item.color ? <div >  : צבעים שהיו לפני <br></br><br></br>{Object.keys(this.props.item.color).map(c => <button id={this.props.item.color[c]} name={'color'} value={c} onClick={this.addToArry}> לפני לחץ כדי לשמר  "{c}" היה <img className="editImage" src={this.props.item.color[c]}></img> </button>)} </div> : null}
            <br></br>
            <div>
                הוסף צבע מוצר  : <datalist id="searchColor" className='select-input' onChange={this.updateusersText}>
                    {this.state.colorSData.map(c => <option class={c} style={{
                        backgroundColor: c ,
                        color:  c 
                    }} value={c}>{c}  </option>)}
                </datalist>
                <input id="arry" autoComplete="on" list="searchColor" name='colorName'
                    value={this.state.colorName}
                    placeholder='צבע' onChange={this.updateusersText} className='select-input' />
            </div>
            <br></br>
            <input type="file" onChange={this.handleImage} />
            <br></br>
            <h5> 1   הוסף תמונה לפי צבע שלב</h5>
            <br></br>
            <button name="color" onClick={this.handleUpload} >  לחץ עליי ראשון כדי להעלות את התמונה ולקבל כתובת יורל לתמונה והמתן כשתי שניות  </button>
            <br></br>
            <h5>2 הוסף תמונה לפי צבע שלב </h5>
            <br></br>
            <button onClick={this.addImageByColor}>
                לחץ עליי שני כדי להוסיף את התמונה והצבע שבחרת למוצר  </button>
            <br></br>

            {/* <input name="lastName" type="text" value={this.state.lastName} onChange={this.updateusersText} placeholder={"Last Name was " + this.props.itemToUpdate.name + ' before'} />
            <label>Discraption</label>  <input name="Discraption" type="text" value={this.state.email} onChange={this.updateusersText} placeholder={`E-Mail was "${this.props.itemToUpdate.email}" before`} />
            <label>Collection</label>   <input name="Collection" type="text" value={this.state.emailType} onChange={this.updateusersText} placeholder={`emailType was "${this.props.itemToUpdate.emailType}" before`} />
            <label>image</label> <input name="image" type="text" value={this.state.oountry} onChange={this.updateusersText} placeholder={`Country was "${this.props.itemToUpdate.country}" before`} /> */}
            <br></br>
            <br></br>
            <button class="waves-effect waves-dark btn" onClick={this.getValue} >עדכן מוצר או בטל</button>

        </div>
    }

}

export default UpDateItem;
