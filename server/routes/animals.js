var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/animals';   // URI for the database
var random = require('./random.js');


router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('cannot connect');
      res.sendStatus(500);
    }
    client.query('SELECT * FROM animal_pop', function (err, result) {
      done(); // Done with this connection. Can only have 10 queries running at a time.
      if (err) {
        console.log('bad query');
        res.sendStatus(500);
      }
      res.send(result.rows);
    });  
  });
});

router.post('/', function (req, res) {
  var animal = req.body;
  animal.number_animals = random(1, 100);
  console.log(animal);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('INSERT INTO animal_pop (animal, number_animals)'
                + 'VALUES ($1, $2)', // "prepared statement"
              [animal.species, animal.number_animals],
              function (err, result) {
                done();
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                }
                res.sendStatus(201);
              });
  });
});

module.exports = router;
