// import { UsersService } from "@/services/users";
import { useParams } from "react-router-dom";
// import useSWR from "swr";

export const AdminUserPage = () => {
  const { userId } = useParams();

  // const { data, error } = useSWR(userId!, (userId) =>
  //   UsersService.getUser(+userId),
  // );

  return (
    <div>
      <h1 className="text-3xl">
        Ver detalle Individual de un Administrador o Doctor:
      </h1>
      <h2 className="text-2xl">usuario con ID {userId}</h2>
    </div>
  );
};
