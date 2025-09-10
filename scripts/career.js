
let tabContainer = document.querySelector(".tabContainer");
let tab = document.querySelector(".tab");
const modalContainer = document.querySelector(".modalContainer")
const url = "https://api.adcropper.com/getsheet/"
let departmentsKey = ""
let operationsKey = ""
let financesKey = ""
let amlKey = ""
const careerDataUrl = "https://api.adcropper.com/getsheet/67d18d179c0ab4ad8f0c667c"
const careerData = [];


async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
        return null;
    }
}

// Kullanım
(async () => {
    const apis = await getData(careerDataUrl);
     let careerDataApis = JSON.parse(apis).values;

    for (let i = 0; i < careerDataApis.length; i++) {
        const rest = await getData(careerDataApis[i][1])
        const restData = JSON.parse(rest)
        const careerDataElement = {};

        careerDataElement.menuTitle = careerDataApis[i][0];
        careerDataElement.id = careerDataApis[i][0].toLowerCase();

        if (restData.values.length > 1) {
            if (careerDataElement.id == careerDataApis[i][0].toLowerCase()) {
                createJobTableData(restData, careerDataElement)
                careerData.push(careerDataElement)
            }
        }
        
    }

    const careerDataAllTableDatas = careerData.map(item => item.tableData)
        const allMenuData = {
            menuTitle: 'ALL',
            id: "all",
            tableHeader: ["Job Title", "Experience", "Deadline"],
            tableData: careerDataAllTableDatas.flat()
        }
        careerData.push(allMenuData)
    
        // proje açıldığında default menüye tıklanılsın (açık gelsin)
    
        createTable()

    
    document.querySelector(".tabContainer").classList.add("onload");

})();



const createJobTableData = (jobData, careerDataElement) => { 

    careerDataElement.tableHeader = [jobData.values[0][0], jobData.values[0][1], jobData.values[0][2]]
    careerDataElement.tableData = []


    for (let x = 1; x < jobData.values.length; x++) {
        const jobDataDetails = jobData.values[x]

        const tableDataObj = {
            jobTitle: jobDataDetails[0] ?? "",
            experience: jobDataDetails[1] ?? "",
            deadline: jobDataDetails[2] ?? "",
            theRole: jobDataDetails[3] ?? "",
            keyResponsibilities: jobDataDetails[4]?.split("\n") ?? "",
            WhatWeAreLookingFor: jobDataDetails[5]?.split("\n") ?? "",
            WhatWeOffer: jobDataDetails[6]?.split("\n") ?? "",
            Salary: jobDataDetails[7] ?? "",
            WorkingHours: jobDataDetails[8] ?? "",
            WorkingDays: jobDataDetails[9]?.split("\n") ?? "",
            location: jobDataDetails[10] ?? "",
            jobType: jobDataDetails[11] ?? "",
            vacancy: jobDataDetails[12] ?? "",
            applyLink: jobDataDetails[13] ?? ""  
        }
    
        careerDataElement.tableData.push(tableDataObj)


    }

}







// modal close
const modalCloseIcon = document.getElementById("modal-close-icon");

function closeModal() {
    modalContainer.classList.remove("show");
    WhatWeAreLookingFor.innerHTML = "";
    theRole.innerHTML = "";
    keyResponsibilities.innerHTML = "";
    Salary.innerHTML = "";
    WorkingDays.innerHTML = "";
    WorkingHours.innerHTML = "";
    workingDaysDetail.innerHTML = "";
    WhatWeOffer.innerHTML = ""; 
    jobTitle.innerHTML = "";
    jobTitleMobile.innerHTML = "";
    locationDetail.innerHTML = "";
    jobTypeDetail.innerHTML = "";
    experienceDetail.innerHTML = "";
    workingHoursDetail.innerHTML = "";
    workingDaysDetail.innerHTML = "";
    vacancyDetail.innerHTML = "";
    applyButton.href = "";
}

modalCloseIcon.addEventListener("click", () => {

    closeModal();

    const url = new URL(window.location);
    url.searchParams.delete("job");
    window.history.pushState({}, "", url);

})


