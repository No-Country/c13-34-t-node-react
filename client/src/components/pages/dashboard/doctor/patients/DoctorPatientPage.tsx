import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { GiBodyHeight } from "react-icons/Gi";
import { GrAddCircle } from "react-icons/gr";

const user = {
  id: "1",
  firstName: "David",
  lastName: "Jones",
  telephone: "0123456789",
  email: "david@gmail.com",
  dateOfBirth: "22/12/1991",
  genre: "male",
  appointment: "10:00 - 11:00, 25/09/2023",
};

export const DoctorPatientPage = () => {
  return (
    <div className="bg-gray-200 mb-12">
      <div className="bg-white px-8 pt-10 pb-4 flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-lg font-bold uppercase">Paciente</h2>
          <MdOutlineArrowForwardIos color="gray" size={25} />
          <p className="text-slate-500 font-bold text-lg">
            {user.firstName + " " + user.lastName}
          </p>
        </div>
        <div>Notificación</div>
      </div>
      <div className="flex justify-around items-start">
        <div className="flex w-1/2 flex-col gap-2">
          <div className="flex w-full gap-3">
            <div className="bg-white h-80 my-12 p-4 w-fit flex flex-col gap-4 justify-center items-center rounded-xl drop-shadow-xl border-2 border-dark-green">
              <div className="w-[80px] h-[80px] flex justify-center items-center border-2 border-slate-300 p-2 rounded-full">
                <AiOutlineUser size={80} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-black font-bold text-xl">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-slate-400 font-bold text-lg">{user.email}</p>
              </div>
              <div className="flex">
                <div className="border-r-2 border-solid-black p-4 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold"> 5 </p>
                  <p> realizadas </p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold"> 2 </p>
                  <p> pendientes </p>
                </div>
              </div>
            </div>
            <div className="w-max border-2 border-dark-green h-80 gap-3 flex-wrap items-center justify-center bg-white my-12 p-2 flex rounded-xl drop-shadow-xl">
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">Género</p>
                <p className="text-md">
                  {user.genre === "male" ? "Masculino" : "Femenino"}
                </p>
              </div>
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">Teléfono</p>
                <p className="text-md">{user.telephone}</p>
              </div>
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">
                  Fecha nacimiento
                </p>
                <p className="text-md">{user.dateOfBirth}</p>
              </div>
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">Fecha inicio</p>
                <p className="text-md">04/08/2022</p>
              </div>
            </div>
            <div className="w-1/7 h-80 flex-wrap items-center justify-center gap-4 my-12 flex flex-col">
              <div className="flex w-full items-center justify-center gap-2">
                <div className="w-fit h-20 bg-white p-5 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                  <p className="text-md font-bold text-slate-400">Edad</p>
                  <p className="text-md font-bold ">62</p>
                </div>
                <div className="w-max h-20 bg-white p-5 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                  <p className="text-md font-bold text-slate-400">Peso</p>
                  <p className="text-md font-bold ">78 kg</p>
                </div>
              </div>
              <div className="w-full h-20 bg-white flex-wrap items-center justify-center gap-1 my-auto p-5 flex rounded-xl drop-shadow-xl border-2 border-dark-green">
                <GiBodyHeight size={40} color="grey" />
                <p className="text-md font-bold ">183 cm</p>
              </div>
              <div className="w-full bg-white p-4 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                <p className="text-md font-bold text-slate-400">
                  Presión arterial
                </p>
                <p className="text-md font-bold ">120-80 mm/Hg</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl w-full drop-shadow-xl">
            <div className="w-full bg-dark-green p-4 gap-4 border-2 border-b-slate-500 rounded-t-xl">
              <p className="text-lg text-white font-bold text-center">
                Historial médico
              </p>
            </div>
            <table className="table-auto bg-white w-full p-4 gap-4 border-2 border-b-slate-500 border-separate border-spacing-1">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Notas</th>
                  <th>Síntomas</th>
                  <th>Tratamiento</th>
                  <th>Medicación</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td>07/08/2023</td>
                  <td className="p-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime, fugit nesciunt soluta quam laborum, perspiciatis
                    necessitatibus nobis minus.
                  </td>
                  <td>Dolor de cabeza y fiebre</td>
                  <td>Reposo </td>
                  <td>Antibiótico cada 12hs, 7 días</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-center bg-white gap-4 border-2 border-b-slate-500">
              <button className="text-lg text-center">
                <GrAddCircle size={40} />
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white my-12 rounded-xl drop-shadow-xl">
          <div className=" bg-dark-green p-4 px-32 gap-4 border-2 border-b-slate-500 rounded-t-xl">
            <p className="text-lg text-white font-bold text-center">
              Registro médico
            </p>
          </div>
          <div className="max-w-md">
            <div className="flex gap-2 items-center border-2 border-slate-300">
              <p className="w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                Patologías
              </p>
              <p className="flex w-64 h-full text-sm text-ellipsis">
                Hipertensión
              </p>
            </div>
            <div className="flex w-full gap-2 items-center border-2 border-slate-300">
              <p className="w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                Medicación
              </p>
              <p className="flex w-64 h-full text-sm text-ellipsis">
                Benazepril 2/día
              </p>
            </div>
            <div className="flex gap-2 items-center border-2 border-slate-300">
              <p className="w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                Alergias
              </p>
              <p className="flex w-64 h-full text-sm text-ellipsis">-</p>
            </div>
            <div className="flex gap-2 items-center border-2 border-slate-300">
              <p className="w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                Intervenciones
              </p>
              <p className="flex w-64 h-full text-sm text-ellipsis">
                Operación rodilla
              </p>
            </div>
            <div className="flex gap-2 items-center border-2 border-slate-300">
              <p className="w-32 font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                Antecedentes familiares
              </p>
              <p className="flex w-64 h-full text-sm text-ellipsis">
                ACV abuelo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
