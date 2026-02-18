import React, { useState } from "react";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Logo2 from "../../assets/Logo2.png";
import Chakra from "../../assets/AstroChakr.png";
import "./Login.css";

const Login : React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-screen font-roboto leading-normal tracking-normal flex-col-reverse md:flex-row relative overflow-hidden bg-gradient-to-r from-darkPurple via-[#7a1f40] via-[#7f263c] via-[#761a41] via-[#933c33] via-[#974233] to-[#ecb946]">
    
    <section className="flex flex-1 items-center justify-center">
      <img
        src={Logo2}
        alt="logo"
        className="w-full h-full object-contain drop-shadow-2xl max-w-[500px] max-h-[500px] md:max-w-full md:max-h-full"
      />
    </section>
  
    <section className="relative flex flex-1 items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="relative flex items-center justify-center max-h-[90vh] max-w-[90vh] h-[90vh] w-[90vh] md:h-[90vh] md:w-[70vh] lg:w-[85vh] lg:h-[85vh] xl:w-[100vh] xl:h-[100vh] rounded-full z-10">

        <img
          src={Chakra}
          alt="Decorative spinning background"
          className="absolute inset-0 p-0 w-full h-full rounded-full object-cover slow-spin z-0"
        />
  
          <div className="flex items-center justify-center z-10 ">
            {showForgotPassword ? (
              <ForgotPassword onGoToSignIn={() => setShowForgotPassword(false)} />
            ) : (
              <SignIn onForgotPassword={() => setShowForgotPassword(true)} />
            )}
          </div>
      </div>
    </section>
  </div>
  );
};

export default Login;
