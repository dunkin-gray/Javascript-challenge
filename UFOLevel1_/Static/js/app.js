//////STEP 1: Retrieve tableData from data.js//////
var tableData = data;

//////// STEP 2: Reference table body, input fields, buttons, and columns//////
var tbody = d3.select("tbody");
var datetime = d3.select("#datetime")
var city = d3.select("#city")
var state= d3.select("#state")
var country = d3.select("#country")
var shape = d3.select("#shape")
var button1 = d3.select("#filter-btn")
var button2 = d3.select("#reset-btn")
// var form = d3.select("#form")
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

//////STEP 3: Populate table, print to page and console//////
var populate = (dataInput) => {
    tbody.html("");
    dataInput.forEach(ufoSighting => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSighting[column])
        )
    });
}
populate(data);
console.log(data);

//////STEP 4: Filter data by form and buttons//////
button1.on("click", runEnter);
document.querySelectorAll("input").forEach(x => {
    x.addEventListener("keyup", (e)=> {
    if (e.keyCode === 13) {
        runEnter();
    }
    console.log("ran");
})
})

d3.selectAll("input").on("change", runEnter)

// form.on("submit", runEnter);
filters =[]
    
//define event handler function for the form
function runEnter() {

    //save input values as a variables
    var inputDate = datetime.property("value");
    var inputCity = city.property("value");
    var inputState = state.property("value");
    var inputCountry = country.property("value");
    var inputShape = shape.property("value");

    //filter data by matching input value
    var filteredData = data;
    if (inputDate) {
        filteredData = filteredData.filter(data => data.datetime === inputDate);
    }
    if (inputCity) {
        filteredData = filteredData.filter(data => data.city === inputCity);
    }
    if (inputState) {
        filteredData = filteredData.filter(data => data.state === inputState);
    }
    if (inputCountry) {
        filteredData = filteredData.filter(data => data.country === inputCountry);
    }
    if (inputShape) {
        filteredData = filteredData.filter(data => data.shape === inputShape);
    }
    console.log(filteredData);
    populate(filteredData)
}

// setup reset button
button2.on("click", () => {
    tbody.html("");
    populate(data)
    console.log("Table reset")
})