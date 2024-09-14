const alumniTestimonialItems = document.querySelector(".alumni-testimonial-items");
const alumniTestimonialPopup= document.querySelector(".alumni-testimonial-popup-box");
const popupCloseBtn = alumniTestimonialPopup.querySelector(".popup-close-btn");
const popupCloseIcon = alumniTestimonialPopup.querySelector(".popup-close-icon");
const alumniTestimonialRow = document.querySelector(".alumni-testimonial-row");


function alumniDataFetchXlsx(){
    // Fetch the XLSX file from a server or local directory
    fetch('excelsheet/alumniTestimonialData.xlsx')  // Provide the correct path to your xlsx file
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.arrayBuffer();  // Read the response as an array buffer
    })
    .then(data => {
      // Parse the XLSX data using SheetJS
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
    //   console.log(workbook);
  
      // Assuming the first sheet is the one we need
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
  
      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
      
      let content = "";
    jsonData.forEach((elem) => {
      content += `
       <div class="item">
          <div class="item-inner">
               <h3>${elem.NAME}</h3>
               <img src="" alt="${elem.NAME}">
               <div class="alumni-name">${elem.NAME}</div>
               <p>Department: ${elem.BRANCH} </p>
               <p>Company: ${elem.COMPANY}</p>
               <p>Salary: ${elem.CTC}</p>
               <div class="read-more-cont">
                <img src="" alt="${elem.NAME}">
                <div class="alumni-name">${elem.NAME}</div>
                <p>Department: ${elem.BRANCH}</p>
                <p>Company: ${elem.COMPANY}</p>
                <p>Salary: ${elem.CTC}</p>
                <p>${elem.DESCRIPTION}</p>
                </div>
                <button class="btn" type="button">Read More</button>
                </div>
                </div>
                `;
    });
    alumniTestimonialRow.innerHTML += content;
  
      // Append the generated content to the row
    })
    .catch(error => {
      console.error('Error fetching or parsing the file:', error);
    });
}

function alumniReadmorePopupDetails(){
  alumniTestimonialItems.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() == "button") {
      const item = event.target.parentElement;
      const h3 = item.querySelector("h3").innerHTML;
      const readMoreCont = item.querySelector(".read-more-cont").innerHTML;
      alumniTestimonialPopup.querySelector("h3").innerHTML = h3;
      alumniTestimonialPopup.querySelector(".popup-body").innerHTML = readMoreCont;
      popupBox();
    }
  });
  
  popupCloseIcon.addEventListener("click", popupBox);
  popupCloseBtn.addEventListener("click", popupBox);
  
  alumniTestimonialPopup.addEventListener("click", function (event) {
    if (event.target == alumniTestimonialPopup) {
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

alumniDataFetchXlsx();
scrollerButtons();
alumniReadmorePopupDetails();