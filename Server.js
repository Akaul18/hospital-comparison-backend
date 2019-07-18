const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json());


mongoose.connect('mongodb://localhost/hospicheck', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', ()=>{
    console.log("error");
});

db.once('open', ()=>{
    console.log("connected to mongodb");
});

app.use((req, res, next)=> {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

//Hospital Data Insert

const hospital = mongoose.model('hospital', {

    hospName: String,
    hospAddr: String,
    city: String,
    phone: Number,
    type: String,
    website: String,
    wheelchairAccess: String,
    rating: Number,
    // department: [{type1:String,type2:String,type3:String,type4:String,type5:String}]
    department: [String]
});

// const readdata = fs.readFileSync('json.json');
// const data = JSON.parse(readdata);

// data.records.forEach(element => {
        
//     const hospitalDataList = new hospital(
//     {

//         hospName: element.SV_NAME,
//         hospAddr: element.STREET_NUMBER, 
//         city: element.CITY,
//         phone: element.PHONE_NUMBER,
//         type: "hospital",
//         website: element.WEBSITE,
//         wheelchairAccess: element.WHEELCHAIR_ACCESSIBLE,
//         rating: (Math.random() * (4 - 3 + 1) + 3).toFixed(1),
//         department: ["Cardiology","Ent","Gastroenterology","Gynaecology","Orthopedic"]
        
//     });
//     hospitalDataList.save();
// });

//     //Clinics data insert

const clinics = mongoose.model('clinics', {
    
    clinicName: String,
    clinicAddr: String,
    city: String,
    phone: Number,
    type: String,
    website: String,
    wheelchairAccess: String,
    rating: Number,
    // department: [{type1:String,type2:String,type3:String,type4:String,type5:String}]
    department: [String]
});


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
//         wheelchairAccess: element.WHEELCHAIR_ACCESSIBLE,
//         rating: (Math.random() * (4 - 3 + 1) + 3).toFixed(1),
//         department: ["Cardiology","Ent","Gastroenterology","Gynaecology","Orthopedic"]
//     });
//     clinicslist.save();

// });

app.post("/searchQuery", (req, res)=>{

    console.log(req.body.searchinput);
    
    // hospital.find().and([
    //     { $or: [{hospName:{$regex:req.body.searchinput,$options:'i'}}, {type: {$regex:req.body.searchinput,$options:'i'}}]},
    //     {city: req.body.searchcity}
    // ]).sort({ rating: -1 }).exec((err,docs)=>{
    //     if(!err) {
    //         res.send(docs);
    //         console.log(docs);
    //     }
    // });
    // hospital.find({department: {$regex:req.body.searchinput,$options:'i'}},(err,doc)=>{
    //     console.log(doc);
    // });
});

app.get("/searchQuery", async (req,res)=>{
    // console.log(req.body);
    // res.json("welcome");
    const hospDetails = await hospital.find();
    res.json(hospDetails);
});

app.listen(3000, ()=> console.log("Server Running"));

