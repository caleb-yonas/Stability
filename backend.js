
listOT = []
listOD = []
class Payment {
    constructor(name, amount, category, type) {
        this.name = name ;
        this.amount =amount ;
        this.category = category ; 
        this.type = type;
        if (type == "transaction") {listOT.push(this)}
        else if (type == "deposit") {listOD.push(this)}
        
    }

    getName() {
        return this.name;
    }
    getAmount() {
        return this.amount;
    }
    getCategory() {
        return this.category;
    }
    editAmount(newAmount) {
        if (typeof newAmount != Number) {
            pass
        }
        else {this.amount = newAmount}
    }
    editCategory(newCategory) {
        if (typeof newCategory != String) {
            pass
        }
        else {this.amount = newCategory}
    }
}



let t1 = new Payment("bills", 34, 0, 0, "utilities", "transaction");
let t2 = new Payment("tab", 17, 0, 0, "restaurant", "transaction");
let t3 = new Payment("chairs", 86, 0, 0, "work", "transaction");
let t4 = new Payment("bills", 104, 0, 0, "utilities", "transaction");
let t5 = new Payment("tables", 200, 0, 0, "work", "transaction");
let t6 = new Payment("drink", 29, 0, 0, "restaurant", "transaction");

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}


function amountSort(listOT) {
    let cat = []

    for (let i = 0; i<listOT.length; i++) {
        if (!(containsObject(listOT[i].getCategory(), cat))) {
            cat.push(
                (listOT[i].getCategory())
            )
        }
    }
    let amt = Array.from({length: cat.length}, () => 0);

    for (let i = 0; i<cat.length; i++) {
        for (let j = 0; j<listOT.length; j++) {
            if (cat[i] == listOT[j].getCategory()) {
                amt[i] = amt[i] + listOT[j].getAmount()
                
            }
        }
    }
    var result = {}
    cat.forEach((cat, i) => result[cat] = amt[i]);
    console.log(result);

}



function dateConvert(dateString) {
    // Split the input date string into year, month, and day components
    const [year, month, day] = dateString.split('-').map(Number);
  
    // Create a JavaScript Date object with the corrected day
    const correctedDate = new Date(year, month-1, day);
  
    // Ensure the day is within the valid range for the month
    if (correctedDate.getDate() !== day) {
      // If the day is invalid, set it to the last day of the previous month
      correctedDate.setDate(0); // This sets it to the last day of the previous month
    }
  
    return correctedDate;
  }
  


// Example usage:
const inputDate = "2023-12-31";
const correctedDate = dateConvert(inputDate);
console.log(correctedDate); // Outputs: Tue May 31 2023 00:00:00 GMT+0000 (Coordinated Universal Time)


