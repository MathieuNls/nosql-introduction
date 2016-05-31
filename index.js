// $ mkdir introduction-nosql
// $ cd introduction-nosql
// $ npm install mongodb
// $ touch index.js
// $ node index.js (to execute)

// require mongodb to use it
var mongodb = require('mongodb');

// Fetch the mongo client
var mongoClient = mongodb.MongoClient;

// Define connection url
// Available until June 10th
var url = 'mongodb://heroku_ts5mz99j:vfga87p833gpnu38q5to3p080h@ds019123.mlab.com:19123/heroku_ts5mz99j';


//use the connect function to open a connection
mongoClient.connect(url, function(err, db){

  if(err){
    console.log("Unable to connect");
  } else {
    console.log("Connection established to", url);
  }

  var collection = db.collection('users');

  var user1 = {name: 'Mathieu', lastname: 'Nayrolles', roles:['user', 'admin', 'moderator']};
  var user2 = {name: 'Guillaume', lastname: 'George', roles:['user']};

  collection.insert([user1, user2], function(err, result){
    if(err){
      console.log(err);
    } else {
      console.log("Inserted", result.insertedCount, "documents into users. Documents are", result);
    }

     // Map
    collection.find({}).toArray(function(err, result){
      if(err){
        console.log(err);
      } else {
        console.log("Found", result.length, "documents", result);
      }

      //Filter / shuffle / sort
      var admins = result.filter(function(elem, index, array){
        return array[index].roles.indexOf('admin') >= 0;
      });

      // Reduce
      var sumRolePerAdminUser = admins.reduce(function(preVal, elem){
        elem.roles.push("Noob");
        return preVal + elem.roles.length;
      }, 0);
      //Average number of roles for admin 3
      console.log("Average number of roles for admin", sumRolePerAdminUser/admins.length);

      db.close();
    });

  });

});
