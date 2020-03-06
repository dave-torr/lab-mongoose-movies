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





// Route to each artist name.
    router.get('/celebrities/:name', (req, res, next) => {
      Celebrity.findOne({name: req.params.name })
      .then((celeb) => {
        res.render('celeb', {celeb})
        }) 
      .catch((error) => {
          console.log(error);
        })
      });
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


module.exports = router;