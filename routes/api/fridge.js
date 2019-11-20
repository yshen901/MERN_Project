const express = require("express");
const router = express.Router();
const Fridge = require('../../models/fridge');


router.get("/test", (req, res) => res.json({ msg: "This is the fridge route" }));

router.get('/:userId', (req, res) => {
  console.log(req.params.userId);
  Fridge.findOne({ userId: req.params.userId })
    .then(fridge => res.json(fridge))
    .catch(err => res.status(400).json(err));
});

router.patch('/:userId/add', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  let update = { "$set": {}};
  let options = { "upsert": true };
  update["$set"]["ingredients." + req.body.ingredientId] = req.body;

   Fridge.findOneAndUpdate({ userId: req.params.userId }, 
    update, options, function (err, data){
      if(err) return res.send(500, {error: err});
      return res.send("successfully saved");
    });
      // .then(fridge => res.json(fridge))
      // .catch(err => res.status(400).json(err));

});



// router.post('/new', (req, res) => {
//   const newFridge = new Fridge({

//   });
// });

module.exports = router;