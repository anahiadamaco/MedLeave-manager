This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


📋 Descripción
La API Flask proporciona endpoints RESTful para gestionar las licencias médicas estudiantiles, complementando o reemplazando la API Node.js existente. Incluye autenticación JWT, gestión de usuarios, subida de archivos a Firebase y un sistema completo de gestión de licencias médicas.

🚀 Características
Autenticación JWT para estudiantes y administradores

Gestión de licencias médicas (creación, consulta, aprobación/rechazo)

Subida segura de archivos a Firebase Storage

API RESTful con respuestas JSON estandarizadas

Base de datos MySQL con SQLAlchemy ORM

Validación de datos integrada

Sistema de notificaciones (pendiente de implementación)


📁 Estructura del Proyecto

/backend-flask/
├── app/
│   ├── __init__.py          # Inicialización de la aplicación Flask
│   ├── models.py            # Modelos de base de datos (Student, Administrator, MedicalLicense)
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py          # Rutas de autenticación (login, registro)
│   │   ├── licenses.py      # Rutas de gestión de licencias
│   │   └── notifications.py # Rutas de notificaciones
│   └── utils/
│       ├── __init__.py
│       ├── validators.py    # Utilidades de validación
│       └── file_handlers.py # Manejo de archivos con Firebase
├── config.py                # Configuración de la aplicación
├── requirements.txt         # Dependencias de Python
├── .env                     # Variables de entorno (crear manualmente)
└── run.py                   # Punto de entrada de la aplicación


Pasos de instalación

1.Clonar el repositorio y navegar al directorio
    cd backend

2.Crear y activar un entorno virtual

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
venv\Scripts\activate

# Activar entorno (Linux/Mac)
source venv/bin/activate

3.Instalar dependencias
en caso de no tener instaldo el archivo requirements.txt se debera crear y luego ejecutar este comando

Flask==2.3.3
Flask-JWT-Extended==4.5.2
Flask-CORS==4.0.0
python-dotenv==1.0.0
Werkzeug==2.3.7
PyJWT==2.8.0

pip install -r requirements.txt

4.Configurar variables de entorno

Crear un archivo .env en la carpeta backend-flask con el siguiente contenido:
FLASK_CONFIG=development
SECRET_KEY=tu-clave-secreta-muy-segura-aqui
JWT_SECRET_KEY=tu-jwt-secreto-muy-seguro-aqui
DATABASE_URL=mysql+pymysql://usuario:password@localhost/gestion_licencias
FIREBASE_CREDENTIALS=path/to/your/firebase/credentials.json


Instalación de Pip
pip --version
pip install Flask

crearemos un archivo llamado hello.py

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"


python -m flask --app hello run