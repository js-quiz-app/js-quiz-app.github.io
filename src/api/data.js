import * as api from './api.js';

const host = 'https://quiz-app-eppr.onrender.com';
api.settings.host = host;


export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests
function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    };
}

function addOwner(object) {
    const userId = JSON.parse(sessionStorage.getItem('user')).objectId;

    const result = Object.assign({}, { ...object, owner: userId });
    return result;
}

// Quiz Collection
export async function getQuizes() {
    const quizes = await api.get(host + '/classes/Quiz');
    const taken = await getSolutionCount(quizes.map(q => q.objectId));
    quizes.forEach(q => q.taken = taken[q.objectId]);
    return quizes;
}

export async function getQuizById(id) {
    return await api.get(host + '/classes/Quiz/' + id);
}

export async function getMostRecent() {
    const quiz = await api.get(host + '/classes/Quiz?order=createdAt&limit=1');
    if (quiz) {
        const taken = await getSolutionCount([quiz[0]?.objectId]) || 0;
        quiz[0].taken = taken[quiz[0].objectId] || 0;
    }
    return quiz;
}

export async function getStats() {
    return (await api.get(host + '/classes/Quiz?count=1&limit=0')).count;
}

export async function createQuiz(quiz) {
    const body = addOwner(quiz);
    return await api.post(host + '/classes/Quiz', body);
}

export async function updateQuiz(id, quiz) {
    return await api.put(host + '/classes/Quiz/' + id, quiz);
}

export async function deleteQuiz(id) {
    return await api.del(host + '/classes/Quiz/' + id);
}

// Question Collection
export async function getQuestionsByQuizId(quizId, ownerId) {
    const query = JSON.stringify({
        quiz: createPointer('Quiz', quizId),
        owner: createPointer('_User', ownerId)
    });
    const response = await api.get(host + '/classes/Question?where=' + encodeURIComponent(query));
    return response;
}

export async function createQuestion(quizId, question) {
    const body = addOwner(question);
    body.quiz = quizId;

    return await api.post(host + '/classes/Question', body);
}

export async function updateQuestion(id, question) {
    return await api.put(host + '/classes/Question/' + id, question);
}

export async function deleteQuestion(id) {
    return await api.del(host + '/classes/Question/' + id);
}


// Solution Collection
export async function getSolutionsByUserId(userId) {
    const query = JSON.stringify({ owner: createPointer('_User', userId) });
    const response = await api.get(host + '/classes/Solution?where=' + encodeURIComponent(query));
    return response;
}

export async function getSolutionsByQuizId(quizId) {
    const query = JSON.stringify({ owner: createPointer('Quiz', quizId) });
    const response = await api.get(host + '/classes/Solution?where=' + encodeURIComponent(query));
    return response.results;
}

export async function submitSolution(quizId, solution) {
    const body = addOwner(solution);
    body.quiz = createPointer('Quiz', quizId);

    return await api.post(host + '/classes/Solution', body);
}

export async function getSolutionCount(quizIds) {
    const query = JSON.stringify({
        $or: quizIds.map(id => ({ quiz: id }))
    });

    const solutions = await api.get(host + '/classes/Solution?where=' + encodeURIComponent(query));
    const result = solutions.reduce((a, c) => {
        const id = c.quiz;
        if (!a[id]) { a[id] = 0; }
        a[id]++;
        return a;
    }, {});

    return result;
}