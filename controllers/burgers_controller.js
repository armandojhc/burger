let express = require("express");

let burger = require("../models/burger.js");

// Create the router for the app, and export the router at the end of your file.

router.get("/", (req, res) => {

    burger.all((data) => {

        //Do whatever you have to do to get handlebvars to render the burgers

    })


})