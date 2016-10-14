import FindStatement from './FindStatement';

export default function count(conn, finder) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(finder.collection);
      const results = collection.count(new FindStatement(finder.query));
      resolve(results);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
