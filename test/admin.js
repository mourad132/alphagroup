const assert = require('chai').assert;
const axios = require('axios');
const url = "http://127.0.0.1:3000/admin";

const invalidUser = {
    username: 'mourad',
    password: 'wrong'
}

const validUser = {
    username: 'mourad',
    password: 'mourad'
}

const invalidNewUser = {
    username: 'newUser',
    password: 'password',
    register: 'wrong', 
    code: "NEW",
    permission: 0
}

const validNewUser = {
    username: 'newUser',
    password: 'password',
    register: 'alphagrouppassword', 
    code: "NEW",
    permission: 0
}

describe("Admin Routes", async () => {
    it("Sign Up A New Admin With Valid Password", async () => {
        const res = await axios.post(`${url}/sign-up`, validNewUser);
        assert.isObject(res.data, "creates new Admin")
    })
    it("Sign Up A New Admin With Invalid Password", async () => {
        const res = await axios.post(`${url}/sign-up`, invalidNewUser);
        assert.equal(res.data, "Invalid Registeration Password", "Uses Invalid Registration Password")
    })
    it("Authenticates With Invalid Credentials", async () => {
        const res = await axios.post(`${url}/login`, invalidUser)
        assert.equal(res.data, "login", 'Sends Invalid Credentials')
    })
    it("Authenticates With Valid Credentials", async () => {
        const res = await axios.post(`${url}/login`, validUser)
        assert.equal(res.data, 'landing page', 'Sends Valid Credentials')
    })
})