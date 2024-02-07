import { Observable, of } from "rxjs";

export class ControlBase<T> {
  value: T|undefined;
  valueObject: {} | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  layout: string;
  type: string;
  pattern: string | RegExp;
  maxLength: number;
  minLength: number;
  min: number;
  max: number;
  isDay: boolean;
  isMonth: boolean;
  title: string;
  options: {key: string, value: string}[];
  optionsObject: Observable<any[]>

  constructor(
    options: {
      value?: T;
      valueObject?: {},
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      pattern?: string | RegExp;
      maxLength?: number;
      minLength?: number;
      min?: number;
      max?: number;
      isDay?: boolean;
      isMonth?: boolean;
      title?: string;
      layout?: string;
      type?: string;
      options?: {key: string, value: string}[];
      optionsObject?: Observable<any[]>
    } = {}
  ){
    this.value = options.value;
    this.valueObject = options.valueObject;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1: options.order;
    this.controlType = options.controlType || '';
    this.layout = options.layout || 'col-md-12';
    this.pattern = options.pattern || '';
    this.maxLength = options.maxLength || 10;
    this.minLength = options.minLength || 3;
    this.min = options.min || 1;
    this.max = options.max || 100;
    this.isDay = !!options.isDay;
    this.isMonth = !!options.isMonth;
    this.title = options.title || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.optionsObject = options.optionsObject || of([]);
  };
  
  
}