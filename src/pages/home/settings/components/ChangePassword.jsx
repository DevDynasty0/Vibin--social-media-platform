import { useForm } from "react-hook-form";


const ChangePassword = () => {

const { register, handleSubmit } = useForm();

    const handlePasswordChange = (data) => {
        console.log("Password field data", {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        });
      };

    return (
        <form onSubmit={handleSubmit(handlePasswordChange)}>
        <div>
          <h1 className="font-medium">
            Change Password
          </h1>

          <div className="flex gap-4">
            {/* Old Password */}
            <div className="relative my-2 w-[90%] md:w-[35%]">
              <input
                required
                id="oldPassword"
                aria-label="Old Password"
                className="block rounded-t-lg px-2 pb-2 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full"
                type="password"
                {...register("oldPassword", { required: true })}
                placeholder=" "
              />
              <label
                htmlFor="oldPassword"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Old Password
              </label>
            </div>

            {/* New Password */}
            <div className="relative my-2 w-[90%] md:w-[35%]">
              <input
                required
                id="newPassword"
                aria-label="New Password"
                className="block rounded-t-lg px-2 pb-2 pt-5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0E4749] peer w-full"
                type="password"
                {...register("newPassword", { required: true })}
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#0E4749] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                New Password
              </label>
            </div>
          </div>

          {/* Add a button to submit the form */}
          <button
            className="mt-1 font-medium px-3 py-1 shadow rounded"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    );
};

export default ChangePassword;