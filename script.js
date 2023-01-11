(()=>{
    // elements
    const city_dest = document.getElementById("dest_city");
    const country_dest = document.getElementById("dest_country");
    const budget = document.getElementById("budget_value");
    const start_date = document.getElementById("start_date");
    const end_date = document.getElementById("end_date");
    const persons = document.getElementById("persons");
    const transfer = document.getElementById("transfer_type");
    const newedit = document.getElementById("neweditTravel");
    const curIndex=document.getElementById("curindex");
    //test
    const outputSpan = document.getElementById("output");
    // database init
    const storageVal = localStorage.getItem("planner");
    const database = (storageVal) ? JSON.parse(storageVal) : [];
    const addButton = document.getElementById('save_button');
    addButton.onclick = addRecord;

    const render = () => {
        const itemListStr = database.map((value, index) => `
          <div class="card travel-card"> 
           <div class="title">
              <h4>From Haifa to ${value.Destcity} </h4>
              <i class="bi bi-pencil-square edit" id="edit_button" index="${index}"></i>
              <i class="bi bi-x-circle remove" id="remove_button" index="${index}"></i>
              <i class="bi bi-three-dots-vertical details" id="details_button" index="${index}"></i>
           </div>
           <span>Expected budget: ${value.budget} ILS</span>
           <span>${value.startDate} - ${value.endDate} | ${value.persons} persons | ${value.transfer}</span>
           
           </div>
        `).join("");
        outputSpan.innerHTML = itemListStr;
        document.getElementById('save_button').style.visibility = "visible";

        const itemList = document.querySelectorAll('.remove');
        itemList.forEach(value=>value.addEventListener('click', ()=>{
            const id = Number(value.getAttribute('index'));
            console.log(id);
            database.splice(id,1);
            localStorage.setItem("planner",
                JSON.stringify(database));
            render();
        }));

        document.querySelectorAll('.edit').forEach((value =>
                value.addEventListener('click',()=>{
                    newedit.textContent = "Edit record";
                    const editIndex = Number(value.getAttribute('index'));
                    console.log(database[editIndex].Destcity);
                    document.getElementById("dest_city").value = database[editIndex].Destcity;
                    document.getElementById("dest_country").value = database[editIndex].country;
                    document.getElementById("budget_value").value = database[editIndex].budget;
                    document.getElementById("start_date").value = database[editIndex].startDate;
                    document.getElementById("end_date").value = database[editIndex].endDate;
                    document.getElementById("persons").value = database[editIndex].persons;
                    document.getElementById("transfer_type").value = database[editIndex].transfer;
                    document.getElementById('save_button').textContent = "Edit travel";
                    document.getElementById('curindex').textContent = editIndex;
                })
        ));

    };
    render();
    function  clean() {
        newedit.textContent = "New record";
        document.getElementById("dest_city").value = "";
        document.getElementById("dest_country").value = "";
        document.getElementById("budget_value").value = "";
        document.getElementById("start_date").value = "";
        document.getElementById("end_date").value = "";
        document.getElementById("persons").value = "";
        document.getElementById("transfer_type").value = "";
        document.getElementById('save_button').textContent = "Save travel";
    }
    function isNumber(x) {
        if (x === '') {
            return false;
        }
        const numX = +x;
        if (isNaN(numX)) {
            return false;
        } else {
            return true;
        }
    }
    function infoCorrect() {
        if (city_dest!=="") {
            return true;
        }
    };
    function addRecord() {
        if (addButton.textContent == "Save travel") {
            database.push({Destcity:city_dest.value, country:country_dest.value,
                budget:budget.value, startDate: start_date.value, endDate: end_date.value,
                persons:persons.value, transfer:transfer.value});
            clean();
        } else {
            const cur=Number(curIndex.textContent);
            console.log(database[cur]);
            database[cur].Destcity = city_dest.value;
            database[cur].country = document.getElementById("dest_country").value;
            database[cur].budget = document.getElementById("budget_value").value;
            database[cur].startDate = document.getElementById("start_date").value;
            database[cur].endDate = document.getElementById("end_date").value;
            database[cur].persons = document.getElementById("persons").value;
            database[cur].transfer = document.getElementById("transfer_type").value;
            clean();

        }
        localStorage.setItem("planner",
            JSON.stringify(database));
        render();
    }

})();