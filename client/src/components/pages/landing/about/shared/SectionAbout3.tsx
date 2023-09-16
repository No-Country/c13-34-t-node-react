export const SectionAbout3 = () => {
    return (
      <div className="flex flex-col mt-12 2xl:pb-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl 2xl:text-3xl font-caudex font-bold mb-4">Qué hace que Meddyplus se destaque como una clínica de alta tecnología?</h1>
          <h3 className="text-primary-green text-xl 2xl:text-2xl font-bold">Primero y único con el equipamiento de atención más avanzado y un gran número de especialistas con mucha experiencia bajo un mismo techo.</h3>
        </div>
  
        <div className="flex flex-col items-center gap-8 2xl:gap-12 2xl:flex-row 2xl:justify-evenly 2xl:mb-12 mt-4 mb-8">
          <div className="w-72 h-56 border-primary-green border-2 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute w-[500px] h-[400px] rounded-[60%] bg-lightest-green bottom-4 right-4"></div>
            <p className="pl-3 pr-3 mt-32 text-center 2xl:text-lg relative z-10">Más de 50.000 tratamientos exitosos.</p>
          </div>
  
          <div className="w-72 h-56 border-primary-green border-2 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute w-[500px] h-[400px] rounded-[60%] bg-lightest-green bottom-4 right-4"></div>
            <p className="pl-3 pr-3 mt-32 text-center 2xl:text-lg relative z-10">Más de 3.000 cirugías 3D exitosas.</p>
          </div>
  
          <div className="w-72 h-56 border-primary-green border-2 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute w-[500px] h-[400px] rounded-[60%] bg-lightest-green bottom-4 right-4"></div>
            <p className="pl-3 pr-3 mt-32 text-center 2xl:text-lg relative z-10">Primero en el país en imágenes digitales avanzadas.</p>
          </div>
        </div>
  
        <div className="flex flex-col items-center gap-8 md:gap-12 md:flex-row md:justify-evenly">
          <div className="w-72 h-56 border-primary-green border-2 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute w-[500px] h-[400px] rounded-[60%] bg-lightest-green bottom-4 right-4"></div>
            <p className="pl-3 pr-3 mt-32 text-center 2xl:text-lg relative z-10">Primera y única cirugía de retina vitro 3D.</p>
          </div>
  
          <div className="w-72 h-56 border-primary-green border-2 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute w-[500px] h-[400px] rounded-[60%] bg-lightest-green bottom-4 right-4"></div>
            <p className="pl-3 pr-3 mt-32 text-center 2xl:text-lg relative z-10">Angiografía OCT.</p>
          </div>
  
          <div className="w-72 h-56 border-primary-green border-2 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute w-[500px] h-[400px] rounded-[60%] bg-lightest-green bottom-4 right-4"></div>
            <p className="pl-3 pr-3 mt-32 text-center 2xl:text-lg relative z-10">Más de 10.000 cirugías exitosas.</p>
          </div>
        </div>
      </div>
    );
  };