import { IQuestion } from "../form-maker/ISchema";


export default abstract class Answer {
    protected readonly question: IQuestion;
    protected readonly container: Element

    constructor(question: IQuestion, container: Element) {
        this.question = question;
        this.container = container;
    }
}