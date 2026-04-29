*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}      http://localhost:5173
${BROWSER}  Chrome

*** Test Cases ***
Open Home Page
    Open Browser    ${URL}    ${BROWSER}
    Page Should Contain    Meal
    Close Browser