"use client"

import { getMovimentacoesArmarios } from "@/api"
import { MovimentacaoArmario } from "@/app/types"
import { useEffect, useState } from "react"
import { EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { formatarData } from "@/utils";

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
						<th>Empresa</th>
						<th>Matrícula</th>
						<th>Nome</th>
						<th>Data</th>
						<th>Movimentação</th>
						<th>Assinatura</th>
					</tr>
				</thead>
				<tbody>
					{movimentacoes.map((mov, index) => (
						<tr key={index}>
							<td>{mov.Numero}</td>
							<td>{mov.Genero}</td>
							<td>{mov.Empresa}</td>
							<td>{mov.Matricula}</td>
							<td>{mov.Nome}</td>
							<td>{formatarData(mov.DataMovimentacao)?.split(' ')[0]}</td>
							<td>{mov.TipoMovimentacao}</td>
							<td>
								<Link href={`http://localhost:8000/armarios/${mov.ID}/assinatura`} target="blank">
									<EyeIcon className="w-5 h-5 inline ml-2 hover:cursor-pointer" />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default page