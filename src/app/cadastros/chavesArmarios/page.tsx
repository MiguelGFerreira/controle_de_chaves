"use client"

import { deleteChave, getChaves, getChavesArmarios, patchChave, patchChaveArmario, postChave, postChaveArmario } from "@/api";
import { ChaveArmario } from "@/app/types";
import Modal from "@/components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const page = () => {
	const [armarios, setArmarios] = useState<ChaveArmario[]>([]);
	const [armario, setArmario] = useState("");
	const [newKey, setNewKey] = useState("");
	const [description, setDescription] = useState("");
	const [newDescricao, setNewDescricao] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState<ChaveArmario | null>(null);

	const openModal = (key: ChaveArmario) => {
		setSelectedKey(key);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedKey(null);
		setIsModalOpen(false);
	};

	async function fetchChaves() {
		const data = await getChaves();
		setArmarios(data);
	}

	async function handleDelete(id: string) {
		await deleteChave(id);
		fetchChaves();
	}

	async function handleEditDescricao() {
		if (selectedKey) {
			await patchChaveArmario(selectedKey.ARMARIO, newDescricao);
			setSelectedKey(null);
			fetchChaves();
		}
	}

	useEffect(() => {
		fetchChaves()
	}, [])

	if (!armarios) return <div>Loading...</div>

	async function handleAddKey() {
		await postChaveArmario(armario, description);
		fetchChaves();
	}

	return (
		<div className="principal">
			<h1>Cadastro de Armarios</h1>
			<div className="card">
				<div className="formulario">
					{/* Chave */}
					<div>
						<label htmlFor="cabinet">Chave</label>
						<input
							type="text"
							placeholder="Digite o armario"
							onChange={(e) => setNewKey(e.target.value)}
						/>
					</div>

					{/* Descrição */}
					<div>
						<label htmlFor="description">Descrição</label>
						<input
							type="text"
							placeholder="Digite a Descrição"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>


				<button onClick={handleAddKey}>
					Adicionar Armario
				</button>
			</div>

			<table className="grupotristao">
				<thead>
					<tr>
						<th>Armário</th>
						<th>Descrição</th>
						<th>Excluir</th>
					</tr>
				</thead>
				<tbody>
					{armarios.map((armario, index) => (
						<tr key={index}>
							<td>{armario.ARMARIO}</td>
							<td>
								{armario.DESCRICAO}
								<PencilSquareIcon
									className="w-5 h-5 inline ml-2 hover:cursor-pointer"
									onClick={() => openModal(armario)}
								/>
							</td>
							<td>
								<TrashIcon
									className="size-8 hover:cursor-pointer"
									onClick={() => handleDelete(armario.ARMARIO)}
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
					title={`Editar descrição da chave ${selectedKey?.DESCRICAO}`}
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