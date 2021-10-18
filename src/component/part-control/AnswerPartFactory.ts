import AnswerPart from "../answer-part/AnswerPart";
import Answer from "../answer/Answer";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IPartResult, IQuestion, IQuestionPart } from "../form-maker/ISchema";
import AutocompleteTypeA from "./auto-complete-a/AutocompleteTypeA";
import AutoCompleteType from "./auto-complete/AutoCompleteType";
import CheckListType from "./check-list/CheckListType";
import SelectType from "./select/SelectType";
import TextAriaType from "./text-area/TextAriaType";
import TextType from "./text/TextType";
import UnknownType from "./unknown/UnknownType";

export default class AnswerPartFactory {
  public static generate(
    part: IQuestionPart,
    owner: Answer,
    data?: IPartResult
  ): AnswerPart {
    var retVal: AnswerPart = null;
    switch (part.viewType.toLowerCase()) {
      case "text": {
        retVal = new TextType(part, owner);
        break;
      }
      case "select": {
        retVal = new SelectType(part, owner);
        break;
      }
      case "checklist": {
        retVal = new CheckListType(part, owner);
        break;
      }
      case "textarea": {
        retVal = new TextAriaType(part, owner);
        break;
      }
      case "autocomplete": {
        retVal = new AutoCompleteType(part, owner);
        break;
      }
      case "autocompletea": {
        retVal = new AutocompleteTypeA(part, data, owner);
        break;
      }
      default: {
        retVal = new UnknownType(part, owner);
        break;
      }
    }
    return retVal;
  }
}
