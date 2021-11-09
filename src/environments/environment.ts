// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { PayPalButtonsComponentOptions } from "@paypal/paypal-js/types/components/buttons";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";

const paypalCurrencyCode: string = "EUR";

const paypalScriptOptions: PayPalScriptOptions = {
  "client-id": "sb",
  currency: paypalCurrencyCode,
  components: "buttons",
  "disable-funding": "card,credit"
}

const paypalButtonsStyle: PayPalButtonsComponentOptions["style"] = {
  layout: "vertical",
  color: "gold",
  shape: "rect",
  label: "paypal",
  tagline: false
};

export const environment = {
  production: false,
  apiUrl: "https://localhost:3000",
  paypalCurrencyCode: paypalCurrencyCode,
  paypalScriptOptions: paypalScriptOptions,
  paypalButtonsStyle: paypalButtonsStyle
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
