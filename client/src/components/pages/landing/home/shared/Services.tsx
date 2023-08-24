export const Services = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <p className="text-3xl font-caudex font-bold tracking-wide text-dark-green">
        "La atención médica más completa."
      </p>
      <div className="w-full flex gap-16">
        <div className="flex flex-col justify-around w-1/2 pl-36 pr-6 bg-lightest-green">
          <p className="font-caudex text-3xl tracking-wide">Turnos</p>
          <p>
            Sistema de reserva de turnos con tu profesional médico. Verifica
            horarios disponibles y agenda un turno de forma online.
          </p>
          <div>jaja</div>
        </div>
        <div>
          <img src="https://turnos.app/assets/img/doc1.jpg" />
        </div>
      </div>
    </div>
  );
};
