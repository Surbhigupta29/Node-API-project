const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const Information = require("../models/information");
const Address = require("../models/Address");
const jwt = require("jsonwebtoken");

var output = [];
var info= {};

//API to get record with their name and address together. 
router.post("/getInformationJson",(req, res, next) => {

    if(req.body.email){      
        User.find({email: req.body.email})    //to check authentication
        .exec()
        .then(data => {
            if(data.length<1){
                    return res.status(401).json({
                    message:"Auth Failed"
                });
            }
            else{
                    const token=  jwt.sign({
                         email: data[0].email,
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
                        data.forEach( element => {  
                        Information.findOne({ userid: element.userid }, function (err, doc){
                         info = {name: doc.name, address: element.address};
                        output.push(info);
                         if(output.length==5){
                            return res.status(200).json({
                                message:"Auth Successful",
                                token: token,
                                output:output
                            });  
                         }
                           });
                      })
                       
                    }
                    else{
                       console.log(err);               
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