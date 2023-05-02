import React from 'react';
import { View } from 'react-native';
import Settingsbutton from '../components/Settingsbutton';

function Myprofilepage( {navigation} ) {
    return (
        <View>
            <Settingsbutton onPress={() => navigation.navigate("Settingspage")}></Settingsbutton>
        </View>
    );
}

export default Myprofilepage;