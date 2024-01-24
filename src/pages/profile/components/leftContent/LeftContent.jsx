export default function LeftContent() {
  return (
    <div className="bg-white pt-8 md:pt-16 lg:pt-24">
      <div className="flex lg:justify-between bg-white gap-4 lg:ml-0 ml-10 mx-auto">
        <div className="flex flex-col items-center">
          <h3 className="lg:text-xl font-semibold text-[10px] text-gray-500">Friends</h3>
          <h3 className="font-bold text-[10px] md:text-sm ">455</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="lg:text-xl text-[10px] font-semibold text-gray-500">Followers</h3>
          <h3 className="font-bold text-[10px] md:text-sm">855</h3>
        </div>
      </div>
    </div>
  );
}
