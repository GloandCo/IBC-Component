import gsap from 'gsap';

export default class l3NameCard extends HTMLElement {
    constructor() {
        super();

        this.currentState = 'OUT'

        this.component = '#l3-namecard'

        this.inTL = null;
        this.outTL = null;
    }

    buildContent(data) {
        // BUILD AN EMPTY RESPONSE
        let response = [];

        // PASS THINGS INTO IT
        response.push(`
            <div class="l3-namecard-wrap bottom-left">
                <div class="image-wrap">
                    <img alt="${data.title}" src="${data.logo}" />
                </div>
                <div class="content-wrap">
                    <div class="title-bar">
                        <span>
                            ${data.title ?? ''}
                        </span>
                    </div>
                    <div class="jobtitle-bar">
                        <span>
                            ${data.jobtitle ?? ''}
                        </span>
                    </div>
                </div>
            </div>
        `);

        // RENDER RESPONSE
        return response.join('');
    }

    animateOn(data) {

        return new Promise((res) => {

            console.log('this.currentState', this.currentState)
            if (this.currentState === 'OUT') {

                console.log('BUILD!')

                this.innerHTML = this.buildContent(data);

                this.inTL = gsap.timeline({
                    onComplete: () => {
                        this.currentState = 'IN'
                        this.inTL = null;

                        res(this);
                    }
                }).timeScale(1)

                this.inTL.fromTo(this.component + ' .l3-namecard-wrap .image-wrap', { autoAlpha: '0' }, { autoAlpha: '1', duration: .4}, 0)
                this.inTL.fromTo(this.component + ' .l3-namecard-wrap .title-bar span', { autoAlpha: '0' }, { autoAlpha: '1', duration: .4}, 0)
                this.inTL.fromTo(this.component + ' .l3-namecard-wrap .jobtitle-bar span', { autoAlpha: '0' }, { autoAlpha: '1', duration: .4}, 0)

            } else {

                // IF THE ELEMENT IS ALREADY ON
                // WE ANIMATE OFF, WHEN THAT'S COMPLETE
                // WE ANIMATE ON USING THE DATA PASSED TO US
                this.animateOff().then(() => {
                    this.animateOn(data)
                });

            }

        });

    }

    animateOff(data) {

        return new Promise((res) => {
            if (this.currentState === 'IN') {
                this.outTL = gsap.timeline({
                    onComplete: () => {
                        this.currentState = 'OUT';
                        this.outTL = null;
                        this.innerHTML = '';

                        res(this);
                    },
                });

                this.outTL.fromTo(this.component + ' .l3-namecard-wrap', { autoAlpha: '1' }, { autoAlpha: '0', duration: .4}, 0)
            }
        })
    }
}
