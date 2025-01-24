'use client';

import { useState } from 'react';

interface Employee {
  name: string;
  position: string;
  department: string;
  contact: string;
}

export default function FuncionariosPage() {
  const [employees] = useState<Employee[]>([
    {
      name: "Emily Johnson",
      position: "Software Engineer",
      department: "Development",
      contact: "emily.johnson@example.com"
    },
    {
      name: "Michael Brown",
      position: "Project Manager",
      department: "Operations",
      contact: "michael.brown@example.com"
    },
    {
      name: "Sarah Williams",
      position: "UX Designer",
      department: "Design",
      contact: "sarah.williams@example.com"
    }
  ]);

  return (
    <div className="min-h-screen bg-white p-8">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <h1 className="text-xl font-medium">Funcionários</h1>
        </div>
        <nav className="flex gap-6">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
          <a href="/funcionarios" className="text-gray-900 font-medium">Employees</a>
          <a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
          <button className="text-gray-600 hover:text-gray-900">Logout</button>
        </nav>
      </header>

      <div className="bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Listagem de Funcionários</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Position</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
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
                      <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                        Delete
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