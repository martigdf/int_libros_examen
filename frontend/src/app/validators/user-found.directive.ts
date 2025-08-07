import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UserFoundDirective, multi: true }]
})
export class UserFoundDirective implements Validator {

  @Input('appUserFound') userFound!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.userFound) return null;
    return control.value === this.userFound ? null : { mismatch: true };
  }

  constructor() { }

}