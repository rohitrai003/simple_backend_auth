const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
