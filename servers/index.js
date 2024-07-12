const express = require('express')
const mongoose = require('mongoose')
const InfoModel = require('./models/Information')
const ItemModel = require('./models/ItemModel')
const UserModel = require('./models/User')
var md5 = require("md5")
var nodemailer = require('nodemailer');
const crypto = require('crypto')

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())



let verifyCode

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://nguyenkhangphuc2005:1231232312123@shoppingdb.b1a0wet.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'Saving-docs'
        });
        console.log(conn.connection.host)
    } catch (err) {
        console.log(err)
    }
}
connectDB().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 8000")
    })


    // app.listen(3000, () => {
    //     console.log("Server is running on port 3000")
    // })
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenkhangphuc2005@gmail.com',
        pass: 'eybfdaaclnqhwxms'
    }
});



app.listen(8000, () => {
    console.log('Sever is running')
})

app.post('/', (req, res) => {
    InfoModel.create(req.body)
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.get('/', (req, res) => {
    InfoModel.find({})
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})

app.post('/update', (req, res) => {
    const { id, list } = req.body
    InfoModel.deleteOne({ _id: id })
        .then(dropAct => {
            res.json(dropAct)
        })
        .catch(err => console.log(err))
})
app.post('/update-text', (req, res) => {
    const { id, updateText } = req.body
    InfoModel.updateOne({ _id: id }, { actText: updateText })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-imgs', (req, res) => {
    const { id, updateImgs } = req.body
    InfoModel.updateOne({ _id: id }, { actImgs: updateImgs })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-mediaUrl', (req, res) => {
    const { id, updateMediaUrl } = req.body
    InfoModel.updateOne({ _id: id }, { mediaUrl: updateMediaUrl })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-brief', (req, res) => {
    const { id, updateBrief } = req.body
    InfoModel.updateOne({ _id: id }, { actBrief: updateBrief })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-assessment', (req, res) => {
    const { id, updateAssessment } = req.body
    InfoModel.updateOne({ _id: id }, { actAssessment: updateAssessment })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-form', (req, res) => {
    const { id, updateForm } = req.body
    InfoModel.updateOne({ _id: id }, { form: updateForm })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-intNum', (req, res) => {
    const { id, updateInteract } = req.body
    InfoModel.updateOne({ _id: id }, { interactionNum: updateInteract })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-startDate', (req, res) => {
    const { id, updateStartDate } = req.body
    InfoModel.updateOne({ _id: id }, { startDate: updateStartDate })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.post('/update-endDate', (req, res) => {
    const { id, updateEndDate } = req.body
    InfoModel.updateOne({ _id: id }, { endDate: updateEndDate })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.post('/update-name', (req, res) => {
    const { id, updateTitle } = req.body
    InfoModel.updateOne({ _id: id }, { actName: updateTitle })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/update-filterList', (req, res) => {
    const { id, newFilter } = req.body;
    InfoModel.updateOne({ _id: id }, { filterList: newFilter })
        .then(result => res.json(result))
        .catch(err => {
            console.error('Error updating filter list in database:', err);
            res.status(500).json({ error: 'Internal Server Error' })
        });
});
app.get('/get-item', (req, res) => {
    ItemModel.find({})
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/update-item', (req, res) => {
    const { itemId, listItem } = req.body
    ItemModel.updateOne({ _id: itemId }, { itemList: listItem })
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})
app.post('/delete-item', (req, res) => {
    const { itemId, listItem } = req.body
    ItemModel.updateOne({ _id: itemId }, { itemList: listItem })
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})
app.post('/update-chosen-item', (req, res) => {
    const { itemId, listItem } = req.body
    ItemModel.updateOne({ _id: itemId }, { itemList: listItem })
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})
app.post('/sign-in', (req, res) => {
    let { signInEmail, signInPassword } = req.body
    signInPassword = md5(signInPassword)
    UserModel.findOne({ Email: signInEmail })
        .then(user => {
            if (user) {
                if (user.Password == signInPassword) {
                    res.json({ mssg: 'success', user })
                } else {
                    res.json('Wpw')
                }
            } else {
                res.json('Not existed user')
            }
        })
        .catch(err => console.log(err))
})



app.post('/find-email', (req, res) => {
    verifyCode = crypto.randomInt(
        100000, 999999
    )
    const { email } = req.body
    var mailOptions = {
        from: 'nguyenkhangphuc2005@gmail.com',
        to: `${email}`,
        subject: 'Your verify code is here',
        text: `${verifyCode}`
    };
    UserModel.findOne({ Email: email })
        .then(user => {
            if (!user) {
                res.json('Wrong email information')
            } else {
                res.json(user)
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        })
})
app.post('/check-verifyCode', (req, res) => {
    const { code } = req.body
    if (code == verifyCode) {
        res.json('success')
    } else {
        res.json('Wrong verification code')
    }
})
app.post('/change-pw', (req, res) => {
    let { email, newPw } = req.body
    newPw = md5(newPw)
    UserModel.updateOne({ Email: email }, { Password: newPw })
        .then((result) => {
            res.json(result)
        })
        .catch(err => console.log(err))
})
