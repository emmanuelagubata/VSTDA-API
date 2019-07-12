const express = require('express');// this is the actual express server
const morgan = require('morgan');//this is the middleware so you can log information alot more effective instead of going to the server and API every single time
const bodyParser = require('body-parser')//this reads the information and filters it to where it needs to go
const app = express(); //this creates an express instance
var items = [
// add your code here


// beginning/initial database
    {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
    },
    {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
    },
    {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
    }
];
// basically it allows handling of requests
app.use(morgan('dev'));//this applys the middleware and actually calls the middleware for when you use the get and post request
app.use(bodyParser.json());//parse application/json

// handles the requests based on what the input is
app.get('/', function(req, res){//we are getting a get request from the client and then returns ok status 200 for when the get request is logged
    res.json('ok').status(200);
    console.log(200);
});
app.get('/api/TodoItems', function(req, res) {//this is the route that you are printing out the data
    res.json(items);//sends all the items from my Todo list
});

app.get('/api/TodoItems/:number', function(req, res){//this is where the specifc Todo item is grabbed by the Id
    for(let i = 0; i < items.length; i++) {//this iterates through the array of items
        if(items[i]['todoItemId'] == req.params.number) {//compares the items id to what you are given in the route
            res.send(items[i]);//this just sends it to the DOM
        }
    }
});

app.post('/api/TodoItems/', function(req,res) {
    var newTodo = { 
        todoItemId: 0,
        name: 'water the plants',
        priority: 3,
        completed: true
    };
        for(i=0; i < items.length; i++){//this runs through the mockdata which i called items
            if (newTodo.todoItemId == items[i]["todoItemId"]){//this looks at the newToDo's item Id of 0 and then it compares it to the items's Id of 0
                items[i] = newTodo//this swaps the old index 0 with the todoItems's Id which is 0 
            }
        };
        items.push(newTodo);// pushes newTodo to items
        res.status(201).send(newTodo);//sends newTodo to the route with status 201      
});
app.delete('/api/TodoItems/:number', function(req,res){
    let item = items[req.params.number];//
    items.splice( req.params.id, 1);//
    res.json(item);
});

module.exports = app;