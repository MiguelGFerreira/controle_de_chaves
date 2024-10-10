"use client"

import { getChaves } from "@/api"
import { Chave } from "@/app/types"
import { useEffect, useState } from "react"

const page = () => {
	const [chaves, setChaves] = useState<Chave[]>([])

	async function fetchChaves() {
		const data = await getChaves();
		setChaves(data);
	}

	useEffect(() => {
    fetchChaves()
  }, [])

	if (!chaves) return <div>Loading...</div>

	return (
		<div className="principal">
			<h2>Consulta Chaves</h2>
			<table className="grupotristao">
				<thead>
					<tr>
						<th>Armário</th>
						<th>Número</th>
						<th>Descrição</th>
						<th>Restrito</th>
					</tr>
				</thead>
				<tbody>
					{chaves.map((chave, index) => (
            <tr key={index}>
              <td>{chave.ARMARIO}</td>
              <td>{chave.NUMERO}</td>
              <td>{chave.DESCRIÇÃO}</td>
              <td>{chave.RESTRITO}</td>
            </tr>
          ))}
				</tbody>
			</table>
		</div>
	)
}

export default page