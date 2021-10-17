import AnswerPart from "../answer-part/AnswerPart";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import AutoCompleteType from "./auto-complete/AutoCompleteType";
import CheckListType from "./check-list/CheckListType";
import SelectType from "./select/SelectType";
import TextAriaType from "./text-area/TextAriaType";
import TextType from "./text/TextType";
import UnknownType from "./unknown/UnknownType";

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
      case "textarea": {
        retVal = new TextAriaType(question, part, options, container);
        break;
      }
      case "autocomplete": {
        retVal = new AutoCompleteType(question, part, options, container);
        break;
      }
      default: {
        retVal = new UnknownType(question, part, options, container);
        break;
      }
    }
    return retVal;
  }
}
