import Button, { ButtonProps } from "./Button";

export default function IconButton({ children, className, ...props }: ButtonProps) {
    return (
        <Button
            className={`icon-button ${className ? className : ""}`}
            { ...props }
        >
            { children }
        </Button>
    );
}