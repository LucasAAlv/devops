*** Settings ***
Documentation     Validação de valor
Library           SeleniumLibrary

*** Variables ***
${BROWSER}            Chrome
${URL}                http://localhost:8085/
${title}              /html/body/h1
${numeroAleatorio}    /html/body/p

*** Keywords ***
Dado que eu esteja na index
    Open Browser    ${URL}    ${BROWSER}    options=add_argument("--headless")

Entao aguardo carregar os elementos
    Wait until element is visible    ${title}

Valido que o numero aleatorio foi criado
    Element Should Contain    ${numeroAleatorio}    Seu numero aleatório é:

*** Test Cases ***
Validar geracao de numero aleatorio
    Dado que eu esteja na index
    Entao aguardo carregar os elementos
    Valido que o numero aleatorio foi criado
