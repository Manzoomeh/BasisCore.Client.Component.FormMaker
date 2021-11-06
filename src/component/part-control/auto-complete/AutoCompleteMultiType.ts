import Answer from "../../answer/Answer";
import {
  IAnswerResult,
  IFixValue,
  IQuestionPart,
} from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/auto-complete-multi-type.html";
import "./assets/style";
import SearchPopup from "./SearchPopup";

export default class AutoCompleteMultiType extends QuestionBaseAnswerPart {
  private _value: IFixValue;
  private _btn: HTMLButtonElement;
  constructor(part: IQuestionPart, owner: Answer) {
    super(part, layout, owner);
    owner.replaceAddClick(this.onShowPopUpBtnClick.bind(this));
  }

  private onShowPopUpBtnClick() {
    const popup = new SearchPopup(
      this.part.link,
      this.addValue.bind(this),
      true
    );
  }

  private addValue(value: IFixValue): boolean {
    let retVal = false;
    var p: IAnswerResult = {
      parts: [
        {
          part: this.part.part,
          title: value.value,
          value: value.id,
        },
      ],
    };
    this.owner.owner.addAnswer(p);
    retVal = true;
    return retVal;
  }
}
