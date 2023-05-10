import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

function Chirpcontainer(props) {
    let difference = props.today - props.time
    let unit = "s"
    difference = parseInt(difference * 0.001)

    if (difference > 60){
        difference = parseInt(difference/60)
        unit = 'm'
        if (difference > 60){
            difference = parseInt(difference/60)
            unit = 'h'
            if (difference > 24){
                difference = parseInt(difference/24)
                unit = 'd'
                if (difference > 365){
                    difference = parseInt(difference/365)
                    unit = 'y'
                }
            }
        }
    }

    return (
        <>
            <View style={styles.chirpcontainer}>

                <TouchableOpacity
                    style={styles.userinfo}
                    onPress={() => {console.log('user')}}
                >
                    <Image style={styles.profilepic} source={require('../../assets/icon.png')}/>
                    
                    <Text>{props.name}</Text>
                    <Text style={{fontSize: 12}}>{props.username}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.text}
                    onPress={() => {console.log('chirp')}}
                >
                    <Text>{props.chirp}</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity
                        style={styles.likebutton}
                        onPress={props.onLike}
                    >
                        <Feather name="heart" size={35} color="grey" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.likebutton}
                        onPress={props.onReply}
                    >
                        <Feather name="message-circle" size={30} color="grey" />
                    </TouchableOpacity>
                </View>
                
            </View>

            <View>
                <Text style={{textAlign: 'center', fontSize: 10}}>{difference}{unit} ago</Text>
            </View>
        </>
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