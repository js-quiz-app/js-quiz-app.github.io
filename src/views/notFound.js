import { html, until, styleMap } from '../lib.js';

const notFoundTemplate = () => html`
<section id="details">
    <div class="pad-large alt-page">
        <article class="details">
            <h1 style=${styleMap({'font-size': '48px'})}>404</h1>

            <p class="quiz-desc" style=${styleMap({'text-align': 'center', 'font-size': '24px'})}>Page Not Found</p>
        </article>
    </div>
</section>`;

export async function notFound(ctx) {
    ctx.render(notFoundTemplate());
}