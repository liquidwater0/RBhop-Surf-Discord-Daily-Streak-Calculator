import { timer } from "./timer.js";
import { themeChanger } from "./themeChanger.js";
import { calculator } from "./calculator.js";

timer();
themeChanger();
calculator();

//Material Design JS
mdc.autoInit();
mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));