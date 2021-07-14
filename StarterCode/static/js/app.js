// Defining the function that will run on page load
function init() {

    // Reading the json data
    d3.json("samples.json").then((data) => {
        
        // Parsing and filtering data to get sample ids
        // Moving sample ids to dropdown menu
        let dropdown = d3.select("#selDataset")
        data.names.forEach(function (idNumber) {
            dropdown.append("option").text(idNumber).property("value");
        });

        // Calling functions below using the first sample to build metadata and initial plots
        buildMetadata(data.names[0]);

    });
}

// Defining a function that will create metadata for given sample
function buildMetadata(id) {

    // Reading the json data
    d3.json("samples.json").then((data) => {

        // Parsing and filtering the data to get the sample's metadata
        
        let res = data.metadata.filter(info => info.id.toString() === id)[0];

        // Specifying the location of the metadata and updating it
        let infoPanel = d3.select("#sample-metadata");
        infoPanel.html("");

        Object.entries(res).forEach((key) => {
            infoPanel.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
    });
}

// Define a function that will create charts for given sample
function buildCharts(id) {

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}


function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample
    buildMetadata(sample);

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

