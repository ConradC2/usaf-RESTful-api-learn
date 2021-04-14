const express = require('express')
const app = express()
const students = require('./students.json')
const port = 3000;

app.get('/students', (request, response) => {
    if (request.query.name){
      response.send(students.filter(student => student.name === request.query.name))
    } else {
        response.send(students);
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));