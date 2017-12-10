import convertValue from './value';

const insertQuery = (fields) => {
  const doc = {};
  for (const fieldDeclaration of fields) {
    const {field, value, type} = fieldDeclaration;
    doc[field] = convertValue(value, type);
  }
  return doc;
};

export default insertQuery;
