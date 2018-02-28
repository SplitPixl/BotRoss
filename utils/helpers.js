const chalk = require('chalk');

module.exports = {
	logCommand, clientLoaded, clientReady
}

function logCommand(clientName, commandExecuter, command) {
	//console.log(chalk.bgGreen(' CMD ') + ' ' + chalk.bold(clientName) + ' - ' + commandExecuter + ' > "' + command + '"')
	console.log(`${chalk.bgCyan.bold(' C ')} ${chalk.bold(clientName)} - ${commandExecuter} > '${chalk.italic(command)}'`)
}

function clientLoaded(clientName) {
	console.log(`${chalk.bgGreen.bold(' I ')} Client ${clientName} was loaded!`)
}

function clientReady(clientName) {
	console.log(`${chalk.bgGreen.bold(' I ')} ${clientName} began polling!`)
}
