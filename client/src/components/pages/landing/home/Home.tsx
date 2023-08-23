import { EspecialidadesMedicas } from "./shared/EspecialidadesMedicas";
import { Welcome } from "./shared/Welcome";

export const Home = () => {
  return (
    <div className="h-full bg-[#EBFFF5]">
      <section className="py-4 px-36">
        {/* Reemplazar esta linea de abajo por el componente */}
        <Welcome />
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section Home 2</div>
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section Home 3</div>
      </section>
      <section className="py-4 px-36">
        <EspecialidadesMedicas />
      </section>
    </div>
  );
};
