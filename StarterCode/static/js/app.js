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
        buildCharts(data.names[0]);

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

// Defining a function that will create charts for given sample
function buildCharts(id) {

    // Reading the json data
    d3.json("samples.json").then((data) => {

        // Parsing and filtering the data to get the sample's OTU data
        let otuIds = data.samples[0].otu_ids.slice(0,10).reverse();
        // console.log(otuIds)
        let values = data.samples[0].sample_values.slice(0,10).reverse();
        // console.log(values)
        let labels = otuIds.map(i => "OTU " + i);
        console.log(labels)

        // Pay attention to what data is required for each chart

        // Create bar chart in correct location
        let trace = {
            x: values,
            y: labels,
            type: "bar",
            orientation: "h"
          };

          let traceData = [trace];

          let layout = {
            height: 500,
            width: 600
          };
          Plotly.newPlot("bar", traceData, layout);

          d3.selectAll("#selDataset").on("change", getData);

        // Create bubble chart in correct location
    });
}

function getData() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

}

function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample
    buildMetadata(sample);

    // Update charts with newly selected sample
    buildCharts(sample)

}

// Initialize dashboard on page load
init();

