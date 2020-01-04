import axios from "axios";
import { INote, INewNote } from "../reducers/types";
const baseUrl: string = "/api/v1/notes";

const getAll = async (): Promise<INote[]> => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (note: INewNote): Promise<INote> => {
  const request = await axios.post(baseUrl, { note });
  return request.data;
};

const update = async (note: INewNote, id: number): Promise<INote> => {
  const request = await axios.put(`${baseUrl}/${id}`, { note });
  return request.data;
};

const remove = async (id: number): Promise<any> => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};
export default { getAll, create, update, remove };
