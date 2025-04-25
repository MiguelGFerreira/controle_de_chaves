"use client"

import { getRelatorioSegundaVia, getUser } from "@/api"
import { SegundaVia } from "@/app/types"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/LoadingSpinner";
import { formatarData } from "@/utils";

const page = () => {
	const [movimentacoes, setMovimentacoes] = useState<SegundaVia[]>([])

	async function fetchSegundaVia() {
		const data = await getRelatorioSegundaVia();
		setMovimentacoes(data);
	}

	useEffect(() => {
		fetchSegundaVia()
	}, [])

	if (!movimentacoes) return <LoadingSpinner />

	return (
		<div className="principal">
			<h1>Consulta de Entrega da Segunda Via das Chaves</h1>
			<table className="grupotristao">
				<thead>
					<tr>
						<th>Armario</th>
						<th>Funcionário</th>
						<th>Empresa</th>
						<th>Data do Empréstimo</th>
						<th>Dias Emprestado</th>
					</tr>
				</thead>
				<tbody>
					{movimentacoes.map((mov, index) => (
						<tr key={index}>
							<td>{mov.Numero}</td>
							<td>{mov.Nome}</td>
							<td>{mov.Empresa}</td>
							<td>{formatarData(mov.DataMovimentacao)?.split(' ')[0]}</td>
							<td>{mov.Dias}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default page