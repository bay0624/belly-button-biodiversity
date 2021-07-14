/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then((data) => {
        console.log(data)
        // Parsing and filtering data to get sample ids
        // Moving sample ids to dropdown menu
        let dropdown = d3.select("#selDataset")
        data.names.forEach(function(id) { 
            dropdown.append("option").text(id).property("value");
        });

        // Call functions below using the first sample to build metadata and initial plots

    });
}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's metadata

    // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}


function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

