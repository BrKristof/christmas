
/**
 * @typedef {{what:string,who1:string,muszak1:string,who2?:string,muszak2?:string}} tableRow
 */

/**
 * @type {{head:string[],body:tableRow[]}}
 */
const tableData = {
    head : ["Osztály", "Manó"  ,"Műszak"],
    body: [{
        what: "Logisztika",
        who1: "Kovács Máté",
        muszak1: "Délelöttös",
        who2: "Kovács József",
        muszak2: "Délutános"
    },
    {
        what: "Könyvelés",
        who1: "Szabó Anna",
        muszak1: "Éjszakai"
    },
    {
        what: "Játékfejlesztés",
        who1: "Varga Péter",
        muszak1: "Délutános",
        who2: "Nagy Eszter",
        muszak2: "Éjszakai"
    }]
};

const muszakList = ['Délelőttös', 'Délutános', 'Éjszakai']



const jssection = createRowTable("jssection",tableData)
jssection.classList.add("hide")

const htmlform = document.getElementById('htmlform')
htmlform.addEventListener('submit', function(e){

    e.preventDefault()

    /**
     * @type {HTMLFormElement}
     */
    const htmlform = e.target

    /**
     * @type {HTMLSelectElement}
     */
    const manoChooser = htmlform.querySelector('#manochooser');

    /**
     * @type {HTMLInputElement}
     */
    const manotev1 = htmlform.querySelector('#manotev1');

    /**
     * @type {HTMLSelectElement}
     */
    const manotev2 = htmlform.querySelector('#manotev2');


    /**
     * @type {string}
     */
    const chooserValue = manoChooser.value;

    /**
     * @type {string}
     */
    const manotev1Value = manotev1.value;

    /**
     * @type {string}
     */
    const manotev2Value = manotev2.value;


    /**
     * @type {{who:string, task1:string, task2?:string}}
     */
    const hmtlObj = {};
    if(!validateFields(manoChooser,manotev1,manotev2,htmlform)){
        return
    }

    hmtlObj.who = chooserValue
    hmtlObj.task1 = manotev1Value
    hmtlObj.task2 = manotev2Value != "" ? manotev2Value : undefined

    const htmltbody = document.getElementById('htmltbody')

    createColRow(htmltbody,hmtlObj)

    htmlform.reset()


})

const jsform = document.createElement('form')
jsform.id = 'jsform';
jssection.appendChild(jsform)

createInputDiv("Osztály","osztaly",jsform)
createInputDiv("Manó 1","mano1",jsform)
createDropdownList("muszak1","Műszak 1",muszakList,jsform)
createCheckbox("masodikmano","Két manót veszek fel",jsform)
createInputDiv("Manó 2","mano2",jsform)
createDropdownList("muszak2","Műszak 2",muszakList,jsform)
button("Hozzáadás",jsform)

const checkbox = jsform.querySelector("#masodikmano")
initCheckbox(checkbox)

initSelect(tableData.body)

jsform.addEventListener('submit', function(e){
    e.preventDefault();

    /**
     * @type {HTMLFormElement}
     */
    const jsform = e.target;

    /**
     * @type {HTMLInputElement}
     */
    const osztaly = jsform.querySelector('#osztaly');
    /**
     * @type {HTMLInputElement}
     */
    const mano1 = jsform.querySelector('#mano1');
    /**
     * @type {HTMLSelectElement}
     */
    const muszak1 = jsform.querySelector('#muszak1');
    /**
     * @type {HTMLInputElement}
     */
    const mano2 = jsform.querySelector('#mano2');
    /**
     * @type {HTMLSelectElement}
     */
    const muszak2 = jsform.querySelector('#muszak2');


    /**
     * @type {string}
     */
    const osztalyValue = osztaly.value;
    /**
     * @type {string}
     */
    const mano1Value = mano1.value;
    /**
     * @type {string}
     */
    const muszak1Value = muszak1.value;
    /**
     * @type {string}
     */
    const mano2Value = mano2.value;
    /**
     * @type {string}
     */
    const muszak2Value = muszak2.value;


    /**
     * @type {{what:string, who1:string, muszak1:string, who2?:string, muszak2?:string}}
     */
    const obj = {};
    if (!validateFields(osztaly, mano1, muszak1,jsform)) {
        return;
    }


    obj.what = osztalyValue;
    obj.who1 = mano1Value;
    obj.muszak1 = muszak1Value;

    obj.who2 = mano2Value != "" ? mano2Value : undefined
    obj.muszak2 = muszak2Value != "" ? muszak2Value : undefined


    createNewElement(obj, jsform, tableData.body);
});




/**
 * 
 * @param {"th" | "td"} Celltype 
 * @param {string} cellContent 
 * @param {HTMLTableElement} parentRow 
 * 
 * @returns {HTMLTableCellElement}
 */
function createCell(Celltype,cellContent,parentRow){

    const cell = document.createElement(Celltype)
    cell.innerText = cellContent
    parentRow.appendChild(cell)

    return cell
}

/**
 * 
 * @param {HTMLTableElement} tbody 
 * @param {tableRow} bodyarray 
 * 
 * @returns {void}
 */
