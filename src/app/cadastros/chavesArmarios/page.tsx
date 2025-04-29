"use client"

import { deleteChaveArmario, getChavesArmarios, patchChaveArmario, postChaveArmario } from "@/api";
import { ChaveArmario } from "@/app/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const page = () => {
	const [armarios, setArmarios] = useState<ChaveArmario[]>([]);
	const [newDescricao, setNewDescricao] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState<ChaveArmario | null>(null);

	const [formValues, setFormValues] = useState({
		armario: '',
		description: '',
	});
	const [errors, setErrors] = useState({
		armario: false,
		description: false,
	});

	const openModal = (key: ChaveArmario) => {
		setSelectedKey(key);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedKey(null);
		setIsModalOpen(false);
	};

	async function fetchArmarios() {
		const data = await getChavesArmarios();
		setArmarios(data);
	}

	async function handleDelete(id: string) {
		await deleteChaveArmario(id);
		fetchArmarios();
	}

	async function handleEditDescricao() {
		if (selectedKey) {
			if (newDescricao) {
				await patchChaveArmario(selectedKey.ARMARIO, newDescricao);
				setSelectedKey(null);
				fetchArmarios();
			} else {
				document.getElementById("erro-newDescription")!.hidden = false;
			}
		}
	}

	const handleFieldChange = (field: string, value: string) => {
		setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
		setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
	}

	const validateForm = () => {
		const { armario, description,  } = formValues;
		return {
			armario: !armario,
			description: !description,
		};
	};

	async function handleAddCabinet() {
		const validationErrors = validateForm();
		setErrors(validationErrors);

		if (Object.values(validationErrors).includes(true)) return;

		postChaveArmario(formValues.armario, formValues.description);
		fetchArmarios();
	}

	useEffect(() => {
		fetchArmarios()
	}, [])

	if (!armarios) return <LoadingSpinner />

	return (
		<div className="principal">
			<h1>Cadastro de Armarios de Chaves</h1>
			<div className="card">
				<div className="formulario">
					{/* Armário */}
					<div>
						<label htmlFor="cabinet">Armário</label>
						<input
							type="text"
							placeholder="Digite o armario"
							className={`${errors.armario ? 'border-red-500': `border-gray-300`}`}
							onChange={(e) => handleFieldChange('armario', e.target.value)}
						/>
					</div>

					{/* Descrição */}
					<div>
						<label htmlFor="description">Descrição</label>
						<input
							type="text"
							placeholder="Digite a Descrição"
							className={`${errors.description ? 'border-red-500': `border-gray-300`}`}
							onChange={(e) => handleFieldChange('description', e.target.value)}
						/>
					</div>
				</div>


				<button onClick={handleAddCabinet}>
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
					<p id="erro-newDescription" className="text-red-500" hidden>Este campo deve ser preenchido</p>
					<button onClick={handleEditDescricao} className="button">
						Salvar
					</button>
				</Modal>

			)}
		</div>
	)
}

export default page