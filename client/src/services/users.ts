import { TUser } from "@/types/user";
import { client } from "../config/client";

type TGetHighLevelRolesData = { status: string; users: TUser[]; count: number };

export const UsersService = {
  getHighLevelRolesUsers() {
    return client
      .get<TGetHighLevelRolesData>("/api/v1/admin/high-level-roles")
      .then((res) => res.data);
  },

  getPatients() {
    // todo
  },
};
