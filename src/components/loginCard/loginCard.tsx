import styles from "./loginCard.module.css";
import React from "react";

interface LoginCardProps {
  title?: string;
}

const LoginCard: React.FC<React.PropsWithChildren<LoginCardProps>> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      {children}
    </div>
  );
};

export default LoginCard;
