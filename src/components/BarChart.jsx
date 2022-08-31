/* eslint-disable no-unused-vars */
import * as d3 from 'd3';
import { useEffect } from 'react';

function BarChart({ data, h, w }) {
  useEffect(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const margin = {
      left: 60,
      top: 30,
      right: 30,
      bottom: 70,
    };

    const svg = d3.select('#chartContainer')
      .append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .style('margin', margin)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left},${margin.top})`,
      );

    // X axis
    const x = d3.scaleBand()
      .range([0, w])
      .domain(days)
      .padding(0.2);
    svg.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(x))
      .selectAll('text');

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 5000])
      .range([h, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

    // Second Y axis
    const ySubgroup = d3.scaleBand()
      .domain([0, 100])
      .range([h, 0]);
    svg.append('g')
      .attr('transform', `translate(${w}, 0)`)
      .call(d3.axisRight(ySubgroup));

    svg.selectAll('rect')
      .data(data.sales)
      .enter()
      .append('rect')
      .attr('x', (d, i) => x(days[i]))
      .attr('y', (d, i) => y(d))
      .attr('width', 20)
      .attr('height', (d, i) => h - y(d))
      .attr('fill', 'green');
  }, []);
  return (
    <div id="chartContainer" />
  );
}

export default BarChart;
