const { User, Thought } = require('./models');

const getUsers = async () => {
    try {
        let users = await User.find().select('-__v');
        return users;
    } catch (error) {
        console.log(`Error getting Users`, error);
        return;
    }
};

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/FakeBook`);
const db = mongoose.connection;

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);

    getUsers();
  });
});