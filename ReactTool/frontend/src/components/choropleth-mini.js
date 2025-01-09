import React, { Component } from 'react';
import * as d3 from 'd3'
import * as topojson from 'topojson';
import { Container, Col, Row, Navbar, Button, ButtonGroup, ToggleButton, Form, InputGroup } from 'react-bootstrap';
import '../App.css';
import data_usa from './data/USA.json';
import data from './data/Choropleth.csv';
import img8 from '../components/data/Mini-VLAT/Choropleth_New.png'



class ChoroplethMini extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(String(data_usa))
        this.drawChart()
    }
    divResize(e) {
        console.log('div was resized', e)
    }

    componentDidUpdate() {
        this.drawChart()
    }

    drawChart() {
        //https://www.statista.com/statistics/223675/state-unemployment-rate-in-the-us/
        //https://bl.ocks.org/wboykinm/dbbe50d1023f90d4e241712395c27fb3
        var e = document.getElementById("graph_box");
        const length = Math.min(e.clientHeight, e.clientWidth)

        const margin = { top: length / 5, right: length / 5, bottom: length / 5, left: length / 5 },
            width = length - margin.left - margin.right,
            height = length - margin.top - margin.bottom;

        // append the svg object to the body of the page
        //d3.select("#graph_box").selectAll("svg").remove();
        d3.select("#graph_box").select("svg").remove();
        const svg = d3.select("#graph_box")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")

        svg.append("text").attr("class", 'bubbleTitle').text("Рівень безробіття в штатах США у 2020 році").style("font-weight", 'bolder').attr('x', 1.2 * margin.top).attr('y', 0.9 * margin.top).style('font-size', 0.04 * height)

        var image = svg.append('image').attr('width', 1.4 * width).attr('x', 0).attr('y', margin.top * height / width).attr('xlink:href', img8).attr('height', 1.1 * height)

    }


    render() {

        return (
            <div id={'graph_box'}>
            </div>
        );
    }
}

export default ChoroplethMini;