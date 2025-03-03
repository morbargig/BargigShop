import axios from 'axios';
import "firebase/auth";
import firebase from "firebase/compat/app";
import { Component } from 'react';
import route from '../config/route';


class UpDateItem extends Component {
    constructor() {
        super()
        this.state = {
            regularInput: [
                "name",
                "Description",
                "Collection",
                "image"],
            Category: [],
            sizes: [],
            color: {},
            colorSData: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal', 'white', 'yellow'],
            CategoryList: []
        }

    }


    componentDidMount = async () => {
        if (this.state.itemToUpdate === undefined) {
            this.setState({
                itemToUpdate: this.props.item
            })
        }
        if (this.state.CategoryList.length === 0) {
            const res = await axios.get(`${route()}Catagories/0`)
            res.data[0].Catagories.map(i => i.name)
            if (res.data[0] === undefined) {
                let res2 = await axios.get(`${route()}Catagories/1`)
                this.setState({ CategoryList: res2.data[0].Catagories.map(i => i.name) })
            } else {
                this.setState({ CategoryList: res.data[0].Catagories.map(i => i.name) }, function () { console.log(this.state.CategoryList) })
            }
        }
    }

    updateusersText = (e) => {
        let name = e.target.name
        let text = e.target.value
        // console.log(name, text)
        this.setState({
            [name]: text
        }, function () {
            console.log(this.state, this.state.itemToUpdate)
        })
    }
    getValue = (e) => {
        // console.log(e.target.parentElement)
        // console.log(this.state)

        let x = this.state
        let itemToUpdate = this.state.itemToUpdate
        let color
        x.color !== undefined ? color = x.color : color = itemToUpdate.color
        let name
        x.name !== undefined ? name = x.name : name = itemToUpdate.name
        let Description
        x.Description !== undefined ? Description = x.Description : Description = itemToUpdate.Description
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
            Description: Description,
            Collection: Collection,
            price: price,
            image: image,
            sizes: sizes,
            Category: Category,
        }

