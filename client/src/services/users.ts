import { TUser } from "@/types/user";
import { client } from "../config/client";

async function getHighLevelRolesUsers() {
  type TGetHighLevelRolesData = {
    status: string;
    users: TUser[];
    count: number;
  };

  const res = await client.get<TGetHighLevelRolesData>(
    "/api/v1/admin/high-level-roles",
  );

  res.data.users.sort((a, b) => (a.id > b.id ? 1 : -1));
  return res.data;
}

async function acceptHighLevelRoleUser(userId: number) {
  type TAcceptHighLevelRoleUserData = {
    status: string;
    message: string;
    updatedUser: TUser;
  };

  const res = await client.patch<TAcceptHighLevelRoleUserData>(
    "/api/v1/admin/high-level-roles/" + userId,
  );

  return res.data;
}

export const UsersService = {
  getHighLevelRolesUsers,
  acceptHighLevelRoleUser,
};
