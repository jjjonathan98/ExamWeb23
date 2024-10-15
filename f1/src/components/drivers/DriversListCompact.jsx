import { useContext, useEffect } from "react";
import DriversItemV2 from "./DriversItemV2";
import { DriversContext } from "../../contexts/DriversContext";

// The DriversListCompact component is used to display a list of drivers in a compact format. It uses the DriversItemV2 component to display each driver.
const DriversListCompact = () => {
  const { drivers } = useContext(DriversContext);

  const getDriversJSX2 = () => {
    const driversJSX2 = drivers.map((_drivers, i) => (
      <DriversItemV2
        key={i}
        name={_drivers.name}
        image={_drivers.image}
        id={_drivers.id}
      />
    ));
    return driversJSX2;
    //console.log(driversJSX2);
  };

  return (
    <section className="card bg-dark p-3">
      <h3 className="text-light">Drivers</h3>
      <div className="row row-cols-10">{getDriversJSX2()}</div>
    </section>
  );
};

export default DriversListCompact;
