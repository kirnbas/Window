const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, 
        state = null, fieldsToValidate = null) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');
        const scroll = calcScroll();

        trigger.forEach(t => {
            t.addEventListener('click', (e) => {
                const validateErrorMsg = document.querySelector('#validate-error-msg');
                if (validateErrorMsg) {
                    validateErrorMsg.remove();
                }

                if (state && fieldsToValidate) {
                    let errors = [];

                    fieldsToValidate.forEach(item => {
                        if (!state[item]) {
                            errors.push(item);

                            // console.log('validation error: ', item);
                        }
                    });

                    if (errors.length > 0) {
                        const errorMsg = document.createElement('div');
                        errorMsg.id = "validate-error-msg";
                        errorMsg.innerText = errors.join(', ');

                        errorMsg.style.color = 'red';
                        errorMsg.style.paddingTop = '10px';

                        t.parentNode.append(errorMsg);

                        return;
                    }
                }

                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', e => {
            if (closeClickOverlay && e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, state, ['form', 'width', 'height']);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, state, ['type', 'profile']);

    // showModalByTime('.popup', 60000);
};

export default modals;