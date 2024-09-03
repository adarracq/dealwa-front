import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Project from '../../../../models/Project'
import BottomArea from '../../../../components/containers/BottomArea';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../../../constants/Colors';
import Title1 from '../../../../components/atoms/Title1';
import Button from '../../../../components/molecules/Button';
import IconButton from '../../../../components/molecules/IconButton';
import BodyText from '../../../../components/atoms/BodyText';
import Title2 from '../../../../components/atoms/Title2';

type Props = {
    project: Project;
    onClose: () => void;
    onSeeProject: (project: Project) => void;
}

export default function ProjectView(props: Props) {

    const color = props.project.type == 0 ? Colors.mainBlue : Colors.mainRed;

    return (
        <BottomArea>
            <AntDesign
                name="closecircleo"
                size={24}
                color={Colors.darkGrey}
                style={styles.closeBtn}
                onPress={props.onClose}
            />
            <View style={{
                gap: 32,
            }}>
                <View style={{
                    padding: 16,
                    backgroundColor: color,
                    borderRadius: 16,
                    marginHorizontal: '20%'
                }}>
                    <Title1
                        title={props.project.type == 0 ? "PROJET D'ACHAT" : "PROJET DE VENTE"}
                        color={Colors.white}
                        centered />
                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Title1 title={props.project.user_firstname} />
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8
                    }}>
                        <IconButton
                            icon='heart_empty'
                            backgroundColor={Colors.lightGrey}
                            iconColor={Colors.white}
                            onPress={() => console.log('add')}
                        />
                        <IconButton
                            icon='message'
                            backgroundColor={color}
                            iconColor={Colors.white}
                            onPress={() => console.log('add')}
                        />
                    </View>
                </View>

                <View style={{
                    backgroundColor: Colors.white,
                    padding: 16,
                    borderRadius: 16,
                }}>
                    <View style={{
                        position: 'absolute',
                        top: -10,
                        left: 20,
                        borderRadius: 16,
                    }}>
                        <Title2
                            title={'Description'}
                            color={color}
                        />
                    </View>
                    <BodyText text={props.project.description} />
                </View>


                <Button
                    title="Voir le projet"
                    backgroundColor={color}
                    textColor={Colors.white}
                    onPress={() => props.onSeeProject(props.project)} />
            </View>
        </BottomArea>
    )
}

const styles = StyleSheet.create({
    closeBtn: {
        position: 'absolute',
        top: 24,
        right: 24
    }
})