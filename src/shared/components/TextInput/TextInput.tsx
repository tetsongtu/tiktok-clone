import type { TextInputProps } from './TextInput.type';

function TextInput({ string, inputType, placeholder, error, onUpdate }: TextInputProps) {
    return (
        <>
            <input
                placeholder={placeholder}
                className="block w-full bg-[#F1F1F1]
    text-gray-800 border border-gray-300
    rounded-md py-2.5 px-3 focus:outline-none"
                value={string || ''}
                onChange={(e: any) => onUpdate(e.target.value)}
                type={inputType}
                autoComplete="off"
            />
            <div className="text-red-500 text-sm font-semibold">{error && error}</div>
        </>
    );
}

export default TextInput;
