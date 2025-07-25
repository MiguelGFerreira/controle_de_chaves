"use client"

import { deleteChaveArmario, getArmarios, getChavesArmarios, patchChaveArmario, postChaveArmario } from "@/api";
import { Armario, ChaveArmario } from "@/app/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const page = () => {
	const [armarios, setArmarios] = useState<Armario[]>([]);
	const [newDescricao, setNewDescricao] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCabinet, setSelectedCabinet] = useState<Armario | null>(null);

	const [formValues, setFormValues] = useState({
		genero: '',
		numero: '',
		empresa: '',
	});
	const [errors, setErrors] = useState({
		genero: false,
		numero: false,
		empresa: false,
	});

	const openModal = (key: Armario) => {
		setSelectedCabinet(key);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedCabinet(null);
		setIsModalOpen(false);
	};

	async function fetchArmarios() {
		const data = await getArmarios();
		setArmarios(data);
	}

	async function handleDelete(id: string) {
		await deleteChaveArmario(id);
		fetchArmarios();
	}

	const handleFieldChange = (field: string, value: string) => {
		setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
		setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
	}

	const validateForm = () => {
		const { genero, numero, empresa, } = formValues;
		return {
			genero: !genero,
			numero: !numero,
			empresa: !empresa,
		};
	};

	async function handleAddCabinet() {
		const validationErrors = validateForm();
		setErrors(validationErrors);

		if (Object.values(validationErrors).includes(true)) return;

		//postChaveArmario(formValues.genero, formValues.numero, formValues.empresa); TODO: fazer logica na api
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
					{/* Gênero */}
					<div>
						<label htmlFor="gender">Gênero</label>
						<select
							id="gender"
							value={formValues.genero}
							onChange={(e) => handleFieldChange('genero', e.target.value)}
							className={`${errors.genero ? 'border-red-500' : `border-gray-300`}`}
						>
							<option value="">Selecione um gênero</option>
							<option value="M">Masculino</option>
							<option value="F">Feminino</option>
						</select>
					</div>

					{/* Numero */}
					<div>
						<label htmlFor="numero">Número</label>
						<input
							id="numero"
							type="text"
							placeholder="Número do Armario"
							className={`${errors.numero ? 'border-red-500' : `border-gray-300`}`}
							onChange={(e) => handleFieldChange('numero', e.target.value)}
						/>
					</div>

					{/* Empresa */}
					<div>
						<label htmlFor="empresa">Empresa</label>
						<select
							id="empresa"
							value={formValues.empresa}
							onChange={(e) => handleFieldChange('empresa', e.target.value)}
							className={`${errors.empresa ? 'border-red-500' : `border-gray-300`}`}
						>
							<option selected value="RKF">Realcafé</option>
							<option value="TCE">Tristão</option>
						</select>
					</div>

					<button onClick={handleAddCabinet}>
						Adicionar Armario
					</button>
				</div>
			</div>

			<table className="grupotristao">
				<thead>
					<tr>
						<th>Número</th>
						<th>Gênero</th>
						<th>Empresa</th>
						<th>Excluir</th>
					</tr>
				</thead>
				<tbody>
					{armarios.map((armario, index) => (
						<tr key={index}>
							<td>{armario.Numero}</td>
							<td>{armario.Genero}</td>
							<td>{armario.Empresa}</td>
							<td>
								<TrashIcon
									className="size-8 hover:cursor-pointer"
									onClick={() => console.log("click")}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{selectedCabinet && (
				<Modal
					isOpen={isModalOpen}
					closeModal={closeModal}
					title={`Editar descrição da chave ${selectedCabinet?.Numero}`}
				>
					<h2>Nova Descrição</h2>
					<input
						type="text"
						value={newDescricao}
						onChange={(e) => setNewDescricao(e.target.value)}
						className="input"
					/>
					<p id="erro-newDescription" className="text-red-500" hidden>Este campo deve ser preenchido</p>
					<button onClick={() => { console.log("Click") }} className="button">
						Salvar
					</button>
				</Modal>

			)}
		</div>
	)
}

export default page