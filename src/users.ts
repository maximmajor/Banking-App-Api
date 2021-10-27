/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// var express = require('express');
import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
const { writeDataToFileBal, getDataBaseBal } = require('./bal');
const { writeDataToFileTrans, getDataBaseTrans } = require('./trans');
import getAllTransactions from '../src/controllers/transactions'

//FOR CLASS 8
router.get('/transaction', async (_req, res) =>{
 const data = await getAllTransactions()
res.json({data})
})
/* GET users listing. */
// GET ALL BALANCES
router.get('/balance', function (_req: express.Request, res: express.Response) {
  const UserAccounts = getDataBaseBal();
  if (UserAccounts) {
    res.status(200).send(UserAccounts);
  } else {
    res.status(404).send('Users Account Details NOT found');
  }
});

//GET BALANCE BY ACCOUNT NUMBER
router.get(
  '/balance/:accountNumber',
  function (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) {
    const { accountNumber } = req.params;
    const UserAccounts = getDataBaseBal();
    const foundAccount = UserAccounts.find(
      (account: { accountNumber: string }) =>
        account.accountNumber === accountNumber,
    );
    if (foundAccount) {
      res.status(200).send(foundAccount);
    } else {
      res
        .status(404)
        .send(` Account Number "${accountNumber}" is not in List `);
    }
  },
);

// TO GET ALL TRANSACTIONS
router.get(
  '/transfer',
  function (_req: express.Request, res: express.Response) {
    const userTransaction: string = getDataBaseTrans();
    if (userTransaction) {
      res.status(200).send(userTransaction);
    } else {
      res.status(404).send('Transcation Details NOT FOUND');
    }
  },
);

// TO GET ALL TRANSACTION BY REFERENCES ID
router.get(
  '/transfer/:reference',
  function (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) {
    const { reference } = req.params;
    const userTransactions = getDataBaseTrans();
    const foundTransaction = userTransactions.find(
      (tranc: { reference: string }) => tranc.reference === reference,
    );
    if (foundTransaction) {
      res.status(200).send(foundTransaction);
    } else {
      res
        .status(404)
        .send(` Transaction with reference ID "${reference}" is not in List `);
    }
  },
);

// POST TO CREATE ACCOUNT
router.post(
  '/create-account',
  function (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) {
    const UserAccounts = getDataBaseBal();
    const { account, balance } = req.body;

    const UserAccount = {
      account,
      balance,
    };
    const items1 = {
      CreatedAt: new Date(),
    };
    const userInDataBase = UserAccounts.some(
      (ele: { account: string }) => ele.account === UserAccount.account,
    );

    if (UserAccount.account.length === 10 && userInDataBase !== true) {
      const createAccount = { ...UserAccount, ...items1 };
      UserAccounts.push(createAccount);
      writeDataToFileBal(
        './balances.json',
        UserAccounts,
      );
      res.status(201).send('User Account has been Created Successfully');
    } else {
      res
        .status(401)
        .send(
          'ERROR!!!... Account Number is Either less than or Greater than 10 Digits OR Account Number is Already in the DataBase',
        );
    }
  },
);

// POST ROUTE FOR TRANSFER
router.post(
  '/transfer',
  function (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) {
    const transfers = getDataBaseBal();
    const transaction = getDataBaseTrans();
    const { from, to, amount, transferDescription } = req.body;

    const transfer = {
      from,
      to,
      amount,
      transferDescription,
    };
    const receiverAccnt = transfers.find(
      (accnt: { account: string; balance: string }) => accnt.account === to,
    );
    const senderAccnt = transfers.find(
      (accnt: { account: string; balance: string }) => accnt.account === from,
    );

    if (
      senderAccnt &&
      receiverAccnt &&
      +senderAccnt.balance >= +transfer.amount
    ) {
      senderAccnt.balance = (+senderAccnt.balance - amount).toString();
      receiverAccnt.balance = (+receiverAccnt.balance + +amount).toString();
      writeDataToFileBal('./balances.json', JSON.stringify(transfers));
      

      interface Obj {
        reference: string;
        senderAccount: string;
        amount: number;
        receiverAccount: string;
        transferDescription: string;
        CreatedAt: Date;
      }
      const transactions: Obj = {
        reference: uuidv4(),
        senderAccount: transfer.from,
        amount: transfer.amount,
        receiverAccount: transfer.to,
        transferDescription: transfer.transferDescription,
        CreatedAt: new Date(),
      };

      transaction.push(transactions);
      writeDataToFileTrans(
        './transctions.json', transaction,
      );
      res.status(200).send('transfer successful');
    } else {
      res.status(401).send('You Have Insufficient Fund');
    }
  },
);

export default router;
