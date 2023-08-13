const ServiceSection = () => {
  return (
    <>
      <div
        className="hidden md:block md:mx-auto"
        style={{ maxWidth: '1440px' }}
      >
        <div className="py-20 flex justify-between mx-auto w-[100%] bg-white">
          <div className="hidden xl:block my-auto">
            <img
              className="rounded-2xl ml-5"
              src="/img/main/gym2.png"
              alt="gym2.png"
              width={550}
            />
          </div>
          <div className="m-auto w-[670px]">
            <p className="text-4xl font-Jeju mb-8 whitespace-pre-line">
              실시간 예약과 알림 기능으로
              <br /> 헬스장 운영을 효율화하세요!
            </p>
            <p className="text-xl font-Jeju">
              <span className="font-Bungee">Wait Weight</span>은 실시간 예약
              시스템과 알림 기능을 제공하여 헬스장 운영을 <br />
              더욱 효율적으로 만들어 줍니다. 회원들은 이용하고자 하는 운동기구를
              예약하고, 운동기구가 이용 가능해지면 알림을 받아 즉시 운동을
              시작할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="py-20 flex justify-between flex-wrap mx-auto w-[100%]">
          <div className="m-auto w-[670px] text-right">
            <p className="text-4xl font-Jeju mb-8 whitespace-pre-line">
              데이터 분석으로
              <br /> 헬스장 운영을 최적화하세요!
            </p>
            <p className="text-xl font-Jeju">
              <span className="font-Bungee">Wait Weight</span>의 데이터 분석
              기능을 통해 헬스장 운영을 최적화하세요.
              <br /> 운동기구 이용률, 인기 시간대, 회원 선호도 등을 파악하여
              <br />
              운영 전략을 수립하고, 회원들의 운동 경험을 한층 개선하세요.
            </p>
          </div>
          <div className="hidden xl:block my-auto">
            <img
              className="rounded-2xl"
              src="/img/main/gym3.png"
              alt="gym3.png"
              width={550}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSection;
