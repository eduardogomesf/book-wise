import { MagnifyingGlass } from "phosphor-react";

import { InputContainer } from "./styles";
import { ChangeEvent } from "react";

type InputProps = {
  value: string;
  handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  size?: "md" | "lg";
};

export function TextInput({ value, handleChangeText, placeholder, size = "md" }: InputProps) {
  return (
    <InputContainer size={size}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={event => handleChangeText(event)}
      />
      <MagnifyingGlass size={32} />
    </InputContainer>
  )
}
