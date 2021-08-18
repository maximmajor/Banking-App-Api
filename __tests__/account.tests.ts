/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('supertest');
const app = require('../src/app').default;


describe('Api testing', () => {
  //const user: any = [];
  it('Get all users balance', async () => {
    // const expectedResponse = []
    await request(app).get('/balance').expect(200);
  });

  describe('Api testing', () => {
    //const user: any = [];
    it('Get all Transaction', async () => {
      // const expectedResponse = []
      await request(app).get('/transfer').expect(200);
    });
  });

  describe('Api testing', () => {
    //const user: any = [];
    it('Get transfers By Reference', async () => {
      const ref = 'hfnjh';
      // const expectedResponse = []
      await request(app).get(`/transfer/${ref}`).expect(404);
    });
  });

  describe('Api testing', () => {
    //const user: any = [];
    it('Get By Reference id, 404 if account Number dosent match ', async () => {
      const ref = 'hfnjh';
      // const expectedResponse = []
      await request(app).get(`/balance/${ref}`).expect(404);
    });
  });

  describe('Api testing', () => {
    //const user: any = [];
    it('Create an Account', async () => {
      const account = {
        "account": "1234567898",
        "balance":"6000",
      }
      // const expectedResponse = []
      await request(app).post(`/create-account`).send(account).expect(201);
    });
  });

  describe('Api testing', () => {
    //const user: any = [];
    it('Get By Account Number, If Match', async () => {
      const tran = "1234567890"
      await request(app).get(`/balance/${tran}`).expect(200);
    });
  });

  describe('Api testing', () => {
    //const user: any = [];
    it('Transfer to an Account', async () => {
      const trans = {
        "from": "1234567890",
        "to": "1234567891",
        "amount": "200",
        "transferDescription": "School Fees"
      }
      // const expectedResponse = []
      await request(app).post(`/transfer`).send(trans).expect(401);
    });
  });
});


