import { useState, useEffect } from "react";
import JoinButton from "../JoinButton";
import LogoComplete from "../LogoComplete";
import SearchBar from "../SearchBar";
import { FaEllipsisH } from "react-icons/fa";
import SmallTriangle from "../SmallTriangle";
import DropdownElements from "../DropdownElements";
import useScroll from "../../hooks/useScroll";
import useScreensize from "../../hooks/useScreensize";
import LoginModal from "../LoginModal"; // Adjust the import path
import Modal from "react-modal";
import {Link} from "react-router-dom";

Modal.setAppElement("#root");

function Navbar({ handleMobileNav }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isUserExist, setUserExist] = useState(localStorage.getItem("user"));

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const [onHoverExplore, setOnHoverExplore] = useState(false);
  const [onHoverDot, setOnHoverDot] = useState(false);
  // This is a custom hook that returns the scroll position in the y-axis
  const { scrollYPosition } = useScroll();

  // based on the scroll postion the searchBar is to be displayed on the navbar
  const [showSearchBar, setShowSearchBar] = useState(false);

  // to check screensize to know when to display the desktop nav
  // need to remove desktop nav from dom because it is affecting :last-child css property
  // even when hidden thus it needs to be removed from the Dom entirely
  const [largeScreen, setLargeScreen] = useState("");
  const { width } = useScreensize();

  function handleExploreHover(state) {
    setOnHoverExplore(state);
  }
  function handleDotHover(state) {
    setOnHoverDot(state);
  }

  useEffect(() => {
    // once scroll postion gets to this point the showSearchBar is set to true
    if (scrollYPosition >= 105) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }, [scrollYPosition]);

  useEffect(() => {
    if (width >= 1024) {
      setLargeScreen(true);
    } else {
      setLargeScreen(false);
    }
    return () => {
      null;
    };
  }, [width]);

  function logout(){
    localStorage.removeItem("user");
    setUserExist(false);
  }

  const handleChildData = (data) => {
    console.log('data',data)
    setUserExist(data);
  };


  return (
    <nav
      className={
        "main-nav-bar fixed top-0 left-0 right-0 flex items-center px-[16.1px] min-h-[66px] z-50 " +
        (showSearchBar ? "bg-primary-black" : "bg-transparent")
      }
    >
      <LogoComplete />
      {/* the searchBar postion is to be maintained so as to prevent UI shift thus base
        on the show prop the style in the searchBar component will be set to display: none */}
      <SearchBar show={showSearchBar} />

      <div className="flex">
        <button
          data-collapse-toggle="mobile-menu-3"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none dark:text-gray-400"
          aria-controls="mobile-menu-3"
          aria-expanded="false"
          onClick={handleMobileNav}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Larger display */}
      {largeScreen && (
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-3"
        >
          <ul className="flex flex-col mt-4 items-center lg:flex-row lg:gap-10 lg:mt-0 ">
            {isUserExist ? (
              <>
                <li className="hover:opacity-90 hover:-translate-y-[1px]">
                  <a className="block text-white text-[17px] font-semibold px-7 py-[6px] rounded-[4px] bg-primary-green">
                    {JSON.parse(localStorage.getItem("user"))?.email}
                  </a>
                </li>
                <li className="hover:opacity-90 hover:-translate-y-[1px]">
                  <a onClick={() => logout()} className="block text-white text-[17px] font-semibold px-7 py-[6px] rounded-[4px] bg-primary-green">
                    Logout
                  </a>
                </li>

                <li className="hover:opacity-90 hover:-translate-y-[1px]">
                  <Link to="/download" > <a  className="block text-white text-[17px] font-semibold px-7 py-[6px] rounded-[4px] bg-primary-green">
                    Downloaded 
                  </a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li
                  onClick={openLoginModal}
                  className="hover:opacity-90 hover:-translate-y-[1px]"
                >
                  <a className="block text-white text-[17px] font-semibold px-7 py-[6px] rounded-[4px] bg-primary-green">
                    Login
                  </a>
                </li>
                <li className="hover:opacity-90 hover:-translate-y-[1px]">
                  <a
                    href="#"
                    className="block text-white text-[17px] font-semibold px-7 py-[6px] rounded-[4px] bg-primary-green"
                  >
                    Create Account
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      {isLoginModalOpen ? (
        <LoginModal
          handleClose={closeLoginModal}
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onChildData={handleChildData}
        />
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
