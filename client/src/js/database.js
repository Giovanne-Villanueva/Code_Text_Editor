import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  const jateDB = await openDB('jate', 1)

  const tx = jateDB.transaction('jate', 'readwrite')

  const store = tx.objectStore('jate')

  const request = store.add({ value: content });

  const result = await request;
  console.log('data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get the first data in the database.

  const request = store.get(1);

  const result = await request;
  result
    ? console.log(' data retrieved from the database', result.value)
    : console.log(' data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();
