import { useParams } from "react-router-dom";

export const AdminUserEditPage = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1 className="text-3xl">Editar Administrador o Doctor:</h1>
      <h2 className="text-2xl">usuario con ID {userId}</h2>
    </div>
  );
};
