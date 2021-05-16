'use strict';

(function () {
   var addButton = document.querySelector('#submitButton')
   var pollName = document.querySelector('#pollId');
   var optionName = document.querySelector('#pollOptions');
   var apiUrlnp = appUrl + '/newpoll'
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
      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }
   }));
   function confirmAddPolls (data) {
     window.alert("Hej, your poll has been created!")
     window.location.href=appUrl+'/mypolls';
   }

   addButton.addEventListener('click', function (event) {
//     console.log(pollName.value, optionName.value);
    event.preventDefault()
     var pollData=
       {
         name: pollName.value,
     		 userId: userId,
     		 options: []
        };
        if(optionName.value) {
          optionName.value.split(/\r?\n/g).forEach(function(x){
            if(x!==''){
              pollData.options.push({optionName: x})
            }
          })
        }
  //      console.log(pollData);
      ajaxFunctions.ajaxPost('POST', apiUrlnp, confirmAddPolls, JSON.stringify(pollData));
   }, false);
})();
