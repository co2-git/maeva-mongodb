import insertQuery from '../queries/insert';

const insertMany = (db, documents, model) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const docs = documents.map(document => insertQuery(document));
      const results = await collection.insertMany(docs);
      resolve(results.ops);
    } catch (error) {
      reject(error);
    }
  });

export default insertMany;
