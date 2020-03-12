import {FormControl} from '@angular/forms';

export function requiredFileType( ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ( 'png' !== extension.toLowerCase() && 'jpg' !== extension.toLowerCase() && 'jpeg' !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}
