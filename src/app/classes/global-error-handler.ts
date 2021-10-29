import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private zone: NgZone,
    private _snackBar: MatSnackBar
  ) { }

  handleError(err: any): void {
    this.zone.run(() => {
      this._snackBar.open(err.message, undefined, { duration: 5000 });
    });
  }
}
