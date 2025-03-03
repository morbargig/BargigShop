// @ts-nocheck
import { Component } from "react";
// import Admin from './Admin';
import axios from "axios";
import { inject } from "mobx-react";
import { Link } from "react-router-dom";
import route from "../config/route";
import UpDateItem from "./UpDateItem";
// observer,

@inject("ItemsStore")
class Home extends Component<any> {
  state: any;
  constructor() {
    super();
    this.state = {
      loggedInUserName: undefined,
      loggedInUserImg: undefined,
      categorySearch: undefined,
      editItem: false,
    };
  }

  componentDidMount = () => {
    this.returnCatagories();
    this.welcomeBack();
  };

  returnCatagories = async () => {
    if (this.state.Catagories === undefined) {
      const res = await axios.get(`${route()}Catagories/1`);
      if (res.data[0] === undefined) {
        this.componentDidMount();
      } else {
        let Catagories = res.data[0].Catagories;
        // Catagories = Object.keys(Catagories)
        console.log(Catagories);

        this.props.ItemsStore.getCatagories(Catagories);
        this.setState({
          Catagories: Catagories,
        });
        ////////////////////
        console.log(this.state.Catagories);
      }
    }
  };

  updateUsersText = (e: any) => {
    let name = e.target.name;
    let text = e.target.value;
    // this.state[name] = 0
    console.log(name, text);
    let me = this;
    this.setState(
      {
        [name]: text,
      },
      function () {
        console.log(me.state);
        // let input = this.state[name]
        // console.log(name)
        if (me.state.categorySearch !== undefined) {
          // console.log("don't work")
          let categorySearch = me.state.categorySearch;
          // console.log(me.state.categorySearch)
          let ifValue = true;
          if (text === "") {
            ifValue = false;
            // console.log(text, typeof text)
          } else {
            me.searchByCategory(categorySearch, text, ifValue);
          }
          ///////////////////////////////////////////////////////////////////////
        } else {
          //  console.log("work")
        }
        // console.log(typeof text, text.length)
        text.length === 0 ? me.returnCatagories() : console.log();
      },
      // @ts-ignore
      function () {
        console.log(me.state);
      }
    );
  };

  searchByCategory = async (categorySearch: any, text: any, ifValue: any) => {
    // console.log(categorySearch, text, typeof text);
    let res = await axios.get(
      `${route()}searchByCategory/${categorySearch}/${text}`
    );
    console.log(res.data);
    this.setState(
      {
        resultByCategory: res.data[0],
        resultByCategoryDataList: res.data[1],
        Catagories: undefined,
      },
      () => {
        // console.log(
        //   this.state.Catagories,
        //   this.state.resultByCategory,
        //   this.state.resultByCategoryDataList,
        //   Object.keys(this.state.resultByCategoryDataList)
        // );
      }
    );
    this.resetCatagories();
  };

  resetCatagories = () => {
    this.setState({ Catagories: undefined });
  };

  // @ts-ignore
  categorySearch = (e) => {
    let x = e.target.value;
    console.log(x);
    this.setState(
      {
        // input: null,
        categorySearch: x,
      },
      () => {
        console.log(this.state.categorySearch);
      }
    );
  };

  editImage = () => {};

  // @ts-ignore
  editItem = (e) => {
    let id = e.target.parentElement.id;
    console.log(id);
    let x = this.state.editItem;
    x = !x;
    console.log(x);
    let items = this.state.resultByCategory;
    let itemToUpdate = items.find((u) => u._id === id);

    this.setState({
      itemToUpdateId: id,
      itemToUpdate: itemToUpdate,
      editItem: x,
    });
    // console.log(this.state, this.state.userToUpdate)
  };

  // @ts-ignore
  colorImage = (e) => {
    let name = e.target.parentElement.name;
    let value = e.target.parentElement.value;
    // console.log(name, value, e.target, e.target.parentElement)
    this.setState({ [name]: value }, () => {
      console.log(this.state[name]);
    });
  };

