import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {images, colors, fonts} from 'res';
import {Divider, ListItem} from "react-native-elements";
import {Actions} from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Foundation';
import firebase from 'react-native-firebase'
import {inject, observer} from "mobx-react";


@inject('authStore')
@observer
class Manage extends Component {

    gotoAddWorker = async () => {
        const {authStore} = this.props;
        await authStore.loadOtherUsers();
        Actions.addWorker();
    };

    render() {
        const {authStore} = this.props;
        return (
            <View style={styles.backgroundImage}>
                <StatusBar hidden={true}/>
                <TouchableOpacity
                    onPress={() => Actions.profile()}
                    style={styles.settingsButton}>
                    <Icon1
                        name={'gear'}
                        size={30}
                        color={colors.black50}
                    />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', marginTop: 30,marginBottom:30}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Manager</Text>
                    <Text style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 20}}>
                        " {authStore.user.name} "
                    </Text>
                </View>
                <View style={styles.buttonsDirection}>
                    <TouchableOpacity
                        onPress={this.gotoAddWorker}
                        style={styles.buttonStyle}>
                        <Icon1
                            name={'user-plus'}
                            size={25}
                            color={colors.white}
                        />
                        <Text style={styles.buttonText}>
                            Add Worker
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Actions.addProject()}
                        style={styles.buttonStyle}>
                        <Icon2
                            name={'folder-add'}
                            size={26}
                            color={colors.white}
                        />
                        <Text style={styles.buttonText}>
                            Add Project
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.projectsTextContainer}>
                    <Text style={styles.projectsText}>Projects ({authStore.projects.length})</Text>
                </View>
                <Divider style={styles.divider}/>
                <ScrollView>
                    {
                        authStore.projects.map((l, i) => (
                                <TouchableOpacity key={i}
                                                  onPress={() => Actions.project({
                                                      projectName: l.projectName,
                                                      dueDate: l.dueDate,
                                                      workers: l.projectWorkers,
                                                  })}>
                                    <ListItem
                                        key={i}
                                        title={l.projectName}
                                        subtitle={l.dueDate}
                                        bottomDivider
                                        containerStyle={styles.listContainer}
                                        titleStyle={{fontFamily: fonts.avenirMedium, color: colors.white}}
                                    />
                                </TouchableOpacity>
                            )
                        )
                    }
                </ScrollView>
            </View>
        );
    }
}

export default Manage;
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    settingsButton: {
        position: 'absolute',
        left: 20,
        top: 25,
    },
    buttonsDirection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 30,
        marginHorizontal: 35
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor:colors.black50,
        borderWidth: 2,
        borderRadius: 10,
        height: 100,
        width: 155,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
    },
    buttonText: {
        fontFamily: fonts.avenirMedium,
        fontSize: 20,
        color: 'white',
    },
    divider: {
        backgroundColor: colors.black50,
        height: 3,
    },
    listContainer: {
        marginVertical: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 4,
    },
    projectsTextContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        height: 60,
        justifyContent: 'center',
    },
    projectsText: {
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.white,
    },
});
