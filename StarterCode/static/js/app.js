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
        let chartData = data.samples.find(list => list.id === id);

        // Parsing and filtering the data to get the sample's OTU data
        let otuIds = chartData.otu_ids.slice(0, 10).reverse();
        let values = chartData.sample_values.slice(0, 10).reverse();
        let labels = otuIds.map(i => "OTU " + i);
        let otuLabels = chartData.otu_labels.slice(0, 10).reverse();

        // Creating bar chart
        let trace1 = {
            x: values,
            y: labels,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        let traceData1 = [trace1];

        // let layout = {
        //     height: 500,
        //     width: 600
        // };
        Plotly.newPlot("bar", traceData1);

        // Creating bubble chart 
        let bubbleIds = chartData.otu_ids;
        let bubbleValues = chartData.sample_values;
        let bubbleLabels = chartData.otu_labels;

        let trace2 = {
            x: bubbleIds,
            y: bubbleValues,
            text: bubbleLabels,
            type: "bubble",
            mode: "markers",
            marker: {
                size: bubbleValues,
                color: bubbleIds,
            }

        };

        let traceData2 = [trace2];

        let layout2 = {
            xaxis: {
                title:
                    { text: "OTU ID" }
            }
        };

        Plotly.newPlot("bubble", traceData2, layout2);

    });

    // Creating Gauge Chart
    d3.json("samples.json").then((data) => {
        let washData = data.metadata.filter(i => i.id.toString() === id);
        wash = washData[0].wfreq;
        // console.log(wash);

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wash,
                // title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = {
            width: 500,
            height: 400,
            margin: { t: 0, b: 0 }
        };
        Plotly.newPlot("gauge", data, layout);
        
    });
}


function optionChanged(newId) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Updating metadata with newly selected sample
    buildMetadata(newId);

    // Updating charts with newly selected sample
    buildCharts(newId);

}

// Initialize dashboard on page load
init();