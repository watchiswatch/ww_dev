interface SubmitButtonProps {
  title: string;
  color: string;
  textColor: string;
  width: string;
}

const SubmitButton = ({
  title,
  color,
  textColor,
  width,
}: SubmitButtonProps) => {
  const btnClass = `bg-${color} text-${textColor} w-${width}`;
  return <button className={btnClass}>{title}</button>;
};

export default SubmitButton;
