const mongoose = require("mongoose");
require("dotenv").config();

async function createDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");

  const testSchema = new mongoose.Schema({ name: String });
  const Test = mongoose.model("Test", testSchema);

  await Test.create({ name: "Hello Phase7" });

  console.log("Inserted sample document ✅");
  await mongoose.disconnect();
}

createDB().catch(console.error);
