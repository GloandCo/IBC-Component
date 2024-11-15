// BRING IN All OUR STYLES
import './style.scss'

import l3NameCard from "./components/l3-namecard/l3-namecard.js";
window.customElements.define('l3-namecard', l3NameCard);

window.update = (update) => {

    if(!update) {
        return;
    }

    const allData = JSON.parse(update)

    try {

        // A SWITCH IS USED FOR FUTURE ACTIONS
        // CURRENTLY WE'RE ONLY WORKING WITH ON
        // OTHERWISE WE ANIMATE OFF
        switch (allData.action) {
            case 'on':
                document.getElementById(allData.element).animateOn(allData.props);
                break;
            default:
                document.getElementById(allData.element).animateOff()
                break;
        }

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('test is not a function')) {
            console.error('Error: The test method is not available on the selected element.');
            // You can add your custom error handling here, such as:
            // sendErrorReport('test method not available', error);
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
    }

}
