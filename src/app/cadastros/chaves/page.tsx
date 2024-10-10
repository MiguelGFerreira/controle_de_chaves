"use client"

import { deleteChave, getChaves, patchChave } from "@/api";
import { Chave } from "@/app/types";
import Modal from "@/components/Modal";
import ToggleSwitch from "@/components/ToggleSwitch";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const page = () => {
	const [chaves, setChaves] = useState<Chave[]>([])
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
		setChaves((prevChaves) => prevChaves.filter((chave) => chave.ARMARIO + chave.NUMERO !== id));
	}

	async function handleToggleRestrito(chave: Chave) {
		const updatedRestrito = chave.RESTRITO === "SIM" ? "NÃO" : "SIM";
		await patchChave(chave.ARMARIO + chave.NUMERO, { restrito: updatedRestrito });
		setChaves((prevChaves) =>
			prevChaves.map((ch) =>
				ch.ARMARIO + ch.NUMERO === chave.ARMARIO + chave.NUMERO ? { ...ch, RESTRITO: updatedRestrito } : ch
			)
		);
	}

	async function handleEditDescricao() {
		if (selectedKey) {
			await patchChave(selectedKey.ARMARIO + selectedKey.NUMERO, { descricao: newDescricao });
			setSelectedKey(null);
		}
	}

	useEffect(() => {
		fetchChaves()
	}, [])

	if (!chaves) return <div>Loading...</div>

	return (
		<div className="principal">
			<h1>Cadastro de Chaves</h1>
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