// REQUIRE NPM PACKAGES
var inquirer = require('inquirer');
var mysql = require('mysql');
// CREATE VARIABLE OR CONNECTION TO DATABASE
var connection = mysql.createConnection({
	host: "localhost", 
	port: 3306,
	user: "root",
	password: "batman5356",
	database: "bamazon_DB"
});

// MAKE SURE DATABASE IS CONNECTED
connection.connect(function(err) {
	if (err) throw err;
	// console.log("id: " + connection.threadId);
	
});




// ARRAY FOR LIST OF ITEMS
var arrayItem = ["100-1","100-2","100-3","100-4","100-5","100-6","100-7","100-8", "100-9", "10-10"];
	
	connection.query("SELECT * FROM item_list ", function (err, res) {
		console.log("Here are list of items available for purchase: " +
				"\nitem#: " );
		for (var i = 0; i < 10; i++) {
			console.log("\nitem#: " + arrayItem[i] + " name: " + res[i].product_name);
			// console.log(arrayItem[i]);
			// console.log("item: " + arrayItem[i] + " || " + res.product_name[i]);
		}
	})

	// itemSearch.prototype.printInfo = function () {

	// }


// GRAB TABLE IN DATABASE AND START APP
connection.query("SELECT * FROM item_list", function(err, res) {
	if(err) throw err;
	// console.log('res', res);
	// console.log(res);
	itemSearch();
})

var itemSearch = function () {


	inquirer.prompt({
		type: 'list',
		name: 'items',
		message: "Which item number would you like to purchase?",
		choices: ["100-1","100-2","100-3","100-4","100-5","100-6","100-7","100-8", "100-9", "10-10"]
	}).then(function (answers) {

		
		if (answers.items === "100-1") {
			// CREATE CONNECTION AND QUERY TO SHOW ITEM CHOSEN
			connection.query("SELECT * FROM item_list", function (err, res) {
				console.log("ID#: " + res[0].item_id + " ||" + " Name: " + res[0].product_name + " ||" + 
				" Stock: " + res[0].stock_quantity);
			
				//--------------------------------------------------------------------------
				inquirer.prompt({
		type: 'input',
		name: 'quantity',
		message: "How many of these items would you like to purhchase?"
	
		}).then(function (answers) {
			//HOW MANY ITEMS ARE LEFT IN STOCK AND SAVE TO VARIABLE
			var countItem = res[0].stock_quantity;
			// USER INPUT OF HOW MANY ITEMS THEY WANT
			var quantity = answers.quantity;
			// TOTAL PRICE OF ITEMS SELECTED
			var totalPrice = answers.quantity * res[0].price;
			// TOTAL STOCK AMOUNT AFTER PURCHASE
			var total = countItem - quantity;

			//UPDATE DATABASE
			connection.query("UPDATE item_list SET ? WHERE ?", [{
				stock_quantity: 7
			}, { item_id: "1001"

			}], function(err, res) {
				if (err) throw err;
				// console.log(res);
			})
			
			if (total < 0){
				console.log("ERROR***NOT AVAILABLE IN STOCK*****");

			} else {
				console.log("There are " + total + " left!");
				console.log("Your total purchase cost is: " + totalPrice);
			}

		});//then9function9answers
			
		})

		}//if 

		if (answers.items === "100-2"){ 

			connection.query("SELECT * FROM item_list", function (err, res) {
				console.log("ID#: " + res[1].item_id + " ||" + " Name: " + res[1].product_name + " ||" + 
				" Stock: " + res[1].stock_quantity);

				// --------------------------------------------------------------------------------
				inquirer.prompt({
		type: 'input',
		name: 'quantity',
		message: "How many of these items would you like to purhchase?"
	
		}).then(function (answers) {
			
			var countItem = res[1].stock_quantity;
			// console.log(countItem);
			var quantity = answers.quantity;
			var total = countItem - quantity;

			//UPDATE DATABASE
			connection.query("UPDATE item_list SET ? WHERE ?", [{
				stock_quantity: total
			}, { item_id: "1002"
			
			}], function(err, res) {
				if (err) throw err;
				console.log(res);
			})
			
			if (total < 0){
				console.log("ERROR***NOT AVAILABLE IN STOCK*****")

			} else {
				console.log("There are " + total + " left!");
			}

		});//then9function9answers
			
		})
			// });

		}//IF

		if (answers.items === "100-3"){ 

			connection.query("SELECT * FROM item_list", function (err, res) {
				console.log("ID#: " + res[2].item_id + " ||" + " item: " + res[2].product_name + " ||" + 
				" stock: " + res[2].stock_quantity);

				// --------------------------------------------------------------------------------
				inquirer.prompt({
		type: 'input',
		name: 'quantity',
		message: "How many of these items would you like to purhchase?"
	
		}).then(function (answers) {
			
			var countItem = res[2].stock_quantity;
			// console.log(countItem);
			var quantity = answers.quantity;
			var total = countItem - quantity;

			// UPDATE DATABASE
			connection.query("UPDATE item_list SET ? WHERE ?", [{
				stock_quantity: total
			}, { item_id: "1002"
			
			}], function(err, res) {
				if (err) throw err;
				console.log(res);
			})
			
			if (total < 0){
				console.log("ERROR***NOT AVAILABLE IN STOCK*****")

			} else {
				console.log("There are " + total + " left!");
			}

		});//then9function9answers
			
		})
			// });

		}//IF
		
	});


}

