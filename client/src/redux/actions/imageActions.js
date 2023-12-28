import axios from "axios";
import {
  IMAGE_SAVE_REQUEST,
  IMAGE_SAVE_SUCCESS,
  IMAGE_SAVE_FAILURE,
} from "./type";

const url = "https://image-editor-hgzh.onrender.com" || "http://localhost:3000";

export const ImageUploader = (formData, imageName) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_SAVE_REQUEST });

    // Append imageName as a field in the formData
    formData.append("imageName", imageName);

    const { data } = await axios.post(`${url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(data);

    dispatch({ type: IMAGE_SAVE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: IMAGE_SAVE_FAILURE, payload: error.response.data });
  }
};
