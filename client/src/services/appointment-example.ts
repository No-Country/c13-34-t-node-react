// import { TAppointmentDate } from "@/types/appointment-date";
// import { faker } from "@faker-js/faker";
// import { addDays, format } from "date-fns";

// async function getDoctorAppointmentDates(doctorId: number) {
//   type TResult = {
//     status: string;
//     dates: TAppointmentDate[];
//     count: number;
//   };

//   const count = Math.floor(Math.random() * 10) + 5;

//   const result: TResult = {
//     status: "success",
//     dates: Array.from({ length: count }, (_, i) => ({
//       id: i + 1,
//       date: format(
//         faker.date.between({ from: new Date(), to: addDays(new Date(), 15) }),
//         "yyyy-MM-dd HH:mm",
//       ),
//       status: faker.helpers.arrayElement(["pending", "selected"]),
//     })),
//     count,
//   };

//   result.dates.sort((a, b) => (a.date > b.date ? 1 : -1));

//   return result;
// }

// export const AppointmentDatesService = {
//   getDoctorAppointmentDates,
// };
