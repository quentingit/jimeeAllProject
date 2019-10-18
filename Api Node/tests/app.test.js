const app = require('../app')
const request = require('supertest');
const http = require('http')

/*test('server is working', async () => {
    request(app).get('/')
    //.set('Authorization', 'Bearer c2e9f17d8fcbe4f7ef749929258874554dc7b994')
    .then((response) => {
       expect(response.statusCode).toBe(200);
        //.expect('Content-Type', /json/)
       done();
    })
})*/

describe('Test de lancement du serveur', () => {
    let server;

    beforeAll(done => {
      server = http.createServer((req, res) => {
        res.write('ok');
        res.end();
      });
      server.listen(done);
    });
  
    afterAll(done => {
      server.close(done);
    });

    test('Test de la route /', async (done) => {
        const result = await request(app).get('/');
        expect(result.status).toBe(200);
        done();
    });

    test('Test du contenu de la route /', async (done) => {
      const result = await request(app).get('/');
      expect(result.text).toBe('{"version":1.0}');
      done();
    });
});