export default function LeftContent() {
  return (
    <div className="bg-white pt-24">
      <div className="flex justify-between gap-4 mx-auto">
        <div className="flex flex-col items-center">
          <h3 className="lg:text-xl font-semibold text-sm text-gray-500">Friends</h3>
          <h3 className="font-bold text-sm">455</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="lg:text-xl text-sm font-semibold text-gray-500">Followers</h3>
          <h3 className="font-bold text-sm">855</h3>
        </div>
      </div>
    </div>
  );
}
