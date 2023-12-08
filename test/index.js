const assert = require('chai').assert;
const axios = require("axios");
const url = "http://127.0.0.1:3000";

describe('GET Index Pages', async () => {
    it("GET /", async () => {
        const res = await axios.get(`${url}/`)
        assert.equal(res.data, "landing page", "Gets Landing Page")
    })
    it("GET /home", async () => {
        const res = await axios.get(`${url}/home`)
        assert.equal(res.data, "home page", "Gets Home Page")
    })
    it("GET /events", async () => {
        const res = await axios.get(`${url}/events`)
        assert.isArray(res.data, "Gets Events")
    })
    it("GET /contact-us", async () => {
        const res = await axios.get(`${url}/contact-us`)
        assert.equal(res.data, "contact us page", "Gets Contact Us Page")
    })
})