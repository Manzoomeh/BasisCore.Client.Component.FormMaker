import TextType from "../part/text/TextType";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import AnswerPart from "./AnswerPart";
import UnknownType from "../part/unknown/UnknownType";
import SelectType from "../part/select/SelectType";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import CheckListType from "../part/check-list/CheckListType";

export default class AnswerPartFactory {
  public static generate(
    question: IQuestion,
    part: IQuestionPart,
    options: IFormMakerOptions,
    container: Element
  ): AnswerPart {
    var retVal: AnswerPart = null;
    switch (part.viewType.toLowerCase()) {
      case "text": {
        retVal = new TextType(question, part, options, container);
        break;
      }
      case "select": {
        retVal = new SelectType(question, part, options, container);
        break;
      }
      case "checklist": {
        retVal = new CheckListType(question, part, options, container);
        break;
      }
      default: {
        retVal = new UnknownType(question, part, options, container);
      }
    }
    return retVal;
  }
}
