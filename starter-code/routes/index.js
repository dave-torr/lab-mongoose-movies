const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity')

/* GET home page */
  router.get('/', (req, res, next) => {
    res.render('index');
  });
        // RAW CALL: calls celeb data from database
        // Celebrity.find()
        // .then(res => 
        //   {console.log('from res', res)
        // })

// rendering the celebrities page:
      // the call for the celebrities is done in this rendering function.
      // call is done every time. would this work better with a conditional statement? wrapped around in a function?
      router.get('/celebrities', (req, res, next) => {
        Celebrity.find()
        .then((artists) => {    
              res.render('celebrities' , {artists})
            })
        .catch((error) => {
            console.log(error);
          })
      })
      // how do I use the next in this instance to catch error?


// ARTIST PAGE:
// Route to each artist name.
    router.get('/celebrities/each/:name', (req, res, next) => {
      Celebrity.findOne({name: req.params.name })
      .then((celeb) => {
        res.render('celeb', {celeb})
        }) 
      .catch((error) => {
          console.log(error);
        })
      });

  // DELETE ARTIST
      router.post('/celebrities/each/:name/delete', (req, res, next) => {
        console.log(req.params)
        Celebrity.deleteOne({name: req.params.name})
        .then((celeb) =>{
          // console.log("DELETED")
          res.redirect('/celebrities')
        })
        .catch((error) => {
          console.log(error, "not working");
        })
      })

      // This works to get the query by ID, but the link to the route must also have the ID.
        // router.get('/celebrities/:id', (req, res, next) => {
        //   Celebrity.findById({_id: req.params.id })
        //   .then((celeb) => {
        //     res.render('celeb', {celeb})
        //     }) 
        //   .catch((error) => {
        //       console.log(error);
        //     })
        //   });

        


// ADD CELEBRITIES:
  // display celeb fomr
        router.get('/celebrities/new', (req, res, next) =>{
          res.render('addstar');
        })
      // POST info to Mongose:
        router.post('/celebrities/new', (req, res, next) => {
          const {name, occupation, catchPhrase} = req.body;
          const newStar = new Celebrity({name, occupation, catchPhrase})
          newStar.save()
          .then((celeb) =>{
            res.redirect('/celebrities')
          })
          .catch((error) => {
            console.log(error, "not working");
          })
        })







module.exports = router;