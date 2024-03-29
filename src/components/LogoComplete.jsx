
function LogoComplete() {
  return (
    <a href="/" className="flex items-center">

      {/* if Not on medium screen size below; display text */}
      <span className="self-center text-[19px] ml-[14px] font-semibold whitespace-nowrap hidden lg:inline-block text-white hover:opacity-90">
        Homepage
      </span>
    </a>
  );
}

export default LogoComplete;
