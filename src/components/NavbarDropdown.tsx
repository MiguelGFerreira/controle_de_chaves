"use client";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Props {
	option: string;
	pages: { name: string; path: string }[] | undefined;
	className?: string;
}

const NavbarDropdown = ({ option, pages, className }: Props) => {
	return (
		<div>
			<Menu as="div" className="relative inline-block text-left">
				<MenuButton className={`${className} flex text-white`}>
					{option}
					<ChevronDownIcon
						className="h-8 w-8 text-white"
						aria-hidden="true"
					/>
				</MenuButton>
				<Transition
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<MenuItems className="absolute z-10 left-0 w-full divide-y divide-emerald-600 text-lg text-white bg-[#003B2F]/90 shadow-lg">
						{pages?.map((page, index) => {
							return (
								<MenuItem key={index}>
									{({ active }) => (
										<Link
											href={page.path}
											className={`${
												active
													? "bg-[#72A83F]/70"
													: "text-white"
											} group flex w-full items-center p-1 text-sm`}
										>
											{page.name}
										</Link>
									)}
								</MenuItem>
							);
						})}
					</MenuItems>
				</Transition>
			</Menu>
		</div>
	);
};

export default NavbarDropdown;