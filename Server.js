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
    department: Array,
    diseases: Array
});

// const readdata = fs.readFileSync('json.json');
// const data = JSON.parse(readdata);

//*******************************dont delete (insertion of records commented) */

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
//         department:["Cardiology","Ent","Gastroenterology","Gynaecology","Orthopedic"],
//         diseases: ["AIDS","Anthrax","Arthritis","Asthma","Cancer","Cardiovascular Disease",
//             "Celiac Disease","Chlamydia","Chronic Diseases","Chronic Obstructive Pulmonary Disease",
//             "Dengue Fever","Diabetes","Food Allergies and Intolerances","Genital Herpes","Gonorrhoea",
//             ,"Heart Disease","Hepatitis","Influenza Flu", "Lupus","Lyme Disease","Lymphogranuloma venereum (LGV)", "Mad Cow Disease (BSE)", "Malaria",
//             "Measles","Meningococcal Disease","Mental Health","Obesity","Osteoarthritis","Osteoporosis",
//             "Rabies","Reye's Syndrome","Sexually Transmitted Infections","Stroke","Sudden Infant Death Syndrome (SIDS)",
//             "Syphilis","Tuberculosis (TB)","West Nile Virus","Yellow Fever"]
        
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
    department: Array,
    diseases: Array
});




    // filtering based on different cities

    // clinics.find({ city: "Vancouver" }, (err,document)=>{


    //     // console.log(document);


    // })

    // // sorting  


    // const abc = hospital.find({ city: "Vancouver", phone: null } , (err, document) =>{


    //     console.log(document);

    // }); 



//*******************dont delete. Clinics data inserted */

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
//         department: ["Cardiology","Ent","Gastroenterology","Gynaecology","Orthopedic"],
//         diseases: ["AIDS","Anthrax","Arthritis","Asthma","Cancer","Cardiovascular Disease",
//             "Celiac Disease","Chlamydia","Chronic Diseases","Chronic Obstructive Pulmonary Disease",
//             "Dengue Fever","Diabetes","Food Allergies and Intolerances","Genital Herpes","Gonorrhoea",
//             ,"Heart Disease","Hepatitis","Influenza Flu", "Lupus","Lyme Disease","Lymphogranuloma venereum (LGV)", "Mad Cow Disease (BSE)", "Malaria",
//             "Measles","Meningococcal Disease","Mental Health","Obesity","Osteoarthritis","Osteoporosis",
//             "Rabies","Reye's Syndrome","Sexually Transmitted Infections","Stroke","Sudden Infant Death Syndrome (SIDS)",
//             "Syphilis","Tuberculosis (TB)","West Nile Virus","Yellow Fever"]
//     });
//     clinicslist.save();

// });

app.post("/searchQuery", (req, res)=>{

    console.log(req.body.searchinput);
    // const capitalize = (st) =>{
    //     if(typeof st!=='string') return '';
    //     return st.charAt(0).toUpperCase() + st.slice(1);
    // }
    // searchinput = capitalize(searchinput);

  
    
    
//     hospital.find( {type:"hospital",$or:[ {hospName: new RegExp(req.body.searchinput)}, {PHONE_NUMBER: new RegExp(req.body.searchinput)}], city: req.body.searchcity} , 
//   function(err,docs){
//     if(!err) {
//         res.send(docs);
//     console.log(docs);
//     }
    
// });

    hospital.find().and([
        { $or: [{hospName:{$regex:req.body.searchinput,$options:'i'}}, {type: {$regex:req.body.searchinput,$options:'i'}}, {department: {$regex:req.body.searchinput,$options:'i'}},
        {diseases: {$regex:req.body.searchinput,$options:'i'}}]},
        {city: req.body.searchcity}
    ]).sort({ rating: -1 }).exec((err,docs)=>{
        if(!err) {
           
            res.send(docs);
            console.log(docs);
            console.log(docs.length);
        }
    });
    // hospital.find({ department: req.body.searchinput}, (error,document)=>{
        
       
    //     console.log(document);

   
        
   
    });
// .sort({ hospName: "BC Children's Hospital" });
//     hospital.find({ hospName:req.body.searchinput,city: req.body.searchcity}, (error,document)=>{
//         console.log(document);
//     });
// });


// app.get('/searchQuery', async (req,res)=>{

//     console.log("hello");
//     const searchInput = req.msg;
//     // const abc=JSON.stringify(searchInput);
//     console.log(searchInput);
//     // console.log(req.body);
   
//     hospital.find({ city: searchInput  }, (error, document)=>{
 
//         console.log(document);


app.get("/searchQuery", async (req,res)=>{
    // console.log(req.body);
    // res.json("welcome");
    const hospDetails = await hospital.find();
    res.json(hospDetails);
});


app.post("/searchQuery2", (req, res)=>{

    // JSON.stringify(req.body);

    // console.log(req.body.searchcity1);
    // console.log();



    hospital.find( {$or:[ {hospName: req.body.searchcity1.trim()},{hospName: req.body.searchcity2.trim()}]}).exec((err,docs)=>{


            if(err){
                console.log(err);
            }
            else {
                res.json(docs);
                console.log(docs);
            }

    })
    




});


app.listen(3000, ()=> console.log("Server Running"));

