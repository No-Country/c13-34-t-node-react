import card1_DDP from "/images/card1-doctor-dasboard.png";
import card2_DDP from "/images/card2-doctor-dasboard.png";
import card3_DDP from "/images/card3-doctor-dasboard.png";
import card4_DDP from "/images/card4-doctor-dasboard.png";
import card5_DDP from "/images/card5-doctor-dasboard.png";
import card6_DDP from "/images/card6-doctor-dasboard.png";
import card7_DDP from "/images/card7-doctor-dasboard.png";

export const DoctorDashboardPage = () => {
  return (
    <div className="p-4 2xl:p-4 bg-white">
      <div className="flex flex-col items-center 2xl:flex-row 2xl:justify-evenly">
        <img src={card1_DDP} alt="Imagen1_DDP" className="w-80 2xl:w-[370px] mb-6 shadow-md" />

        <img src={card2_DDP} alt="Imagen2_DDP" className="w-80 2xl:w-[370px] mb-6 shadow-md" />

        <img src={card3_DDP} alt="Imagen3_DDP" className="w-80 2xl:w-[370px] mb-6 shadow-md" />
      </div>

      <div className="grid justify-center">
        <div className="grid">
          <img src={card4_DDP} alt="Imagen4_DDP" className="w-80 2xl:w-[1220px] mb-6 justify-self-center shadow-md shadow-gray-300" />
        </div>
      	<div className="grid">
          <img src={card5_DDP} alt="Imagen5_DDP" className="w-80 2xl:w-[1220px] mb-6 justify-self-center shadow-md shadow-gray-300" />
        </div>

        <div className="2xl:flex gap-8">
          <img src={card6_DDP} alt="Imagen6_DDP" className="w-80 2xl:w-[580px] mb-6 shadow-md shadow-gray-300" />

          <img src={card7_DDP} alt="Imagen7_DDP" className="w-80 2xl:w-[551px] mb-6 shadow-md shadow-gray-300" />
        </div>
      </div>
    </div>
   
  );
};
