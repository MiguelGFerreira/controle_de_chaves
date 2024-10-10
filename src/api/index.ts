export const getChaves = async () => {
	try {
		const res = await fetch('http://localhost:8000/chaves')
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar chaves:', error)
	}
}

export const getChavesRestritas = async () => {
	try {
		const res = await fetch('http://localhost:8000/chaves/restritas')
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar chaves:', error)
	}
}

export const getEntregas = async (filters: { chave?: string, dateStart?: string, dateEnd?: string }) => {
	const query = new URLSearchParams();

	if (filters.chave) {
		query.append('chave', filters.chave);
	}

	if (filters.dateStart) {
		query.append('dateStart', filters.dateStart);
	}

	if (filters.dateEnd) {
		query.append('dateEnd', filters.dateEnd);
	}

	const res = await fetch(`http://localhost:8000/entregas?${query.toString()}`)

	if (!res.ok) {
		throw new Error('Falha ao buscar dados');
	}

	return res.json();
}

export const getEntregasAbertas = async (filters: { chave?: string, dateStart?: string, dateEnd?: string }) => {
	const query = new URLSearchParams();

	if (filters.chave) {
		query.append('chave', filters.chave);
	}

	if (filters.dateStart) {
		query.append('dateStart', filters.dateStart);
	}

	if (filters.dateEnd) {
		query.append('dateEnd', filters.dateEnd);
	}

	const res = await fetch(`http://localhost:8000/entregas/abertas?${query.toString()}`)

	if (!res.ok) {
		throw new Error('Falha ao buscar dados');
	}

	return res.json();
}

export const patchChave = async (id: string, operacao: { restrito?: string, descricao?: string }) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	let raw = JSON.stringify({});

	const url = `http://localhost:8000/chaves/${id}`

	if (operacao.restrito) {
		raw = JSON.stringify({
			"restrito": operacao.restrito,
		});
	}

	if (operacao.descricao) {
		raw = JSON.stringify({
			"descricao": operacao.descricao,
		});
	}

	try {
		await fetch(url, {
			method: 'PATCH',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		});
	} catch (error) {
		console.error('Falha ao atualizar chave: ', error);
	}

}
export const deleteChave = async (id: string) => {
	const raw = "";
	const url = `http://localhost:8000/chaves/${id}`

	try {
		await fetch(url, {
			method: 'DELETE',
			body: raw,
			redirect: 'follow',
		});
	} catch (error) {
		console.error('Falha ao atualizar chave: ', error);
	}

}

export const postChave = async (armario: string, numero: string, descricao: string, restrito: boolean) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
		"armario": armario,
		"numero": numero,
		"descricao": descricao,
		"restrito": restrito ? 'S' : 'N',
	});

	fetch(
		`http://localhost:8000/chaves`,
		{
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}

export const getPermissions = async () => {
	try {
		const res = await fetch('http://localhost:8000/permissao')
		const data = await res.json()

		const permissions = data.map((row: { ARMARIO: string; NUMERO: string; DESCRIÇÃO: string; MATRICULA: string; NOME: string; }) => ({
			ARMARIO: row.ARMARIO,
			NUMERO: row.NUMERO,
			DESCRIÇÃO: row.DESCRIÇÃO,
			FUNCIONARIO: {
				matricula: row.MATRICULA,
				nome: row.NOME
			}
		}));

		console.log(permissions)

		return permissions;
	} catch (error) {
		console.error('Erro ao buscar chaves:', error)
	}
}

export const getEmployees = async () => {
	try {
		const res = await fetch('http://localhost:8000/permissao/funcionarios')
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar chaves:', error)
	}
}

export const deletePermissao = async (idchave: string, matricula: string) => {
	const raw = "";
	const url = `http://localhost:8000/permissao/${matricula}/${idchave}`

	try {
		await fetch(url, {
			method: 'DELETE',
			body: raw,
			redirect: 'follow',
		});
	} catch (error) {
		console.error('Falha ao deletar permissao: ', error);
	}
}

export const postPermissao = async (armario: string, numero: string, funcionario: string) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
		"idchave": armario + numero,
		"matricula": funcionario,
	});

	console.log(raw);

	fetch(
		`http://localhost:8000/permissao`,
		{
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}

export const getArmarios = async () => {
	try {
		const res = await fetch('http://localhost:8000/armarios')
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar armarios:', error)
	}
}

export const getArmariosDet = async () => {
	try {
		const res = await fetch('http://localhost:8000/armarios/det')
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar armarios:', error)
	}
}

export const patchArmarios = async (id: number | undefined, data: string, nome: string, matricula: string, setor: string, funcao: string, superior: string, status: string | undefined) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	let raw = JSON.stringify({});

	const url = `http://localhost:8000/armarios/${id}`

	if (status === '0') {
		raw = JSON.stringify({
			"dataEntrega": data,
			"nome": nome,
			"matricula": matricula,
			"setor": setor,
			"funcao": funcao,
			"superior": superior,
			"status": "1",
		});
	} else {
		raw = JSON.stringify({
			"dataDevolucao": data,
			"nome": nome,
			"matricula": matricula,
			"setor": setor,
			"funcao": funcao,
			"superior": superior,
			"status": "0",
		});
	}

	console.log(raw);

	try {
		await fetch(url, {
			method: 'PATCH',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		});
	} catch (error) {
		console.error('Falha ao atualizar chave: ', error);
	}
}

export const getEntregaById = async (id: string) => {
	try {
		const res = await fetch(`http://localhost:8000/entregas/${id}`);
		const data = await res.json();

		const assinaturaFuncionarioRes = await fetch(`http://localhost:8000/entregas/${id}/assinatura-funcionario`);
		const assinaturaPorteiroRes = await fetch(`http://localhost:8000/entregas/${id}/assinatura-porteiro`);

		const assinaturaFuncionarioBuffer = await assinaturaFuncionarioRes.arrayBuffer();
		const assinaturaPorteiroBuffer = await assinaturaPorteiroRes.arrayBuffer();

		const assinaturaFuncionarioBase64 = `data:image/png;base64, ${Buffer.from(assinaturaFuncionarioBuffer).toString('base64')}`;
		const assinaturaPorteiroBase64 = `data:image/png;base64, ${Buffer.from(assinaturaPorteiroBuffer).toString('base64')}`;

		return {
			...data,
			assinaturaFuncionario: assinaturaFuncionarioBase64,
			assinaturaPorteiro: assinaturaPorteiroBase64
		};
	} catch (error) {
		console.error('Erro ao buscar entrega:', error);
	}
};