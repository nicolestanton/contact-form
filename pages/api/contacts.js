import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@contact.usu4s.mongodb.net/?retryWrites=true&w=majority&appName=contact`;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("contactList");
    const collection = db.collection("contacts");

    const data = req.body;

    // validation
    if (!data.name || !data.occupation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check for existing contact with same name or contact number
    const existingContact = await collection.findOne({
      name: data.name,
      occupation: data.occupation,
    });

    if (existingContact) {
      return res.status(409).json({ message: "duplicate entry" });
    }

    const result = await collection.insertOne({
      name: data.name,
      occupation: data.occupation,
      contact: data.contact,
    });

    return res.status(200).json({
      message: "Contact saved",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error saving contact" });
  } finally {
    await client.close();
  }
}