        // console.log(obj)
        this.setState({
            name: undefined,
            Description: undefined,
            Collection: undefined,
            price: undefined,
            image: undefined,
            Category: [],
            sizes: [],
            color: {}

        }
            , function () {
                // console.log(obj)
                // console.log(this.props.item)
                this.upDateItem(obj)
                // console.log(this.state.itemToUpdate)
                this.afterUpdateItem()
            }
        )
    }

    upDateItem = async (obj) => {
        let id = obj._id
        let upDate = {
            'name': obj.name,
            "Description": obj.Description,
            "Collection": obj.Collection,
            "price": obj.price,
            "image": obj.image,
            "Category": obj.Category,
            "color": obj.color,
            "sizes": obj.sizes
        }
        console.log(upDate, id)
        await axios.put(`${route()}upDateItem/${id}`, upDate)
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
        // alert(name)

        if (name === "color") {
            img = "colorImg"
        }
        const { uploadedImage } = this.state
        if (this.state.uploadedImage === undefined) {
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
                        if (img !== 'image') {
                            alert("now you can continue to button 2")
                        }

                    })
                }
            )
        }
        console.log(this.state)
    }


    afterUpdateItem = () => {
        this.props.afterUpdateItem()
    }

    addToArray = (e) => {
        let name = e.target.name
        let value = e.target.value
        let id = e.target.id
        // alert(id)
        // alert(name)
        // alert(value)

        console.log(name, value, id, e.target)
        if (name === "color") {
            let obj = this.state[name]
            obj[value] = id
            this.setState({ [name]: obj }, function () { console.log(this.state[name]) })
        } else {
            let array = this.state[name]
            array.push(id)
            this.setState({ [name]: array }, function () { console.log(this.state[name]) })
        }
    }

    AddNewToArray = (e) => {
        let name = e.target.name
        let arrayName = name.slice(3, name.length)
        // console.log(name, arrayName)
        // console.log(name.slice(3, name.length))
        let newArray = [...this.state[arrayName]]
        // console.log(newArray)
        newArray.push(this.state[name])
        // console.log(newArray)
        this.setState({ [arrayName]: newArray })
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
        return <div className="newItem">
            <h6>עידכון מוצר <br></br>
                כאשר אתה משנה שדה מסויים רק הוא משתנה <br></br>
                {/* פרט לקטגוריות, מידות ,תמונות לפי צבע */}
            </h6>
            {/* {u = this.props.itemToUpdate} */}
            <label>price</label>  <input name="price" type="number" value={this.state.price} onChange={this.updateusersText} placeholder={`Price was "${this.props.item.price}" before`} />
            {this.state.regularInput.map(r =>
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
            {this.props.item.Category.map(i => <button name="Category" id={i} onClick={this.addToArray}>   לפני לחץ כדי לשמר  "{i}" היה  <i className="material-icons left">add</i> </button>)}
            <input name='newCategory' onChange={this.updateusersText} type='text' placeholder='קטגוריה חדשה' value={this.state.newCategory} />
            <button name='newCategory' onClick={this.AddNewToArray}>הוסף קטגוריה </button>

            <h6> מידות :</h6>
            {/* <br></br> */}
            {this.props.item.sizes.map(i => <button name="sizes" id={i} onClick={this.addToArray}> לפני לחץ כדי לשמר  "{i}" היה  <i className="material-icons left">add</i> </button>)}
            <input name='newsizes' type='text' placeholder='מידה חדשה' value={this.state.newsizes} onChange={this.updateusersText} />
            <button name='newsizes' onClick={this.AddNewToArray}>הוסף מידה </button>
            <br></br>
            <br></br>
            <h5> ערוך תמונה ראשית</h5>
            <br></br>
            <input type="file" onChange={this.handleImage} />
            <button onClick={this.handleUpload}> עדכן תמונה ראשית  </button>
            <br></br>
            <br></br>

            {this.props.item.color ? <div >  : צבעים שהיו לפני <br></br><br></br>{Object.keys(this.props.item.color).map(c => <button id={this.props.item.color[c]} name='color' value={c} onClick={this.addToArray}> לפני לחץ כדי לשמר  "{c}" היה <img className="editImage" alt="" src={this.props.item.color[c]}></img> </button>)} </div> : null}
            <br></br>
            <div>
                הוסף צבע מוצר  : <datalist id="searchColor" className='select-input' onChange={this.updateusersText}>
                    {this.state.colorSData.map(c => <option className={`option${c}`} value={c}>{c}  </option>)}
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
            <button name="color" onClick={this.handleUpload} > 1 לחץ עליי ראשון כדי להעלות את התמונה ולקבל כתובת יורל לתמונה והמתן כשתי שניות  </button>
            <br></br>
            <h5>2 הוסף תמונה לפי צבע שלב </h5>
            <br></br>
            <button onClick={this.addImageByColor}>
                2  לחץ עליי שני כדי להוסיף את התמונה והצבע שבחרת למוצר  </button>
            <br></br>

            {/* <input name="lastName" type="text" value={this.state.lastName} onChange={this.updateusersText} placeholder={"Last Name was " + this.props.itemToUpdate.name + ' before'} />
            <label>Description</label>  <input name="Description" type="text" value={this.state.email} onChange={this.updateusersText} placeholder={`E-Mail was "${this.props.itemToUpdate.email}" before`} />
            <label>Collection</label>   <input name="Collection" type="text" value={this.state.emailType} onChange={this.updateusersText} placeholder={`emailType was "${this.props.itemToUpdate.emailType}" before`} />
            <label>image</label> <input name="image" type="text" value={this.state.oountry} onChange={this.updateusersText} placeholder={`Country was "${this.props.itemToUpdate.country}" before`} /> */}
            <br></br>
            <br></br>
            <button className="waves-effect waves-dark btn" onClick={this.getValue} >עדכן מוצר או בטל</button>

        </div>
    }

}

export default UpDateItem;
