export const Badge = ({ rank }) => {
  return (
    <div className="flex justify-center items-center bg-white p-1 md:h-10 md:w-10 h-7 w-7 rounded-lg md:text-xl text-md text-center">
      {rank}
    </div>
  );
};
