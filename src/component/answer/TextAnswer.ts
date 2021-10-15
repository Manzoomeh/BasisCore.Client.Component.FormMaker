import { IQuestion } from "../form-maker/ISchema";
import Answer from "./Answer";


export default class TextAnswer extends Answer {

    constructor(question: IQuestion, container: Element) {
        super(question, container);
        this.container.innerHTML = "<input type='text'>"
    }
}