import { Attention } from "./shared/Attention";
import { MedicalSpecialties } from "./shared/MedicalSpecialties";
import { Services } from "./shared/Services";
import { Testimonials } from "./shared/Testimonials";
import { Welcome } from "./shared/Welcome";

export const Home = () => {
  return (
    <div className="w-full h-full mt-12 xl:mt-0">
      <section className="p-4 2xl:pt-20 2xl:px-36 bg-gradient-to-r from-yellow-50 to-green-100">
        <Welcome />
      </section>
      <section className="pt-4 2xl:pt-12 2xl:px-36">
        <Attention />
      </section>
      <section className="py-12 mb-12">
        <Services />
      </section>
      <section className="overflow-auto mb-12">
        <Testimonials />
      </section>
      <section className="">
        <MedicalSpecialties />
      </section>
    </div>
  );
}; 
