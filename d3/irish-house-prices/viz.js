let width = 1000,
    height = 500;
let buffer = 200;
let year = 1995;

let scaleX;
let scaleY;
let scalePopulation;
let houseData;

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);


d3.json('/housePrices.json', (err,data) =>{
  if(err) console.log(`error fetching data:${err}`);
  houseData = data;
  console.log(data);
  scaleX = d3.scale.linear()
    .domain([1, data.length])
    .range([buffer, width-buffer]);
  scaleY = d3.scale.linear()
    .domain([35000, 595000])
    .range([0, 500-50].reverse());
  scalePopulation = d3.scale.linear()
    .domain([164200, 1345000])
    .range([10, 50]);

  let yAxisL = d3.svg.axis().scale(scaleY)
    .orient('left');
  let yAxisR = d3.svg.axis().scale(scaleY)
    .orient('right');
  let yAxisGroupL = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${buffer/2},0)`)
    .call(yAxisL);
  let yAxisGroupR = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${width - buffer/2}, 0)`)
    .call(yAxisR);
  
  let x = d3.scale.ordinal()
    .domain(['Dublin', 'Cork', 'Galway', 'Limerick'])
    .rangePoints([buffer, width-buffer]);
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');
  let xAxisGroup = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0, 480)')
    .call(xAxis);
  
  update(houseData, year)
})


function update(data, year){
  
  var circle = svg.selectAll('circle')
    .data(data);
  
  circle.exit().remove();
  
  circle
    .transition()
      .ease('easeElastic') 
      .duration(1000)
      .attr('cx', (d)=>{
        return scaleX(+d.ID)
      })
      .attr('cy', (d)=>{
        return scaleY(+d['price_' + year])
      })
      .attr('r', (d)=>{
        return scalePopulation(+d['pop_' + year]);
      })
      .attr('fill', (d)=>{
        return d.Color;
      }) 
    
  circle.enter()
    .append('circle')
      .attr('cx', (d)=>{
        return scaleX(+d.ID)
      })
      .attr('cy', (d)=>{
        return scaleY(+d['price_' + year])
      })
      .attr('r', (d)=>{
        return scalePopulation(+d['pop_' + year]);
      })
      .attr('fill', (d)=>{
        return d.Color;
      });
}


setInterval(()=>{
  year += 1;
  if(year > 2016){
    year = 1995;
  };
  document.getElementById('year').innerText = year;

  update(houseData, year);
}, 500);
