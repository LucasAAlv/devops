FROM nginx:latest

# Instalação de dependências do sistema
RUN apt-get update && apt-get install -y python3-pip curl wget gnupg unzip python3-venv

# Baixar e instalar o Chromium
RUN curl -fsSL "https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.91/linux64/chrome-linux64.zip" -o /tmp/chrome-linux64.zip \
    && unzip /tmp/chrome-linux64.zip -d /usr/local/bin/ \
    && rm /tmp/chrome-linux64.zip

# Baixar e instalar o ChromeDriver
RUN curl -fsSL "https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.91/linux64/chromedriver-linux64.zip" -o /tmp/chromedriver-linux64.zip \
    && unzip /tmp/chromedriver-linux64.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver-linux64.zip

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
COPY tests.robot /usr/share/nginx/html/tests.robot
