import React from 'react';
import { TextInput, View, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

function Mysearchbar(props) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safearea}>
                <Feather name="search" size={30} color="black" />
                <View style={styles.pill}>
                    <TextInput placeholder='Search chirper'></TextInput>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 90,
        alignItems: 'center'
    },
    pill: {
        backgroundColor: "slategrey",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: "20%",
        flex: 1,
    },
    safearea: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    }

})

export default Mysearchbar;