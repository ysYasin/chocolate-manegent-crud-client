import React from "react";

const Header = () => {
  return (
    <div>
      <div
        style={{
          width: "50%",
          margin: "auto",
          textAlign: "center",
          padding: "5px",
          color: "white",
          background:
            " linear-gradient(110.3deg, rgb(238, 179, 123) 8.7%, rgb(216, 103, 77) 47.5%, rgb(114, 43, 54) 89.1%)",
        }}
      >
        <h2 className="text-3xl text-white font-semibold font-sans py-4">
          Chocolate Management System
        </h2>
      </div>
    </div>
  );
};

export default Header;
