"use strict";

const domReady = () => {
    const tree = {};

    // category
    const catForm = document.querySelector(".category-form");
    const addCategoryBtn = document.querySelector(".btn-add-cat");
    const saveCategoryBtn = catForm.querySelector(".btn-save-cat");
    const categoryInput = document.getElementById("new-category");

    // subcategory
    const subcatForm = document.querySelector(".subcategory-form");
    const addSubcategoryBtn = document.querySelector(".btn-add-subcat");
    const subcategoryInput = document.getElementById("new-subcategory");

    const workingArea = document.querySelector(".working-area");
    const btnValueClear = document.querySelectorAll(".btn-clear");
    let workingList = document.querySelector(".root-list"); // default
    let currentId = 0;
    let newCategoryValue, newSubcategoryValue = "";
    let child, parent, currentLi = "";

    // adds a category
    addCategoryBtn.addEventListener( "click", () => {
        newCategoryValue = categoryInput.value;

        workingList.insertAdjacentHTML( "beforeend", 
            `<li id="${currentId}" class="list-item">
                <span class="item-value">${newCategoryValue}</span>
                <span class="control add-item">+</span>
                <span class="control remove-item">-</span>
                <span class="control text-control edit-item">edit</span>
            </li>`
        );
        // clear immediately after inserting
        categoryInput.value = "";

        tree[currentId] = {};
        tree[currentId].val = newCategoryValue;

        // test +
        console.log(`Current value: ${tree[currentId].val}`);
        
        currentId++;
    });

    // edit a category
    saveCategoryBtn.addEventListener( "click", (e) => {
        const updatedCategoryValue = categoryInput.value;
        const btn = e.target;
        // test +
        //console.log(`Updated cat val: ${updatedCategoryValue}`);
        currentLi.querySelector(".item-value").textContent = updatedCategoryValue;
        // change property's value in the object ...
        tree[currentId].val = updatedCategoryValue;
        // test +
        console.log(`Updated val in the obj: ${tree[currentId].val}`);

        // return to initial state
        btn.style.display = "none";
        categoryInput.value = "";
        catForm.querySelector(".state").textContent = "";
        currentLi.classList.toggle("li-active");
    } );

    
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
    workingArea.addEventListener( "click", (e) => {
        child = e.target;

        if ( !child.matches(".control") ) return;

        parent = child.closest(".child-list") || child.closest(".root-list");
        currentLi = child.closest(".list-item");
        //currentLi.style.color = "red"; // test

        if ( child.matches(".add-item") ) {
            //
        } else if ( child.matches(".edit-item") ) {
            const itemValue = currentLi.querySelector(".item-value").textContent;
            // test +
            //console.log(`The value for edit: ${itemValue}`);
            currentLi.classList.toggle("li-active");
            catForm.querySelector(".state").textContent = " | Edit ...";
            categoryInput.value = itemValue;
            saveCategoryBtn.style.display = "inline-block";
        } else if ( child.matches(".remove-item") ) {
            parent.removeChild(currentLi);

            // change object (N: think about parents / children)
            // + upd properties (set corresponding, equal to IDs)
            const id = currentLi.id;
            const idInt = parseInt(id, 10);
            delete tree[idInt];
            // test
            console.log(tree);

            // decrease ID
            currentId--;
            // test
            console.log(`Current ID after removing an item: ${currentId}.`);
            
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
