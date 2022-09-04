import { html, render } from '../../lib.js';

const editorTemplate = (data, index) => html`
<div class="layout">
    <div class="question-control">
        <button disabled class="input submit action"><i class="fas fa-check-double"></i>
            Save</button>
        <button disabled class="input submit action"><i class="fas fa-times"></i>
            Cancel</button>
    </div>
    <h3>Question ${index}</h3>
</div>

<form>
    <textarea disabled class="input editor-input editor-text" name="text" placeholder="Enter question"
        .value=${data.text}></textarea>

        ${data.answers.map((a, i )=> radioEdit(index, i, a, data.correctIndex == i))}

    <div class="editor-input">
        <button disabled class="input submit action">
            <i class="fas fa-plus-circle"></i>
            Add answer
        </button>
    </div>
</form>
<div class="loading-overlay working"></div>
`;

const viewTemplate = (data, index) => html`
    
        <div class="layout">
            <div class="question-control">
                <button class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                <button class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
            <h3>Question ${index}</h3>
        </div>
        <form>
            <p class="editor-input">${data.text}</p>
            <div class="editor-input">
                <label class="radio">
                    <input class="input" type="radio" name="question-2" value="0" disabled />
                    <i class="fas fa-check-circle"></i>
                </label>
                <span>Answer 0</span>
            </div>
            <div class="editor-input">
                <label class="radio">
                    <input class="input" type="radio" name="question-2" value="1" disabled />
                    <i class="fas fa-check-circle"></i>
                </label>
                <span>Answer 1</span>
            </div>
            <div class="editor-input">
                <label class="radio">
                    <input class="input" type="radio" name="question-2" value="2" disabled />
                    <i class="fas fa-check-circle"></i>
                </label>
                <span>Answer 2</span>
            </div>
        </form>
`;

const radioEdit = (questionIndex, index, value, checked) => html`
    <div class="editor-input">
    
        <label class="radio">
            <input disabled class="input" type="radio" name=${"question-${questionIndex}"} value=${index} />
            <i class="fas fa-check-circle"></i>
        </label>
    
        <input disabled class="input" type="text" name=${"answer-${index}"} .value=${value} ?checked=${checked}/>
        <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
    </div>
`

export function createQuestion(question, index, edit) {
    const element = document.createElement('article');
    element.className = 'editor-question';

    if (edit) {
        render(editorTemplate(question, index), element);
    } else {
        render(viewTemplate(question, index), element);
    }

    return element;
}