'use strict';

(function () {
   var pollName = document.querySelector('#pollName');
   var voteButton = document.querySelector('#submitButton')
   var optionName = document.querySelector('#options');
   var selectList = document.querySelector('#selectList');
   var customOption;
   var customInput =document.querySelector('#customInput');
   var deleteButton = document.querySelector('#deleteButton');
   var twitt=document.querySelector('.twitter-share-button');
   var voteButton = document.querySelector('#optionSubmitButton');
   var isUser = document.querySelectorAll('.isUser')
   var isMy = document.querySelectorAll('.isMy')
   var navHome = document.querySelector('.navbar-brand')
   var apiUrl = appUrl + '/api/polls';
   var apiUrlp = appUrl + '/api/poll'
   var apiUrlnp = appUrl + '/newpoll'
   var profileId = document.querySelector('#profile-id') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrlUser = appUrl + '/api/user/:id';
   var ctx = document.querySelector('#myChart').getContext('2d');
   var userId;
   var pollId=window.location.href.replace(appUrl+'/pollvotes/','');
   var currentpoll, vote={};

  //  console.log(pollId.replace(appUrl+'/pollvotes/',' '));

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlUser, function (data) {
       var userObject = JSON.parse(data);
 //      console.log(userObject);
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
         navHome.href="/"
       }
       updatePollInfo();
   }));
   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   function updatePoolName (data) {
      updateHtmlElement(data, pollName, 'name')
   }

  function updateOptions (data) {
    var node, textnode;

    while (selectList.hasChildNodes()) {
      selectList.removeChild(selectList.firstChild);
    }
    node=document.createElement("option");
    // node.style.disabled="disabled"
    // node.style.selected="selected"
    textnode=document.createTextNode("Choose an option")
    node.appendChild(textnode)
    selectList.appendChild(node)

    data.forEach(function (x) {
      node = document.createElement("option");
      node.value=x._id;
      textnode = document.createTextNode(x.optionName);
      node.appendChild(textnode);
      selectList.appendChild(node);
    })
    if (userId){
      node=document.createElement("option");
      node.value="custom"
      node.style.id="customOption"
      textnode=document.createTextNode("Add a new option")
      node.appendChild(textnode)
      selectList.appendChild(node)
      customOption=document.querySelector('#customOption');
    }

    // <option value disabled="disabled" selected="selected" hidden>Choose an option...</option>
    // <option class="isUser" value="custom" id="customOption">Add new option</option>
  }
  function updatePollInfo() {
    ajaxFunctions.ajaxRequest('GET', apiUrlp+'/'+pollId, function (data) {
      currentpoll=JSON.parse(data);
      console.log(currentpoll);
      updatePoolName(currentpoll);
      updateOptions(currentpoll.options);
      drawChart(currentpoll.options);
      if (currentpoll.userId==userId && userId!=null){
        for (var i=0; i<isMy.length;i++){
          isMy[i].style.visibility="visible"
        }
      }
      twitt.href="https://twitter.com/intent/tweet?text="+window.location.href
    })
  }

selectList.addEventListener('change', function(){
  if (selectList.value=='custom'){
    customInput.style="visibility:visible";
    // console.log("selected...", customInput.value)
  } else{
    customInput.style="visibility:hidden";
  }
})

 deleteButton.addEventListener('click', function () {
   alert("This poll will be deleted")
   ajaxFunctions.ajaxRequest("DELETE", apiUrlp+'/'+pollId, function (data) {
//     console.log(data)
     window.location.href=appUrl+'/mypolls';
   })
 }, false);

 voteButton.addEventListener('click', function () {
   vote.id=selectList.options[selectList.selectedIndex].value
   if (vote.id=='custom'){
     vote.customName=customInput.value;
   }
   vote.user=userId;
  //  console.log(vote)
   ajaxFunctions.ajaxPost("POST", apiUrlp+'/'+pollId, function (data) {
     var result=JSON.parse(data)
    //  console.log(result.noVotes)
     if (result.noVotes){
       alert("Sorry, You can't vote again. User or IP already voted.")
     } else {
       alert("OK. Thank you for your vote!")
       updatePollInfo();
     }
    //  console.log(result)
   }, JSON.stringify(vote))
 }, false);

 function drawChart(data) {
   var backgroundColors=
                  ['rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'], i=0;
   var optionNames=[], optionVotes=[], optionColors=[];
   data.forEach(function (x) {
     optionNames.push(x.optionName);
     optionVotes.push(x.nrVotes);
     optionColors.push(backgroundColors[((i++)%6)])
   })
   var myChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: optionNames,
         datasets: [{
             label: '# of Votes',
             data: optionVotes,
             backgroundColor: optionColors,
             borderWidth: 1
         }]
     },
     options: {
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true
                 }
             }]
         }
     }
   });
 }
//   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePolls));

})();
