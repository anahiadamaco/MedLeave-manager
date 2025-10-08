import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

# Cargar las variables de entorno desde el archivo .env
# Este archivo debe estar en la raíz de la carpeta Python
load_dotenv()

class Config:
    """
    Clase de configuración para la aplicación Flask.
    Aquí definimos todas las configuraciones necesarias para conectarnos a MySQL.
    Maneja correctamente caracteres especiales en las contraseñas usando URL encoding.
    """
    
    # Obtener cada variable de entorno individualmente
    # Esto nos permite procesar y validar cada valor antes de usarlo
    db_user = os.getenv('DB_USER', '')
    db_password = os.getenv('DB_PASSWORD', '')
    db_host = os.getenv('DB_HOST', '')
    db_port = os.getenv('DB_PORT', '3306')
    db_name = os.getenv('DB_NAME', '')
    
    # Codificar la contraseña para que sea segura para URLs
    # La función quote_plus convierte caracteres especiales como @ a %40
    # Esto es necesario porque @ tiene un significado especial en las URLs
    # y si tu contraseña contiene @ (como en tu caso), causa problemas
    db_password_encoded = quote_plus(db_password) if db_password else ''
    
    # Construir la URL de conexión usando la contraseña codificada
    # Ahora el @ de tu contraseña se convertirá en %40 y no causará conflictos
    # El formato final es: mysql+mysqlconnector://usuario:contraseña_codificada@host:puerto/base_datos
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+mysqlconnector://{db_user}:{db_password_encoded}@{db_host}:{db_port}/{db_name}"
    )
    
    # Desactivar el sistema de seguimiento de modificaciones de SQLAlchemy
    # Esto ahorra memoria y recursos porque no necesitamos esa funcionalidad
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración del pool de conexiones
    # Estos parámetros son críticos para el rendimiento y la estabilidad
    SQLALCHEMY_ENGINE_OPTIONS = {
        # Mantener 5 conexiones permanentes al servidor MySQL remoto
        # Usamos 5 en lugar de 10 porque es un servidor compartido
        'pool_size': 5,
        
        # Renovar conexiones cada hora para evitar que MySQL las cierre
        # MySQL cierra conexiones inactivas después de 8 horas por defecto
        'pool_recycle': 3600,
        
        # Verificar que cada conexión esté viva antes de usarla
        # Esto previene errores cuando el servidor ha cerrado una conexión
        'pool_pre_ping': True,
        
        # Permitir hasta 10 conexiones adicionales en picos de tráfico
        'max_overflow': 10,
        
        # Argumentos adicionales para la conexión
        'connect_args': {
            # Timeout de 10 segundos para establecer la conexión inicial
            # Importante para servidores remotos que pueden tener latencia
            'connect_timeout': 10
        }
    }
    
    # Configuración adicional de Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('DEBUG', 'True') == 'True'

# Función de ayuda para verificar la configuración
# Esta función se ejecuta cuando importas el módulo config
def verificar_configuracion():
    """
    Verifica que todas las variables de entorno críticas estén configuradas
    y muestra información de debugging útil para identificar problemas.
    """
    print("\n=== Verificando configuración de base de datos ===")
    
    variables_requeridas = {
        'DB_USER': os.getenv('DB_USER'),
        'DB_PASSWORD': os.getenv('DB_PASSWORD'),
        'DB_HOST': os.getenv('DB_HOST'),
        'DB_PORT': os.getenv('DB_PORT', '3306'),
        'DB_NAME': os.getenv('DB_NAME')
    }
    
    variables_faltantes = []
    
    for nombre, valor in variables_requeridas.items():
        if not valor:
            variables_faltantes.append(nombre)
            print(f"✗ {nombre} NO está configurada")
        else:
            # Ocultar la contraseña por seguridad
            if nombre == 'DB_PASSWORD':
                print(f"✓ {nombre} está configurada (longitud: {len(valor)} caracteres)")
                # Mostrar si tiene caracteres especiales que necesitan codificación
                if '@' in valor:
                    print(f"  ℹ La contraseña contiene @ que será codificado como %40")
            else:
                print(f"✓ {nombre} = {valor}")
    
    if variables_faltantes:
        print(f"\n✗ ERROR: Faltan las siguientes variables:")
        for variable in variables_faltantes:
            print(f"  - {variable}")
        print("=================================================\n")
        return False
    
    # Mostrar la URL de conexión pero ocultando la contraseña
    config = Config()
    url_sin_password = config.SQLALCHEMY_DATABASE_URI.split(':')[0] + "://" + config.db_user + ":***@" + config.db_host + ":" + config.db_port + "/" + config.db_name
    print(f"\n✓ URL de conexión (sin contraseña): {url_sin_password}")
    print("=================================================\n")
    return True

# Ejecutar la verificación al importar este módulo
# Esto no se ejecuta si importas el módulo desde un test o script especial
if __name__ != '__main__':
    verificar_configuracion()