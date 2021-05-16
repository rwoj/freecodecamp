'use strict';

(function () {
   var pollsList = document.querySelector('.pollsList');
   var apiUrl = appUrl + '/api/polls';
   var profileId = document.querySelector('#profile-id') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrlUser = appUrl + '/api/user/:id';
   var isUser = document.querySelectorAll('.isUser')

   var userId;

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlUser, function (data) {
      var userObject = JSON.parse(data);
      userId=userObject.id;
      if (userId){
        if (userObject.displayName !== null) {
           updateHtmlElement(userObject, displayName, 'displayName');
        } else {
           updateHtmlElement(userObject, displayName, 'username');
        }
      } else{
        for (var i=0; i<isUser.length;i++){
          isUser[i].style.visibility="hidden"
        }
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

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollsList));

})();
