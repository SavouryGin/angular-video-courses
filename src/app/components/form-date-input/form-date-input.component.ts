import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-date-input',
  templateUrl: './form-date-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDateInputComponent),
      multi: true,
    },
  ],
})
export class FormDateInputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() name!: string;
  control = new FormControl();

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {}

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
