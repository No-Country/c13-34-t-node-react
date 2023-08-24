import { MedicalSpecialties } from "./shared/MedicalSpecialties";
import { Welcome } from "./shared/Welcome";
import { Services } from "./shared/Services";

export const Home = () => {
  return (
    <div className="h-full">
      <section className="pt-24 px-36 bg-gradient-to-r from-yellow-50 to-green-100">
        <Welcome />
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section Home 2</div>
      </section>
      <section className="py-12 mb-12">
        <Services />
      </section>
      <section className="py-4 px-36">
        <MedicalSpecialties />
      </section>
    </div>
  );
};
