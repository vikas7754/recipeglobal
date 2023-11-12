"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Inputs/DynamicInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

function DynamicInput({ onChange, placeholder, limit, data = [] }) {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  useEffect(() => {
    if (data.length !== 0) {
      setInputFields(data.map((value) => ({ value })));
    }
  }, [data]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ value: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    onChange(values.map((field) => field.value));
  };

  const handleInputChange = (index, value) => {
    const values = [...inputFields];
    values[index].value = value;
    setInputFields(values);
    onChange(values.map((field) => field.value));
  };
  return (
    <div className={styles.container}>
      {inputFields.map((field, index) => (
        <div key={index} className={styles.input}>
          <Input
            id={`dynamicInput${index + 1}`}
            type="text"
            value={field.value}
            onChange={(v) => handleInputChange(index, v)}
            placeholder={`${placeholder} ${index + 1}`}
          />
          {inputFields.length !== 1 && (
            <button type="button" onClick={() => handleRemoveFields(index)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      ))}
      {inputFields.length < (limit || 1000) && (
        <div className={styles.addMore}>
          <button type="button" onClick={() => handleAddFields()}>
            <FontAwesomeIcon icon={faPlus} /> Add More
          </button>
        </div>
      )}
    </div>
  );
}

export default DynamicInput;
