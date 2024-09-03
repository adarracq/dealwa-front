import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import User from '../../../../models/User';
import Colors from '../../../../constants/Colors';
import HeaderArea from '../../../../components/containers/HeaderArea';
import IconText from '../../../../components/molecules/IconText';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type AgentSpecialitiesProps = {
    user: User;
}

export default function AgentSpecialities(props: AgentSpecialitiesProps) {

    const [specialities, setSpecialities] = useState([
        {
            id: 0,
            name: 'Transaction',
            icon: 'dollar',
            selected: props.user.specialities ? props.user.specialities.includes('0') : false
        },
        {
            id: 1,
            name: 'Gestion',
            icon: 'gestion',
            selected: props.user.specialities ? props.user.specialities.includes('1') : false
        },
        {
            id: 2,
            name: 'Location',
            icon: 'house',
            selected: props.user.specialities ? props.user.specialities.includes('2') : false
        }
    ]);

    const [languages, setLanguages] = useState([
        {
            id: 0,
            name: 'Allemand',
            icon: 'flag-germany',
            selected: props.user.languages ? props.user.languages.includes('0') : false
        },
        {
            id: 1,
            name: 'Anglais',
            icon: 'flag-uk',
            selected: props.user.languages ? props.user.languages.includes('1') : false
        },
        {
            id: 2,
            name: 'Arabe',
            icon: 'flag-arabic',
            selected: props.user.languages ? props.user.languages.includes('2') : false
        },
        {
            id: 3,
            name: 'Chinois',
            icon: 'flag-china',
            selected: props.user.languages ? props.user.languages.includes('3') : false
        },
        {
            id: 4,
            name: 'Espagnol',
            icon: 'flag-spain',
            selected: props.user.languages ? props.user.languages.includes('4') : false
        },
        {
            id: 5,
            name: 'Français',
            icon: 'flag-french',
            selected: props.user.languages ? props.user.languages.includes('5') : false
        },
        {
            id: 6,
            name: 'Italien',
            icon: 'flag-italy',
            selected: props.user.languages ? props.user.languages.includes('6') : false
        },
        {
            id: 7,
            name: 'Japonais',
            icon: 'flag-japan',
            selected: props.user.languages ? props.user.languages.includes('7') : false
        },
        {
            id: 8,
            name: 'Portugais',
            icon: 'flag-portugal',
            selected: props.user.languages ? props.user.languages.includes('8') : false
        },
        {
            id: 9,
            name: 'Russe',
            icon: 'flag-russia',
            selected: props.user.languages ? props.user.languages.includes('9') : false
        },
    ]);


    function removeUnselectedSpecAndLang() {
        setSpecialities(specialities.filter(spec => spec.selected));
        setLanguages(languages.filter(lang => lang.selected));
    }


    useEffect(() => {
        removeUnselectedSpecAndLang();
    }, [])

    return (
        <HeaderArea
            title='Statut et spécialisations'
            titleColor={Colors.mainBlue}
        >
            <View style={{ padding: 20, gap: 10 }} >
                <View style={styles.specContainer}>
                    <IconText
                        icon='briefcase'
                        text={props.user.status == '0' ? 'Indépendant' : 'Salarié'}
                        textColor={Colors.black}
                        iconColor={Colors.mainBlue}
                    />
                </View>
                {
                    specialities.length > 1 &&
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>

                        <View style={styles.specContainer}>
                            <IconText
                                icon={specialities[0].icon}
                                text={specialities[0].name}
                                textColor={Colors.black}
                                iconColor={Colors.mainBlue}
                            />
                        </View>
                        <View style={styles.specContainer}>
                            <IconText
                                icon={specialities[1].icon}
                                text={specialities[1].name}
                                textColor={Colors.black}
                                iconColor={Colors.mainBlue}
                            />
                        </View>

                    </View>
                }
                {
                    specialities.length == 1 &&
                    <View style={styles.specContainer}>
                        <IconText
                            icon={specialities[0].icon}
                            text={specialities[0].name}
                            textColor={Colors.black}
                            iconColor={Colors.mainBlue}
                        />
                    </View>
                }
                {
                    specialities.length > 2 &&
                    <View style={styles.specContainer}>
                        <IconText
                            icon={specialities[2].icon}
                            text={specialities[2].name}
                            textColor={Colors.black}
                            iconColor={Colors.mainBlue}
                        />
                    </View>
                }
                {
                    // group laguages by 2 and display them in a row
                    languages.length % 2 == 0 &&
                    languages.map((lang, index) => {
                        if (index % 2 == 0) {
                            return (
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }} key={index}>
                                    <View style={styles.specContainer}>
                                        <IconText
                                            icon={lang.icon}
                                            text={lang.name}
                                            textColor={Colors.black}
                                            iconColor={Colors.mainBlue}
                                        />
                                    </View>
                                    <View style={styles.specContainer}>
                                        <IconText
                                            icon={languages[index + 1].icon}
                                            text={languages[index + 1].name}
                                            textColor={Colors.black}
                                            iconColor={Colors.mainBlue}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    })
                }
                {
                    // display the last language if the number of languages is odd
                    languages.length % 2 != 0 &&
                    languages.map((lang, index) => {
                        if (index % 2 == 0 && index != languages.length - 1) {
                            return (
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }} key={index}>
                                    <View style={styles.specContainer}>
                                        <IconText
                                            icon={lang.icon}
                                            text={lang.name}
                                            textColor={Colors.black}
                                        />
                                    </View>
                                    <View style={styles.specContainer}>
                                        <IconText
                                            icon={languages[index + 1].icon}
                                            text={languages[index + 1].name}
                                            textColor={Colors.black}
                                        />
                                    </View>
                                </View>
                            )
                        }
                        if (index == languages.length - 1) {
                            return (
                                <View style={styles.specContainer} key={index}>
                                    <IconText
                                        icon={lang.icon}
                                        text={lang.name}
                                        textColor={Colors.black}
                                    />
                                </View>
                            )
                        }
                    })
                }
            </View>
        </HeaderArea>
    )
}

const styles = StyleSheet.create({
    specContainer: {
        backgroundColor: Colors.lightGrey,
        padding: 8,
        borderRadius: 8,
        width: '48%'
    }
})
