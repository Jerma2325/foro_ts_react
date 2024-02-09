import { FC, useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const GoUpBtn: FC = () => {
  const [isVisable, setIsVisable] = useState(false);
  const [fadeClass, setFadeClass] = useState("");

  function scrollFunction() {
    if (window.pageYOffset > 300) {
      setIsVisable(true);
      setFadeClass("fadeIn");
    } else {
      setIsVisable(false);
      setFadeClass("fadeOut");
    }
  }

  function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <button
      className={`go-up-btn ${fadeClass}`}
      onClick={topFunction}
    >
      <AiOutlineArrowUp />
    </button>
  );
};

export default GoUpBtn;
