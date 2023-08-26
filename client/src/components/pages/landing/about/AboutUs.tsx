import { SectionAbout1 } from "./shared/SectionAbout1";

export const AboutUs = () => {
  return (
    <div className="h-full">
      <section className="p-4 2xl:pt-16 2xl:px-36">
        <SectionAbout1 />
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section About 2</div>
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section About 3</div>
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section About 4</div>
      </section>
      <section className="py-4 px-36">
        <div className="h-80">Section About 5</div>
      </section>
    </div>
  );
};
