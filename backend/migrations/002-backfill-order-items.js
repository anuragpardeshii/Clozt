module.exports = {
  name: '002-backfill-order-items',
  async run(connection) {
    const orders = connection.collection('orders');
    const products = connection.collection('products');
    const cursor = orders.find(
      {
        items: {
          $elemMatch: {
            $or: [{ name: { $exists: false } }, { image: { $exists: false } }],
          },
        },
      },
      { projection: { items: 1 } }
    );
    let updated = 0;
    let unavailable = 0;

    for await (const order of cursor) {
      const productIds = order.items
        .filter((item) => item.product && (!item.name || !item.image))
        .map((item) => item.product);
      const matchingProducts = productIds.length
        ? await products.find(
          { _id: { $in: productIds } },
          { projection: { title: 1, images: 1 } }
        ).toArray()
        : [];
      const productsById = new Map(matchingProducts.map((product) => [String(product._id), product]));
      const fields = {};

      order.items.forEach((item, index) => {
        const product = productsById.get(String(item.product));
        if (!item.name) {
          fields[`items.${index}.name`] = product?.title || 'Unavailable product';
          if (!product) unavailable += 1;
        }
        if (!item.image && product?.images?.[0]) {
          fields[`items.${index}.image`] = product.images[0];
        }
      });

      if (Object.keys(fields).length) {
        await orders.updateOne({ _id: order._id }, { $set: fields });
        updated += 1;
      }
    }

    await orders.createIndex(
      { user: 1, checkoutKey: 1 },
      {
        name: 'user_1_checkoutKey_1',
        unique: true,
        partialFilterExpression: { checkoutKey: { $type: 'string' } },
      }
    );
    console.log(`Backfilled ${updated} order(s); ${unavailable} item(s) had no product record.`);
  },
};
