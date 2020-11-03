"use strict";

const domReady = () => {
    const formInitProject = document.querySelector(".form-init-project");
    const btnInitProject = formInitProject.querySelector(".btn-init-project");
    const projectNameField = formInitProject.querySelector("#project-name");
    const projectAuthorField = formInitProject.querySelector("#author-name");
    const projectCommentArea = formInitProject.querySelector("#project-comment");
    
    const appData = {
        meta: {
            dateCreation: "",
            dateModification: "",
            projectName: "", // N: think about these three names...
            projectAuthor: "",
            projectComment: "",
        },
        tree: "",
    };

    btnInitProject.addEventListener( "click", () => {
        // set date of creation
        const now = new Date();
        let dateCreation = appData.meta.dateCreation;
        // P: set the values immediately here?..
        let filledFieldsAmount = 0;
        let projectHeadingValue, projectAuthorValue, projectCommentValue = "";

        if (dateCreation.length === 0) {
            appData.meta.dateCreation = now;
        } /* else {
            alert("The property \"Date of creation\" already exists.");
        } */
        // test +
        //console.log(appData.meta.dateCreation);

        // author field handling
        projectAuthorValue = projectAuthorField.value;

        if (projectAuthorValue.length === 0) {
            alert("Please, enter the author's name.");
        } else {
            appData.meta.projectAuthor = projectAuthorValue;
            filledFieldsAmount++;
        }

        // project name handling
        projectHeadingValue = projectNameField.value;

        if (projectHeadingValue.length === 0) {
            projectHeadingValue = generateHeading();
        }

        filledFieldsAmount++;
        projectNameField.value = projectHeadingValue;
        appData.meta.projectName = projectHeadingValue;

        // comment handling
        projectCommentValue = projectCommentArea.value;

        if (projectCommentValue.length !== 0) {
            appData.meta.projectComment = projectCommentValue;
        }

        // test
        console.log(appData.meta);

        // redirect to project page
        if (filledFieldsAmount === 2) {
            // test +
            //console.log("2 required fields were filled.");
            setTimeout( () => {
                window.location.reload("/project.html");
            }, 5000 );
        }
    } );
};

// P: consider the event 'onload'
document.addEventListener("DOMContentLoaded", domReady);