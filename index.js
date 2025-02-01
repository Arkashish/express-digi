import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

let teaData = []
let nextId = 1

app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        res.status(404).send('Tea Not Found')
    }
    res.status(200).send(tea)
})

//update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        res.status(404).send('Tea Not Found')
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})


//delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send('Tea Not Found')
    }
    teaData.splice(index, 1)
    return res.send(204).send('Deleted')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/ice-tea', (req, res) => {
    res.send('Hello World from ice-tea!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})