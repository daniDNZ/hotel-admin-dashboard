/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import * as d3 from 'd3';
import { useEffect } from 'react';
import styled from 'styled-components';
import colors from '../style/colors';

const ChartContainer = styled.div`
  width: 760px;
  background-color: white;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;

  padding: 20px;
  margin-bottom: 40px;

  .bar-hovered {
    fill: orange;
  }
`;

function BarChart({ data, h, w }) {
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const margin = {
      left: 60,
      top: 30,
      right: 40,
      bottom: 70,
    };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3.select('#chartContainer')
      .append('svg')
        .attr('width', w)
        .attr('height', h);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(days)
      .padding(0.4);

    const yScaleLeft = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 5000]);

    const yScaleRight = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('.tick')
      .style('stroke-width', 0);

    const gAxisLeft = g.append('g')
      .call(d3.axisLeft(yScaleLeft).tickFormat((d) => `${d}€`))
      .selectAll('.domain')
      .style('stroke-width', 0);

      gAxisLeft.selectAll('g.tick')
      .style('stroke-width', 0);

    g.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(yScaleRight).tickFormat((d) => `${d}%`))
      .selectAll('.domain')
      .style('stroke-width', 0);

    // Hover functions

    function onMouseOverSales(d, i) {
      d3.select(this).attr('class', 'bar-hovered');
      g.append('text')
        .attr('class', 'val')
        .attr('x', () => {
          const day = new Date(i.day);
          return xScale(days[
            day.getDay() - 1 < 0 ? 6 : day.getDay() - 1
          ]) - 10;
        })
        .attr('y', () => yScaleLeft(i.value) - 10)
        .text(i.value);
    }

    function onMouseOverOccupation(d, i) {
      d3.select(this).attr('class', 'bar-hovered');
      g.append('text')
        .attr('class', 'val')
        .attr('x', () => {
          const day = new Date(i.day);
          return xScale(days[
            day.getDay() - 1 < 0 ? 6 : day.getDay() - 1
          ]) + 29;
        })
        .attr('y', () => yScaleRight(i.value) - 10)
        .text(i.value);
    }

    function onMouseOut(d, i) {
      d3.select(this)
        .attr('class', '');

      d3.selectAll('.val').remove();
    }

    //

    const gSales = g.append('g');
    gSales.selectAll('rect')
      .data(data.sales)
      .enter().append('rect')
      .attr('pointer-events', 'all')
      .on('mouseover', onMouseOverSales)
      .on('mouseout', onMouseOut)
      .attr('x', (d, i) => xScale(days[i]))
      .attr('y', (d, i) => yScaleLeft(d.value))
      .attr('width', 20)
      .attr('height', (d, i) => height - yScaleLeft(d.value))
      .attr('fill', colors.hardGreen);

    const gOccupation = g.append('g');
    gOccupation.selectAll('rect')
      .data(data.occupation)
      .enter().append('rect')
      .attr('pointer-events', 'all')
      .on('mouseover', onMouseOverOccupation)
      .on('mouseout', onMouseOut)
      .attr('x', (d, i) => xScale(days[i]))
      .attr('y', (d, i) => yScaleRight(d.value))
      .attr('width', 20)
      .attr('height', (d, i) => height - yScaleRight(d.value))
      .attr('transform', 'translate(29,0)')
      .attr('fill', 'red');

    return () => {
      document.querySelector('#chartContainer').innerHTML = '';
    };
  }, []);
  return (
    <ChartContainer id="chartContainer" />
  );
}

export default BarChart;
