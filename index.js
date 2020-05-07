require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const Courses = [
    {id: 1, name: 'JAVA'},
    {id: 2, name: 'ASP.NET'},
    {id: 3, name: 'NODE.JS'}
];

app.get('/', function(req,res){
    res.send(Courses);
});


app.post('/api/courses',function(req,res){
    if(!req.body.name) res.send('Course name is not avaliable!');

    const course = {
        id: Courses.length + 1,
        name: req.body.name
    };
    Courses.push(course);
    res.send(course);

});


app.delete('/api/courses/:id',function(req,res) {
    const cID = parseInt(req.params.id);
    const course = Courses.find(c => c.id === cID);
    if(!course) res.send('Course was not available given id!');

    const index = Courses.indexOf(course);
    Courses.splice(index,1);
    res.send(course);

});


app.put('/api/courses/:id',function(req,res) {
    const cID = parseInt(req.params.id);
    const course = Courses.find(c => c.id === cID);
    if(!course) res.send('Course was not available given id!');

    course.name = req.body.name;

    res.send(course);

});


app.listen(PORT,()=>{
    console.log(`App is running on ${PORT} port`);
});