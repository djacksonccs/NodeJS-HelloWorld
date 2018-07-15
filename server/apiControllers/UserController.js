const User = require('../models/User');
const { ObjectID } = require('mongodb');

var get = (req, res) => {
    console.log("User Get Controller");
    res.send({ message: 'User Controller Reachable' });
}

var getWithId = (req, res) => {
    var userId = req.params.userId;

    if (!ObjectID.isValid(userId)) {
        return res.status(400).send({ error: 'Bad Request' });
    }

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'Not Found' })
            }

            return res.status(200).send({ user });
        })
        .catch(e => {
            return res.status(500).send({ error: 'Internal Server Error' });
        });


}
var post = (req, res) => {
    var body = req.body;
    console.log(JSON.stringify(body));
    console.log('Creating a new User...');
    var newUser = new User({
        name: body.name,
        age: body.age
    });

    console.log(`New User: ${JSON.stringify(newUser)}`);

    newUser.save()
        .then(user => {
            return res.status(200).send({ user });
        })
        .catch(e => {
            return res.status(400).send({ error: 'Bad Request' });
        });
}
var deleteWithId = (req, res) => {
    var userId = req.params.userId;

    if (!ObjectID.isValid(userId)) {
        return res.status(400).send({ error: 'Bad Request' });
    }

    User.findByIdAndRemove(userId, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'Not Found' });
            }

            return res.status(200).send({ user });
        })
        .catch(e => {
            return res.status(500).send({ error: 'Internal Server Error' });
        });
}

module.exports = { get, getWithId, post, deleteWithId }