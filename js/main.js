import {data} from './data.js';

const moreButton = document.querySelector('#more');
const checkButton = document.querySelector('#check');

class Test {
    constructor(container) {
        this.container = container;
        this.data = data;

        this.questionInPage = this.data.length / 2;
        this.generateTest(this.data);
        this.moreButtonClickHandler();
    }

    generateMarkup(question, answers, i) {
        let templateAnswers = ``;
        const isHidden = (i > this.questionInPage) ? 'hide' : '';

        answers.forEach((answer, index) => {
            let templateAnswer = `<li>
                                        <label for="q-${question.id}__${index}">
                                            <input required type="radio" id="q-${question.id}__${index}" name="q-${question.id}">
                                        ${answer}
                                        </label>
                                    </li>`;
            templateAnswers += templateAnswer;
        });

        let templateAnswersWrapper = `<ul class="test__answers-list>${templateAnswers}</ul>`;
        let templateQuestion = `            
                <li class="test__question ${isHidden}" id="q-${question.id}">
                    <span>${question.question}</span>
                    ${templateAnswersWrapper}              
                </li>            
        `;

        this.createElement(templateQuestion, `#q-${question.id}`);
    }

    generateTest(data) {
        data = data.sort(i => Math.random() - 0.5);
        let counter = 1;

        data.forEach(q => {
            let dataAnswers = q.answers.sort(i => Math.random() - 0.5);
            this.generateMarkup(q, dataAnswers, counter);
            counter++;
        });
    }

    moreButtonClickHandler() {
        moreButton.addEventListener('click', (evt) => {
            const answers = this.container.querySelectorAll('.test__question');
            answers.forEach(q => q.classList.toggle('hide'));
            (evt.target.innerText = 'Назад') ? evt.target.innerText = 'Далее' : evt.target.innerText = 'Назад';
            checkButton.classList.toggle('hide');
        });
    }

    stringToHTML(str, id) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');

        return doc.querySelector(id);
    }

    createElement(html, id) {
        this.element = this.stringToHTML(html, id);
        this.container.append(this.element);
    }
}

const test = new Test(document.querySelector('#wrapper'));



