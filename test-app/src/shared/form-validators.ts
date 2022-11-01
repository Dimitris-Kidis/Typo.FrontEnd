import { FormControl } from "@angular/forms";

export function lowercaseLetterCheck (control: FormControl) {
    if (control.value != "" && !/[a-z]/.test(control.value) ) {
      return {lowercaseLetterCheck: true};
    }
    return null;
}

export function uppercaseLetterCheck (control: FormControl) {
    if (control.value != "" && !/[A-Z]/.test(control.value) ) {
      return {uppercaseLetterCheck: true};
    }
    return null;
}

export function digitCheck (control: FormControl) {
    if (control.value != "" && !/\d/.test(control.value) ) {
        return {digitCheck: true};
    }
    return null;
}

export function specialCharCheck (control: FormControl) {
    if (control.value != "" && !/[""!@$%^&*(){}:;<>,.?/+_=|'~\\-]/.test(control.value) ) {
        return {specialCharCheck: true};
    }
    return null;
}

export function noSpaceAllowed (control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true};
    }
    return null;
}

export function noNumbersAllowed (control: FormControl) {
    if (control.value != null && /[0-9]/.test(control.value) ) {
      return {noNumbersAllowed: true};
    }
    return null;
}

export function noSpecialCharAllowed (control: FormControl) {
    if (control.value != "" && /[""!@$%^&*(){}:;<>,.?/+_=|'~\\-]/.test(control.value) ) {
        return {noSpecialCharAllowed: true};
    }
    return null;
}

export function noLettersAllowed (control: FormControl) {
    if (control.value != "" && !/^\d+$/.test(control.value) ) {
      return {noLettersAllowed: true};
    }
    return null;
}

export function noNumbersCharsSpaces (control: FormControl) {
    if (control.value != null &&
        (/[""!@$%^&*(){}:;<>,.?/+_=|'~\\-]/.test(control.value) ||
        /[0-9]/.test(control.value) ||
        control.value.indexOf(' ') != -1)  ) {
      return {noNumbersCharsSpaces: true};
    }
    return null;
}

export function nameLength (control: FormControl) {
    if (control.value != "" && (control.value.length < 2 || control.value.length > 30)) {
      return {nameLengthError: true};
    }
    return null;
}

export function ageRange (control: FormControl) {
    if (!(parseInt(control.value) > 3 &&
    parseInt(control.value) < 101) &&
    control.value != '' && !isNaN(parseInt(control.value))) {
        return {ageRangeError: true};
    }
    return null;
}