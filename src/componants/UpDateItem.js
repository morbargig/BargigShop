import React, { Component } from 'react';
import axios from 'axios'
import route from '../config/route'
import firebase from 'firebase'


class UpDateItem extends Component {
    constructor() {
        super()
        this.state = {
            itemToUpdate: {},
            ragularInput: [
                "name",
                "Discraption",
                "Collection",
                "image"],
            Category: [],
            sizes: []

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
            sizes: []

            // itemToUpdate: obj
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
                            image: url
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
        let value = e.target.id
        console.log(name, value)
        let arry = this.state[name]
        arry.push(value)
        this.setState({ [name]: arry }, function () { console.log(this.state[name]) })

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

    // id={this.state.itemToUpdateId} itemToUpdate={this.itemToUpdate} newUser={this.state.newUser}

    render() {
        return <div class="newItem">
            {/* {u = this.props.itemToUpdate} */}
            <label>price</label>  <input name="price" type="number" value={this.state.price} onChange={this.updateusersText} placeholder={`Price was "${this.props.item.price}" before`} />
            {this.state.ragularInput.map(r =>
                <div>  <label>{r}</label><input name={r} type="text" value={this.state[r]} onChange={this.updateusersText} placeholder={`${r} was "${this.props.item[r]}" before`} /></div>
            )}
            <div> Categories : </div>
            {this.state.itemToUpdate.Category.map(i => <button name="Category" id={i} onClick={this.addToArry}>  היה לפני לחץ כדי לשמר "{i}"  <i class="material-icons left">add</i> </button>)}
            <input name='newCategory' onChange={this.updateusersText} type='text' placeholder='New Category' value={this.state.newCategory} />
            <button name='newCategory' onClick={this.AddNewToArry}>הוסף קטגוריה </button>
            <div> Sizes :</div>

            {this.state.itemToUpdate.sizes.map(i => <button name="sizes" id={i} onClick={this.addToArry}> היה לפני לחץ כדי לשמר  "{i}"  <i class="material-icons left">add</i> </button>)}
            <input name='newsizes' type='text' placeholder='New Size' value={this.state.newsizes} onChange={this.updateusersText} />
            <button name='newsizes' onClick={this.AddNewToArry}>הוסף מידה </button>
            <input type="file" onChange={this.handleImage} />
            <button onClick={this.handleUpload}>העלה תמונה </button>

            {/* <input name="lastName" type="text" value={this.state.lastName} onChange={this.updateusersText} placeholder={"Last Name was " + this.props.itemToUpdate.name + ' before'} />
            <label>Discraption</label>  <input name="Discraption" type="text" value={this.state.email} onChange={this.updateusersText} placeholder={`E-Mail was "${this.props.itemToUpdate.email}" before`} />
            <label>Collection</label>   <input name="Collection" type="text" value={this.state.emailType} onChange={this.updateusersText} placeholder={`emailType was "${this.props.itemToUpdate.emailType}" before`} />
            <label>image</label> <input name="image" type="text" value={this.state.oountry} onChange={this.updateusersText} placeholder={`Country was "${this.props.itemToUpdate.country}" before`} /> */}

            <button onClick={this.getValue} >עדכן מוצר או בטל</button>
            {/* <input type="checkbox" id="horns" name="horns"></input> */}
            {/* {
                "_id": {
                    "$oid": "5d7293c2eb70532fa086c52a"
                },
                "Category": [
                    null,
                    "כיפות"
                ],
  "sizes": [],
  "name": "כיפה",
  "id": "024",
  "Discraption": "כיפה לבנה",
  "Collection": "כיפות חגיגיות",
  "price": 20,
  "image": "https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/BargigShopItems%2FWhatsApp%20Image%202019-09-04%20at%2012.41.24%20(2).jpeg?alt=media&token=b8ebf9f3-439f-4c89-9c73-3a32cf2d0df5",
  "__v": 0
} */}
            {/* <label onClick={this.getValue} for="horns">Sold</label> */}
            {/* <input type="checkbox" name="vehicle" > I have a bike </input>
            <input type="submit" ></input> */}
        </div>
    }

}

export default UpDateItem;
