// ./src/api/sale/controllers/sale.js
"use strict";

module.exports = {
  async create(ctx) {
    // 1. Get the product ID and quantity from the request body
    const { productId, quantitySold } = ctx.request.body;

    if (!productId || !quantitySold || quantitySold <= 0) {
      return ctx.badRequest("Product ID and a valid quantity are required.");
    }

    try {
      // 2. Fetch the product from the database
      const product = await strapi.entityService.findOne(
        "api::product.product",
        productId
      );

      if (!product) {
        return ctx.notFound("Product not found.");
      }

      // 3. Check if there is enough stock
      if (product.quantity < quantitySold) {
        return ctx.badRequest("Not enough stock available.", {
          productId: product.id,
          availableStock: product.quantity,
        });
      }

      // 4. Reduce the stock and update the product
      const newQuantity = product.quantity - quantitySold;
      const updatedProduct = await strapi.entityService.update(
        "api::product.product",
        productId,
        {
          data: {
            quantity: newQuantity,
          },
        }
      );

      // 5. Return a success response with the updated product
      // This is also the data you can use to generate an invoice on the frontend
      return ctx.send({
        message: "Sale successful!",
        product: updatedProduct,
        quantitySold: quantitySold,
        totalPrice: updatedProduct.price * quantitySold,
      });
    } catch (err) {
      // Handle any unexpected errors
      ctx.internalServerError("An error occurred during the sale process.");
    }
  },
};
