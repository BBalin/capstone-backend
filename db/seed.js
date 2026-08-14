import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createProducts } from "#db/queries/products";

const products = [
  {
    name: "Sourdough Bread",
    price: 10.99,
    description: "Freshly baked loaf of sourdough bread.",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzzuQW-zcouppPo3RNRA_5SqcesJffDNcLNmLtz0wTmg&s",
  },
  {
    name: "Cinnamon Rolls",
    price: 12.99,
    description: "Four cinnamon rolls with cream cheese frosting.",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1UNyentiVn3xxumZmS5BxV7VBD-DCVCEMAacUWEtTA&s=10",
  },
  {
    name: "Chocolate Chip Cookies",
    price: 6.99,
    description: "Six warm chocolate chip cookies",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYcR7q-mL8kZ8b9coBK8rZ17SvGwkCkv2oxighGA2yig&s=10",
  },
  {
    name: "Chocolate Cake",
    price: 19.99,
    description: "Rich chocolate cake",
    image_url:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSTkiz552u74LbLR819Ww8ZD9kajFw7VIZWIhhsuaPBtM9Fx2emqdBzxPARDjTmJIVZHP6aSZ4XIqA8Z7MNEefBtS_FGymBBeH3_NeacFer8V-3b9IGaURE2wwKxtW4SiIKGIgPSyBlEg&usqp=CAc",
  },
  {
    name: "Bagels",
    price: 6.99,
    description: "Six freshly baked bagels.",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1_mrCSwKWk76X6AbIwQKrPI0Tz4RMt2LMLsy-IQ8LQ&s=10",
  },
  {
    name: "Donut Holes",
    price: 4.99,
    description: "A bag of donut holes.",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdT1IbPJdNjNrqA6gUO5lS-uwwHGazyDf9S0j7br8TQ&s=10",
  },
  {
    name: "Sugar Cookies",
    price: 6.99,
    description: "Six sweet sugar cookies",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEZr3q53Sd3OC4WjOpABcAHH-yJ8fvceREPQKEWIxtA&s=10",
  },
  {
    name: "Strawberry Cinnamon Rolls",
    price: 12.99,
    description: "Four strawberry Cinnamon Rolls",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNLMZ6rjb7J8h6lTJvJh2SWglo4rj-1yO_iF8r4JrB0A&s=10",
  },
];

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createUser("user1", "pass234", "bryce", "bolin", "bryce@email.com");

  for (const product of products) {
    await createProducts(
      product.name,
      product.price,
      product.description,
      product.image_url,
    );
  }
}
