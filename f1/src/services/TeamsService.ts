import axios from "axios";
import { ITeams } from "../interfaces/ITeams";

const TeamsService = (() => {
  const teamsController = "http://localhost:5089/api/teams";
  const imageUploadController = "http://localhost:5089/api/imageupload";
  const imageUrl = "http://localhost:5089/images";

  // Get the image url.
  const getImageUrl = (): string => {
    return imageUrl;
  };

  // Get all teams.
  const getAll = async (): Promise<ITeams[]> => {
    try {
      const result = await axios.get<ITeams[]>(teamsController);
      return result.data;
    } catch (err) {
      console.log("Failed to contact TeamsController");
      return [];
    }
  };

  // Get team by id.
  const getById = async (id: number): Promise<ITeams> => {
    const result = await axios.get<ITeams>(`${teamsController}/${id}`);
    return result.data;
  };

  const putTeams = async (teamsToUpdate: ITeams): Promise<void> => {
    const result = await axios.put(teamsController, teamsToUpdate);
    console.log(result);
    // If bad example: { message: "It went bad" } / false.
  };

  // Post new team data.
  const postTeams = async (newTeams: ITeams, image: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      // Post new team data.
      await axios.post(teamsController, newTeams);

      // Upload the team image.
      await axios({
        url: imageUploadController,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Failed to add new team or upload image", error);
    } finally {
      formData.delete("file"); // Clean up the form data.
    }
  };

  // Delete team and associated image by id.
  const deleteTeams = async (id: number): Promise<boolean> => {
    try {
      const team = await axios.get<ITeams>(`${teamsController}/${id}`);
      if (!team.data) {
        console.log(`Team with ID ${id} not found`);
        return false;
      }

      const response = await axios.delete(
        `${imageUploadController}/${team.data.image}`
      );
      if (!response || response.status !== 200) {
        console.log("Failed to delete image");
        return false;
      }

      const result = await axios.delete(`${teamsController}/${id}`);
      console.log(result);
      return true;
    } catch (error) {
      console.log("Failed to delete team", error);
      return false;
    }
  };

  return {
    getAll,
    postTeams,
    putTeams,
    getById,
    getImageUrl,
    deleteTeams,
  };
})();

export default TeamsService;
