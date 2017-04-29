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
// var arrayItem = ["100-1","100-2","100-3","100-4","100-5","100-6","100-7","100-8", "100-9", "10-10"];
	
	connection.query("SELECT * FROM item_list ", function (err, res) {
		console.log("Here are list of items available for purchase: " +
				"\nitem#: " );
		for (var i = 0; i < 10; i++) { 
			console.log("\nitem#: " + res[i].item_id + " || "+ " name: " + res[i].product_name);
			
		}
	})

	


// GRAB TABLE IN DATABASE AND START APP
connection.query("SELECT * FROM item_list", function(err, res) {
	if(err) throw err;
	

	//CALL FUNCTION TO START PROMPT
	itemSearch();
})

// PROMPT QUESTIONS 
var itemSearch = function () {


	inquirer.prompt({
		type: 'list',
		name: 'items',
		message: "Which item number would you like to purchase?",
		choices: ["1001","1002","1003","1004","1005","1006","1007","1008", "1009", "1010"]
	}).then(function (answers) {
		// GIVE EACH INPUT CHOICE AN INT VALUE
		if (answers.items === "1001") { console.log("1"); var x = 0}
		if (answers.items === "1002") { console.log("2"); var x = 1}
		if (answers.items === "1003") { console.log("3"); var x = 2}
		if (answers.items === "1004") { console.log("4"); var x = 3}
		if (answers.items === "1005") { console.log("5"); var x = 4}
		if (answers.items === "1006") { console.log("6"); var x = 5}
		if (answers.items === "1007") { console.log("7"); var x = 6}
		if (answers.items === "1008") { console.log("8"); var x = 7}
		if (answers.items === "1009") { console.log("9"); var x = 8}
		if (answers.items === "1010") { console.log("10");var x = 9}
		//CALL FUNCTION
		itemInfo(x);
	
	
	});


}


function getItemInfo (item_id) {
	connection.query();

};

function itemInfo(userchoice) {
			
			// CREATE CONNECTION AND QUERY TO SHOW ITEM CHOSEN
	connection.query("SELECT * FROM item_list", function (err, res) {
		// PRINT THE SELECTED ITEM INFO
		for ( var i = 0; i < res.length; i ++) {
			console.log("ID#: " + res[userchoice].item_id + " ||" + " Name: " + res[userchoice].product_name + " ||" + 
			" Stock: " + res[userchoice].stock_quantity);
				break;
				
				 }

				//--------------------------------------------------------------------------
		
			inquirer.prompt({
			type: 'input',
			name: 'quantity',
			message: "How many of these items would you like to purhchase?"
	
			}).then(function (answers) {
			//HOW MANY ITEMS ARE LEFT IN STOCK AND SAVE TO VARIABLE
				var countItem = res[userchoice].stock_quantity;
			// USER INPUT OF HOW MANY ITEMS THEY WANT
				var quantity = answers.quantity;
			// TOTAL PRICE OF ITEMS SELECTED
				var totalPrice = answers.quantity * res[userchoice].price;
			// TOTAL STOCK AMOUNT AFTER PURCHASE
				var total = countItem - quantity;
			//UPDATE DATABASE
				connection.query("UPDATE item_list SET ? WHERE ?", [{
				stock_quantity: total
				}, { item_id: res[userchoice].item_id

				}], function(err, res) {
					if (err) throw err;
				// console.log(res);
				})
					// IF STOCK IS EMPTY
					if (total < 0){
					console.log("ERROR***NOT AVAILABLE IN STOCK*****");

					} else {
						console.log("There are " + total + " left!");
						console.log("Your total purchase cost is: " + totalPrice);
					}

		});//then9function9answers
	})
};