const page = () => {
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
					<tr>
						<td>01</td>
						<td>001</td>
						<td>Almoxarifado</td>
						<td>Sim</td>
					</tr>
					<tr>
						<td>01</td>
						<td>002</td>
						<td>2° via de WC café verde</td>
						<td>Não</td>
					</tr>
					<tr>
						<td>01</td>
						<td>003</td>
						<td>Acesso telhado expedição</td>
						<td>Não</td>
					</tr>
					<tr>
						<td>01</td>
						<td>004</td>
						<td>Almoxarifado</td>
						<td>Sim</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default page