const assert = require('chai').assert
const axios = require('axios');
let _id = ""
const url = "http://127.0.0.1:3000/events";
const event = {
    name: 'Test',
    presentor: 'Tester',
    date: '01/01/2024',
    time: '5:00 pm',
    image: 'test image',
    place: 'anywhere',
    description: 'this is a description'
}

const newEvent = {
    name: 'Updated Tests',
    presentor: 'Updated',
    date: '01/01/2026',
    time: '5:07 pm',
    image: 'updated image',
    place: 'update anywhere',
    description: 'this is an updated description'
}

describe("Events CRUD Routes", async () => {
    it("Creates A New Event",  async () => {
        const res = await axios.post(`${url}/create/test`, event)
        _id = res.data._id
        assert.include(res.data, event, 'Creates A New Event')
    })
    it("Reads An Event",  async () => {
        const res = await axios.get(`${url}/${_id}`)
        assert.isObject(res.data, 'Reads An Event')
    });
    it("Updates An Event", async () => {
        const res = await axios.post(`${url}/update/${_id}`, newEvent);
        assert.include(res.data, newEvent, "Updates An Event")
    });
    it("Deletes An Event", async () => {
        const res = await axios.post(`${url}/delete/${_id}`)
        assert.isObject(res.data, "Deletes An Event")
    });
})