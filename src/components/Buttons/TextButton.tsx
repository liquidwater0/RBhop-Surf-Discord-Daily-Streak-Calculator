import Button, { ButtonProps } from "./Button";

export default function TextButton({ children, className, ...props }: ButtonProps) {
    return (
        <Button
            className={`text-button ${className ? className : ""}`}
            { ...props }
        >
            { children }
        </Button>
    );
}