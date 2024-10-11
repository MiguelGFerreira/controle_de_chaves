"use client"

import { getMovimentacoesArmarios } from "@/api"
import { MovimentacaoArmario } from "@/app/types"
import { useEffect, useState } from "react"

const page = () => {
	const [movimentacoes, setMovimentacoes] = useState<MovimentacaoArmario[]>([])

	async function fetchChaves() {
		const data = await getMovimentacoesArmarios();
		setMovimentacoes(data);
	}

	useEffect(() => {
		fetchChaves()
	}, [])

	if (!movimentacoes) return <div>Loading...</div>

	return (
		<div className="principal">
			<h1>Consulta Movimentações</h1>
			<table className="grupotristao">
				<thead>
					<tr>
						<th>Número</th>
						<th>Classificação</th>
						<th>Matrícula</th>
						<th>Nome</th>
						<th>Data</th>
						<th>Movimentação</th>
					</tr>
				</thead>
				<tbody>
					{movimentacoes.map((mov, index) => (
						<tr key={index}>
							<td>{mov.Numero}</td>
							<td>{mov.Genero}</td>
							<td>{mov.Matricula}</td>
							<td>{mov.Nome}</td>
							<td>{mov.DataMovimentacao}</td>
							<td>{mov.TipoMovimentacao}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default page