export interface Chave {
	ARMARIO: string,
	NUMERO: string,
	DESCRIÇÃO: string,
	RESTRITO: string,
}

export interface Entregas {
	ID: number,
	DATA_ENTREGA: string,
	DATA_DEVOLUCAO: string,
	ID_CHAVE: string,
	FUNCIONARIO: string,
	PORTEIRO: string,
}

export interface EntregaDet {
	ID: number,
	DATA_ENTREGA: string,
	DATA_DEVOLUCAO: string,
	ID_CHAVE: string,
	FUNCIONARIO: string,
	PORTEIRO: string,
	OBSERVACOES: string,
	assinaturaFuncionario: string,
	assinaturaPorteiro: string,
}

export interface Armario {
	ID: number,
	Numero: string,
	Genero: string,
	Nome: string,
	STATUS: string,
}

export interface ArmarioDet {
	ID: number,
	Numero: string,
	Genero: string,
	DataEntrega: string,
	Nome: string,
	Matricula: string,
	Setor: string,
	Funcao: string,
	SuperiorImediato: string,
	DataDevolucao: string,
	STATUS: string
}

export interface MovimentacaoArmario {
	ID: number,
	Numero: string,
	Genero: string,
	Matricula: string,
	Nome: string,
	DataMovimentacao: string,
	TipoMovimentacao: string,
}