const express = require('express');

const app = express();

app.get('/', (request, response) => {
 response.send('I Love Treehouse!');
});

app.listen(3000);