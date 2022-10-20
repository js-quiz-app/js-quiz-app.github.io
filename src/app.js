import { render, page } from './lib.js';

import { editorPage } from './views/editor/editor.js';

const main = document.getElementById('content');


page('/create', decorateContext, editorPage);
page('/edit/:id', decorateContext, editorPage);
page.start();
page.redirect('/create');

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}