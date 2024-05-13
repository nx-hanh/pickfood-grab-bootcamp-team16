const bycrypt = require('bcryptjs');
const database = require('@/lib/Backend/database/Database.js');
const User = require('@/models/userSchema.js');``
const SignupFormSchema = require('@/lib/Backend/authentication/definitions.ts');
const { generateToken, verifyToken } = require('@/lib/Backend/authentication/jwt.js');

async function checkExistingUser(email) {
    let query = {
        email: email
    }
    let user = await database.findData(User, query);
    return user;
}

async function loginUser(userdata) {
    let user = await checkExistingUser(userdata.email);
    if (user == null) return false;
    let status;
    status = await bycrypt.compare(userdata.password, user[0].password);
    return status;
}

async function registerUser(userdata) {
    let user = await checkExistingUser(userdata.email);
    if (user != null) {
        return false;
    }
    let hashPassword = await bycrypt.hash(userdata.password, 8);
    let newUser = new User({
        username: userdata.username,
        email: userdata.email,
        password: hashPassword,
        favorites: null,
        is_active: true
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
    let status;
    if (userData.newUser) status = await registerUser(userData);
    else status = await loginUser(userData);
    if (!status) return null;
    return generateToken({ email: userData.email });
}

module.exports = authenticateUser, verifyToken;