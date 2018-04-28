const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// const Post = require('./api/models/postModels');
// const User = require('./api/models/userModels');

const routes = require('./api/routes/routes');

const server = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-posts', { useMongoClient: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

server.use(express.static(path.resolve(__dirname, './client/build')));

server.get('/api', function(req, res) {
  res.status(200).json({ message: 'sent from api' });
});

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

routes(server);

server.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
