const containerNode = document.getElementsByClassName('container')[0];
const svgNode = document.getElementsByTagName('svg')[0];
const xAxisNode = document.getElementById('x-axis');
const yAxisNode = document.getElementById('y-axis');
const tooltipEl = document.getElementById('tooltip');

const dataUrl =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const fetchGDPDataFromApi = async () => {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log(data); //
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
fetchGDPDataFromApi();
