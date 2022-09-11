const { Router } = require('express');

activities_router = Router();

activities_router.post('/', (req, res) => {
    res.send('Hello from activities');
});