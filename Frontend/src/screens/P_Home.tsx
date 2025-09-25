import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function MenuPrincipal() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header*/}
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.title}>Lorem ipsum</Text>
      </View>

      {/* Tarjeta 1 */}
      <View style={styles.card}>
        <View style={styles.imageBox}>
          {/* <Image source={require('./ruta/imagen1.png')} style={styles.image}/> */}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Apartado 1</Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta 2 */}
      <View style={styles.card}>
        <View style={styles.imageBox}>
          {/*imagen */}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Apartado 2</Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta 3 */}
      <View style={styles.card}>
        <View style={styles.imageBox}>
          {/* imagen */}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Apartado 3</Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  imageBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#f9f9f9', 
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
