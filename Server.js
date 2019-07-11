const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.text());


mongoose.connect('mongodb://localhost/hospicheck', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', ()=>{
    console.log("error");
});

db.once('open', ()=>{
    console.log("connected to mongodb");
});

// app.use((req,res)=>{
//     console.log(req.body);
//     next();
// });

app.get('/searchQuery/',(req,res)=>{
    const searchInput = req.query.searchinput;
    // const abc=JSON.stringify(searchInput);
    console.log(searchInput);
    // console.log(req.body);
    res.send("heyy");
});

//Hospital Data Insert

// const hospital = mongoose.model('hospital', {

//     hospName: String,
//     hospAddr: String,
//     city: String,
//     phone: Number,
//     type: String,
//     website: String,
//     wheelchairAccess: String
    
// });

// const readdata = fs.readFileSync('json.json');
// const data = JSON.parse(readdata);

//     // let objjson, obj;

// data.records.forEach(element => {
        
//     const hospitalDataList = new hospital(
//     {

//         hospName: element.SV_NAME,
//         hospAddr: element.STREET_NUMBER, 
//         city: element.CITY,
//         phone: element.PHONE_NUMBER,
//         type: "hospital",
//         website: element.WEBSITE,
//         wheelchairAccess: element.WHEELCHAIR_ACCESSIBLE
//     });
//     hospitalDataList.save();
// });

//     //Clinics data insert

// const clinics = mongoose.model('clinics', {
    
//     clinicName: String,
//     clinicAddr: String,
//     city: String,
//     phone: Number,
//     type: String,
//     website: String,
//     wheelchairAccess: String
// });

// const readdata2 = fs.readFileSync('clinics.json');

// const data2 = JSON.parse(readdata2);

// data2.records.forEach(element => {

//     const clinicslist = new clinics(
//     {
    
//         clinicName: element.RG_NAME,
//         clinicAddr: element.STREET_NUMBER,
//         city: element.CITY,
//         phone: element.PHONE_NUMBER,
//         type: "walkin",
//         website: element.WEBSITE,
//         wheelchairAccess: element.WHEELCHAIR_ACCESSIBLE
//     });
//     clinicslist.save();

// });

app.listen(3000, ()=> console.log("Server Running"));