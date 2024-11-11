"use client"

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { deletePermissao, getChaves, getChavesRestritas, getEmployees, getPermissions, postPermissao } from '@/api';
import { Chave, Employee, Permission } from '@/app/types';

const Page = () => {
	const [permissions, setPermissions] = useState<Permission[]>([]);
	const [keysByCabinet, setKeysByCabinet] = useState<Record<string, string[]>>({});
	const [chavesRestritas, setChavesRestritas] = useState<Chave[]>([]);
	const [newCabinet, setNewCabinet] = useState<string | null>(null);
	const [newKey, setNewKey] = useState<string | null>(null);
	const [newEmployee, setNewEmployee] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);
	const [employees, setEmployees] = useState<Employee[]>([]);

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

	const employeesWithPermission = (cabinet: string, key: string) => {
		return permissions.filter((perm) => perm.ARMARIO === cabinet && perm.NUMERO === key);
	}

	const handleAddPermission = async () => {
		if (newCabinet && newKey && newEmployee) {
			const idchave = newKey.split(' ')[0]
			await postPermissao(newCabinet, idchave, newEmployee)
			setNewCabinet(null);
			setNewKey(null);
			setNewEmployee(null);
			//fetchPermissions();
			window.location.reload();
		}
	};

	const handleDelete = async (chave: string, matricula: string) => {
		await deletePermissao(chave, matricula);
		fetchChavesRestritas()
		fetchPermissions()
	}

	async function fetchChaves() {
		const data: Chave[] = await getChaves();

		const keysByCabinet: Record<string, string[]> = data.reduce((acc: Record<string, string[]>, item: Chave) => {
			if (!acc[item.ARMARIO]) {
				acc[item.ARMARIO] = [];
			}
			acc[item.ARMARIO].push(`${item.NUMERO} - ${item.DESCRIÇÃO}`);
			return acc;
		}, {});

		setKeysByCabinet(keysByCabinet);
	}

	async function fetchChavesRestritas() {
		const data = await getChavesRestritas();
		setChavesRestritas(data);
	}

	async function fetchPermissions() {
		const data = await getPermissions();
		setPermissions(data);
	}

	async function fetchEmployees() {
		const data = await getEmployees();
		setEmployees(data);
	}

	useEffect(() => {
		fetchChaves()
		fetchChavesRestritas()
		fetchPermissions()
		fetchEmployees()
	}, [])

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
							<option value="01">Armário 01</option>
							<option value="02">Armário 02</option>
							<option value="03">Armário 03</option>
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
							{newCabinet && keysByCabinet[newCabinet]?.map((key: string) => (
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
									{employee.nome}
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
							<th>Descrição</th>
							<th>Ação</th>
						</tr>
					</thead>
					<tbody>
						{chavesRestritas.map((permission, idx) => (
							<tr key={`${permission.ARMARIO}-${permission.NUMERO}-${idx}`}>
								<td>{permission.ARMARIO}</td>
								<td>{permission.NUMERO}</td>
								<td>{permission.DESCRIÇÃO}</td>
								<td>
									<button onClick={() => openModal(permission.ARMARIO, permission.NUMERO)}>
										Ver detalhes
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>


			{/* Modal para exibir funcionários com permissão */}
			{selectedKey && selectedCabinet && (
				<Modal
					isOpen={isModalOpen}
					closeModal={closeModal}
					title={`Funcionários com permissão para ${selectedKey}`}
				>
					<ul className="space-y-2">
						{employeesWithPermission(selectedCabinet, selectedKey).map((perm, idx) => (
							<li key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
								<span className="font-medium">{perm.FUNCIONARIO.nome} - {perm.FUNCIONARIO.matricula}</span>
								<button
									className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
									onClick={() => handleDelete(`${selectedCabinet}${selectedKey}`, perm.FUNCIONARIO.matricula)}
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
