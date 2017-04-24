var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost", 
	port: 3306,
	user: "root",
	password: "batman5356",
	database: "bamazon_DB"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("id: " + connection.threadId);
	
})



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
			
			var countItem = res[0].stock_quantity;
			// console.log(countItem);
			var quantity = answers.quantity;
			var total = countItem - quantity;
			
			if (total < 0){
				console.log("ERROR***NOT AVAILABLE IN STOCK*****")

			} else {
				console.log("There are " + total + " left!");
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

