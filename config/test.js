const orm = require("./orm");

let burgers = orm.selectAll((burgers) => {

    console.log("CALLBACK FUNCTION");

    console.log(burgers);

    orm.done();

});





