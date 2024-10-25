import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';

export default function ButtonLight({text, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    width: '80%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3}, // The shadow is at the bottom
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  text: {
    color: COLORS.drawerText,
    fontSize: 20,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
  },
  image: {
    height: 60,
    objectFit: 'contain',
    position: 'absolute',
    right: -20,
  },
});
