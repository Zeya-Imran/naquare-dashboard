const Toggle = ({ status }) => {
  //toggale
  return (
    <label
      className={`relative inline-block w-[40px] h-[15px] rounded-lg ${
        status ? "bg-blue-400" : "bg-gray-400"
      }`}
    >
      <input type="checkbox" className="opacity-0" />
      <span
        className={` w-[20px] h-[20px] absolute rounded-full right-0  ${
          status
            ? "bg-blue-500 shadow-md translate-y-[-15%]"
            : "bg-white shadow-md translate-y-[-18%]"
        }`}
      ></span>
    </label>
  );
};

export default Toggle;
