const fs = require('fs');

const express = require('express');
const bodyparser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json());


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/HospiCheck', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', ()=>{

console.log("error");

})

db.once('open', ()=>{

console.log("connected to mongodb");

})


//Hospital Data Insert

const hospital = mongoose.model('hospital', {

    hospName: String,
    hospAddr: String,
    city: String,
    phone: Number,
    type: String

});



const readdata = fs.readFileSync('json.json');

    const data = JSON.parse(readdata);

    let objjson, obj;

    
   
    data.records.forEach(element => {
        
        // let count = 0;
       
        
const hospitalDataList = new hospital(
    {

        hospName: element.SV_NAME,
    hospAddr: element.STREET_NUMBER, 
    city: element.CITY,
   phone: element.PHONE_NUMBER,
   type: "hospital"
   

});

        hospitalDataList.save();

    
    });
    

    //Clinics data insert


    const clinics = mongoose.model('clinics', {

        
    clinicName: String,
    clinicAddr: String,
    city: String,
    phone: Number,
    type: String


    })

    const readdata2 = fs.readFileSync('clinics.json');

    const data2 = JSON.parse(readdata2);


    data2.records.forEach(elements => {
        

        const clinicslist = new clinics({


            
    clinicName: elements.RG_NAME,
    clinicAddr: elements.STREET_NUMBER,
    city: elements.CITY,
    phone: elements.PHONE_NUMBER,
    type: "Walkinclinics"


        })

        clinicslist.save();




    });
    

    // filtering based on different cities

    clinics.find({ city: "Vancouver" }, (err,document)=>{


        // console.log(document);


    })

    // sorting  


    const abc = hospital.find({ city: "Vancouver", phone: null } , (err, document) =>{


        console.log(document);

    }); 





  



     



    


app.listen(3000, function(){


    console.log("Server Running");
})