import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ImageBackground} from "react-native";
import {Actions} from 'react-native-router-flux';
import {Input, Button, ListItem, Divider, Overlay} from 'react-native-elements';
import {colors, fonts} from "res/index";
import BackIcon from 'react-native-vector-icons/FontAwesome';
import WarnIcon from 'react-native-vector-icons/Entypo';
import {inject, observer} from "mobx-react";
import SelectMultiple from '@quanterdynamic/react-native-multiple-select';
import moment from 'moment';
import {TextInputMask} from 'react-native-masked-text';

@inject('authStore')
@observer
class AddTask extends Component {

    state = {
        selectedWorker: [],
        isVisible: false,
        taskName: '',
    };

    selectWorker = (select) => {
        this.setState({selectedWorker: select, isVisible: true});

    };
    saveTask = async () => {
        const {authStore, projectName, workers, dueDate} = this.props;
        const {selectedWorker, taskName} = this.state;
        await authStore.setTaskDatabase(projectName, taskName, selectedWorker);
        await authStore.loadProjectDatabase();
        authStore.tasks.push({worker:selectedWorker.name,taskDescription:taskName});
        this.setState({isVisible:false});
        Actions.project({projectName: projectName, workers: workers, dueDate: dueDate});
    };

    render() {
        const {workers, tasks} = this.props;

        return (
            <View>
                <StatusBar hidden={true}/>
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(0, 0, 0, .5)"
                    overlayBackgroundColor='rgba(0, 0, 0, 0.3)'
                    onBackdropPress={() => this.setState({isVisible: false})}
                    width="auto"
                    height="auto"
                    overlayStyle={styles.overlayContainer}
                >
                    <View style={styles.overlayIn}>
                        <Text style={{color: colors.white}}>{this.state.selectedWorker.name}</Text>
                        <Input
                            placeholder="Enter the Task Description"
                            containerStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholderTextColor={colors.white}
                            onChangeText={(taskName) => this.setState({taskName: taskName})}
                        />
                        <TouchableOpacity style={styles.overlayButton}
                                          onPress={() => this.saveTask()}>
                            <Text style={styles.addTaskButtonText}>Add Task</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={Actions.pop}
                >
                    <BackIcon name={'reply-all'}
                              size={25}
                              color={colors.white}
                    />
                </TouchableOpacity>
                <ScrollView>
                    {
                        workers.map((l, i) => (
                                <TouchableOpacity key={i} onPress={() => this.selectWorker(l)
                                }
                                >
                                    <ListItem
                                        key={i}
                                        title={l.name}
                                        subtitle={l.mastery}
                                        bottomDivider
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

export default AddTask;
const styles = StyleSheet.create({

    inputStyle: {
        width: 300,
    },
    inputContainer: {
        borderColor: colors.white,
    },
    overlayContainer: {
        borderRadius: 20,
        borderWidth: 4,
        borderColor: colors.black50,
    },
    overlayIn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTaskButtonText: {
        color: colors.white,
        fontFamily: fonts.avenirMedium,
        fontSize: 16,
        marginLeft: 5,
    },
    overlayButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.white,
        borderRadius: 15,
        height: 40,
        width: 150,
        marginTop: 20,
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
