export interface TextInputProps {
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}
