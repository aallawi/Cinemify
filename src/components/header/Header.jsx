import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CgMenu, CgClose } from "react-icons/cg";
import logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [term, setTerm] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const controlNavbar = () => {
    // console.log("window.scrollY", window.scrollY);
    // console.log("lastScrollY", lastScrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  const searchTermHandler = (event) => {
    if (event.key === "Enter" && term.length > 0) {
      navigate(`/search/${term}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header
      className={`fixed w-full h-[60px] z-[99] transition-all duration-1000 select-none text-black
    ${
      show === "top"
        ? "bg-lightBalck"
        : show === "show"
        ? "bg-white"
        : show === "hide"
        ? "translate-y-[-60px]"
        : ""
    }`}
    >
      <div className="(( w-full max-w-[1200px] mx-auto px-[20px] )) flex justify-between items-center">
        {/* logo */}
        <div
          className="flex items-center gap-[8px]"
          onClick={() => navigate("/")}
        >
          <img className="w-[50px] h-[50px]" src={logo} alt="logo" />
          <span className="logo text-[40px] text-secondary">Cinemify</span>
        </div>

        {/* Menu */}
        <ul
          className={`${
            mobileMenu
              ? "absolute left-0 top-[60px] w-full h-auto py-[10px] flex flex-col gap-[10px] justify-start px-[20px] transition-all duration-300 bg-white text-black"
              : "hidden md:flex"
          } `}
        >
          <li
            className="mx-[15px] font-[500] cursor-pointer text-[20px] transition-all duration-300 hover:text-secondary"
            onClick={() => navigationHandler("Movies")}
          >
            Movies
          </li>
          <li
            className="mx-[15px] font-[500] cursor-pointer text-[20px] transition-all duration-300 hover:text-secondary"
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li
            className={`${
              mobileMenu
                ? "hidden"
                : "mx-[15px] font-[500] cursor-pointer text-[24px] transition-all duration-300 hover:text-secondary mt-[5px]"
            } `}
            onClick={openSearch}
          >
            <IoIosSearch />
          </li>
        </ul>

        {/* Mobile */}
        <ul className=" flex items-center md:hidden">
          <li
            className="mx-[10px] font-[500] cursor-pointer text-[24px] transition-all duration-300 hover:text-secondary"
            onClick={openSearch}
          >
            <IoIosSearch />
          </li>
          {mobileMenu ? (
            <li
              className="mx-[10px] font-[500] cursor-pointer text-[24px] transition-all duration-300 hover:text-red-500"
              onClick={() => setMobileMenu(false)}
            >
              <CgClose />
            </li>
          ) : (
            <li
              className="mx-[10px] font-[500] cursor-pointer text-[24px] transition-all duration-300 hover:text-secondary"
              onClick={openMobileMenu}
            >
              <CgMenu />
            </li>
          )}
        </ul>

        {/* Search */}
        {showSearch && (
          <div className="absolute left-0 top-[60px] w-full bg-white p-[10px] transition-all duration-1000">
            <div className="(( w-full max-w-[1200px] mx-auto px-[20px] )) flex justify-between items-center">
              <input
                className="search_input outline-none border-none py-[5px]"
                type="text"
                onChange={(e) => setTerm(e.target.value)}
                onKeyUp={searchTermHandler}
                placeholder="Search for a movie or tv show...."
              />
              <CgClose
                className="w-[50px] cursor-pointer text-[24px] ransition-all duration-300 hover:text-red-500"
                onClick={() => setShowSearch(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
