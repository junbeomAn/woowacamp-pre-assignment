const net = require('net');

function zeroFill(num) {
    if (num < 10) {
        return '0' + num;
    }
    return '' + num;
}

function convertDateObj(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const date = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${year}-${zeroFill(month + 1)}-${zeroFill(date)} ${zeroFill(hours)}:${zeroFill(minutes)}\n`;  
}

const server = net.createServer(function(socket) {
	socket.write(convertDateObj(new Date()));
	socket.end();
})

server.listen(Number(process.argv[2]));
