import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(errors: ValidationErrors|null, ...args: string[]): string {
    console.log({args});
    if (!errors) return "";
    if (errors["required"]) return "El campo " + args[0] + " es requerido." 
    if (errors["appReservado"]) return "El nombre seleccionado está reservado." 
    return "Error desconocido";
  }

}