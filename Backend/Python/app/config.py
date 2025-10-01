import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

class Config:
    """
    Clase de configuración para la aplicación Flask.
    Aquí definimos todas las configuraciones necesarias para conectarnos a MySQL.
    """
    
    # Construir la URL de conexión a MySQL usando las variables de entorno
    # El formato es: mysql+mysqlconnector://usuario:contraseña@host:puerto/base_de_datos
# Obtener cada variable de entorno individualmente primero
    # Esto nos permite verificar los valores y construir la URL de forma más controlada
    db_user = os.getenv('DB_USER', '')
    db_password = os.getenv('DB_PASSWORD', '')
    db_host = os.getenv('DB_HOST', '')
    db_port = os.getenv('DB_PORT', '3306')
    db_name = os.getenv('DB_NAME', '')
    
    # Construir la URL de conexión de manera muy explícita
    # Cada componente está claramente separado para evitar errores de concatenación
    SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    # Desactivar el sistema de seguimiento de modificaciones de SQLAlchemy
    # Esto ahorra memoria y recursos porque no necesitamos esa funcionalidad
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración del pool de conexiones
    # Esto es crítico para el rendimiento y la estabilidad de tu aplicación
    SQLALCHEMY_ENGINE_OPTIONS = {
        # Mantener 10 conexiones abiertas en todo momento
        'pool_size': 10,
        
        # Renovar las conexiones cada hora para evitar problemas con MySQL
        # que cierra conexiones inactivas después de 8 horas
        'pool_recycle': 3600,
        
        # Verificar que cada conexión esté viva antes de usarla
        # Esto previene errores cuando MySQL ha cerrado una conexión
        'pool_pre_ping': True,
        
        # Permitir hasta 20 conexiones adicionales en momentos de mucho tráfico
        'max_overflow': 20
    }