const express = require("express");
const path = require("path");
const mongoose= require('mongoose')
const bodyparser = require('body-parser');
const { send } = require("process");
const app = express();
const port = 8000;

main().catch(err => console.log(err));

async function main() {
mongoose.connect('mongodb://localhost/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

let contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
    

})

let Contact = mongoose.model("Contact", contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views director

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    let myData = new Contact(req.body);
    myData.save()
    .then(()=> {
        res.send("Your item has been saved to the database");

    }).catch(()=>{
        res.status(400).send("Your item has not been saved to the database");
    })
    
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
