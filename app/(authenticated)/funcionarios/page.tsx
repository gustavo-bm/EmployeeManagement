'use client';

import { useState } from 'react';
import { useEmployees } from '@/app/hooks/useEmployees';
import { Employee } from '@/app/types/employee';
import { RiAddLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import defaultImage from '../../../public/images/default.webp';
import Image from 'next/image';

export default function FuncionariosPage() {
  const {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployees();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    position: '',
    image: '',
    contact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateEmployee(isEditing, formData);
      } else {
        await addEmployee(formData as Omit<Employee, 'id'>);
      }
      setFormData({ name: '', position: '', image: '', contact: '' });
      setIsEditing(null);
      setShowForm(false);
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  const handleEdit = (employee: Employee) => {
    if (!employee.id) return;
    setIsEditing(employee.id);
    setFormData(employee);
    setShowForm(true);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ name: '', position: '', image: '', contact: '' });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        await deleteEmployee(id);
      } catch (err) {
        console.error('Erro ao deletar:', err);
      }
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const versionOne = () => {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEditing ? 'Editar Funcionário' : 'Funcionários'}
          </h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <RiAddLine size={20} />
              Adicionar Funcionário
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contato</label>
                <input
                  type="email"
                  value={formData.contact}
                  onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditing ? 'Atualizar' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
          <SearchBar onSearch={() => { }} />

            <table className="w-full mt-4">
              
              <thead>
                <tr className="text-left border-b">
                  <th className="py-4 px-4">Nome</th>
                  <th className="py-4 px-4">Cargo</th>
                  <th className="py-4 px-4">Contato</th>
                  <th className="py-4 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">

                    <td className="py-4 px-4">{employee.name}</td>
                    <td className="py-4 px-4">{employee.position}</td>
                    <td className="py-4 px-4">
                      <a href={`mailto:${employee.contact}`} className="text-blue-600 hover:underline">
                        {employee.contact}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id!)}
                          className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  const versionTwo = () => {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            {isEditing ? "Editar Funcionário" : "Funcionários"}
          </h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              <RiAddLine size={22} />
              Adicionar Funcionário
            </button>
          )}
        </div>
        <SearchBar onSearch={() => { }} />


        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contato</label>
                <input
                  type="email"
                  value={formData.contact}
                  onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                {isEditing ? "Atualizar" : "Adicionar"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Lista de funcionários com imagem ocupando todo o círculo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md overflow-hidden">
                      <Image
                        src={employee.image.length > 0 ? employee.image : defaultImage}
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{employee.name}</h3>
                    <p className="text-sm font-medium text-blue-600">{employee.position}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    {employee.contact}
                  </div>

                  <div className="flex mt-4 gap-4">
                    <div className="flex justify-start gap-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id!)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <p className="mt-4 text-lg font-medium text-gray-600">Nenhum funcionário cadastrado.</p>
              <p className="mt-2 text-gray-500">Adicione funcionários para vê-los listados aqui.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const versionThree = () => {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
            <span className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </span>
            {isEditing ? "Editar Funcionário" : "Equipe"}
          </h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              <RiAddLine size={22} />
              Adicionar Funcionário
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contato</label>
                <input
                  type="email"
                  value={formData.contact}
                  onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                {isEditing ? "Atualizar" : "Adicionar"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Timeline de funcionários */}
        <div className="relative">
        <SearchBar onSearch={() => { }} />

          {employees.length > 0 ? (
            <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-400 before:to-indigo-600 mt-8">

              {employees.map((employee) => (
                <div key={employee.id} className="mb-10 relative">

                  {/* Indicador na linha do tempo */}
                  <div className="absolute -left-8 flex items-center justify-center">
                    <div
                      className="w-8 h-8 bg-white rounded-full shadow-md border-2 border-blue-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-indigo-600 z-10"
                      onClick={() => alert(`Perfil de ${employee.name}`)}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={employee.image.length > 0 ? employee.image : defaultImage}
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo do funcionário */}
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-px group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {employee.name}
                        </h3>
                        <div className="mt-1 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium">
                          {employee.position}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          onClick={() => handleEdit(employee)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                        <button
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          onClick={() => handleDelete(employee.id!)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <a href={`mailto:${employee.contact}`} className="hover:text-blue-600 hover:underline">
                        {employee.contact}
                      </a>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-500">Online agora</span>
                      </div>

                      <button className="group-hover:bg-blue-600 px-4 py-1.5 rounded text-sm text-blue-600 group-hover:text-white border border-blue-200 group-hover:border-blue-600 transition-all">
                        Ver perfil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 px-8 bg-white rounded-lg shadow text-center">
              <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-blue-50 mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Equipe vazia</h3>
              <p className="text-gray-600 mb-6">Adicione funcionários para começar a construir sua equipe</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                <RiAddLine size={20} />
                Adicionar primeiro funcionário
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const SearchBar = ({ onSearch }: { onSearch: (searchTerm: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    interface SearchBarProps {
      onSearch: (searchTerm: string) => void;
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSearch(searchTerm);
    };

    const clearSearch = () => {
      setSearchTerm('');
      onSearch('');
    };

    return (
      <div className="w-full max-w-xl relative">
        <form onSubmit={handleSearch} className="relative">
          <div className={`flex items-center w-full rounded-lg border transition-all duration-200 ${isFocused ? 'border-blue-500 shadow-md' : 'border-gray-300'
            }`}>
            <div className="pl-4">
              <RiSearchLine className="text-gray-500" size={20} />
            </div>

            <input
              type="text"
              placeholder="Buscar funcionário por nome, cargo ou contato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full py-3 px-3 text-gray-700 rounded-lg focus:outline-none"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="pr-4 text-gray-500 hover:text-gray-700"
              >
                <RiCloseLine size={20} />
              </button>
            )}
          </div>
        </form>

        {isFocused && searchTerm && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="p-2 text-sm text-gray-500">
              Pressione Enter para buscar &quot;{searchTerm}&quot;
            </div>
          </div>
        )}
      </div>
    );
  };

  var version = 3

  return (
    <div className='p-8 mt-10'>
      {(() => {
        switch (version) {
          case 1:
            return versionOne();
          case 2:
            return versionTwo();
          case 3:
            return versionThree();
          default:
            return <p>Versão desconhecida</p>;
        }
      })()}
    </div>

  );
} 