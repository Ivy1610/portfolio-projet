import { NextResponse } from 'next/server';
import { insertUser } from '@/utils/insertUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(request) {
  try {
    const userData = await request.json(); // Récupère les données de la requête
    const result = await insertUser(userData); // Insère l'utilisateur

    const token = jwt.sign({ userId: result.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    if (result.success) {
      return NextResponse.json({ success: true, userId: result.userId }, { status: 201 });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erreur du server'}, { status: 500 });
  }
}
