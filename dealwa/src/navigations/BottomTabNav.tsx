import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import TabBarElement from '../components/molecules/TabBarElement';
import { UserContext } from '../contexts/UserContext';
import MessagesNav from './MessagesNav';
import ProfileNav from './ProfileNav';
import ShopNav from './ShopNav';
import ProjectsNav from './ProjectsNav';
import CalendarNav from './CalendarNav';
import AgentMapNav from './AgentMapNav';
import UserMapNav from './UserMapNav';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from './Nav';


export type BottomNavParams = {
    ShopOrProject: undefined;
    Calendar: undefined;
    Map: undefined;
    Messages: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomNavParams>();

type Props = NativeStackScreenProps<NavParams, 'Home'>;

export default function BottomTabNav({ navigation, route }: Props) {
    const [userData, setUserData] = useContext(UserContext);
    const [isAgent, setIsAgent] = useState(false);

    useEffect(() => {
        if (!userData)
            navigation.navigate('Landing');
        else if (userData.type == 'agent')
            setIsAgent(true);
    }, [userData]);

    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={{
                tabBarStyle: { ...styles.tabBarStyle },
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="ShopOrProject"
                component={ProjectsNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Projets',
                            focused: focused,
                            name: 'projects',
                        })
                    ),

                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Calendrier',
                            focused: focused,
                            name: 'calendar'
                        })
                    ),

                }}
            />
            <Tab.Screen
                name="Map"
                component={isAgent ? AgentMapNav : UserMapNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Carte',
                            focused: focused,
                            name: 'map'
                        })
                    ),

                }}
            />
            <Tab.Screen
                name="Messages"
                component={MessagesNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Messages',
                            focused: focused,
                            name: 'messages'
                        })
                    ),

                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Profil',
                            focused: focused,
                            name: 'profile'
                        })
                    ),

                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Colors.black,
        paddingLeft: 10,
        paddingRight: 10,
    },
})