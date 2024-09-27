import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid"

interface Props {
    checked: Boolean
}

const ToggleSwitch = ({checked}: Props) => (
    <label className="cursor-pointer">
        <input type="checkbox" className="hidden" />
        <div className={`w-14 p-1 rounded-full ${checked ? "bg-blue-200" : "bg-gray-200"}`}>
            <div className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${checked ? "bg-blue-500 translate-x-6" : "bg-gray-400 -rotate-180"}`}>
                {checked ? <CheckIcon className="size-5" /> : <XMarkIcon className="size-5" />}
            </div>
        </div>
    </label>
)

export default ToggleSwitch