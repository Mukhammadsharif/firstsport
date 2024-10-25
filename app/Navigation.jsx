import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import Home from './screens/Home';
import {GlobalContext} from './components/GlobalContext';
import {useGetRequest} from './helpers/hooks';
import {TRANSLATE} from './helpers/urls';
import BackgroundImage from './assets/bg/drawer_bg.png';
import HeaderImage from './assets/images/drawer_image.png';
import {COLORS, FONTS} from './helpers/colors';
import CloseIcon from './assets/images/icon_close.png';
import Account from './screens/Account';
import Cart from './screens/Cart';
import Order from './screens/Order';
import Broadcasts from './screens/Broadcasts';
import Booking from './screens/Booking';
import BookConfirm from './screens/BookConfirm';
import Events from './screens/Events';
import Grill from './screens/Grill';
import Travel from './screens/Travel';
import Golf from './screens/Golf';
import Lunch from './screens/Lunch';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={DrawerNavigator} name="DrawerNavigator" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: width,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerNavigator {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Order" component={Order} />
      <Drawer.Screen name="Broadcasts" component={Broadcasts} />
      <Drawer.Screen name="Booking" component={Booking} />
      <Drawer.Screen name="BookConfirm" component={BookConfirm} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="Grill" component={Grill} />
      <Drawer.Screen name="Travel" component={Travel} />
      <Drawer.Screen name="Golf" component={Golf} />
      <Drawer.Screen name="Lunch" component={Lunch} />
    </Drawer.Navigator>
  );
}

function CustomDrawerNavigator(props) {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      {translations.length ? (
        <ImageBackground source={BackgroundImage} style={styles.container}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Image source={CloseIcon} style={styles.close} />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <Image source={HeaderImage} style={styles.drawerLogo} />
          </View>

          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>
                {translations.find(item => item?.en === 'Home')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Booking')}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>
                {translations.find(item => item?.en === 'Booking')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Events')}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>
                {translations.find(item => item?.en === 'Events')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Broadcasts')}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>
                {translations.find(item => item?.en === 'Broadcasts')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>
                {translations.find(item => item?.en === 'Cart')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Account')}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>
                {translations.find(item => item?.en === 'Account')[lang]}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        ''
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
  },
  drawerLogo: {
    width: width / 2,
    height: width / 2.7,
    marginBottom: 20,
  },
  mainContainer: {
    marginTop: 30,
    width: width,
    alignItems: 'center',
  },
  drawerItem: {
    backgroundColor: COLORS.yellow,
    height: 40,
    marginTop: 15,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3}, // The shadow is at the bottom
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  itemText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.drawerText,
  },
  closeIconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  close: {
    width: 40,
    height: 40,
  },
});