// create modal datas
const jobTitle = document.getElementById("jobTitle");
const jobTitleMobile = document.getElementById("jobTitleMobile");
const WhatWeAreLookingFor = document.getElementById("WhatWeAreLookingFor")
const theRole = document.getElementById("theRole");
const keyResponsibilities = document.getElementById("keyResponsibilities");
const Salary = document.getElementById("Salary");
const WorkingHours = document.getElementById("WorkingHours");
const WorkingDays = document.getElementById("WorkingDays");
const locationDetail = document.getElementById("location");
const jobTypeDetail = document.getElementById("jobType");
const experienceDetail = document.getElementById("experience")
const workingHoursDetail = document.getElementById("workingHoursDetail")
const workingDaysDetail = document.getElementById("workingDaysDetail")
const vacancyDetail = document.getElementById("vacancy")
const applyButton = document.getElementById("applyButton")
const WhatWeOffer = document.getElementById("WhatWeOffer")

const createModalData = (selectedJobData) => {
    jobTitle.innerHTML = selectedJobData.jobTitle;
    jobTitleMobile.innerHTML = selectedJobData.jobTitle;
    locationDetail.innerHTML = selectedJobData.location;
    jobTypeDetail.innerHTML = selectedJobData.jobType;
    // datePostedDetail.innerHTML = selectedJobData.datePosted;
    experienceDetail.innerHTML = selectedJobData.experience;
    workingHoursDetail.innerHTML = selectedJobData.WorkingHours;
    vacancyDetail.innerHTML = selectedJobData.vacancy;
    WorkingHours.innerHTML = selectedJobData.WorkingHours;
    applyButton.href = selectedJobData.applyLink
    theRole.innerHTML = selectedJobData.theRole;
    Salary.innerHTML = selectedJobData.Salary;

    for (let i = 0; i < selectedJobData.WhatWeAreLookingFor.length; i++) {
        let list = document.createElement("p");
        list.innerHTML = selectedJobData.WhatWeAreLookingFor[i]
        WhatWeAreLookingFor.append(list)

    }
   
    for (let b = 0; b < selectedJobData.keyResponsibilities.length; b++) {
        let list = document.createElement("p");
        list.innerHTML = selectedJobData.keyResponsibilities[b]
        keyResponsibilities.append(list)

    }

    for (let e = 0; e < selectedJobData.WorkingDays.length; e++) {
        let list = document.createElement("p");
        list.innerHTML = selectedJobData.WorkingDays[e]
        WorkingDays.append(list)
    }
    for (let e = 0; e < selectedJobData.WorkingDays.length; e++) {
        let list = document.createElement("p");
        list.innerHTML = selectedJobData.WorkingDays[e]
        workingDaysDetail.append(list)
    }
    for (let e = 0; e < selectedJobData.WhatWeOffer.length; e++) {
        let list = document.createElement("p");
        list.innerHTML = selectedJobData.WhatWeOffer[e]
        WhatWeOffer.append(list)
    }
}






