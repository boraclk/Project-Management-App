import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {Input, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors, fonts} from 'res';
import {Actions} from 'react-native-router-flux';
import {inject, observer} from 'mobx-react';


@inject('authStore')
@observer
class Login extends Component {
    render() {
        const {authStore} = this.props;
        return (
            <ImageBackground style={styles.backgroundImage} source={images.loginImage}>
                <Overlay
                    isVisible={authStore.loginModal}
                    onBackdropPress={() => authStore.resetModal()}
                    width="auto"
                    height="auto"
                    overlayStyle={styles.overlayContainer}
                >
                    <View>
                        <Text></Text>
                    </View>
                </Overlay>
                <StatusBar hidden={true}/>
                <View style={{alignItems: 'center'}}>
                    <Input
                        containerStyle={styles.textInputContainer}
                        inputStyle={styles.textInput}
                        placeholder="E-mail"
                        value={authStore.email}
                        onChangeText={(email) => authStore.setEmail(email)}
                        leftIcon={
                            <Icon
                                name="envelope"
                                size={24}
                                color={colors.black50}
                            />
                        }
                    />
                    <Input
                        containerStyle={styles.textInputContainer}
                        inputStyle={styles.textInput}
                        placeholder="Password"
                        value={authStore.password}
                        secureTextEntry={true}
                        onChangeText={(password) => authStore.setPassword(password)}
                        leftIcon={
                            <Icon
                                name="lock"
                                size={33}
                                color={colors.black50}
                            />
                        }
                    />
                    <TouchableOpacity
                        style={styles.loginButtonStyle}
                        onPress={() => authStore.login()}>
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.miniButtonsDirection}>
                        <TouchableOpacity
                            style={styles.miniButton}
                            onPress={Actions.register}>
                            <Text style={styles.miniButtonText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.miniButton}>
                            <Text style={styles.miniButtonText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default Login;
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlayContainer: {
        borderRadius: 20,
        borderWidth: 4,
        borderColor: colors.brightBlue60
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
    textInputContainer: {
        width: 300,
        marginVertical: 5,
    },
    textInput: {
        marginLeft: 10,
        fontFamily: fonts.avenirMedium,
    },
    miniButtonsDirection: {
        flexDirection: 'row',
        marginTop: 10,
    },
    miniButton: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    miniButtonText: {
        textDecorationLine: 'underline',
        fontFamily: fonts.avenirMedium,
        fontSize: 15,
        color: colors.black,
    },
});
