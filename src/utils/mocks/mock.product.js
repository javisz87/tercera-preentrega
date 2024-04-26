import faker from "faker";
import Products from "../../models/entities/Products.model.js";

export async function moackingProducts() {
  const mockingProducts = [];
  for (let i = 1; i <= 100; i++) {
    const product = new Products({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.datatype.number({ min: 1, max: 100 }),
      thumbnail: faker.image.imageUrl(),
      code: `code${i}`,
      stock: faker.datatype.number({ min: 1, max: 100 }),
      category: faker.random.arrayElement([
        "Category 1",
        "Category 2",
        "Category 3",
      ]),
    });

    mockingProducts.push(product.dto());
  }

  return mockingProducts;
}
