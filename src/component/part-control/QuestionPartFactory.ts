import QuestionPart from "../question-part/QuestionPart";
import Question from "../question/Question";
import { IPartCollection, IQuestion, IQuestionPart } from "../form-maker/ISchema";
import AutoCompleteMultiType from "./auto-complete/AutoCompleteMultiType";
import AutoCompleteSingleType from "./auto-complete/AutocompleteSingleType";
import CheckListType from "./check-list/CheckListType";
import SelectType from "./select/SelectType";
import TextAriaType from "./text-area/TextAriaType";
import TextType from "./text/TextType";
import UnknownType from "./unknown/UnknownType";

export default class QuestionPartFactory {
  public static generate(
    question: IQuestion,
    part: IQuestionPart,
    owner: Question,
    answer?: IPartCollection
  ): QuestionPart {
    var retVal: QuestionPart = null;
    switch (part.viewType.toLowerCase()) {
      case "text": {
        retVal = new TextType(part, owner, answer);
        break;
      }
      case "select": {
        retVal = new SelectType(part, owner, answer);
        break;
      }
      case "checklist": {
        retVal = new CheckListType(part, owner, answer);
        break;
      }
      case "textarea": {
        retVal = new TextAriaType(part, owner, answer);
        break;
      }
      case "autocomplete": {
        retVal = question.multi
          ? new AutoCompleteMultiType(part, owner, answer)
          : new AutoCompleteSingleType(part, owner, answer);
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
