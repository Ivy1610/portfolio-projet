import { NextResponse } from 'next/server';
import insertUser from '@/utils/insertUser';

export async function POST(request) {
  try {
    const userData = await request.json(); // Récupère les données de la requête
    const result = await insertUser(userData); // Insère l'utilisateur

    if (result.success) {
      return NextResponse.json({ success: true, userId: result.userId });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
