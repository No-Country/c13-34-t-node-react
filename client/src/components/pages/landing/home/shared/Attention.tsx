export const Attention = () => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-2">
        <div className="">
          <img
            src="/images/home-section2.png"
            alt=""
            className="w-[690px] rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl pb-8 font-bold text-dark-green w-[500px] font-caudex tracking-[1px]">
            <p>"Where clear vision meets compassionate care."</p>
          </div>
          <p className="font-opensans w-[700px] pb-16">
            A specialized medical facility that provides diagnostic,
            therapeutic, and surgical services related to the eyes and vision.
            We are staffed by qualified ophthalmologists and optometrists who
            are trained to diagnose and treat a wide range of eye conditions, We
            are staffed by qualified ophthalmologists and optometrists who are
            trained to diagnose and treat a wide range of eye conditions, such
            as refractive errors, cataracts, glaucoma, macular degeneration, and
            diabetic retinopathy.
          </p>

          <div className="grid grid-cols-2">
            <div>
              <div className="flex items-center gap-1 pb-11">
                <img
                  src="/images/icon-3.png"
                  alt="icon-3"
                  className="w-16 object-cover"
                />
                <p className="text-2xl">We are certified</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icon-4.png"
                  alt="icon-4"
                  className="w-16 object-cover"
                />
                <p className="text-2xl">We are certified</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 pb-11">
                <img
                  src="/images/icon-1.png"
                  alt="icon-1"
                  className="w-16 object-cover"
                />
                <p className="text-2xl">We are certified</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icon-2.png"
                  alt="icon-2"
                  className="w-16 object-cover"
                />
                <p className="text-2xl">We are certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};