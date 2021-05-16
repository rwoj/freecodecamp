'use strict';

(function () {
  var grid = document.querySelector('.grid')
  var msnry

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', appUrl+'/api/pictures/all', showPictures));

  function someonesPictures(listofpictures) {
    while (grid.hasChildNodes()) {
      grid.removeChild(grid.firstChild);
    }
    var node1 = document.createElement("div");
    node1.setAttribute("class", "grid-sizer");
    var node2 = document.createElement("div");
    node2.setAttribute("class", "gutter-sizer");
    grid.appendChild(node1)
    grid.appendChild(node2)
    var active=document.querySelector(".active")
    active.setAttribute("class", "nav-link")
    // msnry.destroy()
    showPictures(listofpictures)
  }

  function showPictures (listofpictures){
    var list=JSON.parse(listofpictures)
    // console.log(list.length)
    var fragment=document.createDocumentFragment()
    var mlist=[], node
    list.forEach(function (x) {
     node = pictureBox(x)
     fragment.appendChild(node)
     mlist.push(node)
    })
    grid.appendChild(fragment)
    imagesLoaded( grid, function() {
      // init Isotope after all images have loaded
      msnry = new Masonry( grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true
      });
    });
  }

function pictureBox(picture) {
  var node, img, descBox, desc, box, userPic, delbox, likesBox, likesStar, boxlikesNr, likesNr
  // node = outer div
  node = document.createElement("div");
  node.setAttribute("class", "grid-item");
  // img - just the picture
  img=document.createElement("img")
  img.src=picture.url;
  // broken link fix
  img.addEventListener('error', function () {
    img.src='/public/img/no_image.gif'
    img.setAttribute("width", "100%")
    img.setAttribute("height", "100px")
  })
  // description box
  descBox=document.createElement("div")
  descBox.setAttribute("class", "description")
  desc=document.createTextNode(picture.description)
  descBox.appendChild(desc)
  // box for user, del, likes
  box=document.createElement("div")
  box.setAttribute("class", "box")

  userPic=document.createElement("img")
  userPic.src=picture.userUrl
  userPic.addEventListener('click', function (e) {
    e.preventDefault();
    ajaxFunctions.ajaxRequest('POST', appUrl+'/api/pictures/all', someonesPictures ,JSON.stringify(picture))
   })
  likesBox=document.createElement("div")
  likesBox.setAttribute("class", "likesBox")
  likesStar=document.createElement("span")
  likesNr=document.createTextNode(picture.likes)
  likesStar.id='likes'+picture._id
  if(window.location.href.replace(window.location.origin, '')==='/login'){
    likesStar.setAttribute("class", "oi oi-star notouch")
  } else {
    likesStar.setAttribute("class", "oi oi-star")
    likesStar.addEventListener('click', function (e) {
      e.preventDefault()
      // console.log(picture, e, e.target.firstChild.id)
      ajaxFunctions.ajaxRequest('POST', appUrl+'/api/likes', function (result) {
        var newPicture=JSON.parse(result)
        // console.log(result, newPicture.likes)
        document.querySelector('#likes'+newPicture._id).innerHTML=newPicture.likes
      }, JSON.stringify(picture))
    })
  }
  likesStar.appendChild(likesNr)
  likesBox.appendChild(likesStar)

  box.appendChild(userPic)
  // box.appendChild(delbox)
  box.appendChild(likesBox)

  node.appendChild(img)
  node.appendChild(descBox)
  node.appendChild(box)
  return node
}

})();
