const { error } = require("console");
const { products, accounts, images } = require("../models");

const db = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

module.exports = {
  getData: async (req, res, next) => {
    try {
      const result = await products.findAll({
        where: {
          isDeleted: false,
        },
      });
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  addProduct: async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      const files = req.files;
      const product = await products.create(
        {
          accountid: req.accountData.id,
          name: req.body.name,
          price: req.body.price,
        },
        { transaction: t }
      );

      for (let i = 0; i < files.length; i++) {
        await images.create(
          {
            image: files[i].filename,
            productid: product.id,
          },
          { transaction: t }
        );
      }

      await t.commit();
      return res.status(201).send({
        success: true,
        message: "product successfully added",
        product,
      });
    } catch (error) {
      await t.rollback();

      console.log(error);

      const files = req.files;
      files.forEach((file) => {
        fs.unlinkSync(`./public/${file.filename}`);
      });

      return res.status(500).send({
        success: false,
        message: error,
      });
    }
  },
  deleteProduct: async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      const product = await products.findOne({
        where: {
          id: req.params.id,
        },
      });

      await product.update(
        {
          isDeleted: true,
        },
        { transaction: t }
      );

      const result = await products.findAll({
        where: {
          isDeleted: false,
        },
      });

      res.status(200).send({
        success: true,
        message: "product successfully deleted.",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error,
      });
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const product = await products.findByPk(req.params.id)

      product.name = req.body.name || product.name
      product.price = req.body.price || product.price

      await product.save({ transaction: t })

      const result = await products.findByPk(req.params.id)

      res.status(200).send({
        success: true,
        message: "product successfully updated",
        result
      })

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error
      })
    }
  }
}

