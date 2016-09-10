export default function findById(conn, finder) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(finder.collection);
      const results = await collection.findOne(
        {_id: finder.id},
        finder.options,
      );
      resolve(results);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
