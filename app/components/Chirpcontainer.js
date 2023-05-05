import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

function Chirpcontainer(props) {
    return (
        <View style={styles.chirpcontainer}>

            <TouchableOpacity
                style={styles.userinfo}
                onPress={() => {console.log('user')}}
            >
                <View style={styles.profilepic}></View>
                <Text>Name</Text>
                <Text style={{fontSize: 15}}>@username</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.text}
                onPress={() => {console.log('chirp')}}
            >
                <Text>{props.chirp}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.likebutton}
                onPress={() => {console.log('like')}}
            >
                <Feather name="heart" size={35} color="black" />
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    chirpcontainer :{
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: 'slategrey',
        margin: 5,
        borderTopWidth: 1,
        flex: 1,
        flexDirection: 'row'
    },
    text :{
        padding: 10,
        flex: 5
    },
    likebutton:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    profilepic: {
        backgroundColor: 'grey',
        width: 60,
        height: 60,
        borderRadius: 100,
        borderColor: 'slategrey',
        borderWidth: 3,
    },
    userinfo: {
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    }
})

export default Chirpcontainer;