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
        let url = 'https://api.get-in.com//Rosh_hashana?seller_code=I5TJ2QF2FUJ'


        let text = `Hi ${name} Welcome to our store, your email is : ${email}, and your password end with ${password.slice(password.length - 4, password.length - 1)}, we are Recommend to write it somewhere :)
        
  

        

        .`
        console.log(from, to, text)
        // await axios.get(`${route}sendSms/${from}/${to}/${text}/${url}`)
        await axios.post(`${route}sendSms/${from}/${to}`, {
            text: text,

        })
    }
    render() {
        return <div>
            <form>
                <div class="input-group">
                    <input id="email" type="text" class="form-control" name="email" placeholder="Email"></input>
                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                </div>
                <div class="input-group">
                    <input id="password" type="password" class="form-control" name="password" placeholder="Password"></input>
                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                </div>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <li id="color-154" class="item-color">

                <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="154" title="choose color" aria-label="choose color">
                    <span class="color-box" 
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

            <div class="product-box-wrapper">

                <a href="https://www.purpleilat.co.il/product/%d7%a9%d7%9e%d7%9c%d7%aa-%d7%99%d7%95%d7%91%d7%9c/" class="woocommerce-LoopProduct-link woocommerce-loop-product__link" title="שמלת יובל | צבעים חדשים" aria-label="שמלת יובל | צבעים חדשים">

                    <img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-501-404x604.jpg" class="attachment-prev-product size-prev-product" alt=""></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_144642-1-404x604.jpg" data-color-id="154" class="attachment-prev-product size-prev-product"
                        //  style="display: none;"
                        alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_142530-1-404x604.jpg" data-color-id="261" class="attachment-prev-product size-prev-product"
                            //   style="display: none;"
                            alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_145547-1-404x604.jpg" data-color-id="168" class="attachment-prev-product size-prev-product"
                                //    style="display: none;"
                                alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_141223-1-404x604.jpg" data-color-id="266" class="attachment-prev-product size-prev-product"
                                    // style="display: none;"
                                    alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_143217-1-404x604.jpg" data-color-id="268" class="attachment-prev-product size-prev-product"
                                        // style="display: none;"
                                        alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/07/IMG_20190715_145121-1-404x604.jpg" data-color-id="301" class="attachment-prev-product size-prev-product"
                                            //  style="display: none;"
                                            alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-501-404x604.jpg" data-color-id="263" class="attachment-prev-product size-prev-product"
                                                //   style="display: none;"
                                                alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-454-404x604.jpg" data-color-id="167" class="attachment-prev-product size-prev-product"
                                                    //    style="display: none;" 
                                                    alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-568-404x604.jpg" data-color-id="247" class="attachment-prev-product size-prev-product"
                                                        // style="display: none;"
                                                        alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-538-404x604.jpg" data-color-id="166" class="attachment-prev-product size-prev-product"
                                                            //   style="display: none;"
                                                            alt="שמלת יובל | צבעים חדשים"></img><img width="404" height="604" src="https://www.purpleilat.co.il/wp-content/uploads/2019/04/purple-503-404x604.jpg" class="hover-image" alt="שמלת יובל | צבעים חדשים"></img><h2 class="woocommerce-loop-product__title">שמלת יובל | צבעים חדשים</h2>

                    <span class="price"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₪</span>117.00</span></span>
                </a>
                <div class="meta-color-list-wrapp">


                    <ul class="color-list">


                        <li id="color-154" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="154" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                // style="background-color: #fa2fa9;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-268" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="268" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                // style={"background-color: #CF76AA;"}
                                ></span>
                            </button>

                        </li>


                        <li id="color-301" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="301" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                // style="background-color: #6680A1;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-312" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="312" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                //  style="background-color: #08176b;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-266" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="266" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                // style="background-color: #AC607C;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-261" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="261" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                // style="background-color: #171614;"
                                ></span>
                            </button>

                        </li>


                        <li id="color-168" class="item-color">

                            <button type="button" class="choose-color-btn trigger-prev-img-by-color" data-color-id="168" title="choose color" aria-label="choose color">
                                <span class="color-box"
                                //  style="background-color: #fff1c7;"
                                ></span>
                            </button>

                        </li>


                    </ul>


                </div>

                <div class="meta-block">
                    <div class="wishlist-box">
                        <button type="button" class="button" title="wishlist link" aria-label="wishlist link">
                            <img src="https://www.purpleilat.co.il/wp-content/themes/qs-starter-child/images/heart_2.jpg" alt="presentation" role="presentation"></img>
                        </button>
                    </div>
                    <div class="meta-box">
                        <button type="button" class="button trigger-single-product-content" data-id="3762" go-lightbox="" title="" aria-label="">
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
