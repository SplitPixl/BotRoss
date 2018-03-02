const chalk = require('chalk');

module.exports = {
	logCommand, clientLoaded, clientReady, clientErr
}

function logCommand(clientName, command) {
	//console.log(chalk.bgGreen(' CMD ') + ' ' + chalk.bold(clientName) + ' - ' + commandExecuter + ' > "' + command + '"')
	console.log(`${chalk.bgCyan.bold(' C ')} ${chalk.bold(clientName)} : ${!command.group.private ? command.group.name + ' |' : 'PRIVATE MESSAGE |'} ${command.author.name} > ${chalk.italic(command.text)}`)
}

function clientLoaded(clientName) {
	console.log(`${chalk.bgGreen.bold(' I ')} Client ${clientName} was loaded!`)
}

function clientReady(clientName) {
	console.log(`${chalk.bgGreen.bold(' I ')} ${clientName} is connected!`)
}

function clientErr(clientName, msg) {
	console.log(`${chalk.bgRed.bold(' E ')} ${clientName} encountered an error! (${msg})`)
}
