import { IQuestion } from "../form-maker/ISchema";
import Answer from "./Answer";
import TextAnswer from "./TextAnswer";


export default class AnswerFactory {
    public Generate(question: IQuestion, owner: Element): Answer {
        return new TextAnswer(question, owner);
    }
}