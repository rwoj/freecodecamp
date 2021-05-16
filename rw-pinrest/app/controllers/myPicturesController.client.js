'use strict';

(function () {
  var addPicture = document.querySelector('#addPicture');
  var pictureUrl = document.querySelector('#pictureUrl')
  var pictureDescr = document.querySelector('#pictureDescr')
  var grid = document.querySelector('.grid')
  var msnry

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', appUrl+'/api/pictures/my', showPictures));

  function showPictures (listofpictures){
    //  console.log(listofpictures)
    var list=JSON.parse(listofpictures)
    var fragment=document.createDocumentFragment()
    var node, mlist=[]
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
  function placeAddedPicture(picture) {
    var parsedPicture = JSON.parse(picture)
    var node=pictureBox(parsedPicture)

    grid.insertBefore(node, grid.firstChild)
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
  function deletePicture(picture) {
    var parsedPicture = JSON.parse(picture)
    var docToRemove=document.querySelector('#item'+parsedPicture._id)
    // console.log(picture, docToRemove)
    msnry.remove(docToRemove)
    msnry.layout()
  }

  addPicture.addEventListener('click', function (event) {
    var picture = {}
    event.preventDefault()
    // console.log(pictureUrl.value, pictureDescr.value);
    if (pictureUrl.value && pictureDescr.value){
      picture.url=pictureUrl.value
      picture.description=pictureDescr.value
      ajaxFunctions.ajaxRequest('POST', appUrl+'/api/pictures/my', placeAddedPicture, JSON.stringify({picture}))
      pictureUrl.value=''
      pictureDescr.value=''
    } else {
      alert("picture ulr and description cannot be empty")
    }
  }, false);


  function pictureBox(picture) {
  var node, img, descBox, desc, box, userPic, delbox, likesBox, likesStar, boxlikesNr, likesNr
  // node = outer div
  node = document.createElement("div");
  node.setAttribute("class", "grid-item");
  node.id='item'+picture._id
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
  delbox=document.createElement("span")
  delbox.setAttribute("class", "oi oi-x")
  // delbox.id=x._id
  delbox.addEventListener('click', function (e) {
    e.preventDefault()
    // console.log("to delete", picture)
    ajaxFunctions.ajaxRequest('DELETE', appUrl+'/api/pictures/my', deletePicture, JSON.stringify(picture))
  })
  likesBox=document.createElement("div")
  likesBox.setAttribute("class", "likesBox")
  likesStar=document.createElement("span")
  likesStar.setAttribute("class", "oi oi-star")
  likesNr=document.createTextNode(picture.likes)
  likesStar.id='likes'+picture._id
  likesStar.addEventListener('click', function (e) {
    e.preventDefault()
    // console.log(picture, e, e.target.firstChild.id)
    ajaxFunctions.ajaxRequest('POST', appUrl+'/api/likes', function (result) {
      var newPicture=JSON.parse(result)
      // console.log(result, newPicture.likes)
      document.querySelector('#likes'+newPicture._id).innerHTML=newPicture.likes
    }, JSON.stringify(picture))
  })
  likesStar.appendChild(likesNr)
  likesBox.appendChild(likesStar)
  // boxlikesNr=document.createElement("span")
  // boxlikesNr.appendChild(likesNr)
  // likesBox.appendChild(boxlikesNr)

  box.appendChild(userPic)
  box.appendChild(delbox)
  box.appendChild(likesBox)

  node.appendChild(img)
  node.appendChild(descBox)
  node.appendChild(box)
  return node
  }
})();
