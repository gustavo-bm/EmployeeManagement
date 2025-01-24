'use client';

import React, { useState } from 'react';
import { auth } from '../database/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      console.error('Reset password error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/user-not-found':
          setError('Usuário não encontrado');
          break;
        default:
          setError('Erro ao enviar email de recuperação. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold mb-8">Recuperar Senha</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {success ? (
        <div className="text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            Email de recuperação enviado! Verifique sua caixa de entrada.
          </div>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800"
          >
            Voltar para o login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#32A3F5] text-white py-3 rounded-lg transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar email de recuperação'}
          </button>

          <div className="text-center mt-4">
            <Link 
              href="/" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
} 