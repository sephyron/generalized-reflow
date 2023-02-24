import d3 from "d3";
const data = [
  { name: "home/", value: 66 },
  { name: "products/", value: 77 },
  { name: "checkout/", value: 22 },
  { name: "support/", value: 88 },
  { name: "billing/", value: 23 },
  { name: "shipping/", value: 53 },
  { name: "contact/", value: 90 },
  { name: "search/", value: 61 },
  { name: "account/", value: 49 }
];

const viewBox = d3.select("#chart").attr("viewBox").split(" ");
const width = viewBox[2];
const height = viewBox[3];
const margin = { top: 64, right: 0, bottom: 20, left: 0 };

d3.select("#chart").append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", "#212124");

const chart = d3.select("#chart").append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleBand()
  .range([0, width - margin.left - margin.right])
  .domain(data.map(d => d.name))
  .padding(0.09);

const y = d3.scaleLinear()
  .range([height - margin.top - margin.bottom, 0])
  .domain([0, d3.max(data, d => d.value) * 1.28]);

const color = d3.scaleOrdinal()
  .range(["#B877D9", "#EAB839", "#5794F2", "#73BF69"])
  .domain(data.map(d => d.name));

chart.append("g")
  .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
  .call(d3.axisBottom(x))
  .call(c => c.selectAll("text").attr("fill", "#000").attr("font-family", "ProtoFontRegular;"))
  .call(c => c.selectAll(".domain, .tick line").remove())

const values = chart.selectAll(".value")
  .data(data)
  .join("g")
  .attr("class", "value")
  .attr("transform", d => `translate(${x(d.name)}, 0)`);

values.append("rect")
  .attr("width", x.bandwidth())
  .attr("height", height - margin.top - margin.bottom)
  .attr("fill", "#313133");

values.append("rect")
  .attr("width", x.bandwidth())
  .attr("height", d => height - margin.top - margin.bottom - y(d.value))
  .attr("y", d => y(d.value))
  .attr("fill", d => color(d.name))
  .attr("opacity", 0.5);

values.append("line")
  .attr("x2", x.bandwidth())
  .attr("y1", d => y(d.value))
  .attr("y2", d => y(d.value))
  .attr("stroke-width", 2)
  .attr("stroke", d => color(d.name));

values.append("text")
  .attr("x", x.bandwidth() / 2)
  .attr("y", -7)
  .attr("font-size", 18)
  .attr("fill", d => color(d.name))
  .attr("text-anchor", "middle")
  .attr("font-family", "Roboto")
  .text(d => d.value);

chart.append("text")
  .attr("x", width / 2)
  .attr("y", -45)
  .attr("fill", "#D8D9DA")
  .attr("text-anchor", "middle")
  .attr("font-family", "Roboto")
  .text("Google hits");
