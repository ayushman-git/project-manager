import Image from "next/image";

const Status = ({ active, changeActiveStatus }) => {
  return (
    <Image
      src={active ? "/images/star-fill.svg" : "/images/star.svg"}
      width={20}
      height={20}
      onClick={changeActiveStatus}
    />
  );
};

export default Status;
