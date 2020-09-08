const request = require('supertest')  //supertest requests
const app = require('../src/app')
const User = require('../src/models/user')
const {
    testUserID,
    testUser2,
    testUser, 
    configDB } = require('./fixtures/db')

//>>>>>>>>>>>>      JEST LIFECYCLES
beforeEach( async () => {
    await configDB()
})

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Kosta',
        email: 'kosta2@gmail.com',
        password: '1324657985'
    }).expect(201)
})

test('should login existing user', async () => {
    const response = await request(app)
    .post('/users/login').send({
        email: testUser.email,
        password: testUser.password
    }).expect(200)
    const user = await User.findById(testUserID)
    expect(response.body.token).toBe(user.tokens[1])
})

test('should get existing user profile', async () => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>" , testUser.tokens)
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0]}`)
        .send()
        .expect(200)
})


test('should upload avatar pic', async () => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>" , testUser.tokens)
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${testUser.tokens[0]}`)
        .attach('avatar', 'tests/logo_ron.jpg')
        .expect(200)

        // expect({}).toEqual({})       //object compare
})


afterEach(() => {

})
