import Answer from "../answer/Answer";
import AnswerFactory from "../answer/AnswerFactory";
import { IQuestion } from "../form-maker/ISchema";
import layout from "./assets/layout.html";
import "./assets/style.css";
export default class Question {
    static parser: DOMParser = new DOMParser();
    static factory: AnswerFactory = new AnswerFactory();
    private readonly _schema: IQuestion;
    private readonly _element: Element;
    private readonly _answer: Answer;

    constructor(question: IQuestion, container: Node) {
        this._schema = question;
        var copyTemplate = layout.replace("@title", this._schema.title);
        this._element = Question.parser.parseFromString(copyTemplate, "text/html").querySelector("[data-bc-question]")
        container.appendChild(this._element);
        const answerContainer = this._element.querySelector("[data-bc-answer-container]")
        this._answer = Question.factory.Generate(question, answerContainer);
    }
}