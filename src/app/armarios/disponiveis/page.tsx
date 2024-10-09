"use client"

import { useState } from 'react'
import Modal from '@/components/Modal'

// Dados simulados para armários
const armariosFeminino = ['Armário 101', 'Armário 102', 'Armário 103'];
const armariosMasculino = ['Armário 201', 'Armário 202', 'Armário 203'];

// Dados simulados para setores
const setores = ['RH', 'TI', 'Contabilidade', 'Produção', 'Logística'];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArmario, setSelectedArmario] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [setor, setSetor] = useState('');
  const [funcao, setFuncao] = useState('');
  const [superior, setSuperior] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0])

  const handleOpenModal = (armario: string) => {
    setSelectedArmario(armario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArmario(null);
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Lógica para salvar os dados do novo usuário no armário selecionado
    console.log({
      armario: selectedArmario,
      nome,
      matricula,
      setor,
      funcao,
      superior,
    });
    closeModal();
  };

  return (
    <div className="principal">
      <h1>Armários Disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seção Feminino */}
        <div>
          <h2>Feminino</h2>
          <ul className="space-y-4">
            {armariosFeminino.map((armario) => (
              <li key={armario} className="p-4 border bg-white shadow-sm cursor-pointer" onClick={() => handleOpenModal(armario)}>
                {armario} - Livre
              </li>
            ))}
          </ul>
        </div>

        {/* Seção Masculino */}
        <div>
          <h2>Masculino</h2>
          <ul className="space-y-4">
            {armariosMasculino.map((armario) => (
              <li key={armario} className="p-4 border bg-white shadow-sm cursor-pointer" onClick={() => handleOpenModal(armario)}>
                {armario} - Livre
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal para cadastro de usuário */}
      {selectedArmario && (
        <Modal isOpen={isModalOpen} closeModal={closeModal} title={`Cadastro de usuário para ${selectedArmario}`}>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="data" className="label">Data</label>
                <input
                  type="date"
                  id="data"
                  value={data}
				  onChange={(e) => setData(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="nome" className="label">Nome</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome"
                  required
                />
              </div>

              <div>
                <label htmlFor="matricula" className="label">Matrícula</label>
                <input
                  type="text"
                  id="matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Digite a matrícula"
                  required
                />
              </div>

              <div>
                <label htmlFor="setor" className="label">Setor</label>
                <select
                  id="setor"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  required
                >
                  <option value="">Selecione um setor</option>
                  {setores.map((setor) => (
                    <option key={setor} value={setor}>
                      {setor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="funcao" className="label">Função</label>
                <input
                  type="text"
                  id="funcao"
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                  placeholder="Digite a função"
                  required
                />
              </div>

              <div>
                <label htmlFor="superior" className="label">Superior Imediato</label>
                <input
                  type="text"
                  id="superior"
                  value={superior}
                  onChange={(e) => setSuperior(e.target.value)}
                  placeholder="Digite o nome do superior"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Page;
