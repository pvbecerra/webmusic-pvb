python3 -m venv venv

source venv/bin/activate

pip3 install --no-cache-dir -r requirements.txt

pip3 install --upgrade pip

django-admin startproject mi_biblioteca_musical .

python3 manage.py startapp music

vi mi_biblioteca_musical/settings.py

python3 manage.py makemigrations

python3 manage.py migrate

tr -dc 'A-Za-z0-9#&!?%=' < /dev/urandom | head -c 52
GkKxVyJ1lm?dKwNeUb9&WiMSIhn=60%tHsvvdMGzEh4W0JroD3&9 # ---> La llave en settings.py

python3 manage.py createsuperuser
admmusica / g=1fRI&L?hZ6cPhdJPdQWg?s

python3 manage.py runserver


        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'musicweb',
        'USER': 'postgres',
        'PASSWORD': '1kzNZbH%nnEtuc?pFQ2GgGIlGtUQjbokI6',
        'HOST': '127.0.0.1',
        'PORT': '5432',

Paso 1: Configurar CORS (Cross-Origin Resource Sharing)
Dado que tu frontend (Flutter o HTML/CSS/JS) se ejecutará en un origen diferente al de tu backend Django, 
necesitarás habilitar CORS. Esto permite que el navegador del frontend haga solicitudes al backend de forma segura.
Instala django-cors-headers:

pip3 install django-cors-headers


Nota de seguridad: Para entornos de producción, se recomienda usar CORS_ALLOWED_ORIGINS y listar explícitamente los dominios de tu frontend para mayor seguridad. Por ejemplo:

Python

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000", # Para tu frontend React/Vue
#     "http://127.0.0.1:3000",
#     "http://localhost:5000", # Para tu frontend Flutter Web
#     # "https://tu-dominio-frontend.com", # Tu dominio en producción
# ]
# CORS_ALLOW_ALL_ORIGINS = False # Asegúrate de que este sea False si usas CORS_ALLOWED_ORIGINS
#

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
cd
source ~/.bashrc
cd -
nvm install --lts
nvm use --lts
nvm -v
npm create vite@latest frontend -- --template react
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm --version
nvm ls-remote
nvm install 16
npm -v
npm create vite@latest frontend -- --template react
npm install -g npm@11.4.2
cd frontend
npm install
npm run dev
mv Dockerfile frontend/
cd frontend/
npm create vite@latest frontend -- --template react
cd frontend/; npm install;  npm run dev
docker build -t frontend .



