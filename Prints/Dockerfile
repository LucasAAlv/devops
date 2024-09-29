FROM nginx:latest

# Instalação de dependências do sistema
RUN apt-get update && apt-get install -y python3-pip curl wget gnupg unzip python3-venv \
    xvfb \
    xauth \
    xfonts-base \
    x11-xkb-utils \
    x11-xserver-utils \
    xinit \
    && rm -rf /var/lib/apt/lists/*

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable


# Baixar e instalar o Chromium
RUN curl -fsSL "https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.91/linux64/chrome-linux64.zip" -o /tmp/chrome-linux64.zip \
    && unzip /tmp/chrome-linux64.zip -d /tmp/chrome \
    && mv /tmp/chrome /usr/local/bin/ \
    && rm /tmp/chrome-linux64.zip \
    && chmod +x /usr/local/bin/chrome \
    && rm -rf /tmp/chrome
# Baixar e instalar o ChromeDriver
RUN curl -fsSL "https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.91/linux64/chromedriver-linux64.zip" -o /tmp/chromedriver-linux64.zip \
    && unzip /tmp/chromedriver-linux64.zip -d /tmp/chromedriver \
    && mkdir -p /usr/local/bin/ \
    && mv /tmp/chromedriver /usr/local/bin/ \
    && rm /tmp/chromedriver-linux64.zip \
    && chmod +x /usr/local/bin/chromedriver \
    && rm -rf /tmp/chromedriver


# Criação e ativação do ambiente virtual
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Instalação do Robot Framework dentro do ambiente virtual
RUN pip install robotframework robotframework-seleniumlibrary

# Copia o código da aplicação para o contêiner
COPY index.html /usr/share/nginx/html
COPY app.js /usr/share/nginx/html
COPY tests.robot /usr/share/nginx/html/tests.robot

RUN apt-get update && apt-get install -y xvfb
RUN mkdir -p /dev/shm && chmod 1777 /dev/shm


ENV DISPLAY=:99

# Inicialização do servidor Xvfb
CMD ["Xvfb", ":99", "-screen", "0", "1920x1080x24", "-ac"]
