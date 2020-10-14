// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv").then(riskData => {
  
  console.log(riskData);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    riskData.forEach(data => {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(riskData, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([8, d3.max(riskData, d => d.smokes)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Datapoints
    // ==============================
    chartGroup.selectAll("circle")
    .data(riskData)
    .join("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "16")
    .attr("fill", "green")
    .attr("opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

    let textGroup = svg.append('g')
     .attr('transform', `translate(${margin.left}, ${margin.top})`);

    textGroup.selectAll("text")
    .data(riskData)
    .join("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.age)-8)
    .attr("y", d => yLinearScale(d.smokes)+4)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("font-weight", "700")
    .attr("fill", "red");
  
    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x", 0 - (height / 2) -50)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Smokers")
    .attr("font-weight", "bold");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
    .attr("class", "axisText")
    .text("Age (Years)")
    .attr("font-weight", "bold");

  // End of promise to get data S
}).catch(error => console.log(error));