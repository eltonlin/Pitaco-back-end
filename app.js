var app = require('./config/server');

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log('escutando na porta ' + PORT);
});