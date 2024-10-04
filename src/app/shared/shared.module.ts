import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { FormTextInputComponent } from '../components/form-text-input/form-text-input.component';
import { FormDateInputComponent } from '../components/form-date-input/form-date-input.component';
import { FormNumericInputComponent } from '../components/form-numeric-input/form-numeric-input.component';
import { FormTextAreaComponent } from '../components/form-text-area/form-text-area.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LogoComponent } from '../components/logo/logo.component';
import { LoadingBlockComponent } from '../components/loading-block/loading-block.component';
import { LanguageSelectComponent } from '../components/language-select/language-select.component';
import { createTranslateLoader } from '../services/translate-loader/translate-loader.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ButtonComponent,
    FormFieldComponent,
    FormTextInputComponent,
    FormDateInputComponent,
    FormNumericInputComponent,
    FormTextAreaComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    LoadingBlockComponent,
    LanguageSelectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    ButtonComponent,
    FormFieldComponent,
    FormTextInputComponent,
    FormDateInputComponent,
    FormNumericInputComponent,
    FormTextAreaComponent,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    LoadingBlockComponent,
    LanguageSelectComponent,
  ],
})
export class SharedModule {}
