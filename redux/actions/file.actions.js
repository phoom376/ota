import axios from "axios";

export const FETCH_FILES_DATA = "FETCH_FILES_DATA";

const server = "http://localhost:4008/v1";
// const server = "http://home420.trueddns.com:57527/v1";

export const fetchFilesData = () => async (dispatch) => {
  const files = await axios.get(`${server}/getFileData`);

  return dispatch({ type: FETCH_FILES_DATA, payload: files.data });
};
