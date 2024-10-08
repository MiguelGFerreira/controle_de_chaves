"use client"

import { useState } from 'react';

// Tipagem
interface Employee {
  matricula: string;
  name: string;
}

interface Permission {
  cabinet: string;
  key: string;
  employee: Employee;
}

// Dados simulados
const cabinets = ['01', '02', '03'];
const keysByCabinet: Record<string, string[]> = {
  '01': ['Chave A', 'Chave B', 'Chave C'],
  '02': ['Chave D', 'Chave E'],
  '03': ['Chave F', 'Chave G', 'Chave H']
};

const employees: Employee[] = [
  { matricula: '001', name: 'João Silva' },
  { matricula: '002', name: 'Maria Oliveira' },
  { matricula: '003', name: 'Carlos Pereira' },
  { matricula: '004', name: 'Ana Souza' }
];

const Page = () => {
  const [selectedCabinet, setSelectedCabinet] = useState<string>('01');
  const [selectedKey, setSelectedKey] = useState<string>(keysByCabinet['01'][0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.matricula.includes(searchTerm) || emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPermission = (matricula: string) => {
    const employee = employees.find(emp => emp.matricula === matricula);
    if (employee) {
      setPermissions((prev) => [...prev, { cabinet: selectedCabinet, key: selectedKey, employee }]);
    }
  };

  const removePermission = (matricula: string) => {
    setPermissions((prev) => prev.filter(p => p.employee.matricula !== matricula));
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[#003B2F]">Cadastro de Permissões para Chaves</h1>

      {/* Formulário */}
      <div className="space-y-6 bg-white shadow-lg p-6 rounded-md">
        <div className="grid grid-cols-3 gap-4">
          {/* Campo Armário */}
          <div>
            <label htmlFor="cabinet" className="block text-sm font-medium text-gray-700">
              Armário
            </label>
            <select
              id="cabinet"
              value={selectedCabinet}
              onChange={(e) => {
                setSelectedCabinet(e.target.value);
                setSelectedKey(keysByCabinet[e.target.value][0]);
              }}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#003B2F] focus:border-[#003B2F] sm:text-sm"
            >
              {cabinets.map((cabinet) => (
                <option key={cabinet} value={cabinet}>{cabinet}</option>
              ))}
            </select>
          </div>

          {/* Campo Chave */}
          <div>
            <label htmlFor="key" className="block text-sm font-medium text-gray-700">
              Chave
            </label>
            <select
              id="key"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#003B2F] focus:border-[#003B2F] sm:text-sm"
            >
              {keysByCabinet[selectedCabinet].map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          {/* Campo Matrícula */}
          <div>
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
              Matrícula / Nome do Funcionário
            </label>
            <input
              id="employee"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite a matrícula ou nome"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#003B2F] focus:border-[#003B2F] sm:text-sm"
            />
          </div>
        </div>

        {/* Botão de Adicionar Permissão */}
        <button
          onClick={() => addPermission(filteredEmployees[0]?.matricula)}
          className="bg-[#003B2F] text-white py-2 px-4 rounded-md hover:bg-[#72a83f50] transition-colors"
        >
          Adicionar Permissão
        </button>
      </div>

      {/* Tabela de Permissões */}
      <div className="space-y-4">
        <table className="min-w-full table-auto grupotristao">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Armário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Chave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Funcionário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ação</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission, idx) => (
              <tr key={idx} className="even:bg-[#72a83f50] odd:bg-[#72a83f24]">
                <td className="px-6 py-4">{permission.cabinet}</td>
                <td className="px-6 py-4">{permission.key}</td>
                <td className="px-6 py-4">{permission.employee.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removePermission(permission.employee.matricula)}
                    className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
