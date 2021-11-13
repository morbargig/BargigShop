import React, { Component } from 'react';
import route from '../config/route';
import axios from 'axios';


class Test extends Component {
    // constructor() {
    //     super()

    // }

    fn = async () => {
        let name = 'Itzik'
        let email = 'issacbar92@gmail.com'
        let password = 'bargig123456'
        let from = "Bargig Shop"
        let to = `972528612379`
        // let url = 'https://api.get-in.com//Rosh_hashana?seller_code=I5TJ2QF2FUJ'


        let text = `Hi ${name} Welcome to our store, your email is : ${email}, and your password end with ${password.slice(password.length - 4, password.length - 1)}, we are Recommend to write it somewhere :)
        
  

        

        .`
        console.log(from, to, text)
        // await axios.get(`${route()}sendSms/${from}/${to}/${text}/${url}`)
        await axios.post(`${route()}sendSms/${from}/${to}`, {
            text: text,

        })
    }
    render() {
        return <div>
            <form>
                <div className="input-group">
                    <input id="email" type="text" className="form-control" name="email" placeholder="Email"></input>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                </div>
                <div className="input-group">
                    <input id="password" type="password" className="form-control" name="password" placeholder="Password"></input>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                </div>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <li id="color-154" className="item-color">

                <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="154" title="choose color" aria-label="choose color">
                    <span className="color-box" 
                    // style="background-color: #fa2fa9;"
                    ></span>
                </button>

            </li>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="product-box-wrapper">

                <a href="https://www.purpleilat.co.il/product/%d7%a9%d7%9e%d7%9c%d7%aa-%d7%99%d7%95%d7%91%d7%9c/" target="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link" title="שמלת יובל | צבעים חדשים" aria-label="שמלת יובל | צבעים חדשים">

                    <img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-501-404x604.jpg" className="attachment-prev-product size-prev-product" alt=""></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_144642-1-404x604.jpg" data-color-id="154" className="attachment-prev-product size-prev-product"
                        //  style="display: none;"
                        alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_142530-1-404x604.jpg" data-color-id="261" className="attachment-prev-product size-prev-product"
                            //   style="display: none;"
                            alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_145547-1-404x604.jpg" data-color-id="168" className="attachment-prev-product size-prev-product"
                                //    style="display: none;"
                                alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_141223-1-404x604.jpg" data-color-id="266" className="attachment-prev-product size-prev-product"
                                    // style="display: none;"
                                    alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_143217-1-404x604.jpg" data-color-id="268" className="attachment-prev-product size-prev-product"
                                        // style="display: none;"
                                        alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_145121-1-404x604.jpg" data-color-id="301" className="attachment-prev-product size-prev-product"
                                            //  style="display: none;"
                                            alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-501-404x604.jpg" data-color-id="263" className="attachment-prev-product size-prev-product"
                                                //   style="display: none;"
                                                alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-454-404x604.jpg" data-color-id="167" className="attachment-prev-product size-prev-product"
                                                    //    style="display: none;" 
                                                    alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-568-404x604.jpg" data-color-id="247" className="attachment-prev-product size-prev-product"
                                                        // style="display: none;"
                                                        alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-538-404x604.jpg" data-color-id="166" className="attachment-prev-product size-prev-product"
                                                            //   style="display: none;"
                                                            alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-503-404x604.jpg" className="hover-image" alt="שמלת יובל | צבעים חדשים"></img><h2 className="woocommerce-loop-product__title">שמלת יובל | צבעים חדשים</h2>

                    <span className="price"><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">₪</span>117.00</span></span>
                </a>
                <div className="meta-color-list-wrapp">


                    <ul className="color-list">


                        <li id="color-154" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="154" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                // style="background-color: #fa2fa9;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-268" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="268" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                // style={"background-color: #CF76AA;"}
                                ></span>
                            </button>

                        </li>


                        <li id="color-301" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="301" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                // style="background-color: #6680A1;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-312" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="312" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                //  style="background-color: #08176b;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-266" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="266" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                // style="background-color: #AC607C;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-261" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="261" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                // style="background-color: #171614;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-168" className="item-color">

                            <button type="button" className="choose-color-btn trigger-prev-img-by-color" data-color-id="168" title="choose color" aria-label="choose color">
                                <span className="color-box"
                                //  style="background-color: #fff1c7;"
                                ></span>
                            </button>

                        </li>


                    </ul>


                </div>

                <div className="meta-block">
                    <div className="wishlist-box">
                        <button type="button" className="button" title="wishlist link" aria-label="wishlist link">
                            <img src="https://www.purpleilat.co.il/wp-content/themes/qs-starter-child/images/heart_2.jpg" alt="presentation" role="presentation"></img>
                        </button>
                    </div>
                    <div className="meta-box">
                        <button type="button" className="button trigger-single-product-content" data-id="3762" go-lightbox="" title="" aria-label="">
                            <img src="https://www.purpleilat.co.il/wp-content/themes/qs-starter-child/images/loupe_2.png" alt="presentation" role="presentation"></img>
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={this.fn}>gsdgsfdgsdfg </button>
        </div>
    }

}

export default Test;
