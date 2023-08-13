import './main.css';

const ContactSection = () => {
  return (
    <>
      <div className="hidden md:flex md:flex-col md:items-center">
        <div
          className="mx-auto h-[400px] w-[100%] mt-5"
          style={{ maxWidth: '1440px' }}
        >
          <div className="w-[100%] h-96 bg-CustomOrange flex flex-col">
            <span className="font-Jeju text-5xl pt-24 text-center font-bold">
              헬스장 운영의 혁신
            </span>
            <span className="font-Jeju text-2xl pt-28 text-center">
              헬스장 운영의 효율성을 높이고 회원들에게 최고의 운동 경험을
              선사하세요.
            </span>
          </div>
        </div>
        <div
          className="mx-20 mt-10 flex justify-evenly items-center w-[100%] h-[353px] rounded-[20px] border-solid border-[1px] border-black text-center"
          style={{ maxWidth: '1440px' }}
        >
          <div>
            <p className="font-Bungee text-3xl">E-mail</p>
            <p className="font-Jeju mt-24 text-xl">ssafy@ssafy.com</p>
          </div>
          <div>
            <p className="font-Bungee text-3xl">TEL</p>
            <p className="font-Jeju mt-24 text-xl">02-1234-5678</p>
          </div>
          <div>
            <p className="font-Bungee text-3xl">ADDRESS</p>
            <p className="font-Jeju mt-20 text-xl">
              대한민국 서울특별시 강남구
              <br /> 역삼동 테헤란로 212, 801호
            </p>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="bg-CustomOrange h-24 fixed bottom-0 flex justify-center items-center w-full">
          <span className="font-Jeju text-xl text-center">
            <span className="font-Bungee text-3xl">Wait Weight</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
