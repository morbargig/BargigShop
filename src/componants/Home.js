import React, { Component } from 'react';
// import Admin from './Admin';
import axios from 'axios'
import route from '../config/route'
import { Link } from 'react-router-dom'
import { async } from 'q';


class Home extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUserName: undefined,
      loggedInUserImg: undefined,
      catagorySearch: undefined
    }
  }

  componentDidMount = () => {
    this.returnCatgories()
    // this.welcomeUser()
  }

  returnCatgories = async () => {
    const res = await axios.get(`${route}Catgories`)
    if (res.data[0] === undefined) {
      this.componentDidMount()
    } else {

      let Catgories = res.data[0].Catgories
      // Catgories = Object.keys(Catgories)
      console.log(Catgories)

      this.setState({
        Catgories: Catgories
      })
      console.log(this.state.Catgories)
    }
  }


  //   resultByCatgory = () => {
  //     if (this.state.resultByCatgory !== undefined) {
  //         return this.state.resultByCatgory.map(c =>
  //             <div className="category">

  //                 <div class="card">
  //                     <div class="card-image">
  //                         <img src={c.img}></img>
  //                         <span class="card-title">{c.name}</span>
  //                     </div>
  //                     <div class="card-content">
  //                         <p>{c.description}</p>
  //                     </div>
  //                     <div class="card-action">
  //                         <Link to={`/SmallBizz/${c.name}`}> {c.name} </Link>
  //                     </div>
  //                 </div>
  //             </div>
  //             // {/* <div>  
  //             //                  <h2>{r.name}</h2>
  //             //                 <img src={r.img}></img>
  //             //                 <p>{r.description}</p>

  //             //                 <a className="waves-effect waves-light btn-small" onClick={this.changeDisplay}>Make an appointment</a></div>) */}
  //         )
  //     }
  // }

  // welcomeUser = async () => {
  //   if (this.state.user) {
  //     let user = this.state.user
  //     console.log(user)
  //     // let items = await axios.get(`${route}getbyfield/${this.props.name}`)
  //     let res = await axios.get(`${route}getUserByEmail/${user.email}`)
  //     console.log(res)
  //     //  return <div className="userDetails">
  //     //   <h6> {this.state.loggedInUserName !== undefined ? "Welcome back " + this.state.loggedInUserName : null} </h6>
  //     //   <img width="100" height="100" className="circle responsive-img" src={this.state.loggedInUserImg} />
  //     // </div>

  //   }
  // }


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
      resultByCatgory: res.data,
      Catgories: undefined
    }, function () {
      console.log(this.state.Catgories, this.state.resultByCatgory)
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


  resultByCatgory = () => {
    if (this.state.resultByCatgory !== undefined) {
      return this.state.resultByCatgory.map(c =>
        <div className="category">

          <div class="card">
            <div class="card-image">
              <img src={c.image}></img>
              <span class="card-title">{c.name}</span>
            </div>
            <div class="card-content">
              <p>{c.description}</p>
            </div>
            <div class="card-action">
              <Link to={`/SmallBizz/${c.name}`}> {c.name} </Link>
            </div>
          </div>
        </div>
        // {/* <div>  
        //                  <h2>{r.name}</h2>
        //                 <img src={r.img}></img>
        //                 <p>{r.description}</p>

        //                 <a className="waves-effect waves-light btn-small" onClick={this.changeDisplay}>Make an appointment</a></div>) */}
      )
    }
  }

  render() {
    return <div className="#f1f8e9 light-green lighten-5">
      {/* {this.props.state.user.email.includes('bargig') ? <Admin state={this.props.state} /> : <div> */}

      <button className={"homeButton"} on={this.slecetCatgory}>
        <select class="browser-default" onClick={this.catagorySearch}>
          <option value="Catgory" disabled selected>Search By </option>
          <option value="name">שם מוצר</option>
          <option value="Category">קטגוריה</option>
          <option value="sizes">מידה</option>
          <option value="price">מיר מתחת ל</option>
          <option value="Collection">קולקציה</option>
        </select>

        <input name="input" type="text" value={this.state.fullName} onChange={this.updateusersText} placeholder="type here" /></button>
      {/* {this.welcomeUser()} */}
      <div className="userDetails">
        <h6> {this.state.loggedInUserName !== undefined ? "Welcome back " + this.state.loggedInUserName : null} </h6>
        <img width="100" height="100" className="circle responsive-img" src={this.state.loggedInUserImg} />
      </div>
      <div className="categories">
        {this.state.Catgories !== undefined ? this.state.Catgories.map(c =>
          <div className="category">

            <div class="card">
              <div class="card-image">
                <img src={c.img}></img>
                <span class="card-title">{c.name}</span>
              </div>
              <div class="card-content">
                <p>{c.description}</p>
              </div>
              <div class="card-action">
                <Link to={`/Filter/${c.name}`}> {c.name} </Link>
              </div>
            </div>
          </div>
        ) :
          // this.resultByCatgory()
          this.resultByCatgory()
        }
      </div>
      {/* </div>} */}

    </div>
  }

}

export default Home;
