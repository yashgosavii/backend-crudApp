import express from 'express';

const app = express();
const port = 8080;

// middleware to parse the request body as JSON 
app.use(express.json());

// tea manager

// in-memory data for storing teas
let teaData = [];
// id for the tea
let id = 1;

// add a tea
app.post('/addTea', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: id++, name, price };
    teaData.push(newTea);
    res.status(201).send(`${newTea.name} added successfully.`);
});

// get all teas
app.get('/listTeas', (req, res) => {
    res.status(200).send(teaData);
});
// get a tea by id
app.get('/getTea/:id',(req,res)=>{
    const {id} = req.params;
    const tea = teaData.find((tea)=>tea.id === parseInt(id));
    (!tea) ? res.status(404).send(`Tea with id ${id} not found.`) : res.status(200).send(tea);
})
// update a tea by id
app.put('/updateTea/:id',(req,res)=>{
    const {id} = req.params;
    const {name,price} = req.body;
    const tea = teaData.find((tea)=>tea.id === parseInt(id));
    if(!tea){
        res.status(404).send(`Tea with id ${id} not found.`);
    }else{
        tea.name = name;
        tea.price = price;
        res.status(200).send(`Tea with id ${id} updated.`);
    }
})
// delete a tea by id
app.delete('/deleteTea/:id',(req,res)=>{
    const {id} = req.params;
    const tea = teaData.find((tea)=>tea.id === parseInt(id));
    if(!tea){
        res.status(404).send(`Tea with id ${id} not found.`);
    }else{
        const index = teaData.findIndex((tea)=>tea.id === parseInt(id));
        if(index === -1){
            res.status(404).send(`Tea with id ${id} not found.`);
        }
        teaData.splice(index,1);
        res.status(200).send(`Tea with id ${id} deleted.`);
    }
})
// delete all teas
app.delete('/deleteAllTeas',(req,res)=>{
    teaData = [];
    res.status(200).send('All teas deleted.');
})
// Start the server
app.listen(port, () => {
    console.log(`Server is running at port: ${port} ...`);
});
