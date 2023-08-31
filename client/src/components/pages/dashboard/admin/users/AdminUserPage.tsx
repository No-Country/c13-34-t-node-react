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
      <h1 className="text-3xl">Usuario {userId}</h1>
    </div>
  );
};
