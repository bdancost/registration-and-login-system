import { getCookie } from "cookies-next";
import { verifica } from "../services/user";

export default function Home() {
  return <div>Página segura - Perfil do usuário</div>;
}

export const getServerSideProps = async (req: any, res: any) => {
  try {
    const token = getCookie("authorization", { req, res });
    return { props: {} };
  } catch (err) {}
};
