# Real_Reporting_Portal

## Overview
Reporting Portal is just what is says - a reporting portal. There is also a component of data visualization in th election page.

Below is an example of how you would interact with this application.


#### -Login Page-

Here you would log in to the site. If you do not have a log in, you'd first proceed to the registration page
![Login Capture](/public/images/Login.PNG)

#### -Registration Page-
The registration page is pretty straight forward - you set your username, password and associate an email address. When you register, your password is first hashed and then all user inputs stored to a SQL database. 

On login there is user validation to ensure username and password are correct.

![Register Capture](/public/images/Register.PNG)

#### -Reporting Page- 

Here is the reporting page. You can select the crime type, date range you want to search for the crime to have been commited and if you know the district sector you can specify it here. It is important to note that the district sector is not mandatory. If no input is passed in, it will return all district results. 

When the user hits submit, their search parameters are captured and passed through sequelize to a sql database. The results are then passed back to the client side via JSON where the google maps api is then introduced and those search results are then mapped out. 

Each search result will center around a different part of the map, and that works by calculating the average latitude and longitude of all search results and centering the map at that point. 

![Search Capture](/public/images/Search.PNG)

![District Search Capture](/public/images/DistrictSearch.PNG)

The circles that populate to the map have variable radii depending on the user's zoom level. As the user zooms in the circles reduce in size and as they zoom out the circles get bigger. 

There is also an option for the user to output their search results to a csv file. This works by utilizing json2csv and capturing the sequelize json results and transforming it to a csv file. 


#### -Elections-
The elections page is my attempt at an alluvial graph. It uses the d3 javascript library to interpret and visualize the data. 

The data in this case is the election results from the past 11 elections. The color bars for each election is roughly representative of the overall electoral college votes that party received. 
![Election Capture](/public/images/Elections.PNG)

The transitions show how each state voted from one election to the next. 

If the user clicks on any bar or transition the right side bar will modify to show only the states that are represented in that dataset. 
![Election Transition Capture](/public/images/ElectionTransition.PNG)
![Election Transition Capture](/public/images/EntireElectionParty.PNG)


Should the user highlight over any state on the right side bar they will see a highlight of that state's election history on the visual
![Election Hover Capture](/public/images/ElectionHover.PNG)
