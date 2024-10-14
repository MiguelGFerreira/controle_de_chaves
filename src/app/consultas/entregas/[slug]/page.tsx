"use client"

import { getEntregaById } from '@/api';
import { EntregaDet } from '@/app/types';
import { formatarData } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = ({ params }: { params: { slug: string } }) => {
	const router = useRouter();
	const { slug } = params;
	const [entrega, setEntrega] = useState<EntregaDet>();
	const [assinaturaFunc, setAssinaturaFunc] = useState('');
	const [assinaturaPort, setAssinaturaPort] = useState('');
	const [assinaturaFuncDev, setAssinaturaFuncDev] = useState('');
	const [assinaturaPortDev, setAssinaturaPortDev] = useState('');

	async function fetchEntrega() {
		const data = await getEntregaById(slug);
		setEntrega(data[0]);
		setAssinaturaFunc(data.assinaturaFuncionario);
		setAssinaturaPort(data.assinaturaPorteiro);
		setAssinaturaFuncDev(data.assinaturaFuncionarioDev);
		setAssinaturaPortDev(data.assinaturaPorteiroDev);
		console.log(data);
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
					<p><strong>Data de Entrega:</strong> {formatarData(entrega.DATA_ENTREGA)}</p>
					<p><strong>Data de Devolução:</strong> {formatarData(entrega.DATA_DEVOLUCAO)}</p>
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
						{entrega.DATA_DEVOLUCAO && (
							<>
								<div>
									<p><strong>Assinatura do Funcionário Devolução:</strong></p>
									<img src={assinaturaFuncDev} alt="Assinatura do Funcionário" className="w-40 h-20 object-contain" />

								</div>
								<div>
									<p><strong>Assinatura do Porteiro Devolução:</strong></p>
									<img src={assinaturaPortDev} alt="Assinatura do Porteiro" className="w-40 h-20 object-contain" />
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default page
