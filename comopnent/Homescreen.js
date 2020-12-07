import React from 'react';
import { View,StyleSheet,Button} from 'react-native';
import {  Text} from 'native-base';
import {AuthContext} from "./Context";

 export function Home({navigation}) {
    const {signIn} = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>home Screen</Text>
            <Button title="OPen Drawer" onPress={() => navigation.toggleDrawer()}><Text>Open Drawer</Text></Button>
            <Button
                      title="OPen context" 
                      onPress={() => signIn()}></Button>
                      
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
})


