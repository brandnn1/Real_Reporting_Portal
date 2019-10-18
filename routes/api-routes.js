// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
const Json2csvParser = require('json2csv').Parser;
var fs = require('fs');

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  // app.get("/api/users/", function(req, res) {
  //   db.User.findOne({
  //     email = req.body.email
  //   })
  //     .then(function(dbUser) {
  //       res.json(dbUser);
  //     });
  // });

  

  // Get route for returning posts of a specific category
  // app.get("/api/users/category/:category", function(req, res) {
  //   db.User.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   })
  //     .then(function(dbUser) {
  //       res.json(dbUser);
  //     });
  // });

  // Get route for retrieving a single post

  app.post("/api/users2/", function(req, res) {
    //console.log(req.body);
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ Error: "Missing fields for login" });
    }
    // search a user to login
    db.User.findOne({ where: { username: req.body.username } }) // searching a user with the same username and password sent in req.body
      .then(function (user) {
      //  console.log(user)
      //  console.log(user.dataValues.password)
    //   if(user && (user.validPassword(password))) {

    //     return res.send("/data");
    //  }
          if(user) {
           return res.send("/data");
        } else {
      return res.status(401).json({message: "Unauthorized"});
        }

  
      }).catch(function (err) {
        return res.status(200).json({ message: "server issues when trying to login!" }); // server problems
        
      });
});

  // POST route for saving a new post
  app.post("/api/users/", function(req, res) {

    var hash = bcrypt.hashSync(req.body.password, 10)
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  app.post("/api/report/", function(req, res) {
    console.log(req.body);

    db.seattle_pd_crime_data.findAll({ 
      where: { Summarized_Offense_Description: req.body.Summarized_Offense_Description, 
      Date_Occurred: {
          [Op.gte]: req.body.Date_Occurred // soon to be replaced by [Op.lte]
        }, 
      Date_Occurred_End: {
          [Op.lte]: req.body.Date_Occurred_End // soon to be replaced by [Op.lte]
        }, 
      District_Sector: {
          [Op.in]: req.body.District_Sector
        }
      }
      
    }) // searching a user with the same username and password sent in req.body
      .then(function (report) {
       var fields = ['RMS_CDW_ID', 'General_Offense_Number', 'Offense_Code', 'Offense_Code_Extension', 'Offense_Type', 'Summary_Offense_Code', 'Summarized_Offense_Description, Date_Reported', 'Occurred_Date_or_Date_Range_Start', 'Occurred_Date_Range_End', 'Hundred_Block_Location', 'District_Sector', 'Zone_Beat', 'Longitude', 'Latitude', 'Location', 'Date_Occurred', 'Date_Occurred_End'];
       const json2csvParser = new Json2csvParser({ fields: fields});
       var csv = json2csvParser.parse(report)
       var path = __dirname + '/../public/csv/file' + Date.now() + '.csv';
       fs.writeFile(path, csv, function () {
         console.log(path);
         res.send(path) 
         //res.download(path)
          

          //  link = document.createElement("a"); //create 'a' element
          //  link.setAttribute("href", path); //replace "file" with link to file you want to download
          //  link.setAttribute("download", path);// replace "file" here too
          //  link.click();


          


       });
      //  
})
})

app.post("/api/data/", function(req, res) {
  console.log(req.body);

  db.seattle_pd_crime_data.findAll({ 
    where: { Summarized_Offense_Description: req.body.Summarized_Offense_Description, 
    Date_Occurred: {
        [Op.gte]: req.body.Date_Occurred // soon to be replaced by [Op.lte]
      }, 
    Date_Occurred_End: {
        [Op.lte]: req.body.Date_Occurred_End // soon to be replaced by [Op.lte]
      }, 
    District_Sector: {
        [Op.in]: req.body.District_Sector
      }
    }
    
  }) // searching a user with the same username and password sent in req.body
    .then(function (search) {
     console.log(search)
     res.json(search)
    //  
})
})
};
