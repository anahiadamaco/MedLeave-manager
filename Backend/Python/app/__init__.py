from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from .config import Config

# Crear la instancia de SQLAlchemy aquí pero sin vincularla todavía a ninguna app
# Esto se llama "lazy initialization" y es necesario para el Application Factory Pattern
db = SQLAlchemy()

def create_app():
    """
    Application Factory: función que crea y configura la aplicación Flask.
    Este patrón es considerado la mejor práctica para aplicaciones Flask
    porque permite crear múltiples instancias con diferentes configuraciones.
    """
    
    # Crear la instancia de Flask
    app = Flask(__name__)
    
    # Cargar la configuración desde la clase Config
    app.config.from_object(Config)
    
    # Inicializar SQLAlchemy con esta aplicación
    # Esto conecta la instancia de db que creamos arriba con esta app específica
    db.init_app(app)
    
    # Registrar los blueprints (rutas) aquí
    # Esto se hace después de inicializar db para evitar importaciones circulares
    with app.app_context():
        # Aquí importarías y registrarías tus blueprints cuando los tengas
        # from .routes import usuario_bp
        # app.register_blueprint(usuario_bp)
        
        # Verificar la conexión a la base de datos
        verificar_conexion()
    
    return app

def verificar_conexion():
    """
    Función que prueba la conexión a la base de datos al iniciar la aplicación.
    Nota el uso de text() para envolver la consulta SQL, que es requerido
    en SQLAlchemy 2.0 y versiones superiores.
    """
    try:
        # Usar text() para declarar explícitamente que esto es SQL
        # Esto soluciona el warning que estabas viendo
        db.session.execute(text('SELECT 1'))
        print('✓ Conexión exitosa a MySQL desde Flask')
        return True
    except Exception as e:
        print(f'✗ Error al conectar a MySQL: {str(e)}')
        return False