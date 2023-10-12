const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = 3080;

app.use(cors());
app.use(express.json()); 
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
