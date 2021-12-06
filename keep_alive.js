const express = require('express');
const app = express();
const port = 2323;
app.get('/', (req, res) => res.send('hi :D'));

app.listen(port, () => console.log(`RXNationHelper is now listening to: http://localhost:${port}`));