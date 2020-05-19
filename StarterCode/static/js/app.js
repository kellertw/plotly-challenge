var jsonData;

int();

function int() {
  d3.json("samples.json").then((data) => {
    jsonData = data;
    var names = data.names;
    var select = d3.select("select");
    names.forEach((name) =>
      select.append("option").text(name).attr("value", name)
    );

    showPanel(names[0]);
    showBar(names[0]);
    showBubble(names[0]);
    showGauge(names[0]);
  });
}

function showPanel(name) {
  d3.json("samples.json").then((data) => {
    var panel = d3.select(".panel-body");
    var metadata = data.metadata.filter((obj) => obj.id == name)[0];

    panel.html("");

    Object.entries(metadata).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function optionChanged(name) {
  showPanel(name);
  showBar(name);
  showBubble(name);
  showGauge(name);
}

function showBar(name) {
  d3.json("samples.json").then((data) => {
    var sample = data.samples.filter((obj) => obj.id == name)[0];

    var barData = [
      {
        x: sample.sample_values.slice(0, 10).reverse(),
        y: sample.otu_ids
          .slice(0, 10)
          .reverse()
          .map((id) => `OTU ${id}`),
        text: sample.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 },
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function showBubble(name) {
  d3.json("samples.json").then((data) => {
    var sample = data.samples.filter(obj => obj.id == name)[0];

    var bubbleData = [
      {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: "markers",
        marker: {
          size: sample.sample_values,
          color: sample.otu_ids,
          colorscale: "Earth",
        }
      }
    ];

    var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        margin: {t: 30},
        hovermode: 'closest',
        xaxis: {title: 'OTU ID'}
    };

    Plotly.newPlot('bubble',bubbleData,bubbleLayout);
  });
};

function showGauge(name) {
    d3.json('samples.json').then(data => {
        var frq = data.metadata.filter(obj => obj.id == name)[0].wfreq;

       
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: frq,
                title: { text: "Scrubs per Week", font:{size: 14}},
                type: "indicator",
                mode: "gauge+number+delta"
            }
        ];

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
        
    })
}


