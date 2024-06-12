const sqlite3 = require("sqlite3").verbose();
const { faker } = require("@faker-js/faker");
const fs = require("fs").promises;
const path = require("path");

const FILEPATH = "../database.sqlite";
const RECIPE_COUNT = 5;

async function resetDB() {
  try {
    await fs.unlink(path.join(__dirname, FILEPATH));
  } catch (e) {
    console.log("No existing database found, creating a new one.");
  }

  const db = new sqlite3.Database(path.join(__dirname, FILEPATH), (error) => {
    if (error) {
      return console.error(error.message);
    }
  });

  await new Promise((resolve, reject) => {
    db.exec(
      `
      CREATE TABLE IF NOT EXISTS recipe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        is_vegetarian BOOLEAN,
        cuisine TEXT,
        preparation_time INTEGER,
        image_url TEXT,
        ingredients TEXT,
        steps TEXT
      );
    `,
      (error) => {
        if (error) reject(error);
        else resolve();
      }
    );
  });

  const insertRecipe = db.prepare(`
    INSERT INTO recipe (title, description, is_vegetarian, cuisine, preparation_time, image_url, ingredients, steps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 0; i < RECIPE_COUNT; i++) {
    insertRecipe.run(
      faker.food.dish(),
      faker.food.description(),
      faker.datatype.boolean(),
      faker.helpers.arrayElement(["Italian", "Chinese", "Indian", "Mexican"]),
      faker.number.int({ min: 10, max: 60 }),
      faker.image.urlLoremFlickr({
        width: 500,
        height: 500,
        category: "dish,cooking,colorful",
      }),
      faker.lorem.sentences(2),
      faker.lorem.paragraphs(2)
    );
  }
  insertRecipe.finalize();

  db.close((error) => {
    if (error) {
      return console.error(error.message);
    }
    console.log("Database closed.");
  });
}

resetDB();
