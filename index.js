const express = require("express");
const cors = require("cors");
const formDate = require("form-data");
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

app.post("/form", (req, res) => {
  console.log("route /form");
  try {
    const { firstname, lastname, email, subject, message } = req.body;

    //message//
    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "tristan.wermelinger@gmail.com",
      subject: `Formaulaire de contact`,
      message: req.body.message,
    };

    client.messages
      .create(
        `sandbox70b44f5afd194bd79bc411103337dc99.mailgun.org`,
        messageData
      )
      .then((response) => {
        console.log(response);
        res.json({ message: "email send" });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
});
