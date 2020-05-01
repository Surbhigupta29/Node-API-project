const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Information = require("../models/information");
const Address = require("../models/Address");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//api to add data entry in address collection with useid and address field.
router.post("/addDataInAddress",(req, res, next) => {
    Address.find({userid: req.body.userid})  //to check if userid already exist then don't insert again.
    .exec()
    .then(data => {
        if(data.length>0){
            return res.status(409).json({
                message: "this userid already exist, insert another one.."
            });
        }
        else{
            const addressModel = new Address({
                _id: new mongoose.Types.ObjectId(),
                userid: req.body.userid,
               // name: req.body.name,
                address: req.body.address
                });
                addressModel
                .save()
                    .then(result =>{
                            // console.log('...',result);
                            res.status(201).json({
                                message: 'added data in Adress collection...'
                                 });
                            })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                         });
                });
        }
    });
});


//api to add data entry in information table/model with useid, name and address field.
router.post("/addDataInInformation",(req, res, next) => {
    Information.find({userid: req.body.userid}) 
    .exec()
    .then(data => {
        if(data.length>0){  //to check if userid already exist then don't insert again.
            return res.status(409).json({
                message: "this userid exist already"
            });
        }
        else{
            const information = new Information({
                _id: new mongoose.Types.ObjectId(),
                userid: req.body.userid,
               name: req.body.name,
                address: req.body.address
                });
                information
                .save()
                    .then(result =>{
                            // console.log('...',result);
                            res.status(201).json({
                                message: 'added data in Information Collection...'
                                 });
                            })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                         });
                });
        }
    });
});


//API to update the Information collection address field with the corresponding address matches with Address collection .
router.post("/update",(req, res, next) => {
    if(req.body.email){                     //for checking authentication by mailid
        User.find({email: req.body.email})
        .exec()
        .then(data => {
            //console.log("data:",data);
            if(data.length<1){
                return res.status(401).json({
                    message:"Auth Failed"
                });
            }
            else{
               const token=  jwt.sign({  // if auth is successfull token will be generated 
                    email: data[0].email, // and will be given as response
                    userId: data[0]._id
                }, 
                '17bjbjbuhinknk', 
                {
                    expiresIn:"1h"
                }
                );

        Address.find({})
        .exec()
        .then(data => {
            if(data.length>0){
                data.forEach(element => { 
                    Information.findOne({ userid: element.userid }, function (err, doc){
                        console.log('...',doc);
                        if(doc){
                            doc.address = element.address;
                            doc.save();
                        }
                      });
                  }); 
                  return res.status(200).json({
                    message:"updated Address field in Information Collection Successfully ",
                    token: token
                });  
            }
            else{
                console.log(err);
                        res.status(500).json({
                            error: err
                 })           
            }
        })  
     }
  });
}
    
else{
        return res.status(401).json({
            message:"Auth Failed"
        });
    }


});

module.exports = router;

