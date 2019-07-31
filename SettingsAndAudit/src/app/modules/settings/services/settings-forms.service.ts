import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SettingsFormsService {
  public form: FormGroup;
  constructor() { }

  getAddSettingForm(): FormGroup {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required, Validators.pattern("^(Строка|Число|Дата)$")])
    });
    return this.form;
  }

  getUpdateSettingForm(): FormGroup {
    this.form = new FormGroup({
      value: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required, Validators.pattern("^(Строка|Число|Дата)$")])
    });
    return this.form;
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.validateAllFormFields(this.form);
      return false;
    }
    return true;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  switchValidation(type: string): FormGroup {
    switch(type) {
      case 'Строка':
          this.form.controls["value"].clearValidators();
          this.form.controls["value"].setValidators([Validators.required]);
          this.form.controls["value"].updateValueAndValidity();
      break;

      case 'Число':
          this.form.controls["value"].clearValidators();
          this.form.controls["value"].setValidators([Validators.required, Validators.pattern("[0-9]*$")]);
          this.form.controls["value"].updateValueAndValidity();
      break;

      case 'Дата':
          this.form.controls["value"].clearValidators();
          this.form.controls["value"].setValidators([Validators.required, Validators.pattern("^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}$")]);
          this.form.controls["value"].updateValueAndValidity();
      break;
      default:
    }

    return this.form;
  }
}
