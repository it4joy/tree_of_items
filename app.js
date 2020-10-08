"use strict";

const uiMessages = {
    init: "Please, specify parent categories of the tree",
};

const domReady = () => {
    const tree = {};

    // category
    const addCategoryBtn = document.querySelector(".btn-add-cat");
    const categoryInput = document.getElementById("new-category");

    // subcategory
    const addSubcategoryBtn = document.querySelector(".btn-add-subcat");
    const subcategoryValueClear = document.querySelector(".btn-subcat-clear");
    const subcategoryInput = document.getElementById("new-subcategory");
    const subcatForm = document.querySelector(".subcategory-form");

    const workingArea = document.querySelector(".working-area");
    const btnValueClear = document.querySelectorAll(".btn-clear");
    let workingList = document.querySelector(".root-list"); // default
    let workingListId = 0; // default
    let currentId = 0;
    let newCategoryValue, newSubcategoryValue = "";

    addCategoryBtn.addEventListener( "click", function() {
        const items = document.querySelectorAll(".list-item");
        newCategoryValue = categoryInput.value;

        workingList.insertAdjacentHTML( "beforeend", 
            `<li id="${currentId}" class="list-item">${newCategoryValue}
                <span class="control add-subcategory">+</span>
                <span class="control remove-subcategory">-</span>
            </li>`
        );
        // clear immediately after inserting
        categoryInput.value = "";

        const itemsLength = items.length;
        // test
        console.log(`Items length: ${itemsLength + 1}`);

        tree[currentId] = {};
        tree[currentId].val = newCategoryValue;

        // test
        console.log(tree);
        console.log(`Current value: ${tree[currentId].val}`);
        currentId++;
        // test
        console.log(`An item ID after increment: ${currentId}`);
    } );

    // clear input's value (cat / subcat)
    const btnValueClearLength = btnValueClear.length;
    
    for (let i = 0; i < btnValueClearLength; i++) {
        btnValueClear[i].addEventListener( "click", function(e) {
            const child = e.target;
            const parent = child.parentNode;
            const requiredInput = parent.querySelector(".form-field");
            requiredInput.value = "";
        } );
    }

    // handle adding of subcats
    let child, parent = "";

    workingArea.addEventListener( "click", function(e) {
        child = e.target;

        if ( !child.matches(".control") ) return;

        // test
        //child.style.color = "red";
        
        parent = child.parentNode;

        // highlight active parent node
        parent.classList.toggle("parent-active");
        subcatForm.style.display = "block";
    } );

    addSubcategoryBtn.addEventListener( "click", function() {
        newSubcategoryValue = subcategoryInput.value;

        /*
        ## To-Do
        - Add the value into the object 'tree'
        */

        // test
        //console.log("Parent's children amount: " + parent.children.length);

        const nestedList = parent.querySelector(".child-list");
        
        if (nestedList == null) {
            console.log(`Parent has not such descendant.`);
            // add child `ol` and insert trailing `li` with a value
            parent.insertAdjacentHTML( "beforeend",
                `<ol id="0" class="child-list list">
                    <li id="0" class="list-item">${newSubcategoryValue}
                        <span class="control add-subcategory">+</span>
                        <span class="control remove-subcategory">-</span>
                    </li>
                </ol>`
            );
        } else {
            // insert trailing `li` with a value
            const lastChildId = nestedList.lastElementChild.id;
            const lastChildIdInt = parseInt(lastChildId, 10);

            nestedList.insertAdjacentHTML( "beforeend",
                `<li id="${lastChildIdInt + 1}" class="list-item">${newSubcategoryValue}
                    <span class="control add-subcategory">+</span>
                    <span class="control remove-subcategory">-</span>
                </li>`
            );
        }

        parent.classList.toggle("parent-active");
        subcategoryInput.value = "";
        subcatForm.style.display = "none";
    } );
};

document.addEventListener("DOMContentLoaded", domReady);
