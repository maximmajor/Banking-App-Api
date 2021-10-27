/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
import path from "path";

const dbpath = path.resolve(".", "./transctions.json");


export function writeDataToFileTrans(filename: string, content: string) {
  fs.writeFileSync(
    dbpath,
    JSON.stringify(content, null, 2),
    "utf8",
    (err: string) => {
      if (err) {
        console.log(err); 
      }
    }
  );
  }

export function getDataBaseTrans() {
  //create database if it doesn't exist.
  try {
    fs.accessSync(dbpath);
  } catch (err) {
    //file doesnt exit
    fs.writeFileSync(dbpath, JSON.stringify([]));
  }
  const transactions = eval(JSON.parse(fs.readFileSync(dbpath, "utf8")));
  return transactions;
}