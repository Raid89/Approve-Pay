import { ControlBase } from "./control-base";

export class Currency extends ControlBase<string> {
  override controlType = 'currency';
}