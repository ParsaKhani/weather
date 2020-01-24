import React from "react";

const Header = () => {
  return (
    <div>
      <div className="py-3" style={{ backgroundColor: "#5f98d5" }}>
        <div className="container d-flex justify-content-center">
          <div>
            <h1 className="text-capitalize text-light">
              <i
                className="fas fa-sun text-yellow mr-3"
                style={{ fontSize: "2.5rem", color: "yellow" }}
              />
              weather forecast
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
