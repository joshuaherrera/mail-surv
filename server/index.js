const express = require('express');
const app = express(); //generates running express app

app.get('/', (req, res) => {
	res.send({ sup: 'cuh'});
});

const PORT = process.env.PORT || 5000; //heroku can inject the env var 
app.listen(PORT); //tells node to listen on this port
//localhost:5000