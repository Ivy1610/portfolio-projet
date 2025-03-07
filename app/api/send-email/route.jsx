import { connectToMongoose } from "@/lib/mongodb";
import Contact from "@/models/contactEmail";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    console.log("📩 Requête POST reçue"); // Débogage

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.log("❌ Champs manquants");
      return Response.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    console.log("🔗 Connexion à MongoDB...");
    await connectToMongoose();

    console.log("📝 Enregistrement du message dans MongoDB...");
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Message enregistré dans MongoDB !");

    // Configurer Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email envoyé à l'admin
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: "youlivevent@gmail.com",
      subject: "📩 Nouveau message de contact",
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Email de confirmation pour l’utilisateur
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
    console.log("✅ E-mails envoyés !");

    return Response.json({ message: "Message enregistré et email envoyé avec succès !" });

  } catch (error) {
    console.error("❌ Erreur :", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
