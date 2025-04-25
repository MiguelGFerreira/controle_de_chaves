"use client"

import { deleteChave, getChaves, patchChave, postChave } from "@/api";
import { Chave } from "@/app/types";
import Modal from "@/components/Modal";
import ToggleSwitch from "@/components/ToggleSwitch";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Checkbox } from '@headlessui/react'

const page = () => {
	const [chaves, setChaves] = useState<Chave[]>([]);
	const [armario, setArmario] = useState("");
	const [newKey, setNewKey] = useState("");
	const [description, setDescription] = useState("");
	const [restrito, setRestrito] = useState(false);
	const [newDescricao, setNewDescricao] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState<Chave | null>(null);

	const openModal = (key: Chave) => {
		setSelectedKey(key);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedKey(null);
		setIsModalOpen(false);
	};

	async function fetchChaves() {
		const data = await getChaves();
		setChaves(data);
	}

	async function handleDelete(id: string) {
		await deleteChave(id);
		fetchChaves();
	}

	async function handleToggleRestrito(chave: Chave) {
		const updatedRestrito = chave.RESTRITO === "SIM" ? "N" : "S";
		const restrito = chave.RESTRITO === "SIM" ? "S" : "N";
		await patchChave(chave.ARMARIO + chave.NUMERO, restrito, { restrito: updatedRestrito });
		fetchChaves();
	}

	async function handleEditDescricao() {
		if (selectedKey) {
			await patchChave(selectedKey.ARMARIO + selectedKey.NUMERO, selectedKey.DESCRIÇÃO, { descricao: newDescricao });
			setSelectedKey(null);
			fetchChaves();
		}
	}

	useEffect(() => {
		fetchChaves()
	}, [])

	if (!chaves) return <div>Loading...</div>

	async function handleAddKey() {
		await postChave(armario, newKey, description, restrito);
		fetchChaves();
	}

	return (
		<div className="principal">
			<h1>Cadastro de Chaves</h1>
			<div className="card">
				<div className="formulario">
					{/* Armário */}
					<div>
						<label htmlFor="cabinet">Armário</label>
						<select
							id="cabinet"
							value={armario ?? ''}
							onChange={(e) => setArmario(e.target.value)}
						>
							<option value="">Selecione um armário</option>
							<option value={"01"}>Armário 01</option>
							<option value={"02"}>Armário 02</option>
							<option value={"03"}>Armário 03</option>
						</select>
					</div>

					{/* Chave */}
					<div>
						<label htmlFor="key">Chave</label>
						<input
							placeholder="Digite o numero da chave"
							onChange={(e) => setNewKey(e.target.value)}
							disabled={!armario}
						/>
					</div>

					{/* Matrícula */}
					<div>
						<label htmlFor="employee">Descrição</label>
						<input
							type="text"
							placeholder="Digite a Descrição"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					{/* Restrito */}
					<div>
						<label htmlFor="restrito">Restrito</label>
						<Checkbox
							checked={restrito}
							onChange={setRestrito}
							className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
						>
							{/* Checkmark icon */}
							<svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
								<path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</Checkbox>
					</div>
				</div>


				<button onClick={handleAddKey}>
					Adicionar Chave
				</button>
			</div>

			<table className="grupotristao">
				<thead>
					<tr>
						<th>Armário</th>
						<th>Número</th>
						<th>Descrição</th>
						<th>Restrito</th>
						<th>Excluir</th>
					</tr>
				</thead>
				<tbody>
					{chaves.map((chave, index) => (
						<tr key={index}>
							<td>{chave.ARMARIO}</td>
							<td>{chave.NUMERO}</td>
							<td>
								{chave.DESCRIÇÃO}
								<PencilSquareIcon
									className="w-5 h-5 inline ml-2 hover:cursor-pointer"
									onClick={() => openModal(chave)}
								/>
							</td>
							<td>
								<ToggleSwitch
									checked={chave.RESTRITO === 'SIM'}
									onChange={() => handleToggleRestrito(chave)}
								/>
							</td>
							<td>
								<TrashIcon
									className="size-8 hover:cursor-pointer"
									onClick={() => handleDelete(chave.ARMARIO + chave.NUMERO)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{selectedKey && (
				<Modal
					isOpen={isModalOpen}
					closeModal={closeModal}
					title={`Editar descrição da chave ${selectedKey?.DESCRIÇÃO}`}
				>
					<h2>Nova Descrição</h2>
					<input
						type="text"
						value={newDescricao}
						onChange={(e) => setNewDescricao(e.target.value)}
						className="input"
					/>
					<button onClick={handleEditDescricao} className="button">
						Salvar
					</button>
				</Modal>

			)}
		</div>
	)
}

export default page