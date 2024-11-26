import { useState, useRef, useEffect } from "react";

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultIndex = 0,
  children,
}) => {
  const [inPageNavIndex, setInPageNavIndex] = useState(defaultIndex);
  let activeTabLineRef = useRef();
  let activeTabButton = useRef();

  const changePageState = (btn, index) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";
    setInPageNavIndex(index);
  };

  useEffect(() => {
    changePageState(activeTabButton.current, defaultIndex);
  }, []);
  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex-nowrap overflow-auto">
        {routes.map((route, index) => {
          return (
            <button
              ref={index == defaultIndex ? activeTabButton : null}
              onClick={(e) => {
                changePageState(e.target, index);
              }}
              key={index}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex === index ? "text-black" : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden" : "")
              }
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>

      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export { InPageNavigation };
