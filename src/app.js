const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


module.exports = app;
