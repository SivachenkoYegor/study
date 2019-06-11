const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5,
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

let nameReverseFlag = true;
let categoryReverseFlag = true;
const table = document.getElementById('Bills_table');
let body = table.createTBody();
fillInDataToTable('');

/**
 * function to create a final invoice for the price of goods and their quantity
 */
function updateTfoot() {
    let body = table.tBodies[0];
    let cash = 0;
    for (let i = 0; i < body.rows.length; i++) {
        cash += parseInt(body.rows[i].cells[2].textContent) * parseInt(body.rows[i].cells[3].textContent);
    }
    table.tFoot.rows[0].cells[3].innerHTML = '<th>' + cash + '$</th>';
}

/**
 * fill in the table with goods by a certain category
 */
function changeCategory() {
    nameReverseFlag = true;
    fillInDataToTable(document.getElementById('category').value)
}

/**
 * function to sort data alphabetically by category name
 */
function changePositionByCategory() {
    categoryReverseFlag = sortingByCellValue(0, categoryReverseFlag);
}

/**
 * function to sort data alphabetically by name of the product
 */
function changePositionByName() {
    nameReverseFlag = sortingByCellValue(1, nameReverseFlag);
}

/**
 * function to search information in the table by goods name
 * by each new character will be made new searching
 */
function search() {
    let searchField = document.getElementById('search');
    searchField.oninput = function () {
        body.innerHTML = '';
        if (searchField.value === '') {
            for (let i = 0; i < GOODS.length; i++) {
                insertDataToRow(i);
            }
        } else {
            for (let i = 0; i < GOODS.length; i++) {
                if (GOODS[i].name.toString().toLowerCase().match(new RegExp('^' + searchField.value.toString().toLowerCase(), 'g'))) {
                    insertDataToRow(i);
                }
            }
        }
        updateTfoot();
    };

}

/**
 *
 * @param flag
 * @param bodyRows
 * @param cell
 * @param reverse
 */
function sortAnInformationInTable(flag, bodyRows, cell, reverse) {
    let first, second;
    while (flag) {
        flag = false;
        for (let i = 0; i < bodyRows.rows.length - 1; i++) {
            first = bodyRows.rows[i];
            second = bodyRows.rows[i + 1];
            if (reverse) {
                if (first.cells[cell].textContent.toLowerCase() > second.cells[cell].textContent.toLowerCase()) {
                    flag = true;
                    break;
                }
            } else {
                if (first.cells[cell].textContent.toLowerCase() < second.cells[cell].textContent.toLowerCase()) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            first.parentNode.insertBefore(second, first);
        }
    }
}

/**
 * function to check flags and type of sorting(by goods name or category)
 * flags are used to sort alphabetically or in reverse alphabetical order
 * @param cell to sort by name of category
 * @param flagOfSortingType flag of sorting order
 * @returns {boolean} change flag value(true to alphabetically sorting and false to reverse alphabetical sorting)
 */
function sortingByCellValue(cell, flagOfSortingType) {
    if (flagOfSortingType) {
        let bodyRows = table.tBodies[0];
        let flag = true;
        sortAnInformationInTable(flag, bodyRows, cell, true);
        return !flagOfSortingType;
    } else {
        let bodyRows = table.tBodies[0];
        let flag = true;
        sortAnInformationInTable(flag, bodyRows, cell, false);
        return !flagOfSortingType;
    }
}

/**
 * function to get an information from cell of array and write it into new row in table
 * @param i number of cell in array
 */
function insertDataToRow(i) {
    let rows = body.insertRow();
    rows.insertCell().innerHTML = GOODS[i].category;
    rows.insertCell().innerHTML = GOODS[i].name;
    rows.insertCell().innerHTML = GOODS[i].amount;
    rows.insertCell().innerHTML = GOODS[i].price;
}

/**
 * this function fill in information from array to the table
 * the table can be filled with all information or with information from some category
 * if in array is no such category which was entered then table will be empty
 * @param category parameter by which information must be fill in to table
 */
function fillInDataToTable(category) {
    body.innerHTML = '';
    if (category === '') {
        for (let i = 0; i < GOODS.length; i++) {
            insertDataToRow(i);
        }
    } else {
        for (let i = 0; i < GOODS.length; i++) {
            if (category === GOODS[i].category) {
                insertDataToRow(i);
            }
        }
    }
    updateTfoot();
}