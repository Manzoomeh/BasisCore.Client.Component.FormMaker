import Answer from "../../answer/Answer";
import { IAnswerResult, IFixValue, IPartResult, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/auto-complete-multi-type.html";
import "./assets/style";
import AutoCompleteType from "./AutoCompleteType";
import SearchPopup from "./SearchPopup";

export default class AutoCompleteMultiType extends AutoCompleteType {
  constructor(part: IQuestionPart, owner: Answer, value: IPartResult) {
    super(part, layout, owner, value);
    owner.replaceAddClick(this.onShowPopUpBtnClick.bind(this));
  }

  private onShowPopUpBtnClick() {
    const popup = new SearchPopup(this.part.link, this.addValue.bind(this), true);
  }

  private addValue(value: IFixValue): boolean {
    if (!this._value) {
      this.setValue(value);
    } else {
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
    }
    return true;
  }
}
