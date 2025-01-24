'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import Script from 'next/script';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return !user ? (
    <>
      <Script src="https://api.storyset.com/script.js" />
      <div className="min-h-screen flex bg-[#EEF5FF]">
        {/* Lado esquerdo - Ilustração */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#EBF3FA] p-12 items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="flex items-start mb-8">
              <div className="w-8 h-8 bg-black rounded-full mr-2"></div>
              <span className="text-xl font-medium">Employee</span>
            </div>
            <div 
              className="main-illustration"
              data-src="https://api.storyset.com/illustration/team-work/amico"
              data-accent="#32A3F5"
            ></div>
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <LoginForm />
        </div>
      </div>
    </>
  ) : null;
} 