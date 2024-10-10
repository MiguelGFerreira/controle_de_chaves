"use client"

import { Switch } from '@headlessui/react'
import { useState } from 'react'

interface Props {
    checked: boolean
    onChange: (value: boolean) => void
}

const ToggleSwitch = ({ checked, onChange }: Props) => {
    const [enabled, setEnabled] = useState(checked);

    const handleChange = () => {
        setEnabled(!enabled);
        onChange
    }
    
    return (
        <Switch
            checked={enabled}
            onChange={handleChange}
            className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#003B2F]' : 'bg-[#72a83f50]'}`}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-7' : 'translate-x-0'}`}
            />
        </Switch>
    )
}

export default ToggleSwitch