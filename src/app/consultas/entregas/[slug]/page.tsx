"use client"

import { getEntregaById } from '@/api';
import { EntregaDet } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = ({ params }: { params: { slug: string } }) => {
	const router = useRouter();
	const { slug } = params;
	const [entrega, setEntrega] = useState<EntregaDet>();
	const [assinaturaFunc, setAssinaturaFunc] = useState('');
	const [assinaturaPort, setAssinaturaPort] = useState('');

	async function fetchEntrega() {
		const data = await getEntregaById(slug);
		console.log(data);
		setEntrega(data[0]);
		setAssinaturaFunc(data.assinaturaFuncionario);
		setAssinaturaPort(data.assinaturaPorteiro);
		console.log(assinaturaFunc)
	}

	useEffect(() => {
		fetchEntrega()
	}, [])

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
					<p><strong>ID:</strong> {entrega.ID}</p>
					<p><strong>Data de Entrega:</strong> {entrega.DATA_ENTREGA}</p>
					<p><strong>Data de Devolução:</strong> {entrega.DATA_DEVOLUCAO}</p>
					<p><strong>Chave:</strong> {entrega.ID_CHAVE}</p>
					<p><strong>Funcionário:</strong> {entrega.FUNCIONARIO}</p>
					<p><strong>Porteiro:</strong> {entrega.PORTEIRO}</p>
					<p><strong>Observações:</strong> {entrega.OBSERVACOES}</p>

					<div className="flex space-x-4">
						<div>
							<p><strong>Assinatura do Funcionário:</strong></p>
							<img src={assinaturaFunc} alt="Assinatura do Funcionário" className="w-40 h-20 object-contain" />

						</div>
						<div>
							<p><strong>Assinatura do Porteiro:</strong></p>
							<img src={assinaturaPort} alt="Assinatura do Porteiro" className="w-40 h-20 object-contain" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default page
