import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() maxLength!: number;
  @Input() required: boolean = false;
  @Input() name!: string;
  control = new FormControl();

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    const validators: ValidatorFn[] = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.maxLength) {
      validators.push(Validators.maxLength(this.maxLength));
    }
    if (this.type === 'number') {
      validators.push(Validators.pattern(/^[0-9]+$/));
    }
    if (this.type === 'text' && this.name === 'date') {
      validators.push(this.dateFormatValidator());
    }
    if (this.type === 'email') {
      validators.push(Validators.email);
    }
    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

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

  validate() {
    return this.control.valid
      ? null
      : { invalidForm: { valid: false, message: 'field is invalid' } };
  }

  private dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      return datePattern.test(value) ? null : { invalidDateFormat: true };
    };
  }
}
