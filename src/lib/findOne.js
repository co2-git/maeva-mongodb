export default function findOne(conn, finder) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(finder.collection);
      const results = await collection.findOne(finder.query, finder.options);
      resolve(results);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
