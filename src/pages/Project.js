import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {colors, fonts} from "res/index";
import {Actions} from "react-native-router-flux";
import BackIcon from 'react-native-vector-icons/FontAwesome';
import AddIcon from 'react-native-vector-icons/Entypo';
import {Divider, ListItem, Overlay} from "react-native-elements";
import {inject, observer} from "mobx-react";


@inject('authStore')
@observer
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: '',
            isVisible: false,
        };
    }

    render() {
        const {workers, projectName, dueDate, authStore, tasks} = this.props;

        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={()=>Actions.manage()}
                >
                    <BackIcon name={'reply-all'}
                              size={25}
                              color={colors.white}
                    />
                </TouchableOpacity>
                <View style={styles.textDirection}>
                    <Text style={styles.projectText}>
                        {projectName}
                    </Text>
                    <Text style={styles.projectText}>
                        Until {dueDate}
                    </Text>
                </View>
                <Text></Text>
                <TouchableOpacity onPress={() => Actions.addTask(
                    {workers: workers, dueDate: dueDate, projectName: projectName,tasks:tasks})}>
                    <AddIcon name={'circle-with-plus'}
                             size={40}
                             color={colors.black50}
                    />
                </TouchableOpacity>
                <ScrollView>
                    {
                        authStore.tasks.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.taskDescription}
                                    subtitle={l.worker}
                                    bottomDivider
                                    containerStyle={styles.listContainer}
                                    titleStyle={{fontFamily: fonts.avenirMedium, color: colors.black}}
                                />
                            )
                        )
                    }
                </ScrollView>

            </View>
        );
    }
}

export default Project;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    overlayContainer: {
        alignItems: 'center',
        borderRadius: 20,

        borderColor: colors.black,
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
    textDirection: {
        alignItems: 'center',
    },
    projectText: {
        fontFamily: fonts.avenirMedium,
        fontSize: 25,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black50,
        width: 30,
        height: 30,
        borderRadius: 40,
        marginLeft: 20,
        marginTop: 25,
    },
});
