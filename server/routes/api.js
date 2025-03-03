
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Items = require('../models/Items')
const Categories = require('../models/Categories')
// const Order = require('../models/Order')

const sendMassege = require("./sendMassege")

const transport = require("./transport")

const nodemailer = require('nodemailer');


const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


router.post('/addnewuser', function (req, res) {
    new User(req.body).save()
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
        Catagories: []
    }
    let obj1 = {}
    await Items.find({}).exec(function (err, items) {
        items.forEach(t =>
            t.Category.forEach(c => obj1[c] = { name: c, img: t.image, Description: t.Description })
        )
        for (let i in obj1) {
            // let obj2 =  obj1[i] 
            obj.Catagories.push(obj1[i])
        }
        // console.log(obj.Catagories)

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


router.get('/Catagories/:id', function (req, res) {
    let id = req.params.id
    if (id === '1') {
        getCatgoties()
    }
    Categories.find({}).exec(function (err, x) {
        console.log(x)
        res.send(x)
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


router.post('/addNewItem', function (req, res) {
    new Items(req.body).save()
    res.send('succes!')
})

router.post('/sendEmail', (req, res) => {
    console.log("got To server")
    const helperOptions = req.body
    let transporter = nodemailer.createTransport(transport);
    transporter.sendMail(helperOptions, (err, info) => {
        if (err) { return console.log(err) }
        else { return console.log(info) }
    })
    console.log('email sent!')
    res.send("Email Sent")
})


router.get('/searchBycategory/:category/:text', (req, res) => {
    // let a = req.body
    let category = req.params.category
    let text = req.params.text
    console.log(text, category)



    if (category === "price") {
        Items.find({}, function (err, x) {
            let dataList = {}
            let result = []
            x.map(u => u[category] < parseInt(text) ? result.push(u) && (dataList[u[category]] = null) : console.log(u[category]))
            // console.log(result)
            res.send([result, dataList])
        })
    } else if (category === "price2") {
        category = "price"
        Items.find({}, function (err, x) {
            let dataList = {}
            let result = []
            x.map(u => u[category] > parseInt(text) ? result.push(u) && (dataList[u[category]] = null) : console.log(u[category]))
            // console.log(result)
            res.send([result, dataList])
        })
    } else if (category === 'Category' || category === 'sizes') {

        Items.find({}, function (err, x) {
            let dataList = {}
            let result = []
            x.map(x => x[category].map(c => c.includes(text) || c === text ? result.push(x) && (dataList[c] = null) : null))
            // console.log(result)
            res.send([result, dataList])
        })
    } else if (category === "color") {
        Items.find({}, function (err, x) {
            let result = []
            let dataList = {}
            x.map(x => x[category] ? Object.keys(x[category]).map(c => c.includes(text) || c === text ? result.push(x) && (dataList[c] = null) : null) : null)
            // console.log(result)
            res.send([result, dataList])
        })
    } else {
        console.log(text, category)
        Items.find({}, function (err, x) {
            let result = []
            let dataList = {}
            x.map(u => u[category].includes(text) || u[category] === text ? result.push(u) && (dataList[u[category]] = null) : console.log(u[category]))
            // console.log(result)
            res.send([result, dataList])
        })
    }
})



router.put('/addToShoppingCard/:userId/:itemId', (req, res) => {
    let userId = req.params.userId
    let itemId = req.params.itemId
    console.log(userId, itemId)
    res.end('saved')
    User.find({}).exec(function (err, x) {
        // console.log(x)
        // res.send(x)
        let user = x.find(u => u._id === userId)
        user.ShopingCard.push(itemId)
        User.findOneAndUpdate({ "_id": userId }, user, function () {
            res.end()
            console.log(user, userId, itemId)
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


router.get('/getSomethingPopulateBySomeFieldAndValue/:Collection/:filed/:value', function (req, res) {
    let Collection = req.params.Collection
    let filed = req.params.filed
    let value = req.params.value
    Collection = require(`../models/${Collection}`)
    Collection.findOne({ [filed]: value }).
        populate('ShopingCard').
        exec(function (err, user) {
            console.log(user, "hsdjhfsdbjhfbsdjhb")
            res.send(user)
        })
})
// mor = function () {

//     User.find({}).
//         populate('ShopingCard').
//         exec(function (err, users) {
//             // res.send(users)
//             console.log(users[0])
//         })
// }




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

router.post('/sendSms/:from/:to', function (req, res) {
    let from = req.params.from
    let to = req.params.to
    let text = req.body.text
    console.log(text)

    let url = req.params.url
    text += url
sendMassege(from,to,text)
})

module.exports = router
