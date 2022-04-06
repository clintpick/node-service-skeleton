const express = require('express');
const app = express();
const fs = require('fs');

const port = '3000'; // set our port
const csv=require('csvtojson');
const { json } = require('express/lib/response');

const csvFilePath='people.csv'



  app.get('/api/v1/person', (req, res) => {
    //return res.send('Received a GET HTTP method');
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        //console.log(jsonObj);
      return (res.json(jsonObj));
    });
  });
  
  app.get('/api/v1/person/:id', function(req, res) {

    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      //console.log(jsonObj);

      const results = jsonObj.filter(obj => {
        return obj.code === req.params.id;
      });

      if(results.length > 0){
        return  res.json(results);

      }
      else{
       // return res.send("No person found with the given person code")
        return res.status(500).send("No person found with the given person code");
      }
      
    });

  });

  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
  app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });
  
  app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);