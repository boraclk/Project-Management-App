import {observable, action} from 'mobx';
import firebase from 'react-native-firebase'
import {Actions} from "react-native-router-flux";
import {TouchableOpacity} from "react-native";
import {ListItem} from "react-native-elements";
import {fonts} from "res/index";
import React from "react";
import * as stores from "~/store/index";

class AuthStore {
    @observable project;
    @observable user;
    @observable email;
    @observable password;
    @observable username;
    @observable mastery;
    @observable loginModal;
    otherUsers = [];
    workers = [];
    @observable projects;

    constructor() {
        this.project = null;
        this.user = null;
        this.email = null;
        this.password = null;
        this.username = null;
        this.mastery = null;
        this.projects = [];
        this.loginModal = false;
        this.tasks = null;
    }

    @action
    resetModal = () => {
        this.loginModal = false;
    };
    @action
    setModal = () => {
        this.loginModal = true;
    };
    @action
    login = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => Actions.manage())
            .catch(error => console.warn(error));
        this.existingUser();
    };
    @action
    loadOtherUsers = async () => {
        this.otherUsers = [];
        const querySnapshot = await firebase.firestore().collection('users').get();
        querySnapshot.forEach((documentSnapshot) => {
            if (this.user.uid !== documentSnapshot.data().uid) {
                const x = documentSnapshot.data();
                this.otherUsers.push({...x, id: x.uid});
            }
        });
    };
    @action
    addWorker = worker => {
        const ref = firebase.firestore().collection('users');
        worker.map((l, i) => (
            ref.doc(this.user.uid).update({
                workers: firebase.firestore.FieldValue.arrayUnion(ref.doc(l.uid)),
            })
        ));

        Actions.manage();
    };

    @action
    async loadUser(user) {
        this.user = user;
        const ref = firebase.firestore().collection('users');

        ref.doc(user.uid).onSnapshot(snapshot => {
            this.user = snapshot.data();
        });
    }


    @action
    setTasks = (task) => {
        this.tasks=task;
    };
    @action
    resetTasks = () => {
        this.tasks=[];
    };
    @action
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => Actions.manage)
            .catch(error => console.warn(error))
    };
    @action
    setProjectDatabase = (name, date, projectWorkers) => {
        const projectRef = firebase.firestore().collection('projects');
        projectRef.doc(name).set({
            projectName: name,
            dueDate: date,
            tasks: [],
        });
        const userRef = firebase.firestore().collection('users');
        projectWorkers.map((l, i) => (
            projectRef.doc(name).update({
                projectWorkers: firebase.firestore.FieldValue.arrayUnion(userRef.doc(l.uid)),
            })
        ));
    };
    @action
    setTaskDatabase = async (projectName, taskName, worker) => {
        const taskRef = firebase.firestore().collection('tasks');
        const userRef = firebase.firestore().collection('users');
        const projectRef = firebase.firestore().collection('projects');
        taskRef.doc(taskName).set({
            taskDescription: taskName,
            worker: worker.name,
        });
        await projectRef.doc(projectName).update({
            tasks: firebase.firestore.FieldValue.arrayUnion(taskRef.doc(taskName)),
        });
    };

    @action
    loadProjectDatabase = async () => {
        this.projects = [];
        const querySnapshot = await firebase.firestore().collection('projects').get();

        for (let i = 0; i < querySnapshot.size; i++) {
            const documentSnapshot = await querySnapshot.docs[i];

            const data = await documentSnapshot.data();

            const projectWorkers = await Promise.all(data.projectWorkers.map(async projectWorkers => {
                return (await projectWorkers.get()).data();
            }));
            const tasks = await Promise.all(data.tasks.map(async tasks => {
                return (await tasks.get()).data();
            }));
            this.projects.push({...data, projectWorkers, tasks});
        }


    };
    @action
    setUser = user => {
        this.user = user;
    };
    @action
    setEmail = email => {
        this.email = email;
    };
    @action
    setPassword = password => {
        this.password = password;
    };
    @action
    setUserDatabase = () => {
        const user = firebase.auth().currentUser;
        this.setUser(user);
        const ref = firebase.firestore().collection('users');
        ref.doc(this.user.uid).set({
            id: this.user.uid,
            uid: this.user.uid,
            email: this.user.email,

        });
    };
    @action
    existingUser = () => {
        const user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection('users');
        this.setUser(user);
        ref.doc(this.user.uid).onSnapshot(async snapshot => {
            const data = {
                ...snapshot.data(),
            };
            const workers = await Promise.all(
                data.workers.map(async workers => {
                    return (await workers.get()).data();
                })
            );
            this.user = {...data, workers};

        });
    };

    @action
    setProject = project => {
        this.project = project;
    };

    @action
    setMastery = mastery => {
        this.mastery = mastery;
    };
    @action
    setUsername = username => {
        this.username = username;
    };
    @action
    setUserSettingsDatabase = () => {
        const ref = firebase.firestore().collection('users');
        ref.doc(this.user.uid).update({
            name: this.username,
            mastery: this.mastery,
        });
    };

}

const authStore = new AuthStore();

export default authStore;
export {AuthStore};
