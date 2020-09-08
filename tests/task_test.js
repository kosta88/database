const request = require('supertest')  //supertest requests
const app = require('../src/app')
const task = require('../src/models/tasks')
const {testUserID, testUser, configDB } = require('./fixtures/db')

//>>>>>>>>>>>>      JEST LIFECYCLES


test('Should create a task', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${testUser.tokens[0]}`)
    .send({
            "completed": false,
            "description": "why not workkkkk"
    }).expect(201)

})