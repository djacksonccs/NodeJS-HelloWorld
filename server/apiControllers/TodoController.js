// const express = require('express');
const _ = require('lodash');
const Todo = require('../models/Todo');
const { ObjectID } = require('mongodb');

get = (req, res) => {
    console.log("Get request made");
    res.send({ message: 'Todo Controller Reachable' });
}



// GET /todos/:userId
getWithUserId = (req, res) => {
    var userId = req.params.userId;

    if (!ObjectID.isValid(userId)) {
        return res.status(400).send({ error: 'Bad Request' });
    }

    Todo.find({ userId: new ObjectID(userId) })
        .then((todos) => {
            if (!todos) {
                return res.status(404).send({ error: 'Not Found' });
            }
            return res.status(200).send({ todos });
        })
        .catch((e) => {
            return res.status(500).send("Internal Server Error");
        })
};

// GET /todos/:userId/:id
getWithUserIdAndId = (req, res) => {
    var userId = req.params.userId;
    var todoId = req.params.id;

    if (!ObjectID.isValid(userId) || !ObjectID.isValid(todoId)) {
        return res.status(400).send({ error: 'Bad Request' });
    }

    Todo.findOne({ _id: new ObjectID(todoId), userId: new ObjectID(userId) })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({ error: 'Not Found' });
            }

            return res.status(200).send({ todo });
        })
        .catch((e) => {
            return res.status(500).send({ error: 'Internal Server Error' });
        })
};


// POST /todos/
post = (req, res) => {
    var body = req.body;

    var newTodo = new Todo({
        userId: body.userId,
        text: body.text
    });

    newTodo.save()
        .then((todo) => {
            return res.status(200).send({ todo });
        })
        .catch((e) => {
            return res.status(400).send({ error: 'Bad Request' });
        });
};

// PATCH /todos/:userId/:id
patchWithIds = (req, res) => {
    var userId = req.params.userId;
    var todoId = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(userId) || !ObjectID.isValid(todoId)) {
        return res.status(400).send('Bad Request');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completed = true;
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(
        {
            _id: ObjectID(todoId),
            userId: ObjectID(userId)
        },
        {
            $set: body
        }, {
            new: true
        }
    )
        .then(todo => {
            if (!todo) {
                res.status(404).send({ error: 'Not Found' });
            }

            res.status(200).send({ todo });
        })
        .catch(e => {
            return res.status(500).send({ error: 'Internal Server Error' });
        });
}


// DELETE /todos/:userId/:id
deleteWithId = (req, res) => {
    var userId = req.params.userId;
    var todoId = req.params.id;

    if (!ObjectID.isValid(userId) || !ObjectID.isValid(todoId)) {
        return res.status(400).send({ error: 'Bad Request' });
    }

    Todo.findOneAndRemove({
        _id: new ObjectID(todoId),
        userId: new ObjectID(userId)
    }, { new: true }).then((todo) => {
        return res.status(200).send({ todo });
    }).catch((e) => {
        return res.status(500).send({ error: 'Internal Server Error' });
    });
};






module.exports = { get, getWithUserId, getWithUserIdAndId, post, patchWithIds, deleteWithId }