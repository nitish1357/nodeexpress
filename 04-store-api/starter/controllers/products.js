const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 'ab';
  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    // queryObject.name = name;
    queryObject.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};

// - Define a queryObject function that constructs the queryObject, and pass that to the .find method (needs to know the properties you want in the object)
// async function getAllProducts (req, res) {
//     const properties = ['featured', 'company', 'name']
//     const products = await Product.find(queryObject(req.query, properties));
//     res.status(200).json({message: 'products route', products})
// }

// And here is the object builder fn:

//  function queryObject(query, props) {
//     const queryObject = {}
//     props.map(prop => query[prop] ? queryObject[prop]=query[prop] : null)
//     return queryObject
// }

// =============================================================

// Mongoose6 version is simpler. No need to define acceptable properties for the object builder.

// async function getAllProducts (req, res) {
//     const products = await Product.find(queryObject(req.query));
//     res.status(200).json({message: 'products route', products})
// }

// And here's the object builder (that only needs the query as an argument). Doesn't need a list of acceptable properties, since mongoose6 will ignore any properties that are not on the schema.

//  function queryObject(query) {
//     const queryObject = {}
//     Object.keys(query).map(prop => {
//         const value = query[prop]
//         value ? queryObject[prop] = value : null;
//     })
//     return queryObject
// }
