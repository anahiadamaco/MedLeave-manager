import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function SidebarProfesor() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado con foto y correo */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageBox}>
          {/* <Image source={require('./ruta/foto.png')} style={styles.profileImage}/> */}
        </View>
        <Text style={styles.email}>medleave@gmail.com</Text>
      </View>

      {/*Opciones*/}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Opción 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Opción 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Opción 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: '#f1f1f1', //foto
  },
  email: {
    fontSize: 14,
    fontWeight: '500',
  },
  menu: {
    borderTopWidth: 1,
    paddingTop: 12,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 15,
  },
});
