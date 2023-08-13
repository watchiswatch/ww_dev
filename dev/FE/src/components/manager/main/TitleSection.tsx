import './main.css';

const TitleSection = () => {
  return (
    <>
      <div
        className="hidden md:block md:mx-auto"
        style={{ maxWidth: '1440px' }}
      >
        <div className="flex flex-wrap justify-between  bg-none mx-auto w-[100%] my-20">
          <div className="m-auto  text-black opacity-100">
            <p className="text-5xl text-center mb-8 font-Jeju">
              최고의 운동 경험을
            </p>
            <p className="text-6xl font-Bungee"> WAIT WEIGHT</p>
          </div>
          <div className="hidden xl:block my-auto ">
            <img
              className="rounded-2xl mr-5"
              src="/img/main/gym1.png"
              alt="gym1.png"
            />
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="h-screen absolute w-full top-0 -z-10 moving-background flex justify-center items-center">
          <div className="font-Bungee text-white flex flex-col items-center justify-center text-center mx-auto bg-black/70 w-full h-[160px]">
            <span className="font-Jeju text-3xl font-bold">
              더 강해질 나를 위해
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleSection;
