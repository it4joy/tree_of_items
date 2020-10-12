"use strict";

const domReady = () => {
    const tree = {};

    // category
    const addCategoryBtn = document.querySelector(".btn-add-cat");
    const categoryInput = document.getElementById("new-category");

    // subcategory
    const addSubcategoryBtn = document.querySelector(".btn-add-subcat");
    const subcategoryInput = document.getElementById("new-subcategory");
    const subcatForm = document.querySelector(".subcategory-form");

    const workingArea = document.querySelector(".working-area");
    const btnValueClear = document.querySelectorAll(".btn-clear");
    let workingList = document.querySelector(".root-list"); // default
    let currentId = 0;
    let newCategoryValue, newSubcategoryValue = "";

    // adds a category
    addCategoryBtn.addEventListener( "click", () => {
        newCategoryValue = categoryInput.value;

        workingList.insertAdjacentHTML( "beforeend", 
            `<li id="${currentId}" class="list-item">${newCategoryValue}
                <span class="control add-item">+</span>
                <span class="control remove-item">-</span>
                <span class="control text-control edit-item">edit</span>
            </li>`
        );
        // clear immediately after inserting
        categoryInput.value = "";

        tree[currentId] = {};
        tree[currentId].val = newCategoryValue;

        console.log(`Current value: ${tree[currentId].val}`); // test
        currentId++;
    });

    
    // clear input's value (cat / subcat)
    const btnValueClearAmount = btnValueClear.length;
    
    for (let i = 0; i < btnValueClearAmount; i++) {
        btnValueClear[i].addEventListener( "click", (e) => {
            const child = e.target;
            const parent = child.parentNode;
            const requiredInput = parent.querySelector(".form-field");
            requiredInput.value = "";
        } );
    }


    // CRUD for categories / subcategories
    let child, parent, currentLi = "";

    workingArea.addEventListener( "click", (e) => {
        child = e.target;

        if ( !child.matches(".control") ) return;

        parent = child.closest(".child-list") || child.closest(".root-list");
        currentLi = child.closest(".list-item");
        //currentLi.style.color = "red"; // test

        if ( child.matches(".add-item") ) {
            //
        } else if ( child.matches(".edit-item") ) {
            //
        } else if ( child.matches(".remove-item") ) {
            parent.removeChild(currentLi);

            // decrease ID
            currentId--;
            // test
            console.log(`Current ID: ${currentId}.`);
            
            // sets proper IDs if they're not match
            const items = parent.querySelectorAll(".list-item");
            for (let i = 0; i < items.length; i++) {
                const currentId = items[i].id;
                const currentIdInt = parseInt(currentId, 10);
                if (currentIdInt !== i) {
                    items[i].id = i;
                }
            }
        }
    });
};

document.addEventListener("DOMContentLoaded", domReady);
