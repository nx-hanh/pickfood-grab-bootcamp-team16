const jwt = require('jsonwebtoken');

// Create a token
const secret = "mysecret";

function createToken() {
  const token = jwt.sign({
    data: 'foobar'
  }, secret, { expiresIn: '2s' });
}

function checkToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return false;
  }
}

function checkExpiredToken(token) {
    jwt.verify(token, secret, (err, decoded) => {
        console.log(err)
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('Token expired');
                return true;
            }
            return true;
        }
    });
    return false;
}

let token = createToken();

while (!checkExpiredToken(token)) {
    console.log('Token is not expired\n');
}

let oldToken = token;

token = createToken();

console.log(checkExpiredToken(oldToken));

