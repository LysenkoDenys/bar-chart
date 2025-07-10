const containerNode = document.getElementsByClassName('container')[0];
const xAxisNode = document.getElementById('x-axis');
const yAxisNode = document.getElementById('y-axis');
const tooltipEl = document.getElementById('tooltip');

const dataUrl =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const w = 800;
const h = 500;

const padding = 60;

const svg = d3.select('svg').attr('width', w).attr('height', h);

const fetchGDPDataFromApi = async () => {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    const dataset = result.data;
    const dates = dataset.map((d) => new Date(d[0]));

    const xScale = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(new Date(d[0])))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', (w - 2 * padding) / dataset.length)
      .attr('height', (d) => h - padding - yScale(d[1]))
      .attr('fill', 'rgb(51, 173, 255)')
      .attr('class', 'bar');

    const xAxis = d3.axisBottom(xScale);

    d3.select(xAxisNode)
      .attr('transform', 'translate(0, ' + (h - padding) + ')')
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    d3.select(yAxisNode)
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
fetchGDPDataFromApi();

//todo:
// responsive design tooltips
