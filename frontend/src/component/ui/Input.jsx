export const Input = ({ type, placeholder }) => {
  return (
    <input
      className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
      type={type}
      placeholder={placeholder}
    />
  );
};
