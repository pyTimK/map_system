import MyHeader from "@/components/custom/MyHeader";
import MyMap from "@/components/custom/MyMap";
import SettingsIcon from "@/components/svg/icon/SettingsIcon";
import { createContext, useContext, useEffect, useState } from "react";
import { PagesWrapperContext } from "./PagesWrapper";
import ExitIcon from "@/components/svg/icon/ExitIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCalculateDivHeight } from "@/hooks/useCalculateDivHeight";
import ImportButton from "@/components/custom/ImportButton";
import DashboardPage from "./DashboardPage";
import ImportPage from "./ImportPage";

export enum Page {
  Dashboard,
  Map,
  Import,
}

const MainPageContext = createContext({
  page: Page.Dashboard,
  setPage: {} as React.Dispatch<React.SetStateAction<Page>>,
});

interface MainPageInterface {}
const MainPage: React.FC<MainPageInterface> = () => {
  //! GET DATA
  const { user, setShowSignIn } = useContext(PagesWrapperContext);

  const [page, setPage] = useState(Page.Dashboard);

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
    (sourceHeight) => `calc(100vh - ${sourceHeight}px)`,
    [page]
  );

  return (
    <MainPageContext.Provider value={{ page, setPage }}>
      {/* HEADER */}
      <MyHeader ref={sourceRef}>
        <div className="flex items-center gap-10">
          {/* NOT ADMIN */}
          {user === null && (
            <SettingsIcon onClick={() => setShowSignIn(true)} />
          )}

          {/* ADMIN */}
          {user !== null && <ExitIcon onClick={() => signOut(auth)} />}

          <Tab name="Dashboard" page={Page.Dashboard} />
          <p className="text-xl select-none">|</p>
          <Tab name="Map" page={Page.Map} />

          {/* ADMIN */}
          {user !== null && (
            <div className="flex items-center gap-10">
              <p className="text-xl select-none">|</p>
              <Tab name="Import" page={Page.Import} />
            </div>
          )}
        </div>
      </MyHeader>

      {/* CONTENT */}
      {page === Page.Dashboard && <DashboardPage />}
      {page === Page.Map && <MyMap ref={targetRef} />}
      {page === Page.Import && <ImportPage />}
    </MainPageContext.Provider>
  );
};

interface TabInterface {
  name: string;
  page: Page;
}

const Tab: React.FC<TabInterface> = ({ name, page }) => {
  const { setPage } = useContext(MainPageContext);

  return (
    <p
      className="text-xl  cursor-pointer select-none "
      onClick={() => setPage(page)}
    >
      {name}
    </p>
  );
};

export default MainPage;
