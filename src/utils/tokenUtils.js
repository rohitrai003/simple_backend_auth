const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '15m' });
};

exports.generateRefreshToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.REFRESH_SECRET_KEY);
};
