const express = require('express')
const cors = require('cors')
//route files
const contactRoute = require('./routes/contact')

//Cors Setup
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express()
app.get('/', (req, res) =>{
    res.send('<h1>Hello, Express.JS Server!</h1>')
})

// use Cors 
app.use(cors(corsOptions))

// routes
app.use('/Contact', contactRoute)



const port = 3000 || process.env.PORT
app.listen(port, () =>{
    console.log(`Server Running 😁 on port ${port} `)
})