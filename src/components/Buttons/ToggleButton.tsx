import { useState } from "react";
import { ButtonProps } from "./Button";
import TextButton from "./TextButton";

type ToggleButtonProps = {
    toggled?: boolean,
    onToggle?: (value: boolean) => void
} & ButtonProps;

export default function ToggleButton({ toggled, onToggle, ...props }: ToggleButtonProps) {
    const [toggle, setToggle] = useState<boolean>(toggled!);

    function handleClick() {
        //I have to get the opposite of toggle for some reason?
        if (onToggle !== undefined) onToggle(!toggle);
        setToggle(prev => !prev);
    }

    return (
        <TextButton
            onClick={handleClick}
            { ...props }
        >
            { toggle ? "Yes" : "No" }
        </TextButton>
    );
}