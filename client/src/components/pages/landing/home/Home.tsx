import { MedicalSpecialties } from "./shared/MedicalSpecialties";
import { Testimonials } from "./shared/Testimonials";
import { Welcome } from "./shared/Welcome";
import { MedicalSpecialties } from './shared/MedicalSpecialties';

export const Home = () => {
  return (
    <div className="h-full">
      <section className="sm:p-4 2xl:pt-24 2xl:px-36 bg-gradient-to-r from-yellow-50 to-green-100">
        <Welcome />
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section Home 2</div>
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section Home 3</div>
      </section>
      <section className="py-4 px-36">
        <MedicalSpecialties />
      </section>
      <section>
        <Testimonials />
      </section>
    </div>
  );
};
