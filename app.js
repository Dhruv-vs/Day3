const express = require("express")
const path = require("path")
const app = express()
const PORT=8080
app.set('view engine','ejs');
app.use(express.json())

const filepath = path.join(__dirname,"/views/index.ejs")
app.get("/",(req,res)=>{
    let name = "sam"
    let destination = "Hyderabad"
    res.render(filepath,{name,destination})
});
// here no need to filepath just render the file name
app.get("/welcome",(req,res)=>{
    let name = "Dhruv"
    let destination = "Punjab"
    res.render("welcome",{name,destination})
})

// Task 2 : take form input of task
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Store tasks in an array (for now, we use memory)
let tasks = [];

// Route to display the form and the list of tasks
app.get('/todo', (req, res) => {
    res.render('todo', { tasks });
});

// Route to handle the form submission and add a new task
app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);  // Add the new task to the array
    }
    res.redirect('/todo');  // Redirect back to the todo list
});

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening to port ${PORT}`)
    }
})