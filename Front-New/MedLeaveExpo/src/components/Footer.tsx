import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>Contáctanos</Text>

      <View style={styles.contactItem}>
        <Text style={styles.icon}>📧</Text>
        <Text style={styles.contactText}>medleave@gmail.com</Text>
      </View>

      <View style={styles.contactItem}>
        <Text style={styles.icon}>📞</Text>
        <Text style={styles.contactText}>+56 9 1234 5678</Text>
      </View>

      <View style={styles.brand}>
        <Text style={styles.brandName}>MedLeave</Text>
        <Text style={styles.brandSub}>MANAGER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    borderTopWidth: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  contactText: {
    fontSize: 14,
  },
  brand: {
    marginTop: 16,
    alignItems: 'center',
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandSub: {
    fontSize: 12,
    letterSpacing: 1,
  },
});
