import { useState, useEffect } from 'react';
import { db } from '../database/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { Employee } from '../types/employee';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar funcionários
  const fetchEmployees = async () => {
    try {
      const q = query(collection(db, 'employees'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const employeesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Employee[];
      setEmployees(employeesData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar funcionários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar funcionário
  const addEmployee = async (employee: Omit<Employee, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'employees'), employee);
      const newEmployee = { ...employee, id: docRef.id };
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError('Erro ao adicionar funcionário');
      throw err;
    }
  };

  // Atualizar funcionário
  const updateEmployee = async (id: string, data: Partial<Employee>) => {
    try {
      const employeeRef = doc(db, 'employees', id);
      await updateDoc(employeeRef, data);
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? { ...emp, ...data } : emp)
      );
    } catch (err) {
      setError('Erro ao atualizar funcionário');
      throw err;
    }
  };

  // Deletar funcionário
  const deleteEmployee = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'employees', id));
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      setError('Erro ao deletar funcionário');
      throw err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    refreshEmployees: fetchEmployees
  };
} 