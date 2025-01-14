import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import '../App.css';
import data_ukr from './data/UKR.json';
import data from './data/Choropleth.csv';

class ChoroplethMini extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    d3.csv(data).then(csvData => {
      this.setState({ data: csvData });
      this.drawChart(csvData);
    });
  }

  drawChart(csvData) {
    const width = 800;
    const height = 600;

    const svg = d3
      .select("#graph_box")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([
        d3.min(csvData, d => +d.value),
        d3.max(csvData, d => +d.value),
      ]);

    const projection = d3.geoMercator()
      .center([31, 49])
      .scale(3000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const dataMap = csvData.reduce((acc, row) => {
      acc[row.region] = +row.value;
      return acc;
    }, {});

    const regions = topojson.feature(data_ukr, data_ukr.objects.UKR_adm1).features;

    regions.forEach(region => {
      const regionName = region.properties.NAME_1;
      region.properties.value = dataMap[regionName] || 0;
    });

    svg
      .selectAll("path")
      .data(regions)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", d => colorScale(d.properties.value))
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .append("title") 
      .text(d => `${d.properties.NAME_1}: ${d.properties.value}`);

    const legendWidth = 300;
    const legendHeight = 20;

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - legendWidth - 20}, ${height - 50})`);

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", d3.interpolateBlues(0));

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", d3.interpolateBlues(1));

    legend
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#legend-gradient)");

    const legendScale = d3.scaleLinear()
      .domain([
        d3.min(csvData, d => +d.value),
        d3.max(csvData, d => +d.value),
      ])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale).ticks(5);

    legend
      .append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis);
  }

  render() {
    return <div id="graph_box"></div>;
  }
}

export default ChoroplethMini;
