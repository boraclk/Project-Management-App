import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {colors, fonts} from "res/index";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Divider, ListItem} from "react-native-elements";
import {inject, observer} from "mobx-react";

@inject('authStore')
@observer
class Project extends Component {
    render() {
        const {workers, projectName, dueDate} = this.props;
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={Actions.pop}
                >
                    <Icon name={'reply-all'}
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
                <ScrollView>
                    {
                        workers.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    subtitle={l.mastery}
                                    bottomDivider
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
