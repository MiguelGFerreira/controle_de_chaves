"use client"

import { useRouter } from 'next/navigation';

// Dados simulados para detalhes de entrega
const entregas = [
	{
		id: 4480,
		dataEntrega: '26/09/2024 07:18:51',
		dataDevolucao: '26/09/2024 07:23:48',
		chave: '01060 - PREDIO ADM - PRINCIPAIS',
		funcionario: '027331 - JOAO PAULO GERA DE SOUZA',
		porteiro: 'VALDINEI NEVES DE OLIVEIRA',
		observacoes: 'Entrega realizada sem problemas.',
		assinaturaFuncionario: '/assinaturas/funcionario-4480.png',
		assinaturaPorteiro: '/assinaturas/porteiro-4480.png',
	},
	{
		id: 4481,
		dataEntrega: '26/09/2024 08:00:00',
		dataDevolucao: '26/09/2024 08:30:00',
		chave: '01002 - 2° via de WC café verde',
		funcionario: '027332 - MARIA JOAQUINA SOUZA',
		porteiro: 'JOSE ALVES DE OLIVEIRA',
		observacoes: 'Chave devolvida com atraso.',
		assinaturaFuncionario: '/assinaturas/funcionario-4481.png',
		assinaturaPorteiro: '/assinaturas/porteiro-4481.png',
	},
	// Mais entregas
];

const page = ({ params }: { params: { slug: string } }) => {
	const router = useRouter();
	const { slug } = params;

	// Encontrar os dados da entrega específica pelo ID (slug)
	const entrega = entregas.find((entrega) => entrega.id === Number(slug));

	if (!entrega) {
		return <div className="principal">Entrega não encontrada</div>;
	}

	return (
		<div className="principal">
			<button onClick={() => router.back()} className="text-primary-green mb-4">
				&larr; Voltar
			</button>
			<h2>Detalhes da Entrega</h2>
			<section className="card">
				<div className="space-y-4">
					<p><strong>ID:</strong> {entrega.id}</p>
					<p><strong>Data de Entrega:</strong> {entrega.dataEntrega}</p>
					<p><strong>Data de Devolução:</strong> {entrega.dataDevolucao}</p>
					<p><strong>Chave:</strong> {entrega.chave}</p>
					<p><strong>Funcionário:</strong> {entrega.funcionario}</p>
					<p><strong>Porteiro:</strong> {entrega.porteiro}</p>
					<p><strong>Observações:</strong> {entrega.observacoes}</p>

					<div className="flex space-x-4">
						<div>
							<p><strong>Assinatura do Funcionário:</strong></p>
							<img src={entrega.assinaturaFuncionario} alt="Assinatura do Funcionário" className="w-40 h-20 object-contain" />
						</div>
						<div>
							<p><strong>Assinatura do Porteiro:</strong></p>
							<img src={entrega.assinaturaPorteiro} alt="Assinatura do Porteiro" className="w-40 h-20 object-contain" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default page
