
  import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
let mongoose = require('mongoose')
const { Schema } = mongoose;

//Create a person having this prototype:
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: Array
})

//Create and Save a Record of a Model:
var Person = mongoose.model('Person', personSchema);

//Create Many Records with model.create()
var createAndSavePerson = function() {
  var person = new Person({name: "Mohamed Kefi", age: 32, favoriteFoods: ["Carrote", "Kouskous"]},
  {name: "Mary Crus", age: 40, favoriteFoods: ["Salad", "Spaguetti"]},
  {name: "Ines Hammami", age: 32, favoriteFoods: ["chicken", "Orange"]}
  );

  person.save(function(err, data) {
    if (err) {
     console.log(err)
    }
    console.log(data)
  });
};

//Use model.find() to Search Your Database
var findPeopleByName = function(personName, done) {

  var query = Person.findOne( {name: personName})
      query.exec(function (err, data) {
       if(err) return done(err)
      return done(null,data);     
      }); 
   }


   //Use model.findOne() to Return a Single Matching Document from Your Database
   var findPersonById = (personId, done) => {
    Person.findById(Person.personId, (err, data) => err ? done(err) : done(null, data)); 
  };


  var findAndUpdate = function(personName, done) {
    var ageToSet = 20;
    
 //Perform New Updates on a Document Using model.findOneAndUpdate()
    Person.findOneAndUpdate(
      {"name": personName},
      {$set: {"age":ageToSet}},{returnNewDocument : true}, 
      function(err, doc){
                      if(err){
                          console.log("Something wrong when updating record!");
                      }
                      console.log(doc);
  })};

  //Delete One Document Using model.findByIdAndRemove
  var removeById = function(personId, done) {
    Model.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));
    };

    //MongoDB and Mongoose - Delete Many Documents with model.remove()
    var removeManyPeople = function(done) {
      var nameToRemove = "Mary";
      Person.deleteMany({name: nameToRemove}, function(err, data) {
        if (err) {
          done(err);
        } else {
          done(null, data);
        }
      });
    };

    //Chain Search Query Helpers to Narrow Search Results
    var queryChain = function(done) {
      var foodToSearch = "burrito";
      Person.find({favoriteFoods:foodToSearch}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
         if(err)
           done(err);
        done(null, data);
      })
    };


const Person = mongoose.model('Person', personSchema)


 
