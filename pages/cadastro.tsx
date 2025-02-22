import styles from "../styles/Login.module.css";

import LoginCard from "../src/components/loginCard/loginCard";
import Input from "../src/components/input/input";
import Button from "../src/components/button/button";

export default function CadastroPage() {
  return (
    <div className={styles.background}>
      <LoginCard title="Crie sua conta">
        <form className={styles.form}>
          <Input type="text" placeholder="Seu nome" />
          <Input type="email" placeholder="Seu e-mail" />
          <Input type="password" placeholder="Sua senha" />
          <Button>Cadastrar</Button>
        </form>
      </LoginCard>
    </div>
  );
}
