export const Attention = () => {
  return (
    <div className="pt-2 px-4 2xl:px-0">
      <div className="grid 2xl:grid-cols-2">
        <div className="grid">
          <img
            src="/images/home-section2.png"
            alt=""
            className="w-80 justify-self-center 2xl:w-[690px] rounded-md object-cover pb-4 2xl:pb-0"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl 2xl:text-3xl pb-4 2xl:pb-8 font-bold text-dark-green 2xl:w-[500px] font-caudex tracking-[1px]">
            <p>"Donde la excelencia médica se une a la compasión por su bienestar."</p>
          </div>
          <p className="font-opensans 2xl:w-[700px] pb-6 2xl:pb-16">
          En nuestro centro médico especializado, ofrecemos una amplia gama de servicios de atención médica para su salud en general. Nuestro equipo de médicos y profesionales de la salud altamente capacitados está dedicado a brindarle una atención excepcional en todas las etapas de su viaje hacia el bienestar. Desde diagnósticos precisos hasta tratamientos terapéuticos y atención quirúrgica cuando sea necesario, estamos comprometidos con su salud y su comodidad en todo momento.
          </p>

          <div className="grid 2xl:grid-cols-2">
            <div className="justify-self-center pb-11">
              <div className="flex items-center gap-1 pb-11">
                <img
                  src="/images/icon-1.png"
                  alt="icon-1"
                  className="w-12 2xl:w-16 object-cover"
                />
                <p className="text-lg 2xl:text-2xl">Estamos certificados</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icon-3.png"
                  alt="icon-3"
                  className="w-12 2xl:w-16 object-cover"
                />
                <p className="text-lg 2xl:text-2xl">Estamos certificados</p>
              </div>
            </div>

            <div className="justify-self-center">
              <div className="flex items-center gap-1 pb-11">
                <img
                  src="/images/icon-2.png"
                  alt="icon-2"
                  className="w-12 2xl:w-16 object-cover"
                />
                <p className="text-lg 2xl:text-2xl">Estamos certificados</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icon-4.png"
                  alt="icon-4"
                  className="w-12 2xl:w-16 object-cover"
                />
                <p className="text-lg 2xl:text-2xl">Estamos certificados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
