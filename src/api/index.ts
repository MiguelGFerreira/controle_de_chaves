import axios from "axios";

const API_URL = "http://localhost:8000";

export const getChaves = async () => {
	try {
		const res = await fetch(`${API_URL}/chaves`)
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar chaves:', error)
	}
}

export const getChavesRestritas = async () => {
	try {
		const res = await fetch(`${API_URL}/chaves/restritas`)
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

	const res = await fetch(`${API_URL}/entregas?${query.toString()}`)

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

	const res = await fetch(`${API_URL}/entregas/abertas?${query.toString()}`)

	if (!res.ok) {
		throw new Error('Falha ao buscar dados');
	}

	return res.json();
}

export const patchChave = async (id: string, operacao: { restrito?: string, descricao?: string }) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	let raw = JSON.stringify({});

	const url = `${API_URL}/chaves/${id}`

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
	const url = `${API_URL}/chaves/${id}`

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
		`${API_URL}/chaves`,
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
		const res = await fetch(`${API_URL}/permissao`)
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
		const res = await fetch(`${API_URL}/permissao/funcionarios`)
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar chaves:', error)
	}
}

export const deletePermissao = async (idchave: string, matricula: string) => {
	const raw = "";
	const url = `${API_URL}/permissao/${matricula}/${idchave}`

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
		`${API_URL}/permissao`,
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
		const res = await fetch(`${API_URL}/armarios`)
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar armarios:', error)
	}
}

export const getArmariosDet = async () => {
	try {
		const res = await fetch(`${API_URL}/armarios/det`)
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

	const url = `${API_URL}/armarios/${id}`

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
		const res = await fetch(`${API_URL}/entregas/${id}`);
		const data = await res.json();

		const assinaturaFuncionarioRes = await axios.get(`${API_URL}/entregas/${id}/assinatura-funcionario`, { responseType: 'blob' });
		const assinaturaFuncionarioURL = URL.createObjectURL(assinaturaFuncionarioRes.data);

		const assinaturaPorteiroRes = await axios.get(`${API_URL}/entregas/${id}/assinatura-porteiro`, { responseType: 'blob' });
		const assinaturaPorteiroURL = URL.createObjectURL(assinaturaPorteiroRes.data);

		const assinaturaFuncionarioDevRes = await axios.get(`${API_URL}/entregas/${id}/assinatura-funcionario-dev`, { responseType: 'blob' });
		const assinaturaFuncionarioDevURL = URL.createObjectURL(assinaturaFuncionarioDevRes.data);

		const assinaturaPorteiroDevRes = await axios.get(`${API_URL}/entregas/${id}/assinatura-porteiro-dev`, { responseType: 'blob' });
		const assinaturaPorteiroDevURL = URL.createObjectURL(assinaturaPorteiroDevRes.data);


		return {
			...data,
			assinaturaFuncionario: assinaturaFuncionarioURL,
			assinaturaPorteiro: assinaturaPorteiroURL,
			assinaturaFuncionarioDev: assinaturaFuncionarioDevURL,
			assinaturaPorteiroDev: assinaturaPorteiroDevURL,
		};
	} catch (error) {
		console.error('Erro ao buscar entrega:', error);
	}
}

export const getMovimentacoesArmarios = async () => {
	try {
		const res = await fetch(`${API_URL}/armarios/movimentacoes`)
		const data = await res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar movimentacoes: ', error)
	}
}

export const getAssinatura = async (idArmario: number, matricula: string) => {
	try {
		const assinaturaRes = await axios.get(`${API_URL}/armarios/${idArmario}/${matricula}`, { responseType: 'blob' });
		const assinaturaFuncionarioURL = URL.createObjectURL(assinaturaRes.data);

		return assinaturaFuncionarioURL
	} catch (error) {
		console.error("Erro ao buscar assinatura: ", error)
	}
}

/*
export const getUser = async () => {
	try{
	  const response = await axios.get(`http://10.0.73.216:83/flask_login_ad/iis_user`)
	  console.log(response.data);
	  //return response.data
	}catch(error){
	  console.error(error);
	}
  }
*/