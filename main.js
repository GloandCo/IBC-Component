// BRING IN All OUR STYLES
import './style.scss'

import l3NameCard from "./components/l3-namecard/l3-namecard.js";
window.customElements.define('l3-namecard', l3NameCard);

window.update = (update) => {

    if(!update) {
        return;
    }

    // GET ALL DATA
    const allData = JSON.parse(update)
    // ONLY IN DEVELOPMENT MODE
    if(import.meta.env.DEV){
        console.log("allData", allData)
    }

    // CAN WE FIND THE ELEMENT?
    const element = document.getElementById(allData.element);
    if (!element) {
        console.error(`Error: Element with ID '${allData.element}' not found`);
        return;
    }

    // DOES THE ELEMENT HAVE THE FUNCTION WE'RE AFTER?
    if (typeof element.animateOn !== 'function' || typeof element.animateOff !== 'function') {
        console.error(`Error: Element '${allData.element}' does not support animation methods`);
        return;
    }

    // A SWITCH IS USED FOR FUTURE ACTIONS
    // CURRENTLY WE'RE ONLY WORKING WITH ON
    switch (allData.action) {
        case 'on':
            document.getElementById(allData.element).animateOn(allData.props);
            break;
        case 'off':
            document.getElementById(allData.element).animateOff()
            break;
        default:
            console.error('Error: Unknown Action', allData.action)
    }

}
