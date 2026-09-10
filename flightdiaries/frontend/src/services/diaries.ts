import axios from "axios";
import type { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {
	const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);

	return response.data;
};

const createDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
	const response = await axios.post<DiaryEntry>(baseUrl, newDiary);

	return response.data;
};

export default { 
	getAllDiaries,
	createDiary
};
