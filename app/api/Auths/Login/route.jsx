import { NextResponse } from 'next/server';
import getUser from '@/utils/getUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const userData = await request.json();
    const user = await getUser(userData);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Comparer les mots de passe
    const isValid = await bcrypt.compare(userData['password'], user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log('Erreur lors de la connexion:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

