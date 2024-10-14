"use client"

import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { getArmarios, getEmployees, patchArmarios } from '@/api';
import { Armario, Employee } from '@/app/types';

const setores = ['ABE - Cozinha Industrial', 'ABE - Jardim', 'ABE - Serviços Gerais', 'Comercial - Cafuso', 'Comercial - Reserva', 'Contábil/Fiscal', 'Controladoria', 'Controle de Qualidade', 'Cultura e Gente', 'Financeiro', 'Jurídico', 'Logística - Mercado Externo', 'Logística - Mercado Interno', 'Manutenção - Civil', 'Manutenção - Elétrica', 'Manutenção - Mecânica', 'Manutenção - Utilidades', 'Meio Ambiente', 'TI', 'RH', 'SESMT', 'Suprimentos', 'PCM', 'Produção', 'Tristão Trading - Armazém', 'Tristão Trading - Escritório'];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [armarios, setArmarios] = useState<Armario[]>([]);
  const [selectedArmario, setSelectedArmario] = useState<Armario | null>(null);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [setor, setSetor] = useState('');
  const [funcao, setFuncao] = useState('');
  const [superior, setSuperior] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0])
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleOpenModal = (armario: number) => {
    const selected = armarios.filter((perm) => perm.ID === armario)
    setSelectedArmario(selected[0]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArmario(null);
    setIsModalOpen(false);
  };

  const handleEmployeeChange = (nome: string) => {
    setNome(nome);

    const employee = employees.find((emp) => emp.nome === nome);

    if (employee) {
      setMatricula(employee.matricula);
    } else {
      setMatricula('');
    }
  }

  const handleSubmit = async () => {
    await patchArmarios(selectedArmario?.ID, data, nome, matricula, setor, funcao, superior, selectedArmario?.STATUS);
    closeModal();
    fetchArmarios();
  };

  async function fetchArmarios() {
    const data = await getArmarios();
    setArmarios(data);
  }

  async function fetchEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  useEffect(() => {
    fetchArmarios()
    fetchEmployees()
  }, [])

  return (
    <div className="principal">
      <h1>Armários Disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seção Feminino */}
        <div>
          <h2>Feminino</h2>
          <ul className="space-y-4">
            {armarios.map((armario) => (
              (armario.Genero === 'F' && armario.STATUS === '0') && (
                <li key={armario.ID} className="p-4 border bg-white shadow-sm cursor-pointer" onClick={() => handleOpenModal(armario.ID)}>
                  {armario.Numero} - Livre
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
              (armario.Genero === 'M' && armario.STATUS === '0') && (
                <li key={armario.ID} className="p-4 border bg-white shadow-sm cursor-pointer" onClick={() => handleOpenModal(armario.ID)}>
                  {armario.Numero} - Livre
                </li>
              )
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
                  list="employeeList"
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                  placeholder="Digite a matrícula ou nome"
                />
                <datalist id="employeeList">
                  {employees.map((employee) => (
                    <option key={employee.matricula} value={employee.nome}>
                      {employee.nome} - {employee.matricula}
                    </option>
                  ))}
                </datalist>
              </div>

              <div>
                <label htmlFor="matricula" className="label">Matrícula</label>
                <input
                  type="text"
                  id="matricula"
                  value={matricula}
                  //onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Matrícula do funcionário"
                  disabled
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
