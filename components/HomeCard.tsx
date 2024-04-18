import Link from "next/link";

const HomeCard = ({ title, link }) => {
  return (
    <Link
      href={link}
      className="w-full font-medium bg-gray-100 p-5 text-xl text-center rounded-md border-solid border-2 border-gray-300 "
    >
      {title}
    </Link>
  );
};

export default HomeCard;
