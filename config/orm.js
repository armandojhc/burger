let connection = require("../config/connection.js");

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
let orm = {};

// selectAll()
orm.selectAll = (callback) => {

    connection.query("SELECT * FROM burger_db.burgers", (err, res) => {

        if (err) {
            console.log(err);
        } else {
            return callback(res);
        }

    })

}

orm.done = () => {
    connection.end();
}
// insertOne()
// updateOne()






module.exports = orm;