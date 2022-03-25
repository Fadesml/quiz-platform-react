import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://ithub-quiz-platform.herokuapp.com";

class QuizService {

    getQuiz = async () => {
        return await axios.get(API_URL + `/api/v1/quiz`, { headers: authHeader() });
    }

    getQuizById = async (id) =>{
        return  await axios.get(API_URL + `/api/v1/quiz/${id}`, { headers: authHeader() });
    }

    createQuiz = async(maxPassCount, name) => {
        return  await axios.post(API_URL + `/api/v1/quiz`, {
                maxPassCount: maxPassCount,
                name: name
            }, { headers: authHeader() });
    }

    updateQuiz = async (id, maxPassCount, name) => {
        return  await axios.put(API_URL + `/api/v1/quiz/${id}`, {
                maxPassCount: maxPassCount,
                name: name
            }, { headers: authHeader() })
    }

    deleteQuiz = async (id) => {
        return await axios.delete(API_URL + `/api/v1/quiz/${id}`, {headers: authHeader()})
    }

    getPassed= async () => {
        return  await axios.get(API_URL + `/api/v1/quiz/passed`, { headers: authHeader() });
    }

}

export default new QuizService();
