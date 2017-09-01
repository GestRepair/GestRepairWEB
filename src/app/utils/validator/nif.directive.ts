import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateNIF][formControlName],[validateNIF][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NIFValidator), multi: true }
    ]
})

export class NIFValidator implements Validator {

    constructor( @Attribute('validateNIF') public validateNIF: string,
        @Attribute('reverse') public reverse: string) {
    }

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;

        var firm = v.charAt(8) * v.charAt(2);
        var secm = v.charAt(7) * v.charAt(3);
        var trem = v.charAt(6) * v.charAt(4);
        var form = v.charAt(5) * v.charAt(5);
        var fivm = v.charAt(4) * v.charAt(6);
        var sixm = v.charAt(3) * v.charAt(7);
        var sevm = v.charAt(2) * v.charAt(8);
        var eigm = v.charAt(1) * v.charAt(9);
        var sum = firm + secm + trem + form + fivm + sixm + sevm + eigm;
        var resNif = sum % 11;
        if (resNif == 0 || resNif == 1) {
            resNif = 0;
        } else {
            resNif = 11 - resNif;
        }
        if (v.charAt(9) != resNif) {
            return {
                validateNIF: false
            }
        }
        // value not equal
        if (v.charAt(9) != resNif && !this.isReverse) {
            return {
                validateNIF: false
            }
        }

        // value equal and reverse
        if(v.charAt(9) == resNif && this.isReverse) {
            delete v.errors['validateNIF'];
            if (!Object.keys(v.errors).length) v.setErrors(null);
        }

        // value not equal and reverse
        if (v.charAt(9) != resNif && this.isReverse) {
            v.setErrors({
                validateNIF: false
            })
        }
        return null;
    }
}