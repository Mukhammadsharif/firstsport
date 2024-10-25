import React, {useContext} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';
import Header from '../components/Header';
import {COLORS} from '../helpers/colors';

export default function Football() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../images/backgrounds/en_football.png'),
    ru: require('../images/backgrounds/ru_football.png'),
    es: require('../images/backgrounds/es_football.png'),
    it: require('../images/backgrounds/it_football.png'),
    de: require('../images/backgrounds/de_football.png'),
    fr: require('../images/backgrounds/fr_football.png'),
    sw: require('../images/backgrounds/de_football.png'),
    pl: require('../images/backgrounds/pl_football.png'),
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
