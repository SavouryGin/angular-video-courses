import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { TextInputComponent } from '../components/text-input/text-input.component';
import { TextAreaComponent } from '../components/text-area/text-area.component';
import { NumericInputComponent } from '../components/numeric-input/numeric-input.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ButtonComponent,
    TextInputComponent,
    TextAreaComponent,
    NumericInputComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    TextInputComponent,
    TextAreaComponent,
    NumericInputComponent,
    TranslateModule,
  ],
})
export class SharedModule {}
