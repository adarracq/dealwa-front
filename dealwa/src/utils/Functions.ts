
export const functions = {
    getIconSource
}

function getIconSource(name: string) {
    switch (name) {
        case 'projects':
            return require('../assets/icons/projects.png');
        case 'shop':
            return require('../assets/icons/shop.png');
        case 'calendar':
            return require('../assets/icons/calendar.png');
        case 'map':
            return require('../assets/icons/map.png');
        case 'messages':
            return require('../assets/icons/messages.png');
        case 'profile':
            return require('../assets/icons/profile.png');
        case 'check':
            return require('../assets/icons/check.png');
        case 'info':
            return require('../assets/icons/info.png');
        case 'profile':
            return require('../assets/icons/profile.png');
        case 'marker':
            return require('../assets/icons/marker.png');
        case 'flash':
            return require('../assets/icons/flash.png');
        case 'credit-card':
            return require('../assets/icons/credit-card.png');
        case 'paypal':
            return require('../assets/icons/paypal.png');
        case 'google':
            return require('../assets/icons/google.png');
        case 'facebook':
            return require('../assets/icons/facebook.png');
        case 'apple':
            return require('../assets/icons/apple.png');
        case 'flag-french':
            return require('../assets/icons/flag-french.png');
        case 'flag-uk':
            return require('../assets/icons/flag-uk.png');
        case 'flag-spain':
            return require('../assets/icons/flag-spain.png');
        case 'flag-germany':
            return require('../assets/icons/flag-germany.png');
        case 'flag-portugal':
            return require('../assets/icons/flag-portugal.png');
        case 'flag-italy':
            return require('../assets/icons/flag-italy.png');
        case 'flag-arabic':
            return require('../assets/icons/flag-arabic.png');
        case 'flag-china':
            return require('../assets/icons/flag-china.png');
        case 'flag-japan':
            return require('../assets/icons/flag-japan.png');
        case 'flag-russia':
            return require('../assets/icons/flag-russia.png');
        default:
            return require('../assets/icons/projects.png');
    }
}
