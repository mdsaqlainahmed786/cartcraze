
import { CiLogout } from "react-icons/ci";

interface className {
  className: string;
  username: string;
  email: string;
  onLogOut: () => void;
}
function UserProfile({ className, username, email, onLogOut }: className) {
  return (
    <div className="block group relative">
      <div className="cursor-pointer bg-black text-white flex justify-center text-[20px] min-w-9 h-9 rounded-full text-center px-1 mt-1 mx-2">
        {username[0]?.toUpperCase()}
      </div>
      <div className={className}>
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="bg-black text-white flex justify-center text-[20px] min-w-9 h-9 rounded-full text-center px-1 mt-1 mx-2">
              {username[0]?.toUpperCase()}
            </div>
            <div className="flex flex-col mt-4 -space-y-2">
              <span className="text-xl font-bold">Hi,</span>
              <span className="font-semibold">{username}</span>
              <span className="text-sm pb-10">{email}</span>
            </div>
          </div>
          <div className="w-full -mt-5 px-5">
            <div
              onClick={onLogOut}
              className="flex justify-center w-full items-center bg-gray-800 text-white rounded-lg hover:bg-black cursor-pointer"
            >
              <CiLogout />
              <span className="mx-2">logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
