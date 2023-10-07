import Header from "@/components/custom/Header";
import MyMap from "@/components/custom/MyMap";
import SettingsIcon from "@/components/svg/icon/SettingsIcon";
import { useContext, useEffect } from "react";
import { PagesWrapperContext } from "./PagesWrapper";
import ExitIcon from "@/components/svg/icon/ExitIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ImportIcon from "@/components/svg/icon/ImportIcon";
import { motion } from "framer-motion";
import { useCalculateDivHeight } from "@/hooks/useCalculateDivHeight";

interface MainPageInterface {}
const MainPage: React.FC<MainPageInterface> = () => {
  //! GET DATA
  const { user, setShowSignIn, setShowImport, barangayData } =
    useContext(PagesWrapperContext);

  //! DISABLE BACK DEFAULT BEHAVIOUR
  useEffect(() => {
    // Listen for the back button click
    const handleBackButton = (e: PopStateEvent) => {
      window.history.pushState(null, "", window.location.href);
      console.log("BACK TRIGGERED");
      e.preventDefault();
    };

    window.history.pushState(null, "", window.location.href);
    // window.onpopstate = function () {
    //   window.history.pushState(null, "", window.location.href);
    // };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  //! AUTOMATIC MAP HEIGHT
  const [sourceRef, targetRef] = useCalculateDivHeight(
    (sourceHeight) => `calc(100vh - ${sourceHeight}px)`
  );

  return (
    <div>
      {/* HEADER */}
      <Header ref={sourceRef}>
        {user === null ? (
          <SettingsIcon onClick={() => setShowSignIn(true)} />
        ) : (
          <div
            className="flex items-center gap-10"
            onClick={() => setShowImport(true)}
          >
            <ExitIcon onClick={() => signOut(auth)} />
            <motion.div
              className="flex items-center border border-black rounded-lg pl-1 pr-3 cursor-pointer select-none"
              whileTap={{ scale: 0.9 }}
            >
              <div className="scale-50">
                <ImportIcon />
              </div>
              <p className="">Import Data</p>
            </motion.div>
          </div>
        )}
      </Header>

      {/* CONTENT */}
      <MyMap ref={targetRef} />
    </div>
  );
};

export default MainPage;
