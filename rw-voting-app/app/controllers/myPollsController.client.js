'use strict';

(function () {
   var pollsList = document.querySelector('.pollsList');
   var apiUrl = appUrl + '/api/polls';
   var profileId = document.querySelector('#profile-id') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrlUser = appUrl + '/api/user/:id';

   var userId;

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlUser, function (data) {
      var userObject = JSON.parse(data);

      userId=userObject.id;
      var user={userId: userObject.id};

      ajaxFunctions.ready(ajaxFunctions.ajaxPost('POST', apiUrl, updatePollsList, JSON.stringify(user)));

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }
   }));

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

})();
