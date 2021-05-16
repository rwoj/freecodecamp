'use strict';

(function () {
  var socket = io();
  var apiUrl = appUrl + '/api/stock', apiUrlComp = appUrl + '/api/companies';
  var b1m = document.querySelector('#s1m'),
    b3m = document.querySelector('#s3m'),
    b6m = document.querySelector('#s6m'),
    b1y = document.querySelector('#s1y');
  var periods = {     period: { b1m: 1, b3m: 3, b6m: 6, b1y: 1 },
              periodSymbol:{ b1m: 'M', b3m: 'M', b6m: 'M', b1y: 'Y'}}
  var currentPeriod = { period: 1, periodSymbol: 'M'}
  var companies = document.querySelector('.companies')
  var addButton = document.querySelector('#add')
  var symbolCode = document.querySelector('#symbol')

  addButton.addEventListener('click',function(e){
    e.preventDefault();
    var elcheck=document.querySelector('#'+symbolCode.value.toUpperCase())
    if(!elcheck){
      ajaxFunctions.ajaxRequest('POST', apiUrlComp, function (data) {
       //  var dataObj=JSON.parse(data)
       socket.emit('add symbol', data);
       symbolCode.value='';
      }, JSON.stringify({what: 'add', symbol: symbolCode.value.toUpperCase()}))
    } else {
      window.alert("That company is already displayed")
    }
   });
  socket.on('add symbol', function(msg){
    var msgObj=JSON.parse(msg)
    if (msgObj.symbol){
      addSymbolCard(msgObj.symbol, msgObj.description)
      addLine(currentPeriod.period, currentPeriod.periodSymbol, [msgObj.symbol])
    } else {
      window.alert("The symbol is not valid")
    }
  });
  socket.on('remove symbol', function(msg){
    var elremove=document.querySelector('#'+msg)
    if (elremove){
      elremove.remove(elremove.selectedIndex)
      removeLine(msg)
    } else {
      console.log("nothing to be removed")
    }
  });
 function addSymbolCard(code, descr) {
   var msgnode, msgrownode, msgtext1node, msgtext1, br, msgtext2node, msgtext2, msgbut, msgbuttext
   msgnode=document.createElement("div")
   msgnode.setAttribute("class", "company");
   msgnode.id=code

   msgrownode=document.createElement("div")
   msgrownode.setAttribute("class", "comprow");

   msgtext1node=document.createElement("div")
   msgtext1node.setAttribute("class", "compsymbol");
   msgtext1=document.createTextNode(code)
   msgtext1node.appendChild(msgtext1)

   msgbut=document.createElement("button")
   msgbut.setAttribute("class", "compxbutt");
   msgbuttext=document.createTextNode("X")
   msgbut.appendChild(msgbuttext)

   msgtext2node=document.createElement("div")
   msgtext2node.setAttribute("class", "compdescr");
   msgtext2=document.createTextNode(descr)
   msgtext2node.appendChild(msgtext2)

   msgrownode.appendChild(msgtext1node)
   msgrownode.appendChild(msgbut)

   msgnode.appendChild(msgrownode)
   msgnode.appendChild(msgtext2node)
   companies.appendChild(msgnode)

   msgbut.addEventListener('click',function(e){
     e.preventDefault();
//     console.log(e)
     ajaxFunctions.ajaxRequest('POST', apiUrlComp, function (data) {
      //  console.log("emituje remove", e.target.parentElement.id)
       socket.emit('remove symbol', e.target.parentElement.parentElement.id);
     }, JSON.stringify({what: 'remove', symbol: code}))
   });
 }

 b1m.addEventListener('click', function () {
   currentPeriod.period=periods.period.b1m;
   currentPeriod.periodSymbol=periods.periodSymbol.b1m;
   ajaxFunctions.ajaxRequest('GET', apiUrlComp, function (allSymbols) {
     var allSymbolsOnly=[];
     var allSymbolsObj=JSON.parse(allSymbols)
     if(allSymbolsObj.length>0){
       allSymbolsObj.forEach(function (x) {
         allSymbolsOnly.push(x.symbol)
       })
     }
     refresh(periods.period.b1m, periods.periodSymbol.b1m, allSymbolsOnly)
   })
 })
 b3m.addEventListener('click', function () {
   currentPeriod.period=periods.period.b3m;
   currentPeriod.periodSymbol=periods.periodSymbol.b3m;
   ajaxFunctions.ajaxRequest('GET', apiUrlComp, function (allSymbols) {
     var allSymbolsOnly=[];
     var allSymbolsObj=JSON.parse(allSymbols)
     if(allSymbolsObj.length>0){
       allSymbolsObj.forEach(function (x) {
         allSymbolsOnly.push(x.symbol)
       })
     }
     refresh(periods.period.b3m, periods.periodSymbol.b3m, allSymbolsOnly)
   })
 })
 b6m.addEventListener('click', function () {
   currentPeriod.period=periods.period.b6m;
   currentPeriod.periodSymbol=periods.periodSymbol.b6m;
   ajaxFunctions.ajaxRequest('GET', apiUrlComp, function (allSymbols) {
     var allSymbolsOnly=[];
     var allSymbolsObj=JSON.parse(allSymbols)
     if(allSymbolsObj.length>0){
       allSymbolsObj.forEach(function (x) {
         allSymbolsOnly.push(x.symbol)
       })
     }
     refresh(periods.period.b6m, periods.periodSymbol.b6m, allSymbolsOnly)
   })
 })
 b1y.addEventListener('click', function () {
   currentPeriod.period=periods.period.b1y;
   currentPeriod.periodSymbol=periods.periodSymbol.b1y;
   ajaxFunctions.ajaxRequest('GET', apiUrlComp, function (allSymbols) {
     var allSymbolsOnly=[];
     var allSymbolsObj=JSON.parse(allSymbols)
     if(allSymbolsObj.length>0){
       allSymbolsObj.forEach(function (x) {
         allSymbolsOnly.push(x.symbol)
       })
     }
     refresh(periods.period.b1y, periods.periodSymbol.b1y, allSymbolsOnly)
   })
 })

 var bardata=[], bardates=[], description;
 var margin={top: 30, right: 30, bottom: 50, left: 50}
 var height=500-margin.top-margin.bottom,
     width=800-margin.left-margin.right;
 var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
 var formatDate = d3.timeFormat("%Y-%m-%d")

 var x = d3.scaleTime().rangeRound([0, width]),
    y = d3.scaleLinear().rangeRound([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);
var valueline = d3.line()
  .x(function(d) { return x(strictIsoParse(d.date))})
  .y(function(d) { return y(d.close) })

ajaxFunctions.ajaxRequest('GET', apiUrlComp, function (allSymbols) {
  var allSymbolsOnly=[];
  var allSymbolsObj=JSON.parse(allSymbols)
  if(allSymbolsObj.length>0){
    allSymbolsObj.forEach(function (x) {
      addSymbolCard(x.symbol, x.description)
      allSymbolsOnly.push(x.symbol)
    })
  }
  // console.log(allSymbols)
    ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
      var stockData=JSON.parse(data)
      // console.log("heja", stockData)
      // var today=new Date()
      // console.log(formatDate(today))
      if (!stockData){
        console.log("no stock data")
      } else {
        for (let key in stockData){
          x.domain(d3.extent(stockData[key], function(d) { return strictIsoParse(d.date)}))
          y.domain(d3.extent(stockData[key], function(d) { return d.close }));

        g.append("path")
          .attr("class", "line "+key)
          .datum(stockData[key])
          .attr("fill", "none")
          .style("stroke", function (d) {
            var card=document.querySelector('#'+key);
            card.style.backgroundColor=z(key)
            return z(key)})
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", valueline(stockData[key]))
      }
      g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .select(".domain")
      // .remove();

      g.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");
    }
  }, JSON.stringify({symbols: allSymbolsOnly,
    period: currentPeriod.period, periodSymbol: currentPeriod.periodSymbol}))
})

 function refresh(period, periodSymbol, symbols) {
    var stock={ symbols: symbols,
                period: period,
                periodSymbol: periodSymbol}
      console.log(stock)
      ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
        var stockData=JSON.parse(data)
        // console.log("heja", stockData)
        // var today=new Date()
        // console.log(formatDate(today))
        if (!stockData){
          console.log("no stock data")
        } else {
          for (let key in stockData){
            x.domain(d3.extent(stockData[key], function(d) { return strictIsoParse(d.date)}))
            y.domain(d3.extent(stockData[key], function(d) { return d.close }));
            var svg=d3.select("svg").transition();
            svg.select(".line."+key)
                .attr("d", valueline(stockData[key]))
              }
            svg.select(".x.axis")
              .duration(500)
              .call(xAxis)
            svg.select(".y.axis")
              .duration(500)
              .call(yAxis)
          }
    }, JSON.stringify(stock))
  }
  function addLine(period, periodSymbol, symbols) {
     var stock={ symbols: symbols,
                 period: period,
                 periodSymbol: periodSymbol}
      //  console.log(stock)
       ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
         var stockData=JSON.parse(data)
        //  console.log("heja", stockData)
         // var today=new Date()
         // console.log(formatDate(today))
         if (!stockData){
          //  console.log("no stock data")
         } else {
           for (let key in stockData){
             x.domain(d3.extent(stockData[key], function(d) { return strictIsoParse(d.date)}))
             y.domain(d3.extent(stockData[key], function(d) { return d.close }));
             g.append("path")
               .attr("class", "line "+key)
               .datum(stockData[key])
               .attr("fill", "none")
               .style("stroke", function (d) {
                 var card=document.querySelector('#'+key);
                 card.style.backgroundColor=z(key)
                 return z(key)
               })
               .attr("stroke-linejoin", "round")
               .attr("stroke-linecap", "round")
               .attr("stroke-width", 1.5)
               .attr("d", valueline(stockData[key]))
           }
           if (document.querySelector(".y.axis")){
             svg.select(".y.axis")
             .call(yAxis)
           } else {
             g.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis)
             .select(".domain")
             // .remove();

             g.append("g")
             .attr("class", "y axis")
             .call(yAxis)
             .append("text")
             .attr("fill", "#000")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", "0.71em")
             .attr("text-anchor", "end")
             .text("Price ($)");
           }
         }
     }, JSON.stringify(stock))
   }
   function removeLine(symbol) {
     svg.select(".line."+symbol)
         .remove()
   }
})();
