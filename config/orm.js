let connection = require("../config/connection.js");

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
// let orm = {};

// selectAll()
// orm.selectAll = (callback) => {

//     connection.query("SELECT * FROM burger_db.burgers", (err, res) => {

//         if (err) {
//             console.log(err);
//         } else {
//             return callback(res);
//         }

//     })

// }

// orm.done = () => {
//     connection.end();
// }
// insertOne()
// updateOne()

function mysqlSyntaxValuePlaceHolder(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

let orm = {

    all: function(tableInput, cb) {// 
      let queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    // This is where new burger that is created is added to the burgers table 
    create: function(table, cols, vals, cb) {
        // How does it know which table to insert to?
        let queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += mysqlSyntaxValuePlaceHolder(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, (err, result) => {
          if (err) {
            throw err;
          }

        //   Not really sure what this does. I know is has to do with the whole query syntax 
    
          cb(result);
        });
      },

     // An example of objColVals would be {name: panther, sleepy: true}
    //  In this case we will use this to update if burger has been devoured .
    update: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
        if (err) {
            throw err;
        }

        cb(result);
    });
  },

  delete: function(table, condition, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};


// Export the orm object for the model (burger.js).
module.exports = orm;