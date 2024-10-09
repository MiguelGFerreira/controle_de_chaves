"use client"

import { useState } from 'react';
import Modal from '@/components/Modal';

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

// Permissões já cadastradas
const initialPermissions: Permission[] = [
	{ cabinet: '01', key: 'Chave A', employee: { matricula: '001', name: 'João Silva' } },
	{ cabinet: '01', key: 'Chave A', employee: { matricula: '001', name: 'João Pedro' } },
	{ cabinet: '02', key: 'Chave D', employee: { matricula: '002', name: 'Maria Oliveira' } },
	{ cabinet: '03', key: 'Chave F', employee: { matricula: '003', name: 'Carlos Pereira' } },
	{ cabinet: '01', key: 'Chave B', employee: { matricula: '004', name: 'Ana Souza' } }
];

const Page = () => {
	const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
	const [newCabinet, setNewCabinet] = useState<string | null>(null);
	const [newKey, setNewKey] = useState<string | null>(null);
	const [newEmployee, setNewEmployee] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);

	const openModal = (cabinet: string, key: string) => {
		setSelectedCabinet(cabinet);
		setSelectedKey(key);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedKey(null);
		setSelectedCabinet(null);
		setIsModalOpen(false);
	};

	const employeesWithPermission = (cabinet: string, key: string) =>
		permissions.filter((perm) => perm.cabinet === cabinet && perm.key === key);

	const handleAddPermission = () => {
		if (newCabinet && newKey && newEmployee) {
			const selectedEmployee = employees.find(emp => emp.matricula === newEmployee);
			if (selectedEmployee) {
				const newPermission: Permission = {
					cabinet: newCabinet,
					key: newKey,
					employee: selectedEmployee
				};
				setPermissions([...permissions, newPermission]);
				// Resetar o formulário
				setNewCabinet(null);
				setNewKey(null);
				setNewEmployee(null);
			}
		}
	};

	return (
		<div className="principal">
			<h1>Cadastro de Permissões para Chaves</h1>

			{/* Formulário */}
			<div className="card">
				<div className="formulario">
					{/* Armário */}
					<div>
						<label htmlFor="cabinet">Armário</label>
						<select
							id="cabinet"
							value={newCabinet ?? ''}
							onChange={(e) => setNewCabinet(e.target.value)}
						>
							<option value="">Selecione um armário</option>
							{cabinets.map((cabinet) => (
								<option key={cabinet} value={cabinet}>
									Armário {cabinet}
								</option>
							))}
						</select>
					</div>

					{/* Chave */}
					<div>
						<label htmlFor="key">Chave</label>
						<select
							value={newKey ?? ''}
							onChange={(e) => setNewKey(e.target.value)}
							disabled={!newCabinet}
						>
							<option value="">Selecione uma chave</option>
							{newCabinet && keysByCabinet[newCabinet].map((key) => (
								<option key={key} value={key}>
									{key}
								</option>
							))}
						</select>
					</div>

					{/* Matrícula */}
					<div>
						<label htmlFor="employee">Matrícula / Nome do Funcionário</label>
						<input
							type="text"
							list="employeeList"
							value={newEmployee ?? ''}
							onChange={(e) => setNewEmployee(e.target.value)}
							placeholder="Digite a matrícula ou nome"
						/>
						<datalist id="employeeList">
							{employees.map((employee) => (
								<option key={employee.matricula} value={employee.matricula}>
									{employee.name} ({employee.matricula})
								</option>
							))}
						</datalist>
					</div>
				</div>

				<button onClick={handleAddPermission}>
					Adicionar Permissão
				</button>
			</div>

			{/* Tabela de Permissões */}
			<div className="space-y-4">
				<table className="grupotristao">
					<thead>
						<tr>
							<th>Armário</th>
							<th>Chave</th>
							<th>Funcionário</th>
							<th>Ação</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(keysByCabinet).map(([cabinet, keys]) =>
							keys.map((key) => (
								<tr key={key}>
									<td>{cabinet}</td>
									<td>{key}</td>
									<td>
										{employeesWithPermission(cabinet, key).length} funcionários
									</td>
									<td>
										<button onClick={() => openModal(cabinet, key)}>
											Ver detalhes
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>


			{/* Modal */}
			{selectedKey && selectedCabinet && (
				<Modal
					isOpen={isModalOpen}
					closeModal={closeModal}
					title={`Funcionários com permissão para ${selectedKey}`}
				>
					<ul className="space-y-2">
						{employeesWithPermission(selectedCabinet, selectedKey).map((perm, idx) => (
							<li key={idx} className="flex justify-between items-center">
								<span>{perm.employee.name} - {perm.employee.matricula}</span>
								<button
									className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
								>
									Excluir
								</button>
							</li>
						))}
					</ul>
				</Modal>
			)}
		</div>
	);
}

export default Page;
