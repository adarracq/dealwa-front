import { Alert } from "react-native";

export const functions = {
    getIconSource,
    dateToString,
    dateToStringWithDayOfWeek,
    getAgeFromBirthdate,
    AlertWithChoices,
    getStringDateDifference
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
        case 'message':
            return require('../assets/icons/message.png');
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
        case 'cible':
            return require('../assets/icons/cible.png');
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
        case 'location':
            return require('../assets/icons/location.png');
        case 'plus':
            return require('../assets/icons/plus.png');
        case 'trash':
            return require('../assets/icons/trash.png');
        case 'camera':
            return require('../assets/icons/camera.png');
        case 'id-card':
            return require('../assets/icons/id-card.png');
        case 'briefcase':
            return require('../assets/icons/briefcase.png');
        case 'dollar':
            return require('../assets/icons/dollar.png');
        case 'gestion':
            return require('../assets/icons/gestion.png');
        case 'house':
            return require('../assets/icons/house.png');
        case 'save':
            return require('../assets/icons/save.png');
        case 'mypos':
            return require('../assets/icons/mypos.png');
        case 'search':
            return require('../assets/icons/search.png');
        case 'leftarrow':
            return require('../assets/icons/leftarrow.png');
        case 'epingle':
            return require('../assets/icons/epingle.png');
        case 'sliderbtn':
            return require('../assets/icons/sliderbtn.png');
        case 'heart_full':
            return require('../assets/icons/heart_full.png');
        case 'heart_empty':
            return require('../assets/icons/heart_empty.png');
        case 'list':
            return require('../assets/icons/list.png');
        case 'map3':
            return require('../assets/icons/map3.png');
        case 'clock':
            return require('../assets/icons/clock.png');
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
        case 'random-profile':
            return require('../assets/img/profile.jpg');
        default:
            return require('../assets/icons/none.png');
    }
}

function dateToString(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

function dateToStringWithDayOfWeek(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return `${daysOfWeek[date.getDay()]} ${day} ${monthNames[date.getMonth()]}`;
}

function getAgeFromBirthdate(birthdate: string) {
    // return age from birthdate JJ/MM/AAAA
    const yearBirth = parseInt(birthdate.split('/')[2]);
    const monthBirth = parseInt(birthdate.split('/')[1]) - 1;
    const dayBirth = parseInt(birthdate.split('/')[0]);
    const now = new Date();
    const age = now.getFullYear() - yearBirth;

    if (now.getMonth() < monthBirth || (now.getMonth() === monthBirth && now.getDate() < dayBirth)) {
        return age - 1;
    }

    return age;
}


function AlertWithChoices(title: string, message: string, choices: { text: string, onPress: () => void }[]) {
    Alert.alert(
        title,
        message,
        choices.map((choice) => {
            return {
                text: choice.text,
                onPress: choice.onPress
            }
        })
    )
}

// return Il y a ... jours ou heures from YYYY-MM-DDTHH:MM:SS.mmmZ
function getStringDateDifference(date: Date): string {
    // Convertir les arguments en objets Date si nécessaire
    const now = new Date();
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }

    // Vérifiez que les dates sont valides
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('date is not a valid date');
    }

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `Il y a ${diffDays} jours`;
}

function getStringDateDifference2(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    if (diffDays > 0) {
        return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
        return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    }
    return 'Il y a quelques minutes';
}