"use client";
import styles from "@/styles/Inputs/Input.module.scss";
import { useEffect, useState } from "react";

function Input({ type, placeholder, onChange, value, id, className }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type={type}
        id={id}
        value={inputValue}
        className={className}
        onChange={handleChange}
        required={true}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
}

export default Input;
