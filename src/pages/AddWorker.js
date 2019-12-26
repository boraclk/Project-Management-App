import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ImageBackground
} from "react-native";
import {Input, Button, ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors, fonts} from 'res';
import {inject, observer} from "mobx-react";
import SelectMultiple from '@quanterdynamic/react-native-multiple-select'

const renderLabel = (item) => {
    return (
        <View style={{marginLeft: 15, borderRadius: 25}}>
            <Text style={[{marginLeft: 0, fontFamily: fonts.avenirMedium, fontSize: 17}]}>{item.name}</Text>
            <Text style={[{marginLeft: 0, fontFamily: fonts.avenirMedium, color: colors.black50}]}>{item.mastery}</Text>
        </View>
    )
};

@inject('authStore')
@observer
class AddWorker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            selectedPeople: [],
        };
    }

    componentDidMount() {
        const {authStore} = this.props;
        this.setState({
            people: authStore.otherUsers
        })
    }

    onSelectionsChange = (selectedPeople) => {
        this.setState({selectedPeople})
    };


    render() {
        const {authStore} = this.props;

        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={styles.searchAreaDirection}>
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
                        containerStyle={styles.searchStyle}
                        inputContainerStyle={styles.input}
                        inputStyle={styles.searchTextStyle}
                        placeholder="Seach the Worker"
                        placeholderTextColor={'rgba(0, 0, 0, 0.2)'}
                        leftIcon={<Icon name={'search'} size={21} color={colors.muted}/>}
                        leftIconContainerStyle={styles.searchIcon}
                    />
                </View>
                <View style={styles.workerCountDirection}>
                    <Text style={styles.workerCount}>Workers ({authStore.otherUsers.length}) </Text>
                    <TouchableOpacity style={styles.addButton}
                                      onPress={() => authStore.addWorker(this.state.selectedPeople)}>
                        <Icon
                            name={'user-plus'}
                            size={25}
                            color={colors.white}
                        />
                        <Text style={styles.addButtonText}>
                            Add Workers
                        </Text>
                    </TouchableOpacity>
                </View>
                <SelectMultiple
                    rowStyle={styles.listContainer}
                    items={authStore.otherUsers}
                    renderLabel={renderLabel}
                    selectedItems={this.state.selectedPeople}
                    onSelectionsChange={this.onSelectionsChange}/>
            </View>
        );
    }
}

export default AddWorker;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    searchAreaDirection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    searchStyle: {
        paddingLeft: 20,
        marginLeft: 60,
        width: 270,
        height: 41,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    searchTextStyle: {
        marginTop: 5,
        marginLeft: 15,
        width: 100,
        fontSize: 16,
        fontFamily: fonts.avenirMedium,
        letterSpacing: 0.06,
    },
    searchIcon: {
        marginBottom: 5,
        marginLeft: 'auto',
        paddingLeft: 5,
    },
    input: {
        borderBottomWidth: 0,
    },
    workerCount: {
        fontFamily: fonts.avenirMedium,
        fontSize: 25,
        fontStyle: 'normal',
        letterSpacing: 0.08,
        color: colors.black,
    },
    workerCountDirection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 20,
        marginHorizontal: 30,
    },
    listContainer: {
        marginHorizontal: 10,
        marginVertical: 4,
        backgroundColor: colors.white,
        borderRadius: 15,
    },
    addButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 2,
        width: 150,
    },
    addButtonText: {
        marginLeft: 5,
        fontFamily: fonts.avenirMedium,
        color: colors.white,
    },
    backButton: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black50,
        width: 30,
        height: 30,
        borderRadius: 40,
    },
});
