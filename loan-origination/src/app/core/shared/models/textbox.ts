import { ControlBase } from "./control-base";

export class TextBox<T> extends ControlBase<T> {
  override controlType = 'textbox';
  override value: T | undefined;
}