import { html, render } from '../../lib.js';
import { createQuestion } from './question.js';


const questionList = (questions, addQuestion) => html`
        <header class="pad-large">
            <h2>Questions</h2>
        </header>
        
        ${questions}
        
        <article class="editor-question">
            <div class="editor-input">
                <button @click={addQuestion} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add question
                </button>
            </div>
        </article>
`

export async function createList(questions) {
    const currentQuestions = questions.map(q => createQuestion(q, removeQuestion));

    const element = document.createElement('div');
    element.className = 'pad-large alt-page';

    update();

    return element;

    async function addQuestion(ev) {
        currentQuestions.push(createQuestion({
            text: '',
            answers: [],
            correctIndex: 0
        }, removeQuestion));
        update();
    }

    async function removeQuestion(index) {

        const confirmed = confirm('Are you sure you want to delete this question?');
        if (confirmed) {
            currentQuestions.splice(index, 1);
            update();
        }
    }

    function update() {
        render(questionList(currentQuestions.map((c, i) => c(i)), addQuestion), element);
    }
}