'use client';

import { useState } from 'react';
import { useEmployees } from '@/app/hooks/useEmployees';
import { Employee } from '@/app/types/employee';
import { RiAddLine } from 'react-icons/ri';

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
    department: '',
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
      setFormData({ name: '', position: '', department: '', contact: '' });
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
    setFormData({ name: '', position: '', department: '', contact: '' });
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
              <label className="block text-sm font-medium mb-1">Departamento</label>
              <input
                type="text"
                value={formData.department}
                onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
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
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-4 px-4">Nome</th>
                <th className="py-4 px-4">Cargo</th>
                <th className="py-4 px-4">Departamento</th>
                <th className="py-4 px-4">Contato</th>
                <th className="py-4 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{employee.name}</td>
                  <td className="py-4 px-4">{employee.position}</td>
                  <td className="py-4 px-4">{employee.department}</td>
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