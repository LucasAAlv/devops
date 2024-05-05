
FROM python:3.9-slim

FROM nginx

RUN rm /usr/share/nginx/html/index.html

COPY index.html /usr/share/nginx/html
COPY app.js /usr/share/nginx/html

EXPOSE 80

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y wget

ARG CHROMEDRIVER_VERSION=94.0.4606.61
RUN wget -q -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip

# Define a variável de ambiente DISPLAY para o Chrome funcionar corretamente
ENV DISPLAY=:99

# Instalação do Robot Framework e da biblioteca Selenium
RUN pip install robotframework robotframework-seleniumlibrary
