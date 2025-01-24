'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Implementar lógica de recuperação de senha
  };

  return (
    <div className="min-h-screen flex bg-[#EEF5FF]">
      <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center">
        <div className="relative w-full max-w-md">
          <Image
            src="/images/forgot-password.svg"
            alt="Forgot password illustration"
            width={500}
            height={500}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send Reset Link
            </button>

            <div className="text-center">
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 