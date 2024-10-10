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