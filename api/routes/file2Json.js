const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CVSToJSON = require('csvtojson');
const FileSystem = require('fs');

//Write API to Convert the CSV file data to JSON format
router.get("/getFilteredJSON",(req, res, next) => {
    CVSToJSON().fromFile("./source.csv").then(source=>{
       // console.log(source);
        const arr1 = source.filter(d => d.age > 50);  //Filter the person whose age is greater than 50
       // console.log('arr1', arr1);
        if(arr1.length>0)
        res.send(arr1);
        else{
            res.status(200).json({
                message: 'No data exist of age greater than 50 in database'
            });
        }   
    })       
});


module.exports = router;