import DriversList from "../components/drivers/DriversList";
import AddDrivers from "../components/drivers/AddDrivers";
import EditDrivers from "../components/drivers/EditDrivers";

// Page component for managing drivers, including adding, editing, and listing drivers.
const DriversAdminPage = () => {
  return (
    <>
      <AddDrivers />
      <EditDrivers />
      <DriversList />
    </>
  );
};

export default DriversAdminPage;
