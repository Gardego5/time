import { openDB } from "idb";
import { getStartOfMonth, getEndOfMonth } from "./utils";

const DB_NAME = "time";
const DB_VERSION = 1;
const DB_STORE = "time";

/*
  Database Schema:
    date   :  string  (index)
    fs     :  number
    ldc    :  number
    rv     :  number
    bs     :  number
    pl     :  number
    vi     :  number
 */

const getDB = async () => (await openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion, newVersion, transaction, event) {
    // create a store if this is the first time opening the db.
    const store = db.createObjectStore(DB_STORE, { keyPath: "date" });

    store.createIndex("fs", "fs", { unique: false });
    store.createIndex("ldc", "ldc", { unique: false });
    store.createIndex("rv", "rv", { unique: false });
    store.createIndex("bs", "bs", { unique: false });
    store.createIndex("pl", "pl", { unique: false });
    store.createIndex("vi", "vi", { unique: false });
  },
}))

export const readMonth = async (date) => {
  const db = await getDB();

  const thisMonth = IDBKeyRange.bound(
    JSON.stringify(getStartOfMonth(date)),
    JSON.stringify(getEndOfMonth(date))
  );

  return await db.getAll(DB_STORE, thisMonth);
};
