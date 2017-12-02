const insertMany = (db, documents, model) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.insertMany(documents);
      resolve(results.ops);
    } catch (error) {
      reject(error);
    }
  });

export default insertMany;
