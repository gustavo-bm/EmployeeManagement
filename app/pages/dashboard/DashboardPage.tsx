'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../database/firebase';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe?.();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bem-vindo ao painel de controle</p>
    </div>
  );
} 