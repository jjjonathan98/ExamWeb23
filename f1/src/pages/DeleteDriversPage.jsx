import DeleteDrivers from "../components/drivers/DeleteDrivers";
import DriversListCompact from "../components/drivers/DriversListCompact";

// Page component for deleting drivers and displaying a compact list of drivers.
const DeleteDriversPage = () => {
  return (
    <>
      <DeleteDrivers />
      <DriversListCompact />
    </>
  );
};

export default DeleteDriversPage;
