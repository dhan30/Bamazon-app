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
	// console.log('res', res);
	// console.log(res);

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
		for (var i = 0; i < choicesArray.length; i++) {
		if (answers.functionlist === choicesArray[i]){

			connection.query("SELECT * FROM item_list", function (err, res){

				console.log(res[0].price);
			})
			
			
		} else {console.log("Loserr"); break;}
	}//for loop
	});
}