"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import { TceUser } from "./types";
import { useEffect, useState } from "react";
import { getTceUser, getUser } from "@/api";

export default function Home() {
  const [tceUser, setTceUser] = useState<TceUser | null>(null);
	const [userName, setUserName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true);
				// Primeiro, pega o username
				const userNameResponse = await getUser();
				if (userNameResponse) {
					setUserName(userNameResponse);

					// Depois, chama getTceUser com o username
					const tceUserResponse = await getTceUser({ 'USER': `REALCAFE\\${userNameResponse}`, 'RELATORIO': "CONTROLEDECHAVES" });

					// Atualiza o estado com o usuário do TCE
					setTceUser(tceUserResponse);
				}
			} catch (err) {
				setError('Erro ao carregar os dados.');
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p>{error}</p>;
	}
  
  return (
    <div></div>
  );
}
