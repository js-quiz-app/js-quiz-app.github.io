import { html, until } from '../lib.js';

const notFoundTemplate = () => html`
<section id="details">
    <div class="pad-large alt-page">
        <article class="details">
            <h1>404</h1>

            <p class="quiz-desc">Page Not Found</p>
        </article>
    </div>
</section>`;

export async function notFound(ctx) {
    ctx.render(notFoundTemplate());
}