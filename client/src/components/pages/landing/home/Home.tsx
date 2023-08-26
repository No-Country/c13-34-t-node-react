import { MedicalSpecialties } from "./shared/MedicalSpecialties";
import { Testimonials } from "./shared/Testimonials";
import { Welcome } from "./shared/Welcome";
import { Services } from "./shared/Services";

export const Home = () => {
  return (
    <div className="h-full">
      <section className="sm:p-4 mb-32 2xl:pt-24 2xl:px-36 bg-gradient-to-r from-yellow-50 to-green-100">
        <Welcome />
      </section>
      <section className="py-12 mb-40">
        <Services />
      </section>
      <section className=" mb-40">
        <Testimonials />
      </section>
      <section className="py-4 px-36">
        <MedicalSpecialties />
      </section>
    </div>
  );
};
