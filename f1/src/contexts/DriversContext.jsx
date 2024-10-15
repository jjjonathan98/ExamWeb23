import React, { createContext, useState, useEffect } from "react";
import DriversService from "../services/DriversService";

// Create a context
export const DriversContext = createContext(null);

// Create a provider component that will pass the drivers context and functions down to all children
export const DriversProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the drivers from the API when the component is mounted
  useEffect(() => {
    getDrivers();
  }, []);

  // Function to get all drivers from the API
  const getDrivers = async () => {
    try {
      const driversData = await DriversService.getAll();
      setDrivers(driversData);
    } catch (err) {
      setError("Failed to get drivers");
      console.error(err);
    }
  };

  // Function to get a single driver by ID
  const getById = async (id) => {
    try {
      const driver = await DriversService.getById(id);
      return driver;
    } catch (err) {
      setError(`Failed to get driver with ID ${id}`);
      console.error(err);
    }
  };

  // Function to create a new driver
  const createDrivers = async (newDriver, image) => {
    try {
      await DriversService.postDrivers(newDriver, image);
      getDrivers(); // Refresh the drivers list
    } catch (err) {
      setError("Failed to add driver");
      console.error(err);
    }
  };

  // Function to edit a driver
  const editDrivers = async (driversToUpdate) => {
    try {
      await DriversService.putDrivers(driversToUpdate);
      getDrivers();
    } catch (err) {
      setError("Failed to edit the driver");
      console.error(err);
    }
  };

  // Function to delete a driverbased on ID
  const deleteDrivers = async (id) => {
    try {
      const success = await DriversService.deleteDrivers(id);
      if (success) {
        getDrivers();
        return true;
      } else {
        setError("Failed to delete the driver");
        return false;
      }
    } catch (error) {
      setError("Failed to delete the driver");
      console.error(error);
    }
  };

  // return the provider with the value of the states and functions
  return (
    <DriversContext.Provider
      value={{
        drivers, // The drivers state, holding list of drivers
        error, // The error state, holding error messages

        // Functions to interact with the drivers
        getDrivers,
        getById,
        createDrivers,
        editDrivers,
        deleteDrivers,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
};

export default DriversProvider;
