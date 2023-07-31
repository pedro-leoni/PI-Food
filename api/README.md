# USO
- crear base de datos:
    linux:
        - $ sudo apt install postgresql postgresql-contrib
        - $ sudo -i -u postgres
        - $ psql -U postgres
        - $ CREATE DATABASE food
        - $ CREATE USER nombre_de_usuario WITH PASSWORD 'contraseña';
        - $ GRANT ALL PRIVILEGES ON DATABASE nombre_de_tu_base_de_datos TO nombre_de_usuario;
        - Guardar usuario y passwor porque son los que se van a utilizar como variables de entorno
    windows: 
        