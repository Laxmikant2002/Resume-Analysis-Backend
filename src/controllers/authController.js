const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log('Received username:', username);
  console.log('Received password:', password);
  
  if (username === 'naval.ravikant' && password === '05111974') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ JWT: token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};