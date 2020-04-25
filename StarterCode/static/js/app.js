var jsonData;


int();



function int() {
    d3.json('samples.json').then((data) => {
        jsonData = data;
        var names = data.names;
        var select = d3.select('select');
        names.forEach(name => select.append('option').text(name).attr('value',name));

        showPanel(names[0]);
    });
};

function showPanel(name) {
    d3.json('samples.json').then((data) => {
        var panel = d3.select('.panel-body');
        var metadata = data.metadata.filter(obj => obj.id == name)[0];

        panel.html('');

        Object.entries(metadata).forEach(([key,value]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

function buildPlot(sample) {
    d3.json('samples.json').then((data) => { 
        var samples=data.samples;
        var resultArray=samples.filter(sampleObj => sampleObj.id==sample);
        var result=resultArray[0];

        var otu_ids=result.otu.ids;
        var otu_labels=result.otu_labels;
        var sample_values=result.sample_values;
        // Bulid the bubble chart
        var layout = {
            title: 'OTU IDs Bubble Chart',
            hovermode:"closest",
            showlegend: false,
            height: 600,
            width: 600
        };
        var trace1 = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    color: otu_ids,
                    size: sample_values
                }
            }
        ];
    
        Plotly.newPlot("bubble", trace1, layout);
    });
}
    
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: data.wfreq,
                title: { text: "Scrubs per Week", font:{size: 14}},
                type: "indicator",
                mode: "gauge+number+delta"
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

// // int();



//     // function int() {
//     //     d3.json('samples.json').then(data => {
//     //         jsonData = data;
//     //         var names = data.names;
//     //         var select = d3.select('select');
//     //         names.forEach(name => select.append('option').text(name).attr('value',name));
    
//     //         showPanel(names[0]);
//     //     });
//     // };

    const sample1 = names[0];
    buildCharts(sample1);
    buildMetadata(sample1);
    console.log(sample1)
    });
}
    
    function optionChanged(nextsample) {
      // Fetch new data each time a new sample is selected
      buildCharts(nextsample);
      buildMetadata(nextsample);
    }
    
    // Initialize the dashboard
    init();