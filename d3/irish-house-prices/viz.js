let width = 750,
    height = 500;
let year = 1995;

let scaleX;
let scaleY;
let scalePopulation;
let houseData;

let svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);


d3.json("./housePrices.json", (data)=>{
  houseData = data;
  
  scaleX = d3.scale.linear()
    .domain([1, data.length])
    .range([50, width-100]);
  scaleY = d3.scale.linear()
    .domain([35000, 595000])
    .range([0, 500-50].reverse());
  scalePopulation = d3.scale.linear()
    .domain([85000, 1300000])
    .range([10, 50]);

  let yAxis = d3.svg.axis().scale(scaleY)
    .orient("left");
  let yAxisGroup = svg.append("g")
    .attr('class', 'axis')
    .attr('transform', 'translate('+720+', '+0+')')
    .call(yAxis);
  
  let x = d3.scale.ordinal()
    .domain(['Dublin', 'Cork', 'Galway', 'Limerick'])
    .rangePoints([50, width-100]);
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  let xAxisGroup = svg.append("g")
    .attr('class', 'axis')
    .attr('transform', 'translate(0, '+470+')')
    .call(xAxis);
  
  update(houseData, year)
})


function update(data, year){
  svg.selectAll("circle").remove();
  
  var circle = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d)=>{
      return scaleX(+d.ID)
    })
    .attr("cy", (d)=>{
      return scaleY(+d[year])
    })
    .attr("r", (d)=>{
      return scalePopulation(+d.Population);
    })
    .attr("fill", (d)=>{
      return d.Color;
    })
}


setInterval(()=>{
  year += 1;
  if(year > 2016){
    year = 1995;
  };
  document.getElementById("year").innerText = year;

  update(houseData, year);
}, 1000);
