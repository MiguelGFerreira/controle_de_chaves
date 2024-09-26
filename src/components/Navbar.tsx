import Link from "next/link";
import NavbarDropdown from "./NavbarDropdown";

interface Props {
	pages?: {
		name: string;
		path?: string;
		options?: { name: string; path: string }[];
	}[];
	className?: string;
}

const Navbar = ({ pages, className }: Props) => {
	const style =
		"flex gap-4 py-2 px-4 font-semibold items-center " + className;
	return (
		<ul className={style}>
			<li>
				<Link href="/">
					<svg
						version="1.2"
						baseProfile="tiny-ps"
						viewBox="0 0 300 300"
						xmlns="http://www.w3.org/2000/svg"
						className="w-8 h-8 fill-white hover:fill-amber-200"
					>
						<g transform="matrix(.1 0 0 -.1 0 300)">
							<path d="M1115 2988c-11-6-25-19-32-27l-12-16-1-192v-193h-7c-4 0-68 61-143 135l-137 135h-77l-265-265-266-264v-81l139-139 138-138-54-6c-29-4-118-7-198-7l-145-1-16-12c-9-7-21-22-27-34l-12-22v-733l29-29 29-29h396L317 935 180 799l-6-24-6-25 6-28 7-27 258-257 257-258h87l137 135c75 74 139 135 143 135h7V61l24-28 24-28 354-3 353-3 37 11 38 11 15 29 15 29v376l133-132 132-132 28-10 28-11 32 14 32 14 253 254 252 254v74l-134 143-134 142 191 5 192 5 17 8c9 5 24 24 33 43l16 34-3 361-3 361-28 24-28 24h-389v8c0 4 59 66 131 137l131 130 9 24 10 24-11 31-10 32-253 251-252 252-27 6-27 7-23-7-23-7-137-136-138-136v396l-29 29-29 29h-369l-368-1-20-11zm194-232 11-13-2-379-3-379-25-3-25-3-257 259-258 258v53l16 15 15 16h22c12 0 68-9 125-20 56-11 113-20 126-20h23l63 93c35 50 72 102 83 115l20 22h55l11-14zm531-101 76-110 22-3c12-2 71 6 131 17 130 25 139 26 163 4l18-16v-42l-262-262-263-263h-15c-9 0-21 5-28 12l-12 12v722l16 22 16 23 31-3 31-3 76-110zM769 1986l263-264-11-21-12-21H261l-15 16-16 15v48l13 13c8 7 57 42 110 78l97 65 6 22 6 23-22 120-23 121 11 24 12 25h66l263-264zm1796 240 16-23-25-127-25-127 6-15c3-8 54-48 114-90l109-75 6-25 6-25-17-20-18-19-375 2-375 3-11 17-11 18 265 265 265 265h55l15-24zm-934-433 47-21 42-42 42-42 26-57 26-56v-150l-21-47-21-47-42-45-42-46-57-27-56-28h-75l-75 1-56 26-57 26-42 42-42 42-21 47-22 46v180l23 42c43 82 107 138 191 170l36 13 75-3 75-4 46-20zm-627-469 16-6v-44l-263-262-263-262h-15c-8 0-25 7-37 16l-22 15v21c0 12 9 70 21 129 11 60 19 119 17 131l-3 22-110 76-110 76-3 31-3 31 23 16 22 16h357c197 0 364-3 373-6zm1742-17 27-24-6-24-6-25-110-74c-61-41-113-81-116-89l-5-13 25-130 25-129-10-19c-12-22-43-34-68-26-9 3-133 122-275 264l-257 258v33l18 10 17 10 357 1h357l27-23zm-1438-289 12-12V260l-25-16-24-16-21 7-20 6-75 109c-41 59-82 110-90 114l-15 5-127-24-127-25-23 15-23 15v55l262 262c145 145 268 263 273 263 6 0 16-5 23-12zm674-245c142-142 261-266 264-275 8-26-4-56-27-68l-19-11-129 26c-72 13-136 22-143 20-8-3-43-48-78-100s-72-104-82-115l-19-20h-39l-20 20-20 20v736l12 12c7 7 19 12 27 12h15l258-257z" />
						</g>
					</svg>
				</Link>
			</li>
			{pages?.map((item, index) => {
				return (
					<li
						key={index}
						className="text-lg hover:text-amber-200 relative z-100"
					>
						{item.path ? (
							<Link href={item.path}>{item.name}</Link>
						) : (
							<NavbarDropdown
								option={item.name}
								pages={item.options}
							/>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default Navbar;