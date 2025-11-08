import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#007ACC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  leftSection: {
    flex: 1,
  },
  sectionTitle: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  contactText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
});

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* Sección izquierda */}
      <View style={styles.leftSection}>
        <Text style={styles.sectionTitle}>Contáctanos</Text>

        <View style={styles.contactRow}>
          <Image source={require('../assets/Gmail.png')} style={styles.icon} />
          <Text style={styles.contactText}>medleave@gmail.com</Text>
        </View>

        <View style={styles.contactRow}>
          <Image source={require('../assets/Telefono.png')} style={styles.icon} />
          <Text style={styles.contactText}>+56 9 1234 5678</Text>
        </View>

        <View style={styles.contactRow}>
          <Image source={require('../assets/Maps.png')} style={styles.icon} />
          <Text style={styles.contactText}>calle cualquiera #1234</Text>
        </View>
      </View>

      {/* Sección derecha */}
      <View style={styles.rightSection}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
