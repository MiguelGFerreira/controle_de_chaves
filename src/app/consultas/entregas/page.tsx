"use client"

import { getChaves, getEntregas } from '@/api';
import { Chave, Entregas } from '@/app/types';
import { formatarData } from '@/utils'
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Page = () => {
  const [entregas, setEntregas] = useState<Entregas[]>([]);
  const [chaves, setChaves] = useState<Chave[]>([])
  const [filter, setFilter] = useState({
    chave: "",
    dateStart: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    dateEnd: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  async function fetchEntregas() {
    const data = await getEntregas(filter);
    setEntregas(data);
  }

  async function fetchChaves() {
		const data = await getChaves();
		setChaves(data);
	}

  useEffect(() => {
    fetchEntregas()
    fetchChaves()
  }, [])

  return (
    <div className="principal">
      <h1>Consulta Entregas</h1>
      <section className="card">
        <form action="" className="formulario">
          <div>
            <label htmlFor="chave">Chave</label>
            <input type="text" id="chave" list="chaves" name="chave" onChange={handleFilterChange} />
            <datalist id="chaves">
              {chaves.map((chave) => (
                <option value={chave.ARMARIO + chave.NUMERO}>{chave.ARMARIO + chave.NUMERO + ' - ' + chave.DESCRIÇÃO}</option>
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="dateStart">Data de</label>
            <input type="date" id="dateStart" name="dateStart" onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="dateEnd">Data Até</label>
            <input type="date" id="dateEnd" name="dateEnd" onChange={handleFilterChange} />
          </div>

          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              fetchEntregas();
            }}
          >
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
            <tr key={entrega.ID}>
              <td>
                <Link href={`/consultas/entregas/${entrega.ID}`}>
                  {entrega.ID}
                </Link>
              </td>
              <td>{formatarData(entrega.DATA_ENTREGA)}</td>
              <td>{formatarData(entrega.DATA_DEVOLUCAO)}</td>
              <td>{entrega.ID_CHAVE}</td>
              <td>{entrega.FUNCIONARIO}</td>
              <td>{entrega.PORTEIRO}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
