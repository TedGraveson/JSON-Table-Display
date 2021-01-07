//Filter input from user
let filterInput = document.getElementById("filter-search-bar");
let filterButton = document.getElementById("filter-btn");


//Event listeners from user filter input
filterButton.addEventListener("click", function() {displayInTable(showFilteredData(filterInput.value))});

//Learned from: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
//Accessed 7 Dec 2020
//User can press enter to search as well
filterInput.addEventListener("keyup", function(event) {
    //If key pressed was Enter
    if(event.key == "Enter") {
        filterButton.click();
    }
})


//Area to create new tables
let table = document.getElementById("data-table");

//Buttons for data selection
let libraryButton = document.getElementById("library-btn");
let restaurantButton = document.getElementById("restaurant-btn");
let schoolButton = document.getElementById("school-btn");
let weatherButton = document.getElementById("weather-btn");

//Event listeners for all data buttons
//Sets styling for table headers
libraryButton.addEventListener("click", function() {
    setData(0);
    table.className ="library";
});
restaurantButton.addEventListener("click", function() {
    setData(1);
    table.className ="restaurant";
});
schoolButton.addEventListener("click", function() {
    setData(2);
    table.className ="school";
});
weatherButton.addEventListener("click", function() {
    setData(3);
    table.className = "weather";
});

//Receiving JSON data
let libDataJava = JSON.parse(jsonDataLibrary);
let resDataJava = JSON.parse(jsonDataRestaurant);
let weatherDataJava = JSON.parse(jsonDataWeather);
let schoolDataJava = JSON.parse(jsonDataSchool);

//Tracks what data should be shown
let dataIndex = 0;
let userFilter = "";


//Establishes what paramater should be filtered for each data set
let dataSets = [
    { 
        "data": libDataJava,
        "filter": "BookName"
    },
    {
        "data": resDataJava,
        "filter" : "DishName"
    },
    {
        "data" : schoolDataJava,
        "filter": "StudentName"
    },
    {
        "data": weatherDataJava,
        "filter": "CityName"
    }
]

//Shows library data as default
document.body.onload = function() {
    setData(0);
    displayInTable(dataSets[dataIndex].data);
    table.className= "library";
}



//Returns all objects in data set matching filter
function showFilteredData(userFilter) { 
    //Will store all objects matching filter   
    let filteredData = [];
    //Grabs current data set
    let data = dataSets[dataIndex].data;
    //Grabs correct filter term
    let filterBy = dataSets[dataIndex].filter;
    //Loops through data
    for(let i = 0; i < data.length; i++) {
        //In the case that the filter is empty, "" == "" is true
        //If filter matches the value up to the current length of the filter, data should be displayed
        if(data[i][filterBy].substr(0, userFilter.length).toLowerCase() == userFilter.toLowerCase()) {
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}


//Displays data to table on webpage
function displayInTable(data) {
    //Clears current table data
    table.innerHTML = "";
    let object, properties;
    if(data!= null) {
        //Creates header
        //Learned in course: https://learn.zybooks.com/zybook/DALCSCI1170SampangiFall2020/chapter/4/section/17
        let header = document.createElement("tr");
        //Populate table headings with all keys of first object
        for(properties in data[0]) {
            let headerCell = document.createElement("th");
            //Creates a space between a lowercase and uppercase number (since data is camal-cased)
            //Learned from: https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
            //Author: Göran Andersson
            //Accessed: 6 Dec 2020
            properties = properties.replace(/([a-z])([A-Z])/g, '$1 $2');

            //Header cell now contains object value
            headerCell.appendChild(document.createTextNode(properties));
            //Header cell placed in header
            header.appendChild(headerCell);
            
        }
        //Header row placed into html
        table.appendChild(header);    
    

        //Populates respective table columns with values from object
        for(let i = 0; i < data.length; i++) {
            //Object's row
            var tableRow = document.createElement("tr")
            for(properties in data[i]) {
                //Cell for the column
                var tableCell = document.createElement("td")
                //Value for the cell
                var cellData = document.createTextNode(data[i][properties]);
                //Put data into cell
                tableCell.appendChild(cellData);
                //Put cell into row
                tableRow.appendChild(tableCell);
            }
            //Put row into html
            table.appendChild(tableRow);
        }
    }
    
}

//Displays different data sets
function setData(index) {
    dataIndex = index;
    displayInTable(dataSets[dataIndex].data);

    //Creates a space between a lowercase and uppercase number (since data is camal-cased)
    //Learned from: https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
    //Author: Göran Andersson
    //Accessed: 6 Dec 2020

    //Tells user what term they should search by
    filterButton.innerHTML = 'Filter by ' + dataSets[dataIndex].filter.replace(/([a-z])([A-Z])/g, '$1 $2') + ' <i class="fas fa-search"></i>';
}