var app = require('./config/server');

const PORT = process.env.port || 3000

app.get("/", (req, res) => {
    res.send("Hello to Pitaco Back-end");
})

app.listen(PORT, () => {
    console.log('escutando na porta ' + PORT);
});