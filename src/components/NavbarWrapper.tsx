"use client"

import { getTceUser, getUser } from "@/api";
import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";

const defaultPages = [
	{
		name: "Chaves institucionais", path: "", options:
			[
				{ name: "Consulta de chaves", path: "/consultas/chaves" },
				{ name: "Consulta de entregas", path: "/consultas/entregas" },
				{ name: "Entregas em aberto", path: "/consultas/entregas/abertas" },
				{ name: "Cadastro de chaves", path: "/cadastros/chaves" },
				{ name: "Cadastro de permissão", path: "/cadastros/permissao" },
				{ name: "Cadastro de armários de chaves", path: "/cadastros/chavesArmarios" },
			]
	},
	  {
	    name: "Armários dos Vestiários", path: "", options:
	      [
	        { name: "Armários Disponíveis", path: "/armarios/disponiveis" },
	        { name: "Armários Ocupados", path: "/armarios/ocupados" },
	        { name: "Segunda via", path: "/armarios/segundaVia" },
	        { name: "Histórico", path: "/armarios/historico" },
	        { name: "Cadastro", path: "/armarios/cadastro" },
	      ]
	  }
]

export default function NavbarWrapper(props: { className?: string }) {
	const [pages, setPages] = useState(defaultPages);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				// pega login do ad
				const userName = await getUser();
				// pega dados tceuser
				const tceUser = await getTceUser({
					USER: `REALCAFE\\${userName}`,
					RELATORIO: "CONTROLEDECHAVES",
				});
				// menu de acordo com o departamento
				switch (tceUser.NUMEROFILIAL) {
					case "ADM":
						setPages([
							{
								name: "Chaves institucionais", path: "", options:
									[
										{ name: "Consulta de chaves", path: "/consultas/chaves" },
										{ name: "Consulta de entregas", path: "/consultas/entregas" },
										{ name: "Entregas em aberto", path: "/consultas/entregas/abertas" },
										{ name: "Cadastro de chaves", path: "/cadastros/chaves" },
										{ name: "Cadastro de permissão", path: "/cadastros/permissao" },
										{ name: "Cadastro de armários de chaves", path: "/cadastros/chavesArmarios" },
									]
							},
							{
								name: "Armários dos Vestiários", path: "", options:
									[
										{ name: "Armários Disponíveis", path: "/armarios/disponiveis" },
										{ name: "Armários Ocupados", path: "/armarios/ocupados" },
										{ name: "Segunda via", path: "/armarios/segundaVia" },
										{ name: "Histórico", path: "/armarios/historico" },
									]
							}
						]);
						break;

					default:
						setPages(defaultPages);
						break;
				}
			} catch (err) {
				console.error("Erro ao carregar dados do user:", err);
			} finally {
				setReady(true);
			}
		})();
	}, []);

	if (!ready) return <LoadingSpinner />;

	return <Navbar {...props} pages={pages} />;
}