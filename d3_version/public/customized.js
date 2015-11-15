
/* language translation */
var lang = language_set('en');
console.log(data);
data.forEach(function(d){
    d.source = lang[d.source];
    d.target = lang[d.target];
});


/**************************************************************/

var units = "Widgets";

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
},

// width = 700 - margin.left - margin.right,
// height = 300 - margin.top - margin.bottom;
width = 1000;
height = 1000;

var formatNumber = d3.format(",.0f"), // zero decimal places
    format = function (d) {
        return formatNumber(d) + " " + units;
    },
    color = d3.scale.category20();

/*************************************************************/

/* 在網頁中的 div#chart 加入 svg 元素 */
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

/* 建立 sankey diagram 元素 */
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

/*************************************************************/

// 建立空的圖
graph = {
    "nodes": [],
        "links": []
};

// 將 data 導入 graph 中
data.forEach(function (d) {
    graph.nodes.push({
        "name": d.source
    });
    graph.nodes.push({
        "name": d.target
    });
    graph.links.push({
        "source": d.source,
        "target": d.target,
        "value": + d.value
    });
});

// 轉換成巢(樹)狀結構
graph.nodes = d3.keys(
                d3.nest()
                    .key(function (d) {
                        return d.name;
                    })
                    .map(graph.nodes)
                );

// 修改 graph.links 的 source 與 target 的 index 為 graph.nodes 的 index
graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
});

// 把每個 node 從 string 轉換成 object
graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = {
        "name": d
    };
});

// 將 graph 的 nodes 和 links 資料導入 sankey 中 (graph => 設定, sankey => layout & render)
sankey.nodes(graph.nodes)
    .links(graph.links)
    .layout(32); // 32 is iteration, used by computeNodeDepths(iterations);

/*************************************************************/

/* 在 svg 中加入 links */
var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("id",function(d,i) { return "linkLabel" + i; })
    .attr("d", path)
    .style("stroke-width", function (d) {
       return Math.max(1, d.dy);
    })
    .sort(function (a, b) {
       return b.dy - a.dy;
    })

/* 在 svg 中加入 nodes */
var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    })
    .call(d3.behavior.drag()
    .origin(function (d) {
        return d;
    })
    .on("dragstart", function () {
        this.parentNode.appendChild(this);
    })
    .on("drag", dragmove));

/* 讓 node 變長方形 */
node.append("rect")
    .attr("height", function (d) {
        return d.dy;
    })
    .attr("width", sankey.nodeWidth())
    .style("fill", function (d) {
        return d.color = color(d.name.replace(/ .*/, ""));
    })
    .style("stroke", function (d) {
        return d3.rgb(d.color).darker(2);
    })
    .append("title")
    .text(function (d) {
        return d.name + "\n" + format(d.value);
    });

/* 顯示 node 的 title */
node.append("text")
    .attr("x", -6)
    .attr("y", function (d) {
        return d.dy / 2;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function (d) {
        return d.name;
    })
    .filter(function (d) {
        return d.x < width / 2;
    })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

/* 顯示 flow 上的 label */
var labelText = svg.selectAll(".labelText")
    .data(graph.links)
    .enter()
  .append("text")
    .attr("class","labelText")
    .attr("dx",130)
    .attr("dy",0)
  .append("textPath")
    .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
    .text(function(d,i) {                                 
        // return d.source.name + " -> " + d.target.name + " : " + d.value;
        return d.value;
    });

/* 讓 node 可拖曳 */
function dragmove(d) {
    d3.select(this).attr("transform",
        "translate(" + d.x + "," + (
    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
}

