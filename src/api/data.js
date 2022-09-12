import * as api from './api.js';

const host = 'https://parseapi.back4app.com';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer(className, userId) {
    return {
        __type: 'Pointer',
        'className': className,
        objectId: userId
    }
};

function addOwner(object) {
    const userId = sessionStorage.getItem('userId');
    const result = Object.assign({}, object);
    result.owner = createPointer('_User', userId);
    return result;
}


// Quiz Collection
export async function createQuiz(quiz) {
    const body = addOwner(quiz);

    return await api.post(host + '/classes/Quiz', body);
}

export async function getQuizes() {
    return await api.get(host + '/classes/Quiz');
}

export async function getQuizById(id) {
    return await api.get(host + '/classes/Quiz/' + id + '?include=owner');
}

export async function deleteQuizById(id) {
    return await api.del(host + '/classes/Quiz/' + id);
}

export async function updateQuizById(id, data) {
    return await api.put(host + '/classes/Quiz/' + id, data);
}


// Question Collection

export async function getQuestionsByQuizId(quizId) {
    const query = JSON.stringify({ quiz: createPointer('Quiz', quizId) });
    const response = await api.get(host + '/classes/Question?where=', encodeURIComponent(query));
    return response.result;
    // Add query string to url with 
}

export async function createQuestion(quizId, question) {
    const body = addOwner(question);
    question.quiz = createPointer('Quiz', quizId);
    return api.post(host + '/classes/Question', body);
}

export async function updateQuestion(id, question) {
    return await api.put(host + '/classes/Question' + id, question);
}

export async function deleteQuestion(id, question) {
    return await api.del(host + '/classes/Question' + id);
}


