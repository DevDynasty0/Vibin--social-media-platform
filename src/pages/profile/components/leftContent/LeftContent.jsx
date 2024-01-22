export default function LeftContent() {
  return (
    <div className="bg-white pt-24">
      <div className="flex justify-between w-8/12 mx-auto">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-500">Friends</h3>
          <h3 className="font-bold">455</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-500">Followers</h3>
          <h3 className="font-bold">855</h3>
        </div>
      </div>
    </div>
  );
}
