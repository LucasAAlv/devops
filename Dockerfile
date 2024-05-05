FROM python:latest

# Instalação do pip e dependências necessárias
RUN apt-get update && apt-get install -y python3-pip curl wget gnupg unzip

# Instalação do Chrome e Chromedriver
ARG CHROMEDRIVER_VERSION=94.0.4606.61
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && curl -O https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip -d /usr/local/bin/ \
    && rm chromedriver_linux64.zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Define a variável de ambiente DISPLAY para o Chrome funcionar corretamente
ENV DISPLAY=:99

# Instalação do Robot Framework e da biblioteca Selenium
RUN pip install robotframework robotframework-seleniumlibrary

# Limpa a imagem base do Python
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Definição da imagem final
FROM nginx

# Remoção do arquivo index.html padrão do nginx
RUN rm /usr/share/nginx/html/index.html

# Copia os arquivos do aplicativo para o diretório do nginx
COPY index.html /usr/share/nginx/html
COPY app.js /usr/share/nginx/html
COPY tests.robot /usr/share/nginx/html

# Expondo a porta 80 para fora do contêiner
EXPOSE 80
