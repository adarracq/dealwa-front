import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalendarNavParams } from '../../../navigations/CalendarNav';
import Colors from '../../../constants/Colors';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import Button from '../../../components/molecules/Button';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Title2 from '../../../components/atoms/Title2';
import InputField from '../../../components/molecules/InputField';
import SelectDropDown from '../../../components/molecules/SelectDropDown';
import DeletableField from '../../../components/molecules/DeletableField';
import { showMessage } from 'react-native-flash-message';
import Event from '../../../models/Event';
import User from '../../../models/User';

type Props = NativeStackScreenProps<CalendarNavParams, 'AddEvent'>;

export default function AddEventScreen({ navigation, route }: Props) {

    const [eventDate, setEventDate] = useState('')
    const [startHour, setStartHour] = useState('')
    const [endHour, setEndHour] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [openStartHour, setOpenStartHour] = useState(false)
    const [openEndHour, setOpenEndHour] = useState(false)
    const [type, setType] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [guests, setGuests] = useState<string[]>(['Vous'])
    const [friends, setFriends] = useState<User[]>([])
    const [dropdownFriends, setDropdownFriends] = useState<{ title: string, id: string }[]>([])

    function getFriends() {
        // get friends from database
        let _friends = [
            new User('1', 'Jérome', 'Jérome'),
            new User('2', 'Fany', 'Fany'),
            new User('3', 'Eric', 'Eric'),
            new User('4', 'Marie', 'Marie'),
        ];

        setFriends(_friends);

        let _dropdownFriends = _friends
            .filter(friend => friend.firstname !== null && friend._id !== null)
            .map(friend => {
                return { title: friend.firstname!, id: friend._id! };
            });

        setDropdownFriends(_dropdownFriends);
    }

    function getGuestsFromIds(ids: string[]) {
        let _guests: User[] = [];
        ids.forEach(id => {
            let friend = friends.find(friend => friend._id === id);
            if (friend !== undefined && friend.firstname !== null) {
                _guests.push(friend);
            }
        });
        return _guests;
    }


    function createEvent() {
        if (eventDate === '' || startHour === '' || endHour === '' || title === '') {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez remplir tous les champs obligatoires.',
                type: 'danger',
                icon: 'danger'
            });
            return;
        }
        else if (new Date(eventDate) < new Date()) {
            showMessage({
                message: 'Erreur',
                description: 'La date de l\'évènement doit être supérieure à la date actuelle.',
                type: 'danger',
                icon: 'danger'
            });
            return;
        }
        else if (new Date(eventDate + ' ' + startHour) > new Date(eventDate + ' ' + endHour)) {
            showMessage({
                message: 'Erreur',
                description: 'L\'heure de fin doit être supérieure à l\'heure de début.',
                type: 'danger',
                icon: 'danger'
            });
            return;
        }
        else {
            let event = new Event(
                new Date(eventDate + ' ' + startHour),
                type,
                new User('1', 'Jérome', 'Jérome'),
                getGuestsFromIds(guests),
                title,
                description,
                startHour,
                endHour,
                'En attente',
            );
            showMessage({
                message: 'Succès',
                description: 'L\'évènement a bien été créé.',
                type: 'success',
                icon: 'success'
            });
            // TODO save event in database
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20 }}>
                <View style={{ gap: 10 }}>
                    <Title1 title="Nouvel évènement" />
                    <SmallText text="Vous pourrez le modifier par la suite." isLeft />
                </View>
                <Title2 title="Date et horaires" isLeft />
                <View style={styles.selectHoursContainer}>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={{
                            borderRadius: 16,
                            height: 50,
                            backgroundColor: eventDate === '' ? Colors.mainBlue : Colors.white,
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 2
                        }}>
                        <Title2
                            title={eventDate === '' ? 'Date' : eventDate}
                            color={eventDate === '' ? Colors.white : Colors.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setOpenStartHour(true)}
                        style={{
                            borderRadius: 16,
                            height: 50,
                            backgroundColor: startHour === '' ? Colors.mainBlue : Colors.white,
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                        <Title2
                            title={startHour === '' ? 'Début' : startHour}
                            color={startHour === '' ? Colors.white : Colors.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setOpenEndHour(true)}
                        style={{
                            borderRadius: 16,
                            height: 50,
                            backgroundColor: endHour === '' ? Colors.mainBlue : Colors.white,
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                        <Title2
                            title={endHour === '' ? 'Fin' : endHour}
                            color={endHour === '' ? Colors.white : Colors.black}
                        />
                    </TouchableOpacity>
                </View>
                <Title2 title='Participants' isLeft />
                <SelectDropDown
                    title="participants"
                    items={dropdownFriends}
                    onSelectItem={(item) => {
                        // if not in guests, add it
                        if (!guests.includes(item.title)) {
                            setGuests([...guests, item.title]);
                        }
                    }}
                />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {
                        guests.map((guest, index) => (
                            <DeletableField
                                key={index}
                                text={guest}
                                icon='trash'
                                color={Colors.mainRed}
                                onPressIcon={() => {
                                    let _guests = [...guests];
                                    _guests.splice(index, 1);
                                    setGuests(_guests);
                                }}
                            />
                        ))
                    }
                </View>
                <Title2 title='Détails' isLeft />
                <SelectDropDown
                    title="type d'évènement"
                    items={[{ title: 'Réunion' }, { title: 'Rendez-vous' }, { title: 'Autre' }]}
                    onSelectItem={() => { }}
                />
                <InputField
                    placeholder="Titre"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <InputField
                    placeholder="Descrpiton (optionnel)"
                    value={description}
                    isMultiline
                    onChangeText={(text) => setDescription(text)}
                />
            </ScrollView>

            <Button
                title={"Valider"}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={createEvent} />

            {
                openStartHour && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setOpenStartHour(false);
                            setDate(currentDate);
                            let hour = currentDate.getHours().toString();
                            let minute = currentDate.getMinutes().toString();
                            if (hour.length === 1)
                                hour = "0" + hour;

                            if (minute.length === 1)
                                minute = "0" + minute;

                            let stringHour = hour + ":" + minute;
                            setStartHour(stringHour);
                        }}
                    />
                )
            }
            {
                openEndHour && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setOpenEndHour(false);
                            setDate(currentDate);
                            let hour = currentDate.getHours().toString();
                            let minute = currentDate.getMinutes().toString();
                            if (hour.length === 1)
                                hour = "0" + hour;

                            if (minute.length === 1)
                                minute = "0" + minute;

                            let stringHour = hour + ":" + minute;
                            setEndHour(stringHour);
                        }}
                    />
                )
            }
            {
                open && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setOpen(false);
                            setDate(currentDate);
                            // add 0 to day and month if < 10
                            let day = currentDate.getDate().toString();
                            let month = (currentDate.getMonth() + 1).toString();
                            if (day.length === 1)
                                day = "0" + day;
                            if (month.length === 1)
                                month = "0" + month;

                            let stringDate = day
                                + "/" + month
                                + "/" + currentDate.getFullYear().toString();
                            setEventDate(stringDate);
                        }}
                    />
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70
    },
    selectHoursContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',

    }
})