import React, { Component } from 'react';
// import Admin from './Admin';
import axios from 'axios'
import route from '../config/route'
import { Link } from 'react-router-dom'
import UpDateItem from './UpDateItem';
import { inject } from 'mobx-react'
// observer,

@inject("ItemsStore")
class Home extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUserName: undefined,
      loggedInUserImg: undefined,
      catagorySearch: undefined,
      editItem: false
    }
  }


  componentDidMount = () => {
    this.returnCatgories()
    this.welcomBack()
  }

  returnCatgories = async () => {
    if (this.state.Catgories === undefined) {

      const res = await axios.get(`${route}Catgories/1`)
      if (res.data[0] === undefined) {
        this.componentDidMount()
      } else {

        let Catgories = res.data[0].Catgories
        // Catgories = Object.keys(Catgories)
        console.log(Catgories)

        this.props.ItemsStore.getCatgories(Catgories)
        this.setState({
          Catgories: Catgories
        })
        ////////////////////
        console.log(this.state.Catgories)
      }
    }
  }


  updateusersText = (e) => {
    let name = e.target.name
    let text = e.target.value
    // this.state[name] = 0
    console.log(name, text)
    this.setState({
      [name]: text
    }
      , function () {
        console.log(this.state)
        // let input = this.state[name]
        // console.log(name)
        if (this.state.catagorySearch !== undefined) {
          // console.log("don't work")
          let catagorySearch = this.state.catagorySearch
          console.log(this.state.catagorySearch)
          let ifValue = true
          if (text === '') {
            ifValue = false
            // console.log(text, typeof text)
          } else {
            this.searchByCatgory(catagorySearch, text, ifValue)
          }
          ///////////////////////////////////////////////////////////////////////
        } else { console.log("work") }
        // console.log(typeof text, text.length)
        text.length === 0 ? this.returnCatgories() : console.log()
      }
      , function () { console.log(this.state) }
    )
  }

  searchByCatgory = async (catagorySearch, text, ifValue) => {
    // let obj = {
    //   catagorySearch: catagorySearch,
    //   text: text
    // }
    // if (ifValue === false) {
    //     this.componentDidMount()
    // } else {
    console.log(catagorySearch, text, typeof text)
    let res = await axios.get(`${route}searchByCatagory/${catagorySearch}/${text}`)
    console.log(res.data)
    this.setState({
      resultByCatgory: res.data[0],
      resultByCatgoryDataList: res.data[1],
      Catgories: undefined
    }, function () {
      console.log(this.state.Catgories, this.state.resultByCatgory, this.state.resultByCatgoryDataList, Object.keys(this.state.resultByCatgoryDataList))
      // if (typeof text === "string" && text === "") {
      //     console.log("gfdgfdbgkjbdkgbkdj")
      //     this.setState({
      //         users: this.state.data.slice(0, 20)
      //     })
      // }
    })
    this.reaseCatgories()
  }

  reaseCatgories = () => {
    this.setState({ Catgories: undefined })
  }

  catagorySearch = (e) => {
    let x = e.target.value
    console.log(x)
    this.setState({
      // input: null,
      catagorySearch: x
    }
      , function () { console.log(this.state.catagorySearch) }
    )
  }




  editImage = () => {

  }

  editItem = (e) => {
    let id = e.target.parentElement.id
    console.log(id)
    let x = this.state.editItem
    x = !x
    console.log(x)
    let items = this.state.resultByCatgory
    let itemToUpdate = items.find(u => u._id === id)

    this.setState({
      itemToUpdateId: id,
      itemToUpdate: itemToUpdate,
      editItem: x
    })
    // console.log(this.state, this.state.userToUpdate)
  }


  colorImage = (e) => {
    let name = e.target.name
    // let id = e.target.id
    let value = e.target.value
    // if (this.state[id]  ){
    // this.setState({ })
    // }
    console.log(name, value)
    this.setState({ [name]: value }, function () { console.log(this.state[name]) })
  }

  resultByCatgory = () => {
    if (this.state.resultByCatgory !== undefined) {
      // console.log(this.props.state.user)
      return this.state.resultByCatgory.map(c =>
        this.props.state.isMobile ? <div>
          <div className="category">
            <div class="card">
              <Link to={`/Item/${c.name}`}>
                <div class="card-image">
                  <img src={this.state[c.name] !== undefined ? this.state[c.name] : c.image} alt={c.name}  ></img>
                  {/* <span class="card-title">{c.name}</span> */}
                </div>
                <div class="card-content">

                  <p>{c.description}</p>
                </div>
              </Link>
              <div class="card-action">
                {/* <button className="waves-effect waves-dark btn" > See Item</button> */}

                {c.color !== undefined ? <div >
                  {/* <a> Regular color</a> : */}
                  <button id={c.id} name={c.name} value={c.image} onClick={this.colorImage} className="left" style={{
                    backgroundColor: 'none',
                    width: '15px',
                    height: '15px',
                  }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`בחר תמונת רגילה`}> </button> <br></br><br></br>
                  {/* <a>Color</a> :  */}
                  {Object.keys(c.color).map(o =>
                    <button id={c.id} name={c.name} value={c.color[o]} onClick={this.colorImage} className="colorButton" style={{
                      backgroundColor: o,
                      height: '15px',
                      width: '15px',
                      // background-color: #bbb;
                      // border-radius: '50%',
                      display: 'inline-block'
                      // width: '15px',
                      // height: '15px',
                    }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`choose ${o} color`}> </button>
                  )}</div> : null
                }
                <p>
                  {/* <a> Price :  </a> */}
                  ₪{c.price}.00  </p>
                {/* <p> <a> Categories : </a> {c.Category.map(i => <span> {" "} {i},</span>)} </p>
                <p> <a> Sizes : </a> {c.sizes.map(i => <span> {" "} {i},</span>)} </p>
                <p> <a> Collection :  </a> {c.Collection}  </p>
                <p> <a> Discraption :  </a> {c.Discraption}  </p> */}
                <br></br>
                {this.props.state.user.email.includes('issacbar') ? <div id={c._id}> <button onClick={this.editItem}> ערוך </button>  <br></br> <button name={c.name} id={c._id} onClick={this.deleteItem}> מחק מוצר </button> </div> : null}
              </div>
            </div>
          </div>


        </div>
          : <div className="category">
            <div class="card">
              <div class="card-image">
                <img src={this.state[c.name] !== undefined ? this.state[c.name] : c.image} alt={c.name}  ></img>
                {/* <span class="card-title">{c.name}</span> */}
              </div>
              <div class="card-content">
                {/* <p>{c.description}</p> */}
              </div>
              <div class="card-action">
                <Link to={`/Item/${c.name}`}> {c.name} </Link>
                <br></br><br></br>
                {c.color !== undefined ? <div> <a> Regular color</a> :  <button id={c.id} name={c.name} value={c.image} onClick={this.colorImage} className="left" style={{
                  backgroundColor: 'color:transparent',
                  width: '15px',
                  height: '15px',
                }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`בחר תמונת רגילה`}> </button> <br></br><br></br><a>Color</a> : {Object.keys(c.color).map(o =>
                  <button id={c.id} name={c.name} value={c.color[o]} onClick={this.colorImage} className="colorButton" style={{
                    backgroundColor: o,
                    width: '15px',
                    height: '15px',
                  }} type="button" class="color-box" data-color-id="267" title="choose color" aria-label={`choose ${o} color`}> </button>
                )}</div> : null
                }
                <br></br>
                {this.props.state.user.email.includes('issacbar') ? <div id={c._id}> <button onClick={this.editItem}> ערוך </button>  <br></br> <button name={c.name} id={c._id} onClick={this.deleteItem}> מחק מוצר </button> </div> : null}
              </div>
            </div>
          </div>

      )
    }
  }

  deleteItem = async (e) => {
    let id = e.target.id
    let name = e.target.name
    console.log(id, name)
    let answer = window.confirm(`are you sure you want to delete ${name}?`)
    if (answer === true) {
      await axios.delete(`${route}deleteItem/${id}`)
    }
  }


  afterUpdateItem = () => {
    let x = this.state.editItem
    x = !x
    this.setState({
      editItem: x
    })
    window.location.reload()
  }

  welcomBack = async () => {
    if (this.props.state.user) {
      console.log(this.props.state.user)
      let email = this.props.state.user.email
      console.log(email)
      const res = await axios.get(`${route}userByEmail/${email}`)
      console.log(res)
      this.setState({ loggedInUser: res.data[0] }, function () { console.log(this.state.loggedInUser) })
    }

    // if (this.props.state.user !== undefined) {
    // }
    // <div className="userDetails">
    // <h6> {this.props.state.user !== undefined ? this.welcomBack() : null  "Welcome back " + this.state.loggedInUserName : null} </h6>
    // <img width="100" height="100" className="circle responsive-img" src={this.state.loggedInUserImg} />
    // </div>
  }

  welcomIfMobile = (user) => {
    if (!this.props.state.isMobile) {
      return <div className="userDetails">  <h6> Welcome back {user.name}   </h6>
        <img width="100" height="100" className="circle responsive-img" src={user.img} />
      </div>
    }
    else { return <div> <a className='left'> Welcome back {user.name}  </a><div className="userDetails"> <img width="100" height="100" className="circle responsive-img" src={user.img} />    </div > </div> }
  }

  render() {
    return <div className="#f1f8e9 light-green lighten-5">
      {/* {this.props.state.user.email.includes('bargig') ? <Admin state={this.props.state} /> : <div> */}



      {
        this.state.editItem ? <UpDateItem upDateItem={this.upDateItem} item={this.state.itemToUpdate} afterUpdateItem={this.afterUpdateItem} />
          : null
      }
      {this.state.loggedInUser !== undefined ? this.welcomIfMobile(this.state.loggedInUser)
        : null}
      {!this.props.state.isMobile ?
        <button className="homeButton" >
          <select class="browser-default" onChange={this.catagorySearch}>
            <option value="Catgory" disabled selected>חפש לפי </option>
            <option value="name">שם מוצר</option>
            {this.props.state.isAdmin ? <option value="id">Id</option> : null}
            <option value="Category">קטגוריה</option>
            <option value="sizes">מידה</option>
            <option value="price">מחיר מתחת ל</option>
            <option value="price2">מחיר מעל ל</option>
            <option value="Collection">קולקציה</option>
            <option value="color"> (  צבע  ( נא לרשום באנגלית  </option>
          </select>
          <datalist name="input" id="searchOptions" className='select-input' onChange={this.updateusersText}>
            {this.state.resultByCatgoryDataList ? Object.keys(this.state.resultByCatgoryDataList).map(c => <option className={`option${c}`} value={c}> {c}  </option>) : null}
          </datalist>
          <input name="input" id="arry" autoComplete="on" list="searchOptions"
            value={this.state.input}
            placeholder='צבע' onChange={this.updateusersText} className='select-input' />
          {/* <input name="input" type="text" value={this.state.input} onChange={this.updateusersText} placeholder="type here" /> */}
        </button>
        : <div>    <select class="browser-default" onChange={this.catagorySearch}>
          <option value="Catgory" disabled selected>חפש לפי </option>
          <option value="name">שם מוצר</option>
          {this.props.state.isAdmin ? <option value="id">Id</option> : null}
          <option value="Category">קטגוריה</option>
          <option value="sizes">מידה</option>
          <option value="price">מחיר מתחת ל</option>
          <option value="price2">מחיר מעל ל</option>
          <option value="Collection">קולקציה</option>
          <option value="color"> (  צבע  ( נא לרשום באנגלית      </option>
        </select>
          <datalist name="input" id="searchOptions" className='select-input' onChange={this.updateusersText}>
            {this.state.resultByCatgoryDataList ? Object.keys(this.state.resultByCatgoryDataList).map(c => <option className={`option${c}`} value={c}> {c}  </option>) : null}
          </datalist>
          <input name="input" id="arry" autoComplete="on" list="searchOptions"
            value={this.state.input}
            placeholder='צבע' onChange={this.updateusersText} className='select-input' />  </div>
      }
      {/* {this.welcomeUser()} */}
      {this.state.Catgories !== undefined ? <h5 >  : קטגוריות  </h5> : null}
      <br></br>
      <div className={!this.props.state.isMobile ? "categories" : "categoriesMobile"}>
        {this.state.Catgories !== undefined ? this.state.Catgories.map(c =>
          <div className="category">

            <div class="card">
              <Link to={`/Filter/${c.name}`}>
                <div class="card-image">
                  <img className="imageMoblie" src={c.img}>
                  </img>
                  {/* <span class="card-title">{c.name}</span> */}
                </div>
                <a className="imageText">{c.name} </a>
              </Link>
              {/* <div class="card-content">
                <p>{c.description}</p>
              </div> */}
              {/* <div class="card-action">
              </div> */}
            </div>

          </div>)
          :
          // this.resultByCatgory()
          this.resultByCatgory()
        }
      </div>
      {/* </div>} */}

    </div >
  }

}

export default Home;
