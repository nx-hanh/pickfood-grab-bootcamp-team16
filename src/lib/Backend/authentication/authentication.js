const bycrypt = require('bcryptjs');
const database = require('@/lib/Backend/database/Database.js');
const User = require('@/models/userSchema.js');
const jwt = require('jsonwebtoken');
const SignupFormSchema = require('@/lib/Backend/authentication/definitions.ts');


function generateToken(payload) {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

async function checkExistingUser(email) {
    let query = {
        email: email
    }
    let user = await database.findData(User, query);
    return user;
}

async function loginUser(email, password) {
    let user = await checkExistingUser(email);
    if (user == null) return false;
    let status;
    status = await bycrypt.compare(password, user[0].password);
    return status;
}

async function registerUser(email, password) {
    let user = await checkExistingUser(email);
    if (user != null) {
        return false;
    }
    password = await bycrypt.hash(password, 8);
    let newUser = new User({
        email: email,
        password: password
    });
    let status = await database.addData(newUser);
    return status;
}

function validateUserData(userData) {
    const validatedFields = SignupFormSchema.safeParse({
        email: userData.email,
        password: userData.password,
        newUser: userData.newUser
    })
     
      // If any form fields are invalid, return early
    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors }
    return true;
}    

async function authenticateUser(userData) {
    // let validateData = validateUserData(userData);
    // if (validateData !== true) {
    //     return validateData;
    // }
    let status;
    if (userData.newUser) status = await registerUser(userData.email, userData.password);
    else status = await loginUser(userData.email, userData.password);
    if (!status) return null;
    return generateToken({ email: userData.email });
}

module.exports = authenticateUser;