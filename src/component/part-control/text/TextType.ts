import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import Question from "../../question/Question";
import TextBaseType from "../text-area/TextBaseType";

export default class TextType extends TextBaseType<HTMLInputElement> {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }
}
