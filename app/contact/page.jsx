import React from 'react'
import ContactForm from '../../components/ContactForm'

const Contact = () => {
  return (
    <div className="container mx-auto p-4 flex-grow">
      <h1 className="text-center text-3xl font-bold mb-6">Contactez-nous</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Informations de Contact</h2>
        <p>Pour toute question, veuillez nous contacter à l'adresse suivante :</p>
        <p>Email : youlivevent@gmail.com</p>
        <p>Téléphone : +33 1 00 00 00 00</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold"></h2>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
