FROM python:latest

RUN apt-get update && apt-get install -y python3-pip curl wget gnupg unzip

ARG CHROMEDRIVER_VERSION=94.0.4606.61
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && curl -O https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip -d /usr/local/bin/ \
    && rm chromedriver_linux64.zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
    
ENV DISPLAY=:99

RUN pip install robotframework robotframework-seleniumlibrary

COPY . /app

WORKDIR /app
