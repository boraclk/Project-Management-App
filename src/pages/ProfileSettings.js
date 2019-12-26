import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,StatusBar} from "react-native";
import {images, colors, fonts} from 'res';
import {Input, Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from "react-native-router-flux";
import {inject, observer} from "mobx-react";

@inject('authStore')
@observer
class ProfileSettings extends Component {

    saveChanges = () => {
        const {authStore} = this.props;
        authStore.setUserSettingsDatabase();
        Actions.manage();
    };

    render() {
        const {authStore} = this.props;
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true} />
                <View style={styles.topButtons}>
                    <TouchableOpacity style={styles.backButton}
                                      onPress={Actions.pop}
                    >
                        <Icon name={'reply-all'}
                              size={25}
                              color={colors.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon
                            name={'sign-out'}
                            size={25}
                            color={colors.white}
                        />
                        <Text style={styles.buttonText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputDirections}>
                    <Input containerStyle={styles.inputContainer}
                           inputStyle={styles.inputTextStyle}
                           placeholder={authStore.username? authStore.username:'Change the Username'}
                           onChangeText={(username) => authStore.setUsername(username)}
                           leftIcon={
                               <Icon
                                   name="user"
                                   size={30}
                                   color={colors.black50}
                               />
                           }
                    />
                    <Input containerStyle={styles.inputContainer}
                           inputStyle={styles.inputTextStyle}
                           placeholder={authStore.mastery?authStore.mastery:'Change the Mastery'}
                           onChangeText={(mastery) => authStore.setMastery(mastery)}
                           leftIcon={
                               <Icon
                                   name="user-secret"
                                   size={30}
                                   color={colors.black50}
                               />
                           }
                    />
                    <TouchableOpacity style={styles.button}
                                      onPress={this.saveChanges}
                    >
                        <Icon
                            name={'save'}
                            size={25}
                            color={colors.white}
                        />
                        <Text style={styles.buttonText}>
                            Save Changes
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default ProfileSettings;
const styles = StyleSheet.create({
    topButtons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 25,
        marginHorizontal: 20,

    },
    inputDirections: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
    },
    inputContainer: {
        marginVertical: 10,
    },
    inputTextStyle: {
        marginTop: 5,
        marginLeft: 10,
        width: 100,
        fontSize: 20,
        fontFamily: fonts.avenirMedium,
        letterSpacing: 0.06,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black50,
        width: 30,
        height: 30,
        borderRadius: 40,
    },
    infoDirection:{
        marginTop:10,
      marginLeft:15,
    },
    infoText: {
        fontSize:20,
        fontFamily: fonts.avenirMedium,
        color: colors.black50,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 2,
        width: 150,
        height: 50,
        marginTop: 20,
        marginRight: 25,

    },
    buttonText: {
        marginLeft: 5,
        fontFamily: fonts.avenirMedium,
        color: colors.white,
    },
});
