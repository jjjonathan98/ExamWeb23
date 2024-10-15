import { useContext, useEffect, useState } from "react";
import DriversItem from "./DriversItem";
import { DriversContext } from "../../contexts/DriversContext";

// Drivers list component displays all drivers and a search input field to filter drivers by nationality.
const DriversList = () => {
  const { drivers } = useContext(DriversContext);
  const [searchNationality, setSearchNationality] = useState("");

  const handleSearchDriver = (e) => {
    setSearchNationality(e.currentTarget.value.toLowerCase());
  };

  const getDriversJSX = () => {
    const filteredDrivers = drivers.filter((driver) =>
      driver.nationality.toLowerCase().includes(searchNationality)
    );

    return filteredDrivers.map((driver, i) => (
      <DriversItem
        key={i}
        name={driver.name}
        image={driver.image}
        id={driver.id}
        age={driver.age}
        nationality={driver.nationality}
      />
    ));
  };

  return (
    <section className="mt-5 mb-5 container">
      <div className="card bg-dark">
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by nationality"
              onChange={handleSearchDriver}
            />
          </div>
          <h3 className="card-title text-light mb-4">Our drivers</h3>
          <p className="text-light mb-3">Amount of drivers: {drivers.length}</p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
            {getDriversJSX()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriversList;
