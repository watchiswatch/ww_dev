interface OnboardingContainerProps {
  children: React.ReactNode;
}

const OnboardingContainer = ({ children }: OnboardingContainerProps) => {
  return (
    <div className="h-[100vh] py-[30px]">
      <div
        className={`mx-auto py-[25px] w-[330px] shadow-2xl rounded-2xl flex flex-col items-center bg-CustomGray`}
      >
        <img className="mb-7" src="/img/logo.svg" alt="logo" />
        {children}
      </div>
    </div>
  );
};

export default OnboardingContainer;
