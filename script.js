const alumniTestimonialItems = document.querySelector(".alumni-testimonial-items");
const alumniTestimonialPopup= document.querySelector(".alumni-testimonial-popup-box");
const popupCloseBtn = alumniTestimonialPopup.querySelector(".popup-close-btn");
const popupCloseIcon = alumniTestimonialPopup.querySelector(".popup-close-icon");
const alumniTestimonialRow = document.querySelector(".alumni-testimonial-row");

alumniDataFetchXlsx();
scrollerButtons();
alumniReadmorePopupDetails();

function alumniDataFetchXlsx(){
    fetch('excelsheet/alumniTestimonialData.xlsx') 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.arrayBuffer();
    })
    .then(data => {
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
  
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
  
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // console.log(jsonData);
      
      let content = "";
    jsonData.forEach((elem) => {
      content += `
       <div class="item">
          <div class="item-inner">
               <h3>${elem.NAME}</h3>
               <img src="/photo/${elem.PHOTO}" alt="${elem.NAME}">
               <div class="alumni-name">${elem.NAME}</div>
               <p class="detail"><span>Branch: </span> ${elem.BRANCH} </p>
               <p class="detail"><span>Company: </span> ${elem.COMPANY}</p>
               <p class="detail"><span>CTC: </span> ${elem.CTC}</p>
               <div class="read-more-cont">
                <img src="/photo/${elem.PHOTO}" alt="${elem.NAME}">
                <div class="alumni-name">${elem.NAME}</div>
                <p class="detail"><span>Branch: </span> ${elem.BRANCH}</p>
                <p class="detail"><span>Company: </span> ${elem.COMPANY}</p>
                <p class="detail"><span>CTC: </span> ${elem.CTC}</p>
                <p id="description">${elem.DESCRIPTION}</p>
                </div>
                <button class="btn" type="button">Read More</button>
                </div>
                </div>
                `;
    });
    alumniTestimonialRow.innerHTML += content;
  
    })
    .catch(error => {
      console.error('Error fetching or parsing the file:', error);
    });
}

function alumniReadmorePopupDetails() {

    alumniTestimonialItems.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "button") {
        const item = event.target.parentElement;

        const h3Element = item.querySelector("h3");
        const readMoreContElement = item.querySelector(".read-more-cont");

        if (h3Element && readMoreContElement) {
          const h3 = h3Element.innerHTML;
          const readMoreCont = readMoreContElement.innerHTML;

          const popupH3 = alumniTestimonialPopup.querySelector("h3");
          const popupBody = alumniTestimonialPopup.querySelector(".popup-body");

          if (popupH3 && popupBody) {
            popupH3.innerHTML = h3;
            popupBody.innerHTML = readMoreCont;
            popupBox();
          }
        }
      }
    });

    popupCloseIcon?.addEventListener("click", popupBox);
    popupCloseBtn?.addEventListener("click", popupBox);

    alumniTestimonialPopup.addEventListener("click", function (event) {
      if (event.target === alumniTestimonialPopup) {
        popupBox();
      }
    });

  function popupBox() {
    alumniTestimonialPopup.classList.toggle("open");
  }
}


function scrollerButtons(){
  let leftbtn = document.querySelector("#prev-scroll-btn")
  let rightbtn = document.querySelector("#next-scroll-btn")

  alumniTestimonialRow.addEventListener("wheel", (e) => {
    // e.preventDefault();
    alumniTestimonialRow.scrollLeft += e.deltaY;
  })
  
  rightbtn.addEventListener("click", ()=>{
    alumniTestimonialRow.style.scrollBehavior = "smooth";
    alumniTestimonialRow.scrollLeft += 350;
  })
  leftbtn.addEventListener("click", ()=>{
    alumniTestimonialRow.style.scrollBehavior = "smooth";
    alumniTestimonialRow.scrollLeft -= 350;
  })
}
