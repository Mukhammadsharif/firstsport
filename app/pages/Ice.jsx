import React, {useContext} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';
import Header from '../components/Header';
import {COLORS} from '../helpers/colors';

export default function Ice() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../images/backgrounds/en_ice.png'),
    ru: require('../images/backgrounds/ru_ice.png'),
    es: require('../images/backgrounds/es_ice.png'),
    it: require('../images/backgrounds/it_ice.png'),
    de: require('../images/backgrounds/de_ice.png'),
    fr: require('../images/backgrounds/fr_ice.png'),
    sw: require('../images/backgrounds/de_ice.png'),
    pl: require('../images/backgrounds/pl_ice.png'),
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        imageStyle={{objectFit: 'cover'}}
        source={images[lang]}
        style={styles.imageBackground}>
        <Header background={COLORS.main} route={'Events'} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: '112%',
  },
});
