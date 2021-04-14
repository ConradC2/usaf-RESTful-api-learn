const express = require('express')
const app = express()
const students = require('./students.json')
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/students', (request, response) => {
    if (request.query.name){
      response.send(students.filter(student => student.name === request.query.name))
    } else {
        response.send(students);
    }
})

app.get('/students/:studentId', (request, response) => {
    response.send(students.find(student => student.id == request.params.studentId));
});

app.get('/grades/:studentId', (request, response) => {
    response.send(students.find(student => student.id == request.params.studentId).grades);
});

app.post('/grades', (request, response) => {
  console.log(request.body);
    if (request.body.studentId && request.body.grade){
        const { studentId, grade } = request.body;
        console.log(studentId, grade);
        let studentUpdated = students.find(student.id == studentId);
        studentUpdated.grades.push(grade);
    response.send(`You added a grade ${grade} to ${studentUpdated.name}`);
    } else {
        response.send("You must include a studentID and Grade!");
    }
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));