// sample gauge meter
var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: 4,
        // title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number"
    }
];

var layout = {
    width: 400,
    height: 400,
    margin: { t: 0, b: 0 }
};
Plotly.newPlot("gauge", data, layout);

// let washFreq = Object.values(data.metadata);
// console.log(washFreq)