  resultByCategory = () => {
    if (this.state.resultByCategory !== undefined) {
      // console.log(this.props.state.user)
      // @ts-ignore
      return this.state.resultByCategory.map((c) =>
        this.props.state.isMobile ? (
          <div>
            <div className="category">
              {/* @ts-ignore */}
              <div className="card">
                <Link to={`/Item/${c.name}`}>
                  {/* @ts-ignore */}
                  <div className="card-image">
                    <img
                      alt=""
                      src={
                        this.state[c.name] !== undefined
                          ? this.state[c.name]
                          : c.image
                      }
                      title={c.name}
                    ></img>
                    {/* <span className="card-title">{c.name}</span> */}
                  </div>
                  {/* @ts-ignore */}
                  <div className="card-content">
                    <p>{c.description}</p>
                  </div>
                </Link>
                {/* @ts-ignore */}
                <div className="card-action">
                  {/* <button className="waves-effect waves-dark btn" > See Item</button> */}

                  {c.color !== undefined ? (
                    <div>
                      {/* <a> Regular color</a> : */}
                      {/* @ts-ignore */}
                      <li id="color-154" className="item-color">
                        {/* @ts-ignore */}
                        <button
                          id={c.id}
                          name={c.name}
                          value={c.image}
                          onClick={this.colorImage}
                          type="button"
                          className="choose-color-btn "
                          title="choose color"
                          aria-label={`בחר צבע רגיל`}
                        >
                          {/* @ts-ignore */}
                          <span
                            className="color-box"
                            // style="background-color: #fa2fa9;"
                          ></span>
                        </button>
                      </li>
                      {/* <button id={c.id} name={c.name} value={c.image} onClick={this.colorImage} className="left none" style={{
                      backgroundColor: 'none',
                      width: '15px',
                      height: '15px',
                    }} type="button" className="color-box" data-color-id="267" title="choose color" aria-label={`בחר תמונת רגילה`}> </button> */}
                      <br></br>
                      <br></br>
                      {/* <a>Color</a> :  */}
                      {/* @ts-ignore */}
                      <div className="meta-color-list-wrapp">
                        {/* @ts-ignore */}
                        <ul className="color-list">
                          {Object.keys(c.color).map(
                            (o) => (
                              <li id="color-154" className="item-color">
                                <button
                                  name={c.name}
                                  value={c.color[o]}
                                  onClick={this.colorImage}
                                  type="button"
                                  className="choose-color-btn "
                                  title="choose color"
                                  aria-label={`choose ${o} color`}
                                >
                                  {/*  @ts-ignore */}
                                  <span
                                    className="color-box"
                                    style={{
                                      backgroundColor: o,
                                    }}
                                    // style="background-color: #fa2fa9;"
                                  ></span>
                                </button>
                              </li>
                            )
                            //   <button id={c.id} name={c.name} value={c.color[o]} onClick={this.colorImage} className="colorButton"
                            //   style={{
                            //     backgroundColor: o,
                            //     height: '15px',
                            //     width: '15px',
                            //     // background-color: #bbb;
                            //     // border-radius: '50%',
                            //     display: 'inline-block'
                            //     // width: '15px',
                            //     // height: '15px',
                            //   }} type="button" className="color-box" data-color-id="267" title="choose color" aria-label={`choose ${o} color`}> </button>
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                  {/* <a> Price :  </a> */}
                  <p>₪{c.price}.00 </p>
                  {/* <p> <a> Categories : </a> {c.Category.map(i => <span> {" "} {i},</span>)} </p>
                <p> <a> Sizes : </a> {c.sizes.map(i => <span> {" "} {i},</span>)} </p>
                <p> <a> Collection :  </a> {c.Collection}  </p>
                <p> <a> Description :  </a> {c.Description}  </p> */}
                  <br></br>
                  {this.props.state.user.email.includes("issacbar") ? (
                    <div id={c._id}>
                      {" "}
                      <button onClick={this.editItem}>
                        {" "}
                        ערוך{" "}
                      </button> <br></br>{" "}
                      <button
                        name={c.name}
                        id={c._id}
                        onClick={this.deleteItem}
                      >
                        {" "}
                        מחק מוצר{" "}
                      </button>{" "}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="category">
            <div className="card">
              <div className="card-image">
                <img
                  alt=""
                  src={
                    this.state[c.name] !== undefined
                      ? this.state[c.name]
                      : c.image
                  }
                  title={c.name}
                ></img>
                {/* <span className="card-title">{c.name}</span> */}
              </div>
              <div className="card-content">{/* <p>{c.description}</p> */}</div>
              <div className="card-action">
                {/* <button className="waves-effect waves-dark btn" > See Item</button> */}

                {c.color !== undefined ? (
                  <div>
                    {/* <a> Regular color</a> : */}{" "}
                    <li id="color-154" className="item-color">
                      <button
                        id={c.id}
                        name={c.name}
                        value={c.image}
                        onClick={this.colorImage}
                        type="button"
                        className="choose-color-btn "
                        title="choose color"
                        aria-label={`בחר צבע רגיל`}
                      >
                        <span
                          className="color-box"
                          // style="background-color: #fa2fa9;"
                        ></span>
                      </button>
                    </li>
                    {/* <button id={c.id} name={c.name} value={c.image} onClick={this.colorImage} className="left none" style={{
                      backgroundColor: 'none',
                      width: '15px',
                      height: '15px',
                    }} type="button" className="color-box" data-color-id="267" title="choose color" aria-label={`בחר תמונת רגילה`}> </button> */}
                    <br></br>
                    <br></br>
                    {/* <a>Color</a> :  */}
                    <div className="meta-color-list-wrapp">
                      <ul className="color-list">
                        {Object.keys(c.color).map(
                          (o) => (
                            <li id="color-154" className="item-color">
                              <button
                                name={c.name}
                                value={c.color[o]}
                                onClick={this.colorImage}
                                type="button"
                                className="choose-color-btn "
                                title="choose color"
                                aria-label={`choose ${o} color`}
                              >
                                <span
                                  className="color-box"
                                  style={{
                                    backgroundColor: o,
                                  }}
                                  // style="background-color: #fa2fa9;"
                                ></span>
                              </button>
                            </li>
                          )
                          //   <button id={c.id} name={c.name} value={c.color[o]} onClick={this.colorImage} className="colorButton"
                          //   style={{
                          //     backgroundColor: o,
                          //     height: '15px',
                          //     width: '15px',
                          //     // background-color: #bbb;
                          //     // border-radius: '50%',
                          //     display: 'inline-block'
                          //     // width: '15px',
                          //     // height: '15px',
                          //   }} type="button" className="color-box" data-color-id="267" title="choose color" aria-label={`choose ${o} color`}> </button>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : null}
                <p>
                  {/* <a> Price :  </a> */}₪{c.price}.00{" "}
                </p>
                {/* <p> <a> Categories : </a> {c.Category.map(i => <span> {" "} {i},</span>)} </p>
                <p> <a> Sizes : </a> {c.sizes.map(i => <span> {" "} {i},</span>)} </p>
                <p> <a> Collection :  </a> {c.Collection}  </p>
                <p> <a> Description :  </a> {c.Description}  </p> */}
                <br></br>
                {this.props.state.user.email.includes("issacbar") ? (
                  <div id={c._id}>
                    {" "}
                    <button onClick={this.editItem}>
                      {" "}
                      ערוך{" "}
                    </button> <br></br>{" "}
                    <button name={c.name} id={c._id} onClick={this.deleteItem}>
                      {" "}
                      מחק מוצר{" "}
                    </button>{" "}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )
      );
    }
  };

  deleteItem = async (e) => {
    let id = e.target.id;
    let name = e.target.name;
    console.log(id, name);
    let answer = window.confirm(`are you sure you want to delete ${name}?`);
    if (answer === true) {
      await axios.delete(`${route()}deleteItem/${id}`);
    }
  };

  afterUpdateItem = () => {
    let x = this.state.editItem;
    x = !x;
    this.setState({
      editItem: x,
    });
    window.location.reload();
  };

  welcomeBack = async () => {
    if (this.props.state.user) {
      console.log(this.props.state.user);
      let email = this.props.state.user.email;
      console.log(email);
      const res = await axios.get(`${route()}userByEmail/${email}`);
      console.log(res);
      this.setState({ loggedInUser: res.data[0] }, function () {
        console.log(this.state.loggedInUser);
      });
    }

    // if (this.props.state.user !== undefined) {
    // }
    // <div className="userDetails">
    // <h6> {this.props.state.user !== undefined ? this.welcomBack() : null  "Welcome back " + this.state.loggedInUserName : null} </h6>
    // <img width="100" height="100" className="circle responsive-img" src={this.state.loggedInUserImg} />
    // </div>
  };

  welcomeIfMobile = (user) => {
    if (!this.props.state.isMobile) {
      return (
        <div className="userDetails">
          {" "}
          <h6> {user.name} ברוך הבא </h6>
          <img
            alt=""
            width="100"
            height="100"
            className="circle responsive-img"
            src={user.img}
          />
        </div>
      );
    } else {
      return (
        <div>
          {" "}
          <a href="!#" className="left">
            {" "}
            {user.name} ברוך הבא{" "}
          </a>
          <div className="userDetails">
            {" "}
            <img
              alt=""
              width="100"
              height="100"
              className="circle responsive-img"
              src={user.img}
            />{" "}
          </div>{" "}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="#f1f8e9 light-green lighten-5">
        {/* {this.props.state.user.email.includes('bargig') ? <Admin state={this.props.state} /> : <div> */}

        {this.state.editItem ? (
          <UpDateItem
            upDateItem={this.upDateItem}
            item={this.state.itemToUpdate}
            afterUpdateItem={this.afterUpdateItem}
          />
        ) : null}
        {this.state.loggedInUser !== undefined
          ? this.welcomeIfMobile(this.state.loggedInUser)
          : null}
        {!this.props.state.isMobile ? (
          <button className="homeButton">
            <select className="browser-default" onChange={this.categorySearch}>
              <option value="Category" disabled selected>
                חפש לפי{" "}
              </option>
              <option value="name">שם מוצר</option>
              {this.props.state.isAdmin ? <option value="id">Id</option> : null}
              <option value="Category">קטגוריה</option>
              <option value="sizes">מידה</option>
              <option value="price">מחיר מתחת ל</option>
              <option value="price2">מחיר מעל ל</option>
              <option value="Collection">קולקציה</option>
              <option value="color"> ( צבע ( נא לרשום באנגלית </option>
            </select>
            <datalist
              name="input"
              id="searchOptions"
              className="select-input"
              onChange={this.updateUsersText}
            >
              {this.state.resultByCategoryDataList
                ? Object.keys(this.state.resultByCategoryDataList).map((c) => (
                    <option className={`option${c}`} value={c}>
                      {" "}
                      {c}{" "}
                    </option>
                  ))
                : null}
            </datalist>
            <input
              name="input"
              id="arry"
              autoComplete="on"
              list="searchOptions"
              value={this.state.input}
              placeholder="צבע"
              onChange={this.updateUsersText}
              className="select-input"
            />
            {/* <input name="input" type="text" value={this.state.input} onChange={this.updateusersText} placeholder="type here" /> */}
          </button>
        ) : (
          <div>
            {" "}
            <select className="browser-default" onChange={this.categorySearch}>
              <option value="Category" disabled selected>
                חפש לפי{" "}
              </option>
              <option value="name">שם מוצר</option>
              {this.props.state.isAdmin ? <option value="id">Id</option> : null}
              <option value="Category">קטגוריה</option>
              <option value="sizes">מידה</option>
              <option value="price">מחיר מתחת ל</option>
              <option value="price2">מחיר מעל ל</option>
              <option value="Collection">קולקציה</option>
              <option value="color"> ( צבע ( נא לרשום באנגלית </option>
            </select>
            <datalist
              name="input"
              id="searchOptions"
              className="select-input"
              onChange={this.updateUsersText}
            >
              {this.state.resultByCategoryDataList
                ? Object.keys(this.state.resultByCategoryDataList).map((c) => (
                    <option className={`option${c}`} value={c}>
                      {" "}
                      {c}{" "}
                    </option>
                  ))
                : null}
            </datalist>
            <input
              name="input"
              id="arry"
              autoComplete="on"
              list="searchOptions"
              value={this.state.input}
              placeholder="צבע"
              onChange={this.updateUsersText}
              className="select-input"
            />{" "}
          </div>
        )}
        {/* {this.welcomeUser()} */}
        {this.state.Catagories !== undefined ? <h5> : קטגוריות </h5> : null}
        <br></br>
        <div
          className={
            !this.props.state.isMobile ? "categories" : "categoriesMobile"
          }
        >
          {this.state.Catagories !== undefined
            ? this.state.Catagories.map((c) => (
                <div className="category">
                  <div className="card">
                    <Link to={`/Filter/${c.name}`}>
                      <div className="card-image">
                        <img alt="" className="imageMoblie" src={c.img}></img>
                        {/* <span className="card-title">{c.name}</span> */}
                      </div>
                      <a href="!#" className="imageText">
                        {c.name}{" "}
                      </a>
                    </Link>
                  </div>
                </div>
              ))
            : // this.resultByCategory()
              this.resultByCategory()}
        </div>
        {/* </div>} */}
      </div>
    );
  }
}

export default Home;
