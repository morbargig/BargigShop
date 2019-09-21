const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Items = require('../models/Items')
const Categories = require('../models/Categories')
const Order = require('../models/Order')
// Category

// const mongoose = require('mongoose')
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser')

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '34d361c8',
    apiSecret: 'Hdhhdhd3777',
});



router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


router.post('/addnewuser', function (req, res) {
    let u1 = new User(req.body)
    u1.save()
    res.send('succes!')
})

router.get('/getItem/:value/:text', (req, res) => {
    let value = req.params.value
    let text = req.params.text
    console.log(text, value)
    // Items.findOne({ value: text }).exec(function (err, item) {
    //     console.log(item)
    //     res.send(item)
    // })

    Items.find({}, function (err, x) {
        // console.log(x)
        let result = []
        for (let i of x) {
            // console.log(i.name)
            // i[value].includes(text) ? result.push(i) : null
            if (i[value].includes(text)) {
                // console.log(result)
                result.push(i)
            }
            // i[value].includes(text) || i[value] === text ? result.push(i) : null
        }
        res.send(result)
    })
    // console.log(result)
    // res.send(result)
})



router.get('/userByEmail/:email', (req, res) => {
    let key = Object.keys(req.params)[0]
    let value = req.params[key]
    console.log(key, value)
    User.find({ [key]: value }).exec(function (err, user) {
        console.log(user)
        res.send(user)
    })
})


router.delete('/deleteItem/:id', (req, res) => {
    let id = req.params.id
    Items.findOneAndDelete({ "_id": id }, function (err, x) {
        res.send(x)
    })
})



router.get('/getItems', (req, res) => {
    Items.find({}, function (err, Items) {
        res.send(Items)
    })
})

getCatgoties = async function () {
    let id = "5d62ea1f8cf5dc39488c1000"
    let obj = {
        id: id,
        Catgories: []
    }
    let obj1 = {}
    await Items.find({}).exec(function (err, items) {
        items.forEach(t =>
            t.Category.forEach(c => obj1[c] = { name: c, img: t.image, Discraption: t.Discraption })
        )
        for (let i in obj1) {
            // let obj2 =  obj1[i] 
            obj.Catgories.push(obj1[i])
        }
        // console.log(obj.Catgories)

        Categories.findOneAndDelete({ id: id }, function (err, x) {
        })
        new Categories(obj).save()
    })
}

router.get('/getbyfield/:Category', function (req, res) {
    let key = Object.keys(req.params)[0]
    let value = req.params[key]
    Items.find({}).exec(function (err, items) {
        result = []
        items.map(i => i.Category.map(c => c === value ? result.push(i) : null))
        console.log(result)
        res.send(result)
    })
})

router.put('/upDateItem/:id', function (req, res) {
    let id = req.params.id
    let updatedData = req.body
    Items.findOneAndUpdate({ "_id": id }, updatedData, function () {
        res.end()
        console.log(updatedData, id)

    })

})






router.get('/getUserByEmail/:email', function (req, res) {
    let key = Object.keys(req.params)[0]
    let value = req.params[key]
    console.log(key, value)
    User.find({ [key]: value }).exec(function (err, item) {
        console.log(item)
        res.send(item)
    })
})


router.get('/getbyname/:name', function (req, res) {
    let key = Object.keys(req.params)[0]
    let value = req.params[key]
    console.log(key, value)
    Items.find({ [key]: value }).exec(function (err, item) {
        console.log(item)
        res.send(item)
    })
})


router.get('/Catgories/:id', function (req, res) {
    let id = req.params.id
    if (id === '1') {
        getCatgoties()
    }
    Categories.find({}).exec(function (err, x) {
        console.log(x)
        res.send(x)
    })
})



router.post('/addNewItem', function (req, res) {
    new Items(req.body).save()
    res.send('succes!')
})

