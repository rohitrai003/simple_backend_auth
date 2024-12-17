const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const users = []; // In-memory storage
const refreshTokens = [];

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken); // Store refresh token

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: 'strict',
    });

    res.json({ accessToken });
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ error: 'Unauthorized' });
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ error: 'Forbidden' });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid refresh token' });

        const newAccessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: newAccessToken });
    });
};

exports.logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        const index = refreshTokens.indexOf(refreshToken);
        if (index !== -1) refreshTokens.splice(index, 1); // Remove the token
    }

    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
