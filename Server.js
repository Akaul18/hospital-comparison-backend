const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json());


mongoose.connect('mongodb://localhost/hello', { useNewUrlParser: true });

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


// app.post('/searchQuery', (req,res)=>{
//     console.log(req.body);
//     res.json({"success":"got your request"});
// });

//Hospital Data Insert

const hospital = mongoose.model('hospital', {

    hospName: String,
    hospAddr: String,
    city: String,
    phone: Number,
    type: String,
    website: String,
    wheelchairAccess: String
    
});

const readdata = fs.readFileSync('json.json');
const data = JSON.parse(readdata);

//     // let objjson, obj;

data.records.forEach(element => {
        
    const hospitalDataList = new hospital(
    {

        hospName: element.SV_NAME,
        hospAddr: element.STREET_NUMBER, 
        city: element.CITY,
        phone: element.PHONE_NUMBER,
        type: "hospital",
        website: element.WEBSITE,
        wheelchairAccess: element.WHEELCHAIR_ACCESSIBLE
    });
    hospitalDataList.save();
});

//     //Clinics data insert

const clinics = mongoose.model('clinics', {
    
    clinicName: String,
    clinicAddr: String,
    city: String,
    phone: Number,
    type: String,
    website: String,
    wheelchairAccess: String
});




    // filtering based on different cities

    // clinics.find({ city: "Vancouver" }, (err,document)=>{


    //     // console.log(document);


    // })

    // // sorting  


    // const abc = hospital.find({ city: "Vancouver", phone: null } , (err, document) =>{


    //     console.log(document);

    // }); 


const readdata2 = fs.readFileSync('clinics.json');

const data2 = JSON.parse(readdata2);

data2.records.forEach(element => {

    const clinicslist = new clinics(
    {
    
        clinicName: element.RG_NAME,
        clinicAddr: element.STREET_NUMBER,
        city: element.CITY,
        phone: element.PHONE_NUMBER,
        type: "walkin",
        website: element.WEBSITE,
        wheelchairAccess: element.WHEELCHAIR_ACCESSIBLE
    });
    clinicslist.save();

});

app.post("/searchQuery", (req, res)=>{


console.log(req.body);



hospital.find({ city: req.body.msg }, (error,document)=>{

    console.log(document);
    
 
       });


})

// app.get('/searchQuery', async (req,res)=>{

//     console.log("hello");
//     const searchInput = req.msg;
//     // const abc=JSON.stringify(searchInput);
//     console.log(searchInput);
//     // console.log(req.body);
   
//     hospital.find({ city: searchInput  }, (error, document)=>{
 
//         console.log(document);


//    })






   
   
//     res.send("heyy");
// });

app.listen(3000, ()=> console.log("Server Running"));