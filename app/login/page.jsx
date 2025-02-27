import React from 'react'
import AuthLogin from '../../components/AuthLogin'

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Connexion</h1>
                <AuthLogin />
            </div>
        </div>
    );
}

export default Login
