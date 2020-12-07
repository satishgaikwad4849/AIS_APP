import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
export   const Splash = () => (
    <View style={styles.container}>
      <Text>Welcome To AIS Application</Text>
    </View>
  );

 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
})