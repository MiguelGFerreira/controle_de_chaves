const page = () => {
	return (
		<div className="principal">
			<h2>Consulta Chaves</h2>
			<section className="card">
				<form action="">
					<label htmlFor="chave">Chave</label>
					<input type="text" id="chave" list="chaves" name="chave" />
					<datalist id="chaves">
						<option key="01001" value="01001-Almoxarifado" />
						<option key="01002" value="01002-2° via de WC café verde " />
						<option key="01060" value="01060-PREDIO ADM - PRINCIPAIS" />
					</datalist>
					<label htmlFor="datade">Data de</label>
					<input type="date" id="datade" />
					<label htmlFor="dataate">Data Até</label>
					<input type="date" id="dataate" />
				</form>
			</section>
			<table className="grupotristao w-full items-center">
				<thead className="text-left">
					<tr>
						<th>ID</th>
						<th>Data Entrega</th>
						<th>Chave</th>
						<th>Funcionário</th>
						<th>Porteiro</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>4480</td>
						<td>26/09/2024 07:18:51</td>
						<td>01060 - PREDIO ADM - PRINCIPAIS</td>
						<td>027331 - JOAO PAULO GERA DE SOUZA</td>
						<td>VALDINEI NEVES DE OLIVEIRA</td>
					</tr>
					<tr>
						<td>4480</td>
						<td>26/09/2024 07:18:51</td>
						<td>01060 - PREDIO ADM - PRINCIPAIS</td>
						<td>027331 - JOAO PAULO GERA DE SOUZA</td>
						<td>VALDINEI NEVES DE OLIVEIRA</td>
					</tr>
					<tr>
						<td>4480</td>
						<td>26/09/2024 07:18:51</td>
						<td>01060 - PREDIO ADM - PRINCIPAIS</td>
						<td>027331 - JOAO PAULO GERA DE SOUZA</td>
						<td>VALDINEI NEVES DE OLIVEIRA</td>
					</tr>
					<tr>
						<td>4480</td>
						<td>26/09/2024 07:18:51</td>
						<td>01060 - PREDIO ADM - PRINCIPAIS</td>
						<td>027331 - JOAO PAULO GERA DE SOUZA</td>
						<td>VALDINEI NEVES DE OLIVEIRA</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default page