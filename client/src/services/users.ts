import { TUser } from "@/types/user";
import { client } from "../config/client";
import { TDoctor } from "@/types/doctor";
// import { faker } from "@faker-js/faker";

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

async function getDoctors() {
  type TGetDoctors = {
    status: string;
    results: number;
    doctors: TDoctor[];
  };

  const res = await client.get<TGetDoctors>("/api/v1/patients/doctors");
  res.data.doctors.sort((a, b) => (a.id > b.id ? 1 : -1));
  return res.data;
}

// const count = Math.floor(Math.random() * 20) + 20;

// const users: TDoctor[] = Array.from({ length: count }, (_, i) => ({
//   id: i + 1,
//   firstName: faker.person.firstName(),
//   lastName: faker.person.lastName(),
//   specialty: faker.helpers.arrayElement(["medicina general"]),
// }));

// async function getDoctors() {
//   type TResult = {
//     status: string;
//     users: TDoctor[];
//     count: number;
//   };

//   const result: TResult = {
//     status: "success",
//     users,
//     count,
//   };

//   return result;
// }

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

async function deletedHighLevelRoleUser(userId: number) {
  return client.delete("/api/v1/admin/high-level-roles/" + userId);
}

export const UsersService = {
  getHighLevelRolesUsers,
  acceptHighLevelRoleUser,
  deletedHighLevelRoleUser,
  getDoctors,
};
