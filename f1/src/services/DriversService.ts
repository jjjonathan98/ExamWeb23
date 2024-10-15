import axios from "axios";
import { IDrivers } from "../interfaces/IDrivers";

const DriversService = (() => {
  const driversController = "http://localhost:5089/api/drivers";
  const imageUploadController = "http://localhost:5089/api/imageupload";

  // Fetches all drivers from the API.
  const getAll = async (): Promise<IDrivers[]> => {
    try {
      const result = await axios.get<IDrivers[]>(driversController);
      return result.data;
    } catch (err) {
      console.error("Failed to contact DriversController");
      throw err;
    }
  };

  // Fetches drivers by id.
  const getById = async (id: number): Promise<IDrivers> => {
    try {
      const result = await axios.get<IDrivers>(`${driversController}/${id}`);
      return result.data;
    } catch (err) {
      console.error(`Failed to fetch driver with ID ${id}`);
      throw err;
    }
  };

  // Fetches drivers by nationality.
  const getByNationality = async (nationality: string): Promise<IDrivers[]> => {
    try {
      const result = await axios.get<IDrivers[]>(
        `${driversController}/GetByNationality/${nationality}`
      );
      return result.data;
    } catch (err) {
      console.error(`Failed to fetch drivers with nationality ${nationality}`);
      throw err;
    }
  };

  // Updates driver data of a driver.
  const putDrivers = async (driversToUpdate: IDrivers): Promise<void> => {
    try {
      const result = await axios.put(driversController, driversToUpdate);
      console.log("Result of updating driver:", result);
    } catch (err) {
      console.error("Failed to update driver", err);
      throw err;
    }
  };

  // Adds a new driver and their image.
  const postDrivers = async (
    newDrivers: IDrivers,
    image: File
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      // Adds the new driver to the API.
      const result = await axios.post(driversController, newDrivers);
      console.log("Result of adding new driver:", result);

      // Uploads the image of the new driver.
      const resultImageUpload = await axios.post(
        imageUploadController,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Result of image upload:", resultImageUpload);
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  // Deletes a driver by id.
  const deleteDrivers = async (id: number): Promise<boolean> => {
    try {
      const result = await axios.delete(`${driversController}/${id}`);
      console.log("Result of deleting driver:", result);
      return true;
    } catch (error) {
      console.error("Failed to delete driver", error);
      throw error;
    }
  };

  // Uploads image to the server.
  const uploadImage = async (formData: FormData): Promise<any> => {
    try {
      const result = await axios.post(imageUploadController, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  // return all the functions to be used in the components
  return {
    getAll,
    getById,
    getByNationality,
    postDrivers,
    putDrivers,
    deleteDrivers,
    uploadImage,
  };
})();

export default DriversService;
