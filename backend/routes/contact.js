const express = require('express')
const router = express.Router()
const {sendEmail} = require('../controllers/contactController')

router.get('/', (req, res) =>{
    res.send('<h1>This is Contacts</h1>')
})

router.post('/SendEmail', sendEmail)


module.exports = router