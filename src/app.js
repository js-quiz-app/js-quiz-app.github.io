import { page, render } from './lib.js';

import { getUserData } from './util.js';
import { getQuestionsByQuizId, getQuizById, logout as apiLogout } from './api/data.js';
import { browsePage } from './views/browse.js';
import { editorPage } from './views/editor/editor.js';
import { loginPage, registerPage } from './views/auth.js';
import { quizPage } from './views/quiz/quiz.js';
import { cube } from './views/common/loader.js';
import { resultPage } from './views/quiz/result.js';
import { homePage } from './views/home.js';
import { detailsPage } from './views/quiz/details.js';
import { notFound } from './views/quiz/notFound.js';

const state = {};
const main = document.getElementById('content');
setUserNav();
document.getElementById('logoutBtn').addEventListener('click', logout);

page('*', decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/browse', browsePage);
page('/details/:id', getQuiz, detailsPage);
page('/quiz/:id', getQuiz, quizPage);
page('/summary/:id', getQuiz, resultPage);
page('/create', isUser, editorPage);
page('/edit/:id', isUser, editorPage);
page('*', notFound);

page.start();

async function getQuiz(ctx, next) {
    ctx.clearCache = clearCache;
    const quizId = ctx.params.id;
    if (state[quizId] == undefined) {
        ctx.render(cube());
        state[quizId] = await getQuizById(quizId);
        const ownerId = state[quizId].owner._id;
        state[quizId].questions = await getQuestionsByQuizId(quizId, ownerId);
        state[quizId].answers = state[quizId].questions.map(q => undefined);
    }
    ctx.quiz = state[quizId];

    next();
}

function clearCache(quizId) {
    if (state[quizId]) {
        delete state[quizId];
    }
}

function decorateContext(ctx, next) {
    ctx.user = getUserData();
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const user = getUserData();
    if (user) {
        document.getElementById('user-nav').style.display = 'block';
        document.getElementById('guest-nav').style.display = 'none';
        document.querySelector('.profile-link').href = `/users/${user.objectId}`;
    } else {
        document.getElementById('user-nav').style.display = 'none';
        document.getElementById('guest-nav').style.display = 'block';
    }
}

function isUser(ctx, next) {
    if (ctx.user) {
        next();
    }
    ctx.page.redirect('/');
}

async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}