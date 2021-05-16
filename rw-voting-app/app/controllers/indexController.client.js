'use strict';

(function () {
   var pollsList = document.querySelector('.pollsList');
   var apiUrl = appUrl + '/api/polls';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }


  function updatePollsList(data) {
    var polls=JSON.parse(data);
    console.log(polls);
    var nodeLink, node, textnode;
    polls.forEach(function (x) {
      nodeLink=document.createElement('a');
      node = document.createElement("li");
      textnode = document.createTextNode(x.name);
      node.appendChild(textnode);
      node.id=x._id;
      node.setAttribute("class", "list-group-item");
      nodeLink.appendChild(node)
      nodeLink.href='/pollvotes/'+x._id;
      pollsList.appendChild(nodeLink);
    })
  }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollsList));

})();
