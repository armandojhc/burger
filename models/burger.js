let orm = require("../config/orm.js");

// Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
let burgers = {};

burgers.all = (cb) => {
    orm.selectAll((burgers) => {
        cb(burgers);
    })
}

module.exports = burgers;