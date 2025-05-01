function gpCreateCookie(name, value, days) {
    let expires;
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    } else {
        expires = '';
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function gpReadCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }

    return null;
}

function gpEraseCookie(name) {
    gpCreateCookie(name, "", -1);
}

((function($) {
    const cookie = gpReadCookie('gp-premium') || false;

    if (cookie) {
        $('.dashboard-notifications-container, .plugins-notifications-container, .themes-notifications-container').remove();
    } else {
        $(document).ready(function() {
            $('body').on('click', '[data-notification-action="hide-notification"]', function(event) {
                const target = $(event.currentTarget);
                const matches = target.closest('.dashboard-notifications-container, .plugins-notifications-container, .themes-notifications-container').length;

                if (matches) {
                    gpCreateCookie('gp-premium', 1, 7);
                }
            });
        });
    }
})(jQuery));

