let modal = document.getElementById("mainModal");

// Get the input that opens the modal

function displayModal () {
    for (let i = 0; i < inputAll.length; i++){
        let modalOnClick = inputAll[i]

        modalOnClick.addEventListener('click', event =>{
            modal.style.display = "block"
            let htmlNoScroll = document.querySelector('html')
            htmlNoScroll.setAttribute('style', 'overflow: hidden')
          })
}};
displayModal();

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  location.reload()
}

// generate the images cards 
let modGal = document.querySelector('.galleryPrev')
async function worksDataModal() {
    try {
    const res = await fetch('http://localhost:5678/api/works')
    let data = await res.json();

    //create elements using the fetched data
    for (let i = 0; i < data.length; i++) {
        let imgCard = document.createElement("div");
        imgCard.classList.add('imgCard')
        modGal.append(imgCard)   

        //create image with attributes
        let dataImg = document.createElement("img");
        dataImg.setAttribute('alt', data[i].title);
        dataImg.src = data[i].imageUrl;

        //create edit text
        let editTxt = document.createElement("p")
        editTxt.innerHTML = "Editer"
        
        // create trash icon
        let trashIcon = document.createElement("p")
        trashIcon.innerHTML = "<i class=\"fa-solid fa-trash\"></i>"
        trashIcon.id = data[i].id;
        trashIcon.classList.add('trashIcon')

        //create captation and content
        //append all that
        imgCard.append(trashIcon)
        imgCard.append(dataImg)
        imgCard.append(editTxt)

        //delete items 
        let imgCardRemover = document.querySelectorAll('.imgCard')
        let imgCards = document.querySelectorAll('.trashIcon')
    
        for (let i = 0; i < imgCards.length; i++){
    
            imgCards[i].addEventListener('click', async event =>{
                try {
                    let response = await fetch('http://localhost:5678/api/works/' + imgCards[i].id, {
                        method: 'DELETE',
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token"),
                            'Content-Type': 'application/json;charset=utf-8'
                          }
                      })
                      if (response.ok) {
                        imgCardRemover[i].remove()
                      } else {
                        alert("Echec de suppression");
                      }
                } catch (error){
                    console.error(error);
            }
            })
        }
    }
} catch (error){
        console.error(error);
}};

//call function
worksDataModal();

// gestion of modal options
let previousModal = document.querySelector('.fa-arrow-left')
let addNewImgButton = document.querySelector('input[name="addNewImg"]')
let modalContent = document.querySelector('.modalContent')
let newModalContent = document.querySelector('.newModalContent')

addNewImgButton.addEventListener('click', event =>{
  previousModal.style.display = "block";
    newModalContent.setAttribute('style', 'display:flex !important');
    modalContent.style.display = "none";
})

previousModal.addEventListener('click', event =>{
  previousModal.style.display = "none";
    newModalContent.style.display = "none";
    modalContent.setAttribute('style', 'display:flex !important');
})

// preview image
let preview = document.getElementById('preview')
let hideDisplay = document.querySelector('.newImgDisplay')
let imgPreview = document.querySelector('.imgBackground')

function handleImg(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i]

    if(i == 0){
        hideDisplay.style.display = "none";
        imgPreview.style.display = "flex"
        preview.innerHTML = '';
      }
      var img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      preview.appendChild(img); 
      var reader = new FileReader();

      reader.onload = ( function(aImg) { 
      return function(e) { 
      aImg.src = e.target.result; 
    }; 
   })(img);
 
  reader.readAsDataURL(file);

// add new image 
let newImg = document.getElementById('validateButton')
  let form  = document.getElementById('newModalContent')

  form.addEventListener('submit', async event  =>{
  event.preventDefault()

  let title = document.getElementById('title').value
  let category = document.getElementById('category-select').value

    let formData = new FormData();
    formData.append('image', files[0])
    formData.append('title', title)
    formData.append('category', category)

    try {   
    let response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization : 'Bearer ' + localStorage.getItem("token"),
      },
      body: formData
    });
    let result = await response;

    // function to remove items
    let allMainImg = document.querySelectorAll('.main-content')
    let allimgCards = document.querySelectorAll('.imgCard')
    for (var i = 0; i < allimgCards.length; i++){
    let imgCardRemover = allimgCards[i]
    let mainImgRemover = allMainImg[i]

    imgCardRemover.remove()

    }
    worksDataModal();
    // change modal display
    previousModal.style.display = "none";
    newModalContent.style.display = "none";
    modalContent.setAttribute('style', 'display:flex !important');
    let htmlNoScroll = document.querySelector('html')
    htmlNoScroll.setAttribute('style', 'overflow: hidden')

    //reload gallery

} catch (error){
    console.error(error);
}})}}