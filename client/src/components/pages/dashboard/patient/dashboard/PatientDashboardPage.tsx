import image_PDP_1 from "/images/patient-dashboard-page-1.png";
import image_PDP_2 from "/images/patient-dashboard-page-2.png";
import image_PDP_3 from "/images/patient-dashboard-page-3.png";
import image_PDP_4 from "/images/patient-dashboard-page-4.png";

export const PatientDashboardPage = () => {
  return (
    <div className="px-2 2xl:px-0 my-6">
      <div className="grid 2xl:flex 2xl:justify-evenly mb-6">
        <img src={image_PDP_1} alt="Image-patient-dashboard-1" className="w-80 2xl:w-[730px] justify-self-center" />

        <img src={image_PDP_2} alt="Image-patient-dashboard-2" className="w-48 2xl:w-[420px] justify-self-center" />
      </div>

      <div className="grid 2xl:flex 2xl:justify-evenly">
        <img src={image_PDP_3} alt=" Image-patient-dashboard-3" className="w-80 2xl:w-[730px] justify-self-center" />

        <img src={image_PDP_4} alt="Image-patient-dashboard-4" className="w-48 2xl:w-[420px] justify-self-center" />
      </div>
    </div>
  );
};
