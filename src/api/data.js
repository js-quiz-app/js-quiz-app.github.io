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
    object.owner = createPointer('_User', userId);
}

// TODO: Implement spceific requests!!!!!!

export async function createQuiz(quiz) {

    addOwner(quiz);

    return await api.post(host + '/classes/Quiz', quiz);
}

export async function getQuizes() {
    return await api.get(host + '/classes/Quiz');
}

export async function getQuizById(id) {
    return await api.get(host + '/classes/Quiz/' + id);
}

export async function deleteQuizById(id) {
    return await api.del(host + '/classes/Quiz/' + id);
}

export async function updateQuizById(id, data) {
    return await api.put(host + '/classes/Quiz/' + id, data);
}

