import { html, until,styleMap } from '../../lib.js';

import { topics } from '../../util.js';
import { getSolutionCount } from '../../api/data.js';
import { line } from '../common/loader.js';

const detailsTemplate = (quiz, isCreator) => html`
<section id="details">
    <div class="pad-large alt-page">
        <article class="details">
            <h1>${quiz.title}</h1>
            <span class="quiz-topic">A quiz by <a href="/users/${quiz.owner.objectId}">${quiz.owner.username}</a> on the topic of <strong>${topics[quiz.topic]}</strong></span>
            ${until(loadCount(quiz), line())}
            <p class="quiz-desc" style=${styleMap({'text-align': 'center'})}>${quiz.description}</p>

            <div>
                <a class="cta action" href="/quiz/${quiz.objectId}">Begin Quiz</a>
                ${
                    isCreator
                        ? html`<a class="cta action" href="/edit/${quiz.objectId}">Edit Quiz</a>`
                        : ''
                }
            </div>

        </article>
    </div>
</section>`;

async function loadCount(quiz) {
    const taken = (await getSolutionCount([quiz.objectId]))[quiz.objectId] || 0;
    return html`
    <div class="quiz-meta">
        <span>${quiz.questionCount} question${quiz.questionCount == 1 ? '' : 's'}</span>
        <span>|</span>
        <span>Taken ${taken} time${taken == 1 ? '' : 's'}</span>
    </div>`;
}

export async function detailsPage(ctx) {
    const isCreator = ctx.user?.objectId == ctx.quiz.owner._id;
    ctx.render(detailsTemplate(ctx.quiz, isCreator));
}