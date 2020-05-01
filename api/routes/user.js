const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//API to register user with certain fields
router.post("/signup",(req, res, next) => {
        User.find({email: req.body.email})
        .exec()
        .then(data => {
            if(data.length>0){
                return res.status(409).json({
                    message: "email exist already"
                });
            }
            else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    phone: req.body.phone,
                    name: req.body.name,
                    age: req.body.age
                  });
                  user
                  .save()
                    .then(result =>{
                        //console.log('...',result);
                        res.status(201).json({
                            message: 'Registered Successfully'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });                
            }
        })
});


//API to authenticate user using email
router.post("/login",(req, res, next) => {
    if(req.body.email){
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
               const token=  jwt.sign({
                    email: data[0].email,
                    userId: data[0]._id
                }, 
                '17bjbjbuhinknk', 
                {
                    expiresIn:"1h"
                }
                );

                return res.status(200).json({
                    message:"Auth Successful",
                    token: token
                });  
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