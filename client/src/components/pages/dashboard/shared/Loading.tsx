import { RotatingLines } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <RotatingLines
        strokeColor="#034561"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      <h1 className="text-2xl font-caudex text-dark-green pt-4">
        Espere porfavor...
      </h1>
    </div>
  );
};
