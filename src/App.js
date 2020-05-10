import React from 'react';
import {StyleSheet} from 'react-native';
import {Lightbox, Router, Scene, Tabs} from 'react-native-router-flux';
import {TabIcon} from '~/components/navigation';
import {
    HomeScreen,
    ProjectScreen,
    LoginScreen,
    ManageScreen,
    AddProjectScreen,
    AddWorkerScreen,
    RegisterScreen,
    ProfileSettings,
    AddTaskScreen,
} from '~/pages';
import {colors} from 'res';
import {AlertLightBox} from '~/components/modals';
import * as stores from '~/store';
import {Provider} from 'mobx-react';
import CustomAlert from '~/components/modals/CustomAlert';


export default class App extends React.Component {
    async componentDidMount(): void {
        await stores.authStore.loadProjectDatabase();
    };
    render() {
        return (
            <Provider {...stores}>
                <Router
                    sceneStyle={styles.scene}
                    tabBarStyle={styles.tabBar}
                    titleStyle={styles.title}
                    tintColor={colors.headerTint}
                    headerTintColor={colors.headerTint}>
                    <Lightbox key="lightbox" hideNavBar>
                        <Scene key="root">
                            <Scene key={'login'} component={LoginScreen} hideNavBar/>
                            <Scene key={'project'} component={ProjectScreen} hideNavBar/>
                            <Scene key={'home'} component={HomeScreen} hideNavBar/>
                            <Scene key={'addWorker'} component={AddWorkerScreen} hideNavBar/>
                            <Scene key={'register'} component={RegisterScreen} hideNavBar/>
                            <Scene key={'manage'} component={ManageScreen} iconName={'group'} hideNavBar/>
                            <Scene key={'profile'} component={ProfileSettings} hideNavBar/>
                            <Scene key={'addProject'} component={AddProjectScreen} hideNavBar/>
                            <Scene key={'addTask'} component={AddTaskScreen} hideNavBar/>
                            <Tabs icon={TabIcon} showLabel={false} hideNavBar={false}>
                                <Scene key={'manage'} component={ManageScreen} iconName={'group'} hideNavBar/>
                            </Tabs>
                            <Scene key="alert" headerLayoutPreset="center" component={AlertLightBox}/>
                            <Scene key="customAlert" headerLayoutPreset="center" component={CustomAlert}/>
                        </Scene>
                    </Lightbox>
                </Router>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    scene: {backgroundColor: colors.background},
    tabBar: {backgroundColor: colors.lightGray},
});
