export const Services = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <p className="text-3xl font-caudex font-bold tracking-wide text-dark-green">
        "La atención médica más completa."
      </p>
      <div className="relative w-full flex justify-center">
        <div className="flex flex-col gap-8 w-1/2 pl-36 pr-6 bg-lightest-green">
          <p className="font-caudex text-3xl tracking-wide">Turnos</p>
          <p className="font-caudex text-2xl">
            Sistema de reserva de turnos con tu profesional médico.
          </p>
          <p className="font-caudex text-2xl">
            Verifica horarios disponibles y agenda un turno de forma online.
          </p>
          <div className="bg-white flex gap-8 -bottom-20 absolute rounded-xl p-4 border-2 border-slate-300">
            <img
              src="https://centromedicoabc.com/wp-content/uploads/2021/04/lab_clinico_sangre.png"
              className="w-24"
            />
            <img
              src="https://turnos.app/assets/img/doc1.jpg"
              className="w-24 border-2 border-slate-500"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPKpIFnx0EHEnf0kOivSVLo8biWTLG4B3H5BAx-_RSHLxddaq1dvbCAVO-kZ_ofyDhNY&usqp=CAU"
              className="w-24"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxcSbUuu8MGOtKtc3N_BYtYH-UpT7gZ7CwMf_ZVXO96k2tbkLqoK7DwKo10uGk12aDdns&usqp=CAU"
              className="w-24"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL5Jff01SOlSIc5MxQlfiP1Jq6ZVQbyD8J9A&usqp=CAU"
              className="w-24"
            />
          </div>
        </div>
        <div className="relative ml-20">
          <img src="https://turnos.app/assets/img/doc1.jpg" />
          <button className="w-full absolute -bottom-20 py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
            Conocer más
          </button>
        </div>
      </div>
    </div>
  );
};
