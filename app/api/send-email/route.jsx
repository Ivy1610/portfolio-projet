import { connectToMongoose } from "@/lib/mongodb";
import Contact from "@/models/contactEmail";
import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log("📩 Requête POST reçue");

    const body = await req.json().catch((error) => {
      console.error('Erreur de parsing JSON:', error);
      return NextResponse.json({ error: 'Erreur de parsing JSON' },
        { status: 400 });
    })

    const { name, email, message } = body;

    // Vérification des champs obligatoires
    if (!name || !email || !message) {
      console.log("❌ Champs manquants");
      return Response.json({ error: "Tous les champs sont requis." },
        { status: 400 });
    }

    console.log("🔗 Connexion à MongoDB...");
    await connectToMongoose();

    console.log("🔍 Vérification si l'email existe déjà...");
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      console.log("➕ Ajout du message pour l'email existant...");
      if (!Array.isArray(existingContact.messages)) {
        existingContact.messages = [];
      }
      existingContact.messages.push({ name, message });
      await existingContact.save();
      console.log("✅ Message ajouté !");
    } else {
      console.log("📝 Création d'un nouvel enregistrement...");
      const newContact = new Contact({ name, email, messages: [{ name, message }] });
      await newContact.save();
      console.log("✅ Nouveau message enregistré !");
    }

    // 📧 **Configuration de Nodemailer**
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 📩 **Email envoyé à l'admin**
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: "youlivevent@gmail.com",
      subject: "📩 Nouveau message de contact",
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // 📩 **Email de confirmation pour l’utilisateur**
    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "✅ Confirmation de réception",
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Nous avons bien reçu votre message et nous vous répondrons sous peu.</p>
        <p><strong>Votre message :</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">${message}</blockquote>
        <p>Merci de nous avoir contactés !</p>
        <p>Cordialement,<br><strong>L'équipe de YouLive Event</strong></p>
      `,
    };

    console.log("📤 Envoi des e-mails...");
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log("✅ E-mails envoyés avec succès !");

    return Response.json({ message: "Message enregistré et email envoyé avec succès !" },
      { status: 201 });

  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