createTable = () => {
    for (let i = 0; i < careerData.length; i++) {

        // Menu butonları
        let menuButton = document.createElement("button");
        menuButton.classList = 'tablinks'
        menuButton.innerText = careerData[i].menuTitle
        menuButton.onclick = function (event) { openTab(event, careerData[i].id) };
        if (i === 0) {
            menuButton.setAttribute("id", 'defaultOpen')
        }

        // butonları tab a ekle
        tab.appendChild(menuButton)

        // Tablo içerikleri
        let tabContent = document.createElement("div");
        let table = document.createElement("div")
        let tableHeader = document.createElement("div")

        // Tablo başlıkları oluştur
        for (let a = 0; a < careerData[i].tableHeader.length; a++) {
            let headerTitle = document.createElement("p")
            headerTitle.innerText = careerData[i].tableHeader[a]
            tableHeader.appendChild(headerTitle)
        }

        // Başlıkları tablo içerisine ata
        table.appendChild(tableHeader);


        // tablo row ları oluştur ve tabloaya ekle
        for (let j = 0; j < careerData[i].tableData.length; j++) {
            let position = document.createElement("div");
            position.classList = 'position'
            let col1 = document.createElement("p");
            let col2 = document.createElement("p");
            let col3 = document.createElement("p");

            position.addEventListener("click", () => {
                const selectedJobData = careerData[i].tableData[j];
                createModalData(selectedJobData)
                modalContainer.classList.add("show")

                // ID'yi veya sıra numarasını al
                const jobCategory = careerData[i].id.replace(' ', '-');
                const jobId =  j + 1; // id varsa onu kullan, yoksa j+1
                const jobIdString = jobCategory + '*' + jobId;

                // URL'yi güncelle (sayfa yenilenmeden)
                const url = new URL(window.location);
                url.searchParams.set("job", jobIdString);
                window.history.pushState({}, "", url);
            })
           

            col1.innerText = careerData[i].tableData[j].jobTitle
            col2.innerText = careerData[i].tableData[j].experience
            col3.innerText = careerData[i].tableData[j].deadline

            position.appendChild(col1)
            position.appendChild(col2)
            position.appendChild(col3)

            table.appendChild(position)

        }


        // içerikleri style ekle ve parent child bağlantıları eklemesi
        tableHeader.classList = "tableHeader";
        table.classList = "table";
        tabContent.classList = "tabcontent";
        tabContent.style.display = "block";
        tabContent.setAttribute("id", careerData[i].id)

        tabContent.appendChild(table);
        tabContainer.appendChild(tabContent);
    }

    document.getElementById("defaultOpen").click();

  

    createMobilDropdown()
    openModalFromUrl();
}
function openModalFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("job");

    if (jobId) {
    
        const [category, indexStr] = jobId.split("*");
        const jobIndex = parseInt(indexStr, 10) - 1;
  
        // İlgili kategoriye ait careerData öğesini bul
        const careerCategory = careerData.find(item => item.id.replace(" ","-") === category);
        
        if (careerCategory && careerCategory.tableData[jobIndex]) {
            const selectedJobData = careerCategory.tableData[jobIndex];
            createModalData(selectedJobData);
            modalContainer.classList.add("show");

            // İlgili sekmeyi ve içeriği aktif hale getir
            const tabLinks = document.querySelectorAll(".tablinks");
            const tabContents = document.querySelectorAll(".tabcontent");

            tabContents.forEach(tab => tab.style.display = "none");
            tabLinks.forEach(tab => tab.classList.remove("active"));

            const activeTab = document.getElementById(category.replace("-"," "));
            
            if (activeTab) {
                activeTab.style.display = "block";
            }
            
            const activeButton = Array.from(tabLinks).find(btn => btn.textContent === careerCategory.menuTitle);
            if (activeButton) {
                activeButton.classList.add("active");
            }

            // Mobil dropdown güncelle
            const selectedText = document.querySelector(".selectedItem h2");

            if (selectedText){
                selectedText.textContent = careerCategory.menuTitle;
            } 
        }
    }
}


  //mobil dropdown
const createMobilDropdown = () => {
    const tabMobil = document.querySelector(".tabMobil");
    const selectedItem = tabMobil.querySelector(".selectedItem");
    const selectionMenu = tabMobil.querySelector(".selectionMenu");
    const selectedText = selectedItem.querySelector("h2");

    // URL parametresinden category'yi al
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("job");
    const [categoryFromUrl] = jobId ? jobId.split("-") : [careerData[0].id.replace(" ", "")];

    for (let i = 0; i < careerData.length; i++) {
        let option = document.createElement("h2");
        option.classList = 'option'
        option.innerText = careerData[i].menuTitle;
        option.onclick = function (event) { openTab(event, careerData[i].id) };
        selectionMenu.appendChild(option);
    }

    const options = selectionMenu.querySelectorAll(".option");

    // Hangi kategori seçili olacaksa onu seç
    const selectedCategory = careerData.find(item => item.id.replace(" ", "") === categoryFromUrl);
    if (selectedCategory) {
        selectedText.textContent = selectedCategory.menuTitle;
        options.forEach(opt => {
            if (opt.textContent === selectedCategory.menuTitle) {
                opt.classList.add("active");
            }
        });
    } else {
        selectedText.textContent = careerData[0].menuTitle;
        options[0].classList.add("active");
    }

    // Menü aç/kapat ve diğer event listener'lar aynı
    selectedItem.addEventListener("click", function () {
        tabMobil.classList.toggle("active");
    });

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function (e) {
            options.forEach(option2 => {
                option2.classList.remove("active")
            })
            selectedText.textContent = options[i].textContent;
            tabMobil.classList.remove("active");
            e.target.classList.add("active")
        });
    }

    document.addEventListener("click", function (event) {
        if (!tabMobil.contains(event.target)) {
            tabMobil.classList.remove("active");
        }
    });
}


// Menü tıklamaları
function openTab(evt, jobName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(jobName).style.display = "block";
    evt.currentTarget.className += " active";
}

// share linkedin
document.getElementById("linkedinImg").addEventListener("click", () => {
    const currentPageUrl = window.location.href;
    const shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(currentPageUrl);
    
    window.open(shareUrl, "_blank");
});
