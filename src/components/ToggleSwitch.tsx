"use client"

import { Switch } from '@headlessui/react'
import { useState } from 'react'

interface Props {
    checked: boolean | undefined
}

const ToggleSwitch = ({ checked }: Props) => {
    const [enabled, setEnabled] = useState(checked);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 ${enabled ? 'bg-[#003B2F]' : 'bg-[#72a83f50]'}`}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
        </Switch>
    )
}

export default ToggleSwitch