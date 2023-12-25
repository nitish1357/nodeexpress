const path = require('path');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
  //   console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image');
  }

  const maxSize = 1000;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1KB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage };
