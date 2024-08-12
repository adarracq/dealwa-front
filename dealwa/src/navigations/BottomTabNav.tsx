import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import TabBarElement from '../components/molecules/TabBarElement';
import ShopScreen from '../screens/shopScreen/ShopScreen';
import ProjectsScreen from '../screens/projectsScreen/ProjectsScreen';
import CalendarScreen from '../screens/calendarScreen/CalendarScreen';
import MapScreen from '../screens/mapScreen/MapScreen';
import MessagesScreen from '../screens/messagesScreen/MessagesScreen';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

type BottomTabNavProps = {
    agent?: boolean;
}


export default function BottomTabNav(props: BottomTabNavProps) {
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
                component={props.agent ? ShopScreen : ProjectsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: props.agent ? 'Boutique' : 'Projets',
                            focused: focused,
                            name: props.agent ? 'shop' : 'projects',
                        })
                    ),

                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
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
                component={MapScreen}
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
                component={MessagesScreen}
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
                component={ProfileScreen}
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
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: Colors.mainBlue,
        paddingLeft: 10,
        paddingRight: 10,
    },
})