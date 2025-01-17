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
    res.send('<h1>This is Server for https://mehtakeshav.github.io/</h1>')
})

// use Cors 
app.use(cors(corsOptions))

// use bodyparser for processing JSON
app.use(bodyParser.json());
// routes
app.use('/contact', contactRoute)



const port = process.env.PORT || 3000 
app.listen(port, () =>{
    console.log(`Server Running 😁 on port ${port} `)
})