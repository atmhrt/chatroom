const path = require("path");
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
})

var name;

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.on('joining msg', (n) => {
		name = n;
		io.emit('chat message', `---${name} joined the chat---`);
	})

	socket.on('disconnect', () => {
		console.log(`${name} disconnected`);
	})

	socket.on('chat message', (msg) => {
		socket.broadcast.emit('chat message', msg);
	})
});

server.listen(3002, () => {
	console.log('Server listening on :3002');
});