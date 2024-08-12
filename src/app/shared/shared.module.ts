import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { FormTextInputComponent } from '../components/form-text-input/form-text-input.component';
import { FormDateInputComponent } from '../components/form-date-input/form-date-input.component';
import { FormNumericInputComponent } from '../components/form-numeric-input/form-numeric-input.component';
import { FormTextAreaComponent } from '../components/form-text-area/form-text-area.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    FormFieldComponent,
    FormTextInputComponent,
    FormDateInputComponent,
    FormNumericInputComponent,
    FormTextAreaComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    FormFieldComponent,
    FormTextInputComponent,
    FormDateInputComponent,
    FormNumericInputComponent,
    FormTextAreaComponent,
  ],
})
export class SharedModule {}
