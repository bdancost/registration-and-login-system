import styles from "input.module.css";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input className={styles.input} {...props} />;
}
