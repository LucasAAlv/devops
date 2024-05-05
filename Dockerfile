FROM nginx:latest

# Instalação de dependências do sistema
RUN apt-get update && apt-get install -y python3-pip curl wget gnupg unzip python3-venv

# Configuração do ChromeDriver
ARG CHROMEDRIVER_VERSION=114.0.5735.16
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && curl -O https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip -d /usr/local/bin/ \
    && rm chromedriver_linux64.zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configuração do ambiente
ENV DISPLAY=:99

# Criação e ativação do ambiente virtual
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Instalação do Robot Framework dentro do ambiente virtual
RUN pip install robotframework robotframework-seleniumlibrary

# Copia o código da aplicação para o contêiner
COPY index.html /usr/share/nginx/html
COPY app.js /usr/share/nginx/html
COPY tests.robot /usr/share/nginx/html