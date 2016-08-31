export default function insert(conn, inserter) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(inserter.collection);
      let result;
      if (Array.isArray(inserter.documents)) {
        result = await collection.insertMany(inserter.documents);
      } else {
        result = await collection.insertOne(inserter.documents);
      }
      if (!result.result.ok) {
        reject(new Error('Could not insert'));
      } else {
        if (Array.isArray(inserter.documents)) {
          resolve(result.ops);
        } else {
          resolve(result.ops[0]);
        }
      }
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
