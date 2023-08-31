export const SectionAbout2 = () => {
  return (
    <div className="flex px-6 flex-col md:flex-row justify-center items-center relative w-full h-[700px] gap-4 xl:gap-24">
      <div className="absolute w-screen left-0">
        <img
          src="/images/waves.png"
          alt="background waves design"
          className="w-screen h-[800px]"
        />
      </div>
      <div className="md:w-[600px] md:mt-0 mt-24 flex flex-col gap-2 2xl:gap-12">
        <p className="font-caudex md:text-3xl font-bold tracking-wide text-dark-green">
          ATENDE TU SALUD CON EL SERVICIO MÁS COMPLETO
        </p>
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          tempore aliquam temporibus porro. Expedita earum rerum dolorem, ab,
          reiciendis nobis sequi minima beatae accusantium pariatur harum labore
          facere corporis impedit.
        </p>
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          tempore aliquam temporibus porro. Expedita earum rerum dolorem, ab,
          reiciendis nobis sequi minima beatae accusantium pariatur harum labore
          facere corporis impedit.
        </p>
      </div>
      <div className="relative z-10 2xl:self-end rounded-lg w-1/2 xl:w-auto">
        <img src="/images/about-section2.jpg" className="rounded-lg" />
      </div>
    </div>
  );
};
