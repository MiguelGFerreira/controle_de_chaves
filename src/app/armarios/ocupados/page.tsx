"use client"

import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { getArmariosDet, patchArmarios } from '@/api';
import { ArmarioDet } from '@/app/types';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [armarios, setArmarios] = useState<ArmarioDet[]>([]);
  const [selectedArmario, setSelectedArmario] = useState<ArmarioDet | null>(null);

  const handleOpenModal = (armario: number) => {
    const selected = armarios.find((perm) => perm.ID === armario);
    setSelectedArmario(selected || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArmario(null);
    setIsModalOpen(false);
  };

  const handleDevolution = async () => {
	await patchArmarios(
        selectedArmario?.ID,
        new Date().toISOString().split('T')[0], // Pode passar a data da devolução, se necessário
        '',
        '',
        '',
        '',
        '',
        '1'
      );
    closeModal();
    fetchArmarios();
  }

  async function fetchArmarios() {
    const data = await getArmariosDet();
    setArmarios(data);
  }

  useEffect(() => {
    fetchArmarios();
  }, []);

  return (
    <div className="principal">
      <h1>Armários Ocupados</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seção Feminino */}
        <div>
          <h2>Feminino</h2>
          <ul className="space-y-4">
            {armarios.map((armario) => (
              (armario.Genero === 'F' && armario.STATUS === '1') && (
                <li key={armario.ID} className="p-4 border bg-white shadow-sm cursor-pointer" onClick={() => handleOpenModal(armario.ID)}>
                  {armario.Numero} - {armario.Nome}
                </li>
              )
            ))}
          </ul>
        </div>

        {/* Seção Masculino */}
        <div>
          <h2>Masculino</h2>
          <ul className="space-y-4">
            {armarios.map((armario) => (
              (armario.Genero === 'M' && armario.STATUS === '1') && (
                <li key={armario.ID} className="p-4 border bg-white shadow-sm cursor-pointer" onClick={() => handleOpenModal(armario.ID)}>
                  {armario.Numero} - {armario.Nome}
                </li>
              )
            ))}
          </ul>
        </div>
      </div>

      {/* Modal para visualização dos detalhes do empréstimo */}
      {selectedArmario && (
        <Modal isOpen={isModalOpen} closeModal={closeModal} title={`Detalhes do Armário ${selectedArmario.Numero}`}>
          <div className="space-y-4">
            <div>
              <label className="label">Nome:</label>
              <p>{selectedArmario.Nome}</p>
            </div>

            <div>
              <label className="label">Matrícula:</label>
              <p>{selectedArmario.Matricula}</p>
            </div>

            <div>
              <label className="label">Setor:</label>
              <p>{selectedArmario.Setor}</p>
            </div>

            <div>
              <label className="label">Função:</label>
              <p>{selectedArmario.Funcao}</p>
            </div>

            <div>
              <label className="label">Superior Imediato:</label>
              <p>{selectedArmario.SuperiorImediato}</p>
            </div>

            <div>
              <label className="label">Data do Empréstimo:</label>
              <p>{new Date(selectedArmario.DataEntrega).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={() => {handleDevolution()}} className="button">
              Devolver
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
