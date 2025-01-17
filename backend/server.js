const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
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

// use bodyparser for processing JSON
app.use(bodyParser.json());
// routes
app.use('/Contact', contactRoute)



const port = 3000 || process.env.HTTP_PORT
app.listen(port, () =>{
    console.log(`Server Running 😁 on port ${port} `)
})