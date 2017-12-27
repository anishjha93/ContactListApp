var express=require('express');
var mongojs=require('mongojs');
var bodyParse=require('body-parser');
var nodemailer=require('nodemailer');
var Nexmo = require('nexmo');
var app=express();
var db=mongojs('contactList',['contactList']);
app.use(express.static(__dirname+ '/pages'));
app.use(bodyParse.json());
/*process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'anishjha93@gmail.com',
        pass:'Enter your Password Here'
    }
});
*/
app.get('/contactList',function(req,res) {
    db.contactList.find(function(err,docs) {
        res.json(docs);
    });
});

// Update the Contact List

app.get('/contactList/:id',function(req,res) {
    var id=req.params.id;
    console.log(id);
    db.contactList.findOne({_id:mongojs.ObjectId(id)},function(err,docs) {
        res.json(docs);
    });
});

app.post('/contactList',function(req,res) {
    console.log(req.body.email);
    var maildId=req.body.email;
    var name=req.body.name;
   /* var mailoptions={
        from:'Hello World',
        to:maildId,
        subject:'Successfully registered with Our Mean Stack Web App',
        html:'<h4>Hi '+name+'.</h4>'+'<br><p> You Have SuccessFully Registered With Our Web Application</p>'
    }*/
    db.contactList.insert(req.body,function(err,doc) {
        res.json(doc);
       /* transporter.sendMail(mailoptions,function(error,info) {
            if(error)
                console.log(error);
            else
                console.log("Mail sent to "+maildId);
        });*/
    });

});

app.put('/contactList/:id',function(req,res) {
    var id=req.params.id;
    db.contactList.findAndModify({
        query:{_id:mongojs.ObjectId(id)},
        update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
        new:true
    },function(err,docs) {
        res.json(docs);
    });
});
app.delete('/contactList/:id',function(req,res) {
    var id=req.params.id;
    console.log(id);
    db.contactList.remove({_id:mongojs.ObjectId(id)},function(err,doc) {
        res.json(doc);
    });
});
app.listen(3000);