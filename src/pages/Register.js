import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, fonts, images} from "res/index";
import {Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from "react-native-router-flux";
import firebase from 'react-native-firebase'
class Register extends Component {
    state = {
        email: '',
        password: '',
        errorMasage: null,
    };
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => console.warn('fsdfsdgs'))
            .catch(error => this.setState({ errorMessage: error.message }))
    };
    render() {

        return (
            <ImageBackground style={styles.backgroundImage} source={images.loginImage}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={Actions.pop}
                >
                    <Icon name={'reply-all'}
                          size={25}
                          color={colors.white}
                    />
                </TouchableOpacity>
                <Input
                    containerStyle={styles.textInputContainer}
                    inputStyle={styles.textInput}
                    placeholder="E-mail"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    leftIcon={
                        <Icon
                            name="envelope"
                            size={25}
                            color={colors.black50}
                        />
                    }
                />
                <Input
                    containerStyle={styles.textInputContainer}
                    inputStyle={styles.textInput}
                    placeholder="Name Surname"

                    leftIcon={
                        <Icon
                            name="user"
                            size={30}
                            color={colors.black50}
                        />
                    }
                />
                <Input
                    containerStyle={styles.textInputContainer}
                    inputStyle={styles.textInput}
                    placeholder="Password"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    leftIcon={
                        <Icon
                            name="lock"
                            size={35}
                            color={colors.black50}
                        />
                    }
                />
                <TouchableOpacity
                    onPress={this.handleSignUp}
                    style={styles.loginButtonStyle}>
                    <Text style={styles.loginButtonText}>
                        Register
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

export default Register;
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position:'absolute',
        left:25,
        top:25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black50,
        width: 30,
        height: 30,
        borderRadius: 40,
    },
    textInputContainer: {
        width: 300,
        marginVertical: 10,
    },
    textInput: {
        marginLeft: 10,
        fontFamily: fonts.avenirMedium,
    },
    loginButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 300,
        marginTop: 20,
        borderRadius: 50,
        backgroundColor: colors.brightBlue60,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 17,
        fontFamily: fonts.avenirMedium,
    },
});
