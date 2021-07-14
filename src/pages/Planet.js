import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data";
const colors = {
  mercury: "#419ebb",
  venus: "#eda249",
  earth: "#6f2ed6",
  mars: "#d14c32",
  jupiter: "#d83a34",
  saturn: "#cd5120",
  uranus: "#1ec2a4",
  neptune: "#2d68f0",
};

function Planet() {
  const [isActive, setActive] = useState(null);
  const { planet, option } = useParams();
  const planetData = data.find((i) => i.name.toLowerCase() === planet);
  const { geology, name, overview, radius, revolution, rotation, temperature, structure } =
    planetData;

  useEffect(() => {
    setActive(option);
  }, [option]);

  const MobileOptions = () => {
    return (
      <div className="mobile-options">
        <div className="container">
          <ul>
            <li
              style={{ borderBottomColor: isActive === "overview" && colors[name.toLowerCase()] }}
            >
              <Link
                data-background={name.toLowerCase()}
                style={{ color: isActive === "overview" && "#FFF" }}
                to={`/${name.toLowerCase()}/overview`}
              >
                Overview
              </Link>
            </li>
            <li
              style={{ borderBottomColor: isActive === "structure" && colors[name.toLowerCase()] }}
            >
              <Link
                data-background={name.toLowerCase()}
                style={{ color: isActive === "structure" && "#FFF" }}
                to={`/${name.toLowerCase()}/structure`}
              >
                Internal
              </Link>
            </li>
            <li style={{ borderBottomColor: isActive === "geology" && colors[name.toLowerCase()] }}>
              <Link
                data-background={name.toLowerCase()}
                style={{ color: isActive === "geology" && "#FFF" }}
                to={`/${name.toLowerCase()}/geology`}
              >
                Surface
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <MobileOptions />
      <div className="container">
        <div className="planet">
          <div className="info">
            {isActive === "overview" && (
              <div className="geology">
                <img className="planet__image" src={planetData.images.planet} alt="Mercury" />
              </div>
            )}
            {isActive === "structure" && (
              <div className="geology">
                <img className="planet__image" src={planetData.images.internal} alt="Mercury" />
              </div>
            )}
            {isActive === "geology" && (
              <div className="geology">
                <img className="planet__image" src={planetData.images.planet} alt="Mercury" />
                <img className="geology__image" src={planetData.images.geology} alt="Mercury" />
              </div>
            )}

            <div className="text">
              <div>
                <h1>{name}</h1>
                {isActive === "overview" && <p>{overview.content}</p>}
                {isActive === "structure" && <p>{structure.content}</p>}
                {isActive === "geology" && <p>{geology.content}</p>}

                <div className="source">
                  Source :{" "}
                  <a
                    href={
                      isActive === "overview"
                        ? overview.source
                        : isActive === "structure"
                        ? structure.source
                        : geology.source
                    }
                  >
                    <h4 style={{ display: "inline", marginRight: 8 }}>Wikipedia</h4>
                    <img src={require("../assets/icon-source.svg").default} alt="" />
                  </a>
                </div>
              </div>

              <div className="buttons">
                <Link to={`/${name.toLowerCase()}/overview`}>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: isActive === "overview" && colors[name.toLowerCase()],
                    }}
                    onClick={() => setActive("overview")}
                  >
                    <span className="number">01</span>Overview
                  </button>
                </Link>

                <div className="break" />

                <Link to={`/${name.toLowerCase()}/structure`}>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: isActive === "structure" && colors[name.toLowerCase()],
                    }}
                    onClick={() => setActive("structure")}
                  >
                    <span className="number">02</span>Internal Structure
                  </button>
                </Link>
                <div className="break" />
                <Link to={`/${name.toLowerCase()}/geology`}>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: isActive === "geology" && colors[name.toLowerCase()],
                    }}
                    onClick={() => setActive("geology")}
                  >
                    <span className="number">03</span>Surface Geology
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="item">
              <h4 className="heading">Rotation Time</h4>
              <h2 className="data">{rotation}</h2>
            </div>
            <div className="item">
              <h4 className="heading">Revolution Time</h4>
              <h2 className="data">{revolution}</h2>
            </div>
            <div className="item">
              <h4 className="heading">Radius</h4>
              <h2 className="data">{radius}</h2>
            </div>
            <div className="item">
              <h4 className="heading">Average Temp.</h4>
              <h2 className="data">{temperature}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Planet;
