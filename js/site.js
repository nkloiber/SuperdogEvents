let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
]

//build a dropdown of distinct cities
function buildDropDown() {

    let eventDD = document.getElementById("eventDropDown");
    //clear out the dropdown
    eventDD.innerHTML = "";

    //get the template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    //get unique city values from the array
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    let ddItemNode = document.importNode(ddTemplate.content, true);
    // <li><a class="dropdown-item" onclick="getEvents(this)"></a></li>
    let ddItem = ddItemNode.querySelector("a");

    ddItem.setAttribute("data-string", "All");

    ddItem.textContent = "All";

    eventDD.appendChild(ddItem);

    //add the cities to the dropdown
    for (let index = 0; index < distinctEvents.length; index++) {
        ddItemNode = document.importNode(ddTemplate.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", distinctEvents[index]);
        ddItem.textContent = distinctEvents[index];
        eventDD.appendChild(ddItemNode);

    }


    displayStats(curEvents);
    //display data set
    displayData();
}
//displays data for the current events
function displayData() {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");

    eventBody.innerHTML = "";

    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    for (let index = 0; index < curEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = new Date(
            curEvents[index].date).toLocaleDateString();

        eventBody.appendChild(eventRow);
    }

}

//display stats for the filtered events
function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    //calculate average
    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );
    document.getElementById("least").innerHTML = least.toLocaleString();


}

//get the events for the selected City
function getEvents(ddElement) {
    let cityName = ddElement.getAttribute("data-string");
    //    alert("Hello" + cityName);
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    let filteredEvents = curEvents;

    document.getElementById("statsHeader").innerHTML = `Stats for ${cityName} `


    if (cityName != "All") {
        filteredEvents = curEvents.filter(
            function (event) {
                if (event.city == cityName) {
                    return event;

                }
            })
    }
    displayStats(filteredEvents);
}

//Save event data to local storage
function saveData() {
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    let stateSelect = document.getElementById("addEventState");
    let eventDate = document.getElementById("addDate").value
    let eventDate2 = `${eventDate} 00:00`;

    let newEvent = {
        event: document.getElementById("addEventName").value,
        city: document.getElementById("addCity").value,
        state: stateSelect.options[stateSelect.selectedIndex].text,
        attendance: parseInt(document.getElementById("addAttendance").value, 10),
        date: new Date(eventDate2).toLocaleDateString()

    };

    curEvents.push(newEvent);

    localStorage.setItem("eventData", JSON.stringify(curEvents));

    buildDropDown();
    displayData();
}