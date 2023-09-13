import card1_DA from "/images/card1-dashboard-administrador.png";
import card2_DA from "/images/card2-dashboard-administrador.png";
import card3_DA from "/images/card3-dashboard-administrador.png";
import card4_DA from "/images/card4-dashboard-administrador.png";
import card5_DA from "/images/card5-dashboard-administrador.png";
import card6_DA from "/images/card6-dashboard-administrador.png";
import card7_DA from "/images/card7-dashboard-administrador.png";

export const AdminDashboardPage = () => {
  return (
    <>
      <div className="grid max-sm:grid-cols-1 p-4 2xl:py-4">
        <div className="2xl:flex 2xl:justify-evenly 2xl:py-6">
          <div className="grid pb-6 2xl:pb-0">
            <img
              className="justify-self-center w-full 2xl:w-[600px]"
              src={card1_DA}
              alt="card1-dashboard-administrador"
            />
          </div>

          <div className="grid pb-6 2xl:pb-0">
            <img
              className="justify-self-center w-full 2xl:w-[600px]"
              src={card2_DA}
              alt="card2-dashboard-administrador"
            />
          </div>
        </div>

        <div className="2xl:flex 2xl:justify-evenly pb-6">
          <div className="grid pb-6 2xl:pb-0">
            <img
              className="justify-self-center w-full 2xl:w-[600px]"
              src={card3_DA}
              alt="card3-dashboard-administrador"
            />
          </div>
        </div>

        <div className="2xl:flex 2xl:justify-evenly pb-6">
          <div className="grid pb-6 2xl:pb-0">
            <img
              className="justify-self-center w-80 2xl:w-[500px]"
              src={card3_DA}
              alt="card3-dashboard-administrador"
            />
          </div>

          <div className="grid pb-6 2xl:pb-0">
            <img
              className="justify-self-center w-80 2xl:w-[500px]"
              src={card4_DA}
              alt="card4-dashboard-administrador"
            />
          </div>
        </div>

        <div className="grid pb-6 2xl:pb-0">
          <img
            className="justify-self-center w-full 2xl:w-[600px]"
            src={card4_DA}
            alt="card4-dashboard-administrador"
          />
        </div>
      </div>
      <div className="2xl:flex 2xl:justify-center pb-6">
        <img
          className="w-full 2xl:w-[1300px]"
          src={card5_DA}
          alt="card5-dashboard-administrador"
        />
      </div>
      <div className="2xl:flex 2xl:justify-evenly gap-20 2xl:pb-6">
        <div className="grid pb-6 2xl:pb-0">
          <img
            className="w-full justify-self-center 2xl:w-[450px]"
            src={card6_DA}
            alt="card6-dashboard-administrador"
          />
        </div>

        <div className="grid pb-16 2xl:pb-0">
          <img
            className="w-full justify-self-center xl:w-[600px]"
            src={card7_DA}
            alt="card7-dashboard-administrador"
          />
        </div>
      </div>
    </>
  );
};
