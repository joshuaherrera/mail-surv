const express = require('express');
require('./services/passport');
//const authRoutes = require('./routes/authRoutes');

const app = express(); //generates running express app

//authRoutes(app);
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //heroku can inject the env var
app.listen(PORT); //tells node to listen on this port
