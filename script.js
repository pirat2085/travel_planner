(()=>{
    // elements
    const city_dest = document.getElementById("dest_city");
    const country_dest = document.getElementById("dest_country");
    const budget = document.getElementById("budget_value");
    const start_date = document.getElementById("start_date");
    const end_date = document.getElementById("end_date");
    const persons = document.getElementById("persons");
    const transfer = document.getElementById("transfer_type");
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
              <i class="bi bi-pencil-square edit" id="edit_button"></i>
              <i class="bi bi-x-circle remove" id="remove_button"></i>
              <i class="bi bi-three-dots-vertical details" id="details_button"></i>
           </div>
           <span>Expected budget: ${value.budget} ILS</span>
           <span>${value.startDate} - ${value.endDate} | ${value.persons} persons | ${value.transfer}</span>
           
           </div>
        `).join("");
        outputSpan.innerHTML = itemListStr;

        const itemList = document.querySelectorAll('.remove');
        itemList.forEach(value=>value.addEventListener('click', ()=>{
            const id = Number(value.getAttribute('index'));
            console.log(id);
            database.splice(id,1);
            localStorage.setItem("planner",
                JSON.stringify(database));
            render();
        }));
    };
    render();
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
        if (infoCorrect) {
            database.push({Destcity:city_dest.value, country:country_dest.value,
                budget:budget.value, startDate: start_date.value, endDate: end_date.value,
                persons:persons.value, transfer:transfer.value});
        } else {
            alert("Please correct information");
        }
        localStorage.setItem("planner",
            JSON.stringify(database));
        render();
    }

})();