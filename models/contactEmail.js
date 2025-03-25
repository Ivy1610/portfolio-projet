// ContactEmail.js
const mongoose  = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  message: [{ type: String, required: true }]
}, { timestamps: true });

const Contact = mongoose.models.ContactEmail || mongoose.model("ContactEmail", ContactSchema);

module.exports = Contact;
