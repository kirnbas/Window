const timer = (id, deadline) => {
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - new Date();
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000) / 60 % 60);
        const hours = Math.floor((t / 1000) / 60 / 60 % 24);
        const days = Math.floor((t / 1000) / 60 / 60 / 24);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerText = addZero(t.days);
            hours.innerText = addZero(t.hours);
            minutes.innerText = addZero(t.minutes);
            seconds.innerText = addZero(t.seconds);

            if (t.total <= 0) {
                days.innerText = '00';
                hours.innerText = '00';
                minutes.innerText = '00';
                seconds.innerText = '00';

                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

export default timer;