"use client"

import Link from 'next/link';

const Page = () => {
  const entregas = [
    {
      id: 4480,
      dataEntrega: '26/09/2024 07:18:51',
      dataDevolucao: '26/09/2024 07:23:48',
      chave: '01060 - PREDIO ADM - PRINCIPAIS',
      funcionario: '027331 - JOAO PAULO GERA DE SOUZA',
      porteiro: 'VALDINEI NEVES DE OLIVEIRA',
    },
    {
      id: 4481,
      dataEntrega: '26/09/2024 08:00:00',
      dataDevolucao: '26/09/2024 08:30:00',
      chave: '01002 - 2° via de WC café verde',
      funcionario: '027332 - MARIA JOAQUINA SOUZA',
      porteiro: 'JOSE ALVES DE OLIVEIRA',
    },
  ];

  return (
    <div className="principal">
      <h2>Consulta Chaves</h2>
      <section className="card">
        <form action="" className="formulario">
          <div>
            <label htmlFor="chave">Chave</label>
            <input type="text" id="chave" list="chaves" name="chave" />
            <datalist id="chaves">
              <option key="01001" value="01001-Almoxarifado" />
              <option key="01002" value="01002-2° via de WC café verde " />
              <option key="01060" value="01060-PREDIO ADM - PRINCIPAIS" />
            </datalist>
          </div>
          <div>
            <label htmlFor="datade">Data de</label>
            <input type="date" id="datade" />
          </div>
          <div>
            <label htmlFor="dataate">Data Até</label>
            <input type="date" id="dataate" />
          </div>

          <button onClick={() => { }}>
            Pesquisar
          </button>
        </form>
      </section>

      <table className="grupotristao">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Entrega</th>
            <th>Data Devolução</th>
            <th>Chave</th>
            <th>Funcionário</th>
            <th>Porteiro</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id}>
              <td>
                <Link href={`/consultas/entregas/${entrega.id}`}>
                  {entrega.id}
                </Link>
              </td>
              <td>{entrega.dataEntrega}</td>
              <td>{entrega.dataDevolucao}</td>
              <td>{entrega.chave}</td>
              <td>{entrega.funcionario}</td>
              <td>{entrega.porteiro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
