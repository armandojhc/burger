let express = require("express");

let burger = require("../models/burger.js");

// Create the router for the app, and export the router at the end of your file.

// router.get("/", (req, res) => {

//     burger.all((data) => {

//         //Do whatever you have to do to get handlebvars to render the burgers

//     })


// })

let router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.all(function(data) {
    let hbsObject = {
      burgers: data
    };
    //console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// -----------------------------------------

router.post("/api/burger", (req, res) => {

    console.log("Creating new burger...");
    console.log(req.body.name);
    

  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, false
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", (req, res) => {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", (req, res) => {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// --------------------------------------------------------

// Export routes for server.js to use.
module.exports = router;