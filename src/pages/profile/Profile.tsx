import ProfileChange from "./ProfileChange";
import ChangePassword from "./ChangePassword";

const Profile : React.FC = () => {
  return (
    <div className="relative z-2 bg-grey flex flex-col w-full h-full items-center justify-center max-w-4xl mx-auto gap-10 outline outline-12 outline-textYellow rounded-xl">
      <ProfileChange />
      <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />
      <ChangePassword />
    </div>
  );
};

export default Profile;
