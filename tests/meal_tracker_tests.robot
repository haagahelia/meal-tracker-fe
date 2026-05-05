*** Settings ***
Library    Browser
Suite Setup       Open App
Suite Teardown    Close Browser

*** Variables ***
${URL}    http://localhost:5173

*** Keywords ***
Open App
    New Browser    chromium    headless=False
    New Context
    New Page    ${URL}
    Wait For Elements State    role=heading[name="Meal Tracker"]    visible    10s

*** Test Cases ***
Home Page Loads
    Get Title    contains    Meal

Navigate To Recipes Page
    Click    role=link[name="Recipes"]
    Wait For Elements State    role=heading[name="Recipes"]    visible    5s
    Get Text    body    contains    Blueberry oatmeal

Open Recipe Details
    Click    role=link[name="Recipes"]
    Wait For Elements State    role=heading[name="Recipes"]    visible    5s
    Click    role=link[name="Open"] >> nth=0
    Wait For Elements State    body    visible

Navigate To Products Page
    Click    role=link[name="Products"]
    Wait For Elements State    role=heading[name="Products"]    visible    5s
    Get Text    body    contains    Oat flakes

Navigate To Tracker Page
    Click    role=link[name="Tracker"]
    Wait For Elements State    role=heading[name="Tracker"]    visible    5s
    Get Text    body    contains    Calories

Navigate To Settings Page
    Click    role=link[name="Settings"]
    Wait For Elements State    role=heading[name="Settings"]    visible    5s
    Get Text    body    contains    Frontend starter notes

App Should Not Show Errors Anywhere
    Get Text    body    not contains    404
    Get Text    body    not contains    Error