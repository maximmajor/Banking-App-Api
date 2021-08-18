/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const fs = require('fs');
import path from 'path';

const dbpath = path.resolve('.', './balances.json');

export function writeDataToFileBal(filename: string, content: string) {
  fs.writeFileSync(
    dbpath,
    JSON.stringify(content, null, 2),
    'utf8',
    (err: any) => {
      if (err) {
        console.log(err);
      }
    },
  );
}

export function getDataBaseBal() {
  //create database if it doesn't exist.
  try {
    fs.accessSync(dbpath);
  } catch (err) {
    //file doesnt exit
    fs.writeFileSync(dbpath, JSON.stringify([]));
  }
  const balances = eval(JSON.parse(fs.readFileSync(dbpath, 'utf8')));
  return balances;
}
