//DOWNLOAD AND USE NPM PACKAGES
var inquirer = require('inquirer');
var mysql = require('mysql');
// CREATE CONNECTION AND STORE INTO VARIABLE
var connection = mysql.createConnection({
	host: "localhost", 
	port: 3306,
	user: "root",
	password: "batman5356",
	database: "bamazon_DB"
});

// IF THERE IS IN ERROR DURING CONNECTION LOG IT OUT. 
connection.connect(function(err) {
	if (err) throw err;
	console.log("id: " + connection.threadId);
	
});


connection.query("SELECT * FROM item_list", function(err, res) {
	if(err) throw err;

	//CALL FUNCTION TO START PROMPT
	listPrompt();
});

var listPrompt = function () {
	inquirer.prompt({
		type: "list",
		name: "functionlist",
		message: "What would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}).then(function(answers) {
		var choicesArray = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];
		// for (var i = 0; i < choicesArray.length; i++) {
			
				if (answers.functionlist === choicesArray[0]){
					viewItems();
			
			}	if (answers.functionlist === choicesArray[1]) {
			 		lowInventory();
					
			}	if (answers.functionlist === choicesArray[2]) {
			 		addInven();
					
			}	if (answers.functionlist === choicesArray[3]){
						
					addProduct();
			}
		})
		
	}


	//FUNCTIONS -------------------------------------------------------------------------------------
	var viewItems = function () {
		// CONNECTING TO DATABASE TO GRAB TABLE INFORMATION
			connection.query("SELECT * FROM item_list ", function (err, res) {
		// DISPLAY LIST OF ITEMS AVAILABLE FOR PURCHASE
				console.log("Here are list of items available for purchase: " +
				"\nitem#: " );
				for (var i = 0; i < 10; i++) { 
				console.log("\nitem#: " + res[i].item_id + " || "+ " name: " + res[i].product_name);

				}//for

			});//connection
	} 		
	//----------------------------------------------------------------------------------------------- 
	var addInven = function () {

		inquirer.prompt([
		{
			type: "input",
			name: "additem",
			message: "Input the item# you would like to update?"
		},
		{
			type: "list",
			name: "update",
			message: "what would you like to do?",
			choices: ["UPDATE ITEM", "UPDATE PRICE", "UPDATE STOCK"]
		},

		]).then(function(answers) {
			var arrayChoices = ["UPDATE ITEM", "UPDATE PRICE", "UPDATE STOCK"];


			if (answers.update === arrayChoices[0]) {
				console.log(arrayChoices[1]);
			}

			// connection.query("UPDATE item_list SET ?  WHERE ?", [{

			// }])

		})
		
		
		


	


	}
	//----------------------------------------------------------------------------------------------- 
	var lowInventory = function () {
		connection.query("SELECT * FROM item_list WHERE stock_quantity < 5 ", function(eer, res) {
						for (var i = 0; i < res.length ; i++){
							console.log("\nitem#: " + res[i].item_id + "\nname: "
							+ res[i].product_name + "\nstock left: " + res[i].stock_quantity);
						}

					});	

	}

	//----------------------------------------------------------------------------------------------- 
	var addProduct = function () {

		inquirer.prompt([
					{
						type: "input",
						name: "newproduct",
						message: "What type of item would you like to add?"
					},
					{	type: "input",
						name: "itemid",
						message: "Give it a item id #: "

					}, 
					{
						type: "input",
						name: "stock",
						message: "How much of stock is available for purchase?"
					},
					{
						type: "input",
						name: "department",
						message: "Which department is your item from?"

					},
					{
						type: "input",
						name: "price",
						message: "What is your product's price?"
					}
					]).then(function (answers) {
							var productName = answers.newproduct;
							var productId = answers.itemid;
							var productPrice = answers.price;
							var productDept = answers.department;
							var productStock = answers.stock;

						connection.query("INSERT INTO item_list SET ?", {
							
							item_id: productId,
							product_name: productName,
							price: productPrice,
							department_name: productDept,
							stock_quantity: productStock
						}, function(err, res) {});

						 // console.log(answers.newitem);

						
					});
	}