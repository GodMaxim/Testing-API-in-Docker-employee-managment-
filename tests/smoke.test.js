// tests/smoke.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const db = require('../models');

describe('Smoke Tests', () => {
    let adminToken;
    
    before(async function() {
         this.timeout(10000)

         await db.sequelize.sync({ force: true });

    // creating admin account for token generation
    await request(app)
      .post('/register')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword',
        firstName: 'Admin',
        lastName: 'User',
        middleName: 'Middle',
        birthDate: '1980-01-01',
        phone: '+987654321',
        programmingLanguage: 'N/A',
        role: 'admin',
        secretWord: process.env.SECRET_WORD
      });

    const adminRes = await request(app)
      .post('/login')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword'
      });

    adminToken = adminRes.body.token;

    // creating employees for testing 
    const usersData = [
      {
        email: 'employee1@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'Middle',
        birthDate: '1990-01-01',
        phone: '+123456789',
        programmingLanguage: 'JavaScript',
        country: 'USA',
        mentorName: 'Mentor A',
        englishLevel: 'Intermediate',
        registrationDate: '2021-01-01'
      },
      {
        email: 'employee2@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        middleName: 'Middle',
        birthDate: '1992-02-02',
        phone: '+987654321',
        programmingLanguage: 'Python',
        country: 'UK',
        mentorName: 'Mentor B',
        englishLevel: 'Advanced',
        registrationDate: '2021-02-01'
      },
      {
        email: 'employee3@example.com',
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Johnson',
        middleName: 'Middle',
        birthDate: '1995-03-03',
        phone: '+111222333',
        programmingLanguage: 'Java',
        country: 'Canada',
        mentorName: 'Mentor A',
        englishLevel: 'Beginner',
        registrationDate: '2021-03-01'
      },
      {
        email: 'employee4@example.com',
        password: 'password1234',
        firstName: 'Amber',
        lastName: 'Gry',
        middleName: 'Knonws',
        birthDate: '2001-09-08',
        phone: '+443122333',
        programmingLanguage: 'Python',
        country: 'USA',
        mentorName: 'Mentor A',
        englishLevel: 'Beginner',
        registrationDate: '2020-03-01'
    }
    ];

    for (const user of usersData) {
            await request(app)
                .post('/register')
                .send(user);
                }
    });

    it('1. Should return 200 OK for backend health check / root', async () => {
        const res = await request(app).get('/health');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ status: 'ok' });
    });

    it('2. Should load Swagger API documentation', async () => {
        await request(app)
        .get('/api-docs/')
        .expect(200);
    });

     it('3. Should return users sorted by registration date from earliest to latest', async () => {
        const res = await request(app)
        .get('/users?sortBy=registrationDate&order=ASC')
        .set('Authorization', `Bearer ${adminToken}`);
        
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.an('array');

        const users = res.body.users;
        if (users.length > 1) {
        for (let i = 0; i < users.length - 1; i++) {
            const currentDate = new Date(users[i].registrationDate);
            const nextDate = new Date(users[i + 1].registrationDate);

        expect(currentDate.getTime()).to.be.lte(nextDate.getTime());
        }
    }
    });

     it('4. Should search for deleted user', async () => {
        const empUser = await db.User.findOne({ where: { email: 'employee4@example.com' } })
        expect(empUser).to.not.be.null;
        const employeeId = empUser.id;

        const res = await request(app)
        .delete(`/users/${employeeId}`)
        .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).to.equal(200);

        const searchRes = await request(app)
        .get('/users/search?query=Amber')
        .set('Authorization', `Bearer ${adminToken}`);
        
        expect(searchRes.status).to.equal(400);
        expect(searchRes.body).to.have.property('errors');
    });

     it('5. Should reject registration with unsupported multilingual/special characters if not allowed', async () => {
        const res = await request(app)
        .post('/register')
        .send({
             email: 'unicode_user@example.com',
             password: 'password123',
             firstName: 'Александр', // Cyrillic
             lastName: '李',         // Chinese
             middleName: 'محمد',    // Arabic
             birthDate: '1992-05-15',
             phone: '+380991234567',
             programmingLanguage: 'Python',
             country: 'Ukraine',
             mentorName: 'Mentor A',
             englishLevel: 'Advanced',
             registrationDate: '2026-06-01'
            });
            
            expect(res.status).to.equal(400);expect(res.body).to.have.property('errors');
    });

    });

