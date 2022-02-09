# Projinda
This is Annie Kihlert and Oscar Backström project in the projinda course (DD1349) at KTH VT21

**The Project Description**

*Description*\
Our idea is based around the never-ending search for sunlight. We have implemented a website in which the user can enter an address to get temperature and sunlight information. This is achieved by converting the user input from a text-based address to the correct coordinates. With the coordinates the program collects relevant weather data combined with using the “library” SunCalc to calculate the position of the sun. 

*Technical information*\
The website is hosted at [Heroku](https://www.heroku.com/) and can be visited at this [link](https://weather-with-kihlert-osba.herokuapp.com/
). The program incorporates two different API’s, [SMHI](https://opendata.smhi.se/apidocs/metobs/index.html) and [LocationIQ](https://locationiq.com/). LocationIQ is used to convert the text-based address to coordinates and SMHI is used to retrieve weather data. In combination with the data from SMHI the library SunCalc is used to calculate the position of the sun to determine if the cloud data from SMHI and sun’s position could result in some welcoming photons.

**How to run the website**

The website can be runed in two ways, either by visiting https://weather-with-kihlert-osba.herokuapp.com/ or locally on your computer. To run it locally start by down loading the repo and open it with *Visual studio code*. Once the code has been opened with VS Code, install the extension Live Server. When the extension has been installed go to the folder `Annie` and right press on `Website.html` to open the file with Live Server. Now you are good to go! Just enter an adress and get the temprature and sun data.

> **Ps**, Run it through your browser, it much cooler. **ds**




**The Project Plan**

**Week 1: Plan and Develop**\
**Week 2: Develop**\
**Week 3: Develop and Review**\
**Week 4: Finish and Demo**
