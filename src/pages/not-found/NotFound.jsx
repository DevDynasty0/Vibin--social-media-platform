import NotFoundImage from "../../assets/notfound.png";

function NotFound() {
  return (
    <div className="flex items-center justify-center relative">
      <img
        src={NotFoundImage}
        alt="not found page"
        className="h-screen w-screen"
      />

      <a
        href="/"
        className="absolute bottom-5 lg:bottom-10 bg-[#44A1A0] text-white text-xl lg:text-2xl font-semibold px-2 py-1 lg:px-4 lg:py-2 rounded-full"
      >
        Back To Home
      </a>
    </div>
  );
}

export default NotFound;
