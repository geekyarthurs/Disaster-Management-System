var express = require('express');
var app = express();
var firebase = require('firebase-admin');
var config = require("./config.json")
firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://pythondatabase-21dfc.firebaseio.com/"

});



const db = firebase.firestore();
//imports
var status = true;
var a = [];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/all', (req, res) => {


   
    res.send(status);


});

app.get('/blood', (req, res) => {


    // res.send(bloods);
    var bloods = [];

    db.collection('blooddonors').get().then(x => {

            x.forEach(element => {

                bloods.push(element.data());
                

            });

            var reqBG = req.param('bloodGroup');
            console.log(reqBG);
            var fblood = bloods.filter(x => x.group == reqBG);
            console.log(fblood);
            res.send(fblood);

    })






});


app.get('/vibrate',(req,res)=> {

    db.collection('village').doc('firstdata').update({
        status: false,
        problemName : "Surface Vibration"
    });

    res.send("DONE");

})


app.get('/on', (req,res) => {

    db.collection('village').doc('firstdata').update({
        status: true
    });

    res.send("DONE");
})

app.get('/off', (req,res) => {



    db.collection('village').doc('firstdata').update({
        status: false
    });

    if(req.param('problem')){
        db.collection('village').doc('firstdata').update({
            status: false,
            problemName: req.param('problem')

        });
    }

    res.send("DONE");
})

app.get("/vibration",(req,res)=> {
    db.collection('village').doc('firstdata').update({
        status: false,
        vibration : true

    });

    res.send("VVVVV");
  })

app.get('/missingPeople',(req,res)=>{
    let persons = [];
    let missingPersons = db.collection('missingpeople').get().then(x =>{

       
            x.forEach(element => {

                persons.push(element.data());
            });

            
            // console.log(persons);
            res.send(persons);

    });

    
});

app.listen(9000);

let cityRef = db.collection('village').doc('firstdata');

let observer = cityRef.onSnapshot(snapshot => {
      status =   snapshot.data();
    });


 function getMissingPerson(){
   

    
}
