let todoCategory = document.querySelectorAll('.todo-category');         // getting all the category elements

todoCategory.forEach(function (todo, i) {               // looping over the elements to give a different color for each category
    if (todo.textContent === 'Work') {
        todo.parentElement.style.backgroundColor= "#9C27B0"
    } else if (todo.textContent === 'School') {
        todo.parentElement.style.backgroundColor= "#4CAF50"
    } else {
        todo.parentElement.style.backgroundColor= "#0085D1"
    }
    
})

let todoPriority = document.querySelectorAll('.todo-priority');             // getting all the priority elements

todoPriority.forEach(function (todo, i) {               // looping over the elements to give a different color to all the high prioriy elements
    if (todo.textContent === 'High') {
        todo.parentElement.parentElement.style.backgroundColor = "#FFF176";
    }
})


let selectInp = document.getElementById('show-todo');
selectInp.addEventListener('change', function () {
    if (selectInp.value === 'work') {
        document.querySelectorAll(".School").forEach(function (i) {
            i.style.display = "none";
        })
        document.querySelectorAll(".Personal").forEach(function (i) {
            i.style.display = "none";
        })
        document.querySelectorAll(".Work").forEach(function (i) {
            i.style.display = "flex";
        })
    }
    if (selectInp.value === 'personal') {
        document.querySelectorAll(".School").forEach(function (i) {
            i.style.display = "none";
        })
        document.querySelectorAll(".Work").forEach(function (i) {
            i.style.display = "none";
        })
        document.querySelectorAll(".Personal").forEach(function (i) {
            i.style.display = "flex";
        })
    }
    if (selectInp.value === 'school') {
        document.querySelectorAll(".Personal").forEach(function (i) {
            i.style.display = "none";
        })
        document.querySelectorAll(".Work").forEach(function (i) {
            i.style.display = "none";
        })
        document.querySelectorAll(".School").forEach(function (i) {
            i.style.display = "flex";
        })
    }
    if (selectInp.value === 'showall') {
        document.querySelectorAll(".School").forEach(function (i) {
            i.style.display = "flex";
        })
        document.querySelectorAll(".Personal").forEach(function (i) {
            i.style.display = "flex";
        })
        document.querySelectorAll(".Work").forEach(function (i) {
            i.style.display = "flex";
        })
    }
})