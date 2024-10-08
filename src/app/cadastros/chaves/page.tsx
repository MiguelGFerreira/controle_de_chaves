import ToggleSwitch from "@/components/ToggleSwitch";
import { TrashIcon } from "@heroicons/react/20/solid";

const page = () => {
	return (
		<div className="principal">
			<h2>Cadastro de Chaves</h2>
			<table className="grupotristao items-center w-full">
				<thead className="text-left">
					<tr>
						<th>Armário</th>
						<th>Número</th>
						<th>Descrição</th>
						<th>Restrito</th>
						<th>Excluir</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>01</td>
						<td>001</td>
						<td>Almoxarifado</td>
						<td><ToggleSwitch checked={true} /></td>
						<td><TrashIcon className="size-8 hover:cursor-pointer" /></td>
					</tr>
					<tr>
						<td>01</td>
						<td>002</td>
						<td>2° via de WC café verde</td>
						<td><ToggleSwitch checked={false} /></td>
						<td><TrashIcon className="size-8 hover:cursor-pointer" /></td>
					</tr>
					<tr>
						<td>01</td>
						<td>003</td>
						<td>Acesso telhado expedição</td>
						<td><ToggleSwitch checked={false} /></td>
						<td><TrashIcon className="size-8 hover:cursor-pointer" /></td>
					</tr>
					<tr>
						<td>01</td>
						<td>004</td>
						<td>Almoxarifado</td>
						<td><ToggleSwitch checked={true} /></td>
						<td><TrashIcon className="size-8 hover:cursor-pointer" /></td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default page