import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IFixValue, IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html"
import itemLayout from "./assets/item-layout.html"
import HttpUtil from "../../../HttpUtil";
import ListBaseType from "../ListBaseType";

export default class CheckListType extends ListBaseType {

    constructor(question: IQuestion, part: IQuestionPart, options: IFormMakerOptions, container: Element) {
        super(question, part, layout, options, container);
    }

    protected fillUI(values: Array<IFixValue>) {
        values.forEach(item => {
            const newTemplate = itemLayout.replace("@title", item.value).replace("@value", item.id.toString());
            const template = HttpUtil.parse(newTemplate).querySelector("div")
            this.element.appendChild(template);
        })
    }
}