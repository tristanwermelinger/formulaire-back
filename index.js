const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: process.env.NAME,
  key: process.env.MAILGUN_API_KEY,
});

app.get("/", (req, res) => {
  console.log("route /");
  res.json("Bonjour");
});

app.post("/form", async (req, res) => {
  console.log("route /form");
  try {
    const { firstname, lastname, email, subject, message } = req.body;

    //message//
    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "tristan.wermelinger@gmail.com",
      subject: `Formaulaire de contact`,
      message: message,
    };

    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );
    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.json({ message: error.message });
  }
  app.listen("3003", () => {
    console.log("server started ");
  });
});
