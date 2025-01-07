export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {    
    if (!req.body.name || !req.body.contact) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    return res.status(200).json({
      message: "Data received",
      data: req.body,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error processing data" });
  }
}