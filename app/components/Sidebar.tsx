'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  RiDashboardLine, 
  RiTeamLine, 
  RiSettings4Line, 
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine
} from 'react-icons/ri';
import { auth } from '../database/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: RiDashboardLine
    },
    {
      path: '/funcionarios',
      name: 'Funcionários',
      icon: RiTeamLine
    },
    {
      path: '/configuracoes',
      name: 'Configurações',
      icon: RiSettings4Line
    }
  ];

  const handleLogout = async () => {
    try {
      if (!auth) return;
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) return null;

  return (
    <div 
      className={`min-h-screen bg-white border-r transition-all duration-300 ${
        expanded ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 bg-black rounded-full mr-2"></div>
        {expanded && <span className="text-xl font-medium">Funcionários</span>}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 border-b flex items-center justify-center text-gray-500 hover:bg-gray-50"
      >
        {expanded ? <RiMenuFoldLine size={20} /> : <RiMenuUnfoldLine size={20} />}
      </button>

      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center p-3 mb-1 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="min-w-[20px]" />
              {expanded && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-4"
        >
          <RiLogoutBoxLine size={20} className="min-w-[20px]" />
          {expanded && <span className="ml-3">Sair</span>}
        </button>
      </nav>
    </div>
  );
} 