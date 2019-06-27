var express = require('express');
var app = express();
var firebase = require('firebase-admin');
var config = require("./config.json")
firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://pythondatabase-21dfc.firebaseio.com/"

});


var people = [{
    name: "Shreeram KC",
    photoURL: "https://www.nzaf.org.nz/assets/ee-uploads/cache/6e456c4c746cba65/Guy-sample_376_268_s_c1.jpg",
    Location: "Kathmandu",
    ContactNo : "9813902345"
},{
    name: "Suryamukhi",
    photoURL: "https://www.telegraph.co.uk/content/dam/news/2018/10/18/TELEMMGLPICT000178131387_trans_NvBQzQNjv4BqkB6NGcx1p0Y6SxevG-oALbT5LfTkYhqvBvjfatlPy1M.jpeg?imwidth=450",
    Location: "Jhapa",
    ContactNo : "9804565685"
},{
    name: "Pratik Jha",
    photoURL: "https://www.seattleweekly.com/wp-content/uploads/2018/02/10688689_web1_180221-sea-h1b-P1.jpg",
    Location: "Surkhet",
    ContactNo : "9841424344"
}]
const db = firebase.firestore();
//imports
var status = true;
var a = [];
var bloods = [{
        name: "Shree Shrestha - 9813432576",
        bloodGroup: "A"
    },
    {
        name: "Shree Shrestha - 9813432576",
        bloodGroup: "B"
    },
    {
        name: "Ramhari Shrestha - 9813433336",
        bloodGroup: "O"
    },
    {
        name: "Ramesh Ojha- 9813432576",
        bloodGroup: "A"
    },
    {
        name: "Ramsharan Koirala - 9813431116",
        bloodGroup: "B"
    },
    {
        name: "Bikash Pokharel - 9813432576",
        bloodGroup: "O"
    },
    {
        name: "Prajin Khadka - 9810861506",
        bloodGroup: "AB"
    },
    {
        name: "Ankit Jha - 9813996644",
        bloodGroup: "AB"
    },
    {
        name: "Rameshwor Pradhan - 9813902343",
        bloodGroup: "AB"
    },
    {
        name: "Hareram Bikram Bhandari - 9811325467",
        bloodGroup: "AB"
    },

];
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
    var param = req.param('bloodGroup');

    var result = bloods.filter(x => x.bloodGroup == param);

    res.send(result);






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
    res.send(people);
});

app.listen(9000);

let cityRef = db.collection('village').doc('firstdata');

let observer = cityRef.onSnapshot(snapshot => {
      status =   snapshot.data();
    });