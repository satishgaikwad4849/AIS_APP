import React ,{Component} from 'react';
import {Splash} from './comopnent/Splashscreen';
import LogInScreen from './comopnent/Loginscreen'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from './comopnent/Homescreen';
import {Profile} from './comopnent/ProfileScreen';
import {RegisterForm} from './comopnent/Register';
import {Map_View} from './comopnent/MapView';
import {AuthContext} from "./comopnent/Context";
import AsyncStorage from "@react-native-community/async-storage";
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MapViewStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator >
    <HomeStack.Screen name="Home" component={Home}/>
  </HomeStack.Navigator>
);
const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator headerMode="float"> 
    <ProfileStack.Screen name="Profile" component={Profile}  />
  </ProfileStack.Navigator>
);
const MapViewStackScreen = ({navigation}) => (
  <MapViewStack.Navigator>
    <MapViewStack.Screen name="MapView" component={Map_View}/>
  </MapViewStack.Navigator>
);
const Drawer_ = ({navigation}) => (
  <Drawer.Navigator initialRouteName="Home"  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="MapView" component={Map_View} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none" initialRouteName="LogInScreen">
    <RootStack.Screen name="Home" component={Drawer_} />
    <RootStack.Screen name="RegisterForm" component={RegisterForm} />
    <RootStack.Screen name="LogInScreen" component={LogInScreen} />
    <RootStack.Screen name="Profile" component={Profile} />
    <RootStack.Screen name="MapView" component={Map_View} />
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading,setIsLoading] = React.useState(true);
  const [isLoggedIn,setIsLoggedIn] = React.useState(true);
  const [id, setId] = React.useState('');

    const authContext =async(id) =>{
    let user_ = await AsyncStorage.getItem(id);
    user_ = JSON.parse(user_);
    setId(user_)
    if(user_ !== null){
      console.log(user_)
    }
    console.warn("user_",user_);
    console.warn("password global",user_.password);
  }

  const initialLoginState = {
  message:null,
  loggedinUserEmail:null,
  isLoggedIn: true,
};
  const loginReducer = (state, action) => {
      switch (action.type) {
        case 'SET_LOGGEDIN_EMAIL':
          return {
            ...state,
            loggedinUserEmail: action.email,
            message:action.message,
            isLoggedIn: false,
          };
        case 'RESET_EMAIL':
          return {
            ...state,
            loggedinUserEmail: action.email,
            message:action.message,
            isLoggedIn: false,
          };
          default:
            throw new Error(`Unhandled action type: ${action.type}`);
        
      }
    };
    
    const [loginState, dispatch] = React.useReducer(
          loginReducer,
          initialLoginState,
        );
  React.useEffect(() => {
    setTimeout( () => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  return (
    <>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <RootStackScreen /> : null}
      </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}

// const initialLoginState = {
//   message:null,
//   loggedinUserEmail:null,
//   isLoggedIn: true,
// };
// const loginReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOGGEDIN_EMAIL':
//       return {
//         ...state,
//         loggedinUserEmail: action.email,
//         message:action.message,
//         isLoggedIn: false,
//       };
//     case 'RESET_EMAIL':
//       return {
//         ...state,
//         loggedinUserEmail: action.email,
//         message:action.message,
//         isLoggedIn: false,
//       };
//       default:
//         throw new Error(`Unhandled action type: ${action.type}`);
    
//   }
// };


// export default App = () => {
//   // const [isLoading,setIsLoading] = React.useState(true);
//   // const [isLoggedIn,setIsLoggedIn] = React.useState(true);
//   // const [id, setId] = React.useState('');

  
//   const [loginState, dispatch] = React.useReducer(
//     loginReducer,
//     initialLoginState,
//   );


//   React.useEffect(() => {
//     setTimeout(async () => {
//       //setIsLoading(false);
//     }, 1000);
//   }, []);

//   if (loginState.isLoggedIn) {
//     return <Splash />;
//   }
//   return (
//     <>
//     <AuthContext.Provider value={{loginstate, dispatch}}>
//       <NavigationContainer>
//       {loginState.message !== null ? (
//         <RootStackScreen />):<Home/>
//       }
//       </NavigationContainer>
//       </AuthContext.Provider>
//     </>
//   );
// }
// export const useStore = () => useContext(AuthContext);