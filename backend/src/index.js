const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const mongooseConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, "config/mongoose.json")));

mongoose.connect(mongooseConfig.url, {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(routes);

server.listen(3000);