function createTableRow(tbody,bodyarray){

    const tr = document.createElement('tr')
    tbody.appendChild(tr)

    const td1 = createCell("td",bodyarray.what,tr)
    const td2 = createCell("td",bodyarray.who1,tr)
    const td3 = createCell("td",bodyarray.muszak1,tr)

    if(bodyarray.who2 != undefined && bodyarray.muszak2 != undefined){

        const str = document.createElement('tr')
        tbody.appendChild(str)


        const td4 = createCell("td",bodyarray.who2,str)
        const td5 = createCell("td",bodyarray.muszak2,str)

        td1.rowSpan = 2

    }

    
}

/**
 * @param {tableRow} bodyarray 
 * 
 * @returns {void}
 */
function createTableBody(bodyarray){

    const tbody = document.getElementById('jsbody')
    tbody.innerHTML = ""

    for(const row of bodyarray){

        createTableRow(tbody,row)
    }

    

}

/**
 * 
 * @param {HTMLTableElement} table 
 * @param {string[]}  
 */
function createTableHead(table,headarray){

    const thead = document.createElement('thead')

    const tr = document.createElement('tr')

    for(const e of headarray){

        const th = createCell("th",e,tr)
    }

    thead.appendChild(tr)
    table.appendChild(thead)
}

/**
 * 
 * @param {string} name 
 * @param {Table} tableDatas 
 * 
 * @returns {HTMLDivElement}
 */
function createRowTable(name,tableDatas){
    
    const div = document.createElement('div')
    div.id = name

    const table = document.createElement('table')

    createTableHead(table,tableDatas.head)

    const tbody = document.createElement('tbody')
    tbody.id = 'jsbody'

    

    document.body.appendChild(div)
    div.appendChild(table)
    table.appendChild(tbody)

    createTableBody(tableDatas.body)

    return div
}


/**
 * 
 * @param {string} content 
 * @param {string} id 
 * @param {HTMLFormElement} appendTo 
 */
function createInputDiv(content,id,appendTo){
    
    const div = document.createElement('div')

    const label = document.createElement('label')
    const input = document.createElement('input')

    label.htmlFor = id
    label.innerText = content
    input.id = id
    input.name = id

    const span = document.createElement('span')
    span.classList.add('error')

    const br = document.createElement('break')

    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(span)
    div.appendChild(br)

    appendTo.appendChild(div)
    
    
}

/**
 * 
 * @param {HTMLInputElement} inputfield 
 * @param {string} errorMessage 
 * 
 * @returns {boolean} 
 */
function validateField(inputfield,errorMessage,){

    let status = true
    if(inputfield.value === ""){

        const parent = inputfield.parentElement
        const span = parent.querySelector('.error')
        span.innerText = errorMessage

        status = false
    }

    return status

}

/**
 * 
 * @param {HTMLInputElement} input1 
 * @param {HTMLInputElement} input2 
 * @param {HTMLInputElement} input3 
 * @param {HTMLFormElement} form 
 * 
 * @returns {boolean} 
 */
function validateFields(input1,input2,input3,form){

    const error = form.querySelectorAll('.error')

    for(const e of error){

        e.innerText = ""
    }

    let valid = true

    if(!validateField(input1,'1.érték üres')){

        valid = false

    }
    if(!validateField(input2,'2.érték üres')){

        valid = false

    }
    if(!validateField(input3,'3.érték üres')){

        valid = false


    }


    return valid


}

/**
 * 
 * @param {HTMLTableElement} body 
 * @param {string[]} array 
 */
function createColRow(body,array){

    const tr = document.createElement('tr')
    

    const td1 = createCell('td',array.who,tr)
    const td2 = createCell('td',array.task1,tr)

    if(array.task2 != undefined){

        const td3 = createCell('td',array.task2,tr)
        
    }
    else{
        td2.colSpan = 2
    }


    body.appendChild(tr)

}

/**
 * 
 * @param {string} id 
 * @param {string} labelcontent 
 * @param {HTMLElement} appendTo 
 */
function createCheckbox(id, labelcontent, appendTo){
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.id = id;
    input.type = 'checkbox';
    

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = labelcontent;


    div.appendChild(input);
    div.appendChild(label);

    appendTo.appendChild(div)
}


/**
 * 
 * @param {string} id 
 * @param {string} labelcontent 
 * @param {string[]} optionList 
 * @param {HTMLElement} appendTo 
 */
function createDropdownList(id,labelcontent,optionList,appendTo){

    const div = document.createElement('div');

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = labelcontent;
    

    const dropdownList = document.createElement('select');
    dropdownList.id = id;
    div.appendChild(dropdownList);

    const error = document.createElement('span');
    error.classList.add('error');
    

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.innerText = "Válassz műszakot!";


    div.appendChild(label);
    div.appendChild(dropdownList);
    div.appendChild(error);
    dropdownList.appendChild(defaultOption);

    for (let o of optionList) {
        const option = document.createElement('option');
        option.value = o;
        option.innerText = o;
        dropdownList.appendChild(option);
    }

    appendTo.appendChild(div)
}

/**
 * 
 * @param {string} text 
 * @param {} where 
 */
function button(text,where){
    
    const button = document.createElement('button')
    button.innerText = text
    where.appendChild(button)

}