import { html } from '../../lib.js';
import { createQuestion } from './question.js';

const editorTemplate = (questions, addQuestion) => html`
            <section id="editor">
            
                <header class="pad-large">
                    <h1>New quiz</h1>
                </header>
            
                <div class="pad-large alt-page">
                    <form>
                        <label class="editor-label layout">
                            <span class="label-col">Title:</span>
                            <input class="input i-med" type="text" name="title"></label>
                        <label class="editor-label layout">
                            <span class="label-col">Topic:</span>
                            <select class="input i-med" name="topic">
                                <option value="all">All Categories</option>
                                <option value="it">Languages</option>
                                <option value="hardware">Hardware</option>
                                <option value="software">Tools and Software</option>
                            </select>
                        </label>
                        <input class="input submit action" type="submit" value="Save">
                    </form>
                </div>
            
                <header class="pad-large">
                    <h2>Questions</h2>
                </header>
            
                ${questionList(questions, addQuestion)}
            
            </section>
`;

const questionList = (questions, addQuestion) => html`
    <div class="pad-large alt-page">
    
        ${questions}
    
        <article class="editor-question">
            <div class="editor-input">
                <button @click=${addQuestion} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add question
                </button>
            </div>
        </article>
    
    </div>
`
const questions = [
    {
        text: 'Is this the first question?',
        answers: [
            'Yes',
            'No',
            'Maybe'
        ],
        correctIndex: 0
    },
    {
        text: 'Is this the second question?',
        answers: [
            'Yes',
            'No',
            'Maybe'
        ],
        correctIndex: 2
    }
]

export async function editorPage(ctx) {
    const currentQuestions = questions.map(q => createQuestion(q, removeQuestion));
    update();


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
        ctx.render(editorTemplate(currentQuestions.map((c, i) => c(i)), addQuestion));
    }

}