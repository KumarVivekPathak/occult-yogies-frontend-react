import { TailSpin } from "react-loader-spinner";

const CustomLoader: React.FC = () => {
  return (
    <>
      <TailSpin height="30" width="30" color={"purple"} ariaLabel="loading" />
      Loading...
    </>
  );
};

export default CustomLoader;
