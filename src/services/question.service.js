import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://ithub-quiz-platform.herokuapp.com";

class QuestionService {

    getQuizQuestionsUser(quizId){
        return  axios
            .get(API_URL + `/api/v1/quiz/${quizId}/principal`, { headers: authHeader() }).then(res => { return res.data.result })
    }

    getQuizQuestionsAdmin(quizId) {
        return  axios
            .get(API_URL + `/api/v1/quiz/${quizId}/questions`, { headers: authHeader() }).then(res => { return res.data.result });
    }

    createQuizQuestion (quizId, name, answers){
        return  axios
            .post(API_URL + `/api/v1/quiz/question`, {
                quizId: quizId,
                name: name,
                answers: JSON.stringify(answers)
            }, { headers: authHeader() }).then(res => { return res.data.result })
    }

    updateQuizQuestion(questionId, quizId, name, answers){
        return  axios
            .put(API_URL + `/api/v1/quiz/question/${questionId}`, {
                questionId: questionId,
                quizId: quizId,
                name: name,
                answers: JSON.stringify(answers)
            }, { headers: authHeader() }).then(res => { return res.data.result })
    }

    deleteQuizQuestion(id){
        return  axios
            .delete(API_URL + `/api/v1/quiz/question/${id}`, {headers: authHeader()}).then(res => {
                return res.data.result
            })
    }
}

export default new QuestionService();
