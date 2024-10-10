export const getChaves = async () => {
	try {
		const res = await fetch('http://localhost:8000/chaves')
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
	const query = new URLSearchParams();
	const myHeaders = new Headers();
	let raw = JSON.stringify({});
	
	query.append('idchave', id);
	
	const url = `http://localhost:8000/chaves?${query.toString()}`

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

	console.log(url);
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
export const deleteChave = async (id: string) => {

}