router.post('/sendEmail', (req, res) => {
    console.log("got To server")
    const helperOptions = req.body
    let transport = {
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'bargigshop@gmail.com',
            pass: 'bargig18765432',
        },
        tls: { rejectUnauthorized: false }
    }
    let transporter = nodemailer.createTransport(transport);
    transporter.sendMail(helperOptions, (err, info) => {
        if (err) { return console.log(err) }
        else { return console.log(info) }
    })
    console.log('email sent!')
    res.send("Email Sent")
})


router.get('/searchByCatagory/:Catagory/:text', (req, res) => {
    // let a = req.body
    let Catagory = req.params.Catagory
    let text = req.params.text
    console.log(text, Catagory)



    if (Catagory === "price") {
        Items.find({}, function (err, x) {
            let result = []
            x.map(u => u[Catagory] < parseInt(text) ? result.push(u) : console.log(u[Catagory]))
            // console.log(result)
            res.send(result)
        })
    } else if (Catagory === 'Category' || Catagory === 'sizes') {

        Items.find({}, function (err, x) {
            let result = []
            x.map(x => x[Catagory].map(c => c.includes(text) || c === text ? result.push(x) : null))
            // console.log(result)
            res.send(result)
        })
    } else if (Catagory === "color") {
        Items.find({}, function (err, x) {
            let result = []
            x.map(x => x[Catagory] ? Object.keys(x[Catagory]).map(c => c.includes(text) || c === text ? result.push(x) : null) : null)
            // console.log(result)
            res.send(result)
        })
    } else {
        console.log(text, Catagory)
        Items.find({}, function (err, x) {
            let result = []
            x.map(u => u[Catagory].includes(text) || u[Catagory] === text ? result.push(u) : console.log(u[Catagory]))
            // console.log(result)
            res.send(result)
        })
    }
})



router.post('/addToShoppingCard/:id', (req, res) => {
    let id = req.params.id
    const data = req.body
    console.log(data)
    let o = new Order(data)
    o.save()
    res.end('saved')
    User.find({}).exec(function (err, x) {
        // console.log(x)
        // res.send(x)
        let user = x.find(u => u._id === id)
        user.ShoppingCard.push(o)
        User.findOneAndUpdate({ "_id": id }, user, function () {
            res.end()
            console.log(user, id)
        })
    })
})

router.get('/ShoppingCard/:id', function (req, res) {
    let id = req.params.id
    User.findOne({ "_id": id }).exec(function (err, x) {
        console.log(x)
        res.send(x)
    })
})


router.get('/getSomethinBySomeFiedAndValue/:Collection/:filed/:value', function (req, res) {
    let Collection = req.params.Collection
    let filed = req.params.filed
    let value = req.params.value
    Collection = require(`../models/${Collection}`)
    // console.log(collection)
    console.log(Collection, filed, value)
    Collection.findOne({ [filed]: value }).exec(function (err, x) {
        console.log(x)
        res.send(x)
    })
})

// obj = {
//     _id: "WIRYk0LmHyZn09qSfc6etDpykMu1",
//     points: 5,
//     appointments: [],
//     name: "jnkj",
//     password: "123456",
//     phone: "nkjnkjnkjn",
//     email: "issacbar92@gmail.com",
//     city: "nkjnkj",
//     ShoppingCard: [],
//     img: "https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/BargigShopItems%2FWhatsApp%20Image%202019-09-04%20at%2012.40.31.jpeg?alt=media&token=b05e2e26-b925-4635-8989-0a1273fc65f7",

// }

// let x = function () {
//     new User(obj).save()
// }
// x()


// router.get('/route', function (req, res) {
//     // let id = req.params.id
//     // User.findOne({ "_id": id }).exec(function (err, x) {
//     // console.log(x)
//     // })
//     res.send(process.env.port)
// })

router.get('/sendSms/:from/:to/:text', function (req, res) {
    let from = req.params.from
    let to = req.params.to
    let text = req.params.text
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
})


module.exports = router
