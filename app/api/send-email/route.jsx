import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = req.body;

  // Configurez le transporteur pour envoyer des e-mails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Utilisez une variable d'environnement pour votre e-mail
      pass: process.env.EMAIL_PASSWORD, // Utilisez une variable d'environnement pour votre mot de passe
    },
  });

  const mailOptions = {
    from: email,
    to: 'youlivevent@gmail.com',
    subject: 'Nouveau message de contact',
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 });
  }
}
