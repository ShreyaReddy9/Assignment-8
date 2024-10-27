/*eslint-env browser*/
'use strict';

var emplist;
var $ = function (id) {
    return document.getElementById(id);
};

window.addEventListener('load', initialize);

function initialize() {
    emplist = [
        {name: "Sally Smith", title: "Quality Assurance", extension: 3423},
        {name: "Mark Martin", title: "VP Sales", extension: 3346},
        {name: "John Johnson", title: "Marketing", extension: 3232},
    ];
    
    // Hide all error messages on initial load
    var errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach(function(span) {
        span.classList.add('hide');
    });
    
    loadEmployees();
    
    var addBtn = $('addEmployeeBtn');
    addBtn.addEventListener('click', addEmployee);
    
    // Add input listeners to hide errors when typing
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            hideError(this);
        });
    });
}

function loadEmployees() {
    var table = $('employeesTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    
    for (var i = 0; i < emplist.length; i++) {
        var row = document.createElement('tr');
        row.insertCell(0).innerHTML = emplist[i].name;
        row.insertCell(1).innerHTML = emplist[i].title;
        row.insertCell(2).innerHTML = emplist[i].extension;
        
        var deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', emplist[i].extension);
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = 'deleteBtn'; // Add class for styling
        deleteBtn.addEventListener('click', function(e) {
            var extension = e.currentTarget.id;
            deleteEmployee(extension);
        });
        
        row.insertCell(3).append(deleteBtn);
        tbody.append(row);
    }
    
    var count = $('employeeCount');
    count.innerHTML = emplist.length;
}

function addEmployee(event) {
    event.preventDefault();
    
    var hasError = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[name="name"]');
    var title = form.querySelector('input[name="title"]');
    var extension = form.querySelector('input[name="extension"]');
    
    // Reset all previous errors
    hideAllErrors();
    
    // Validate each field
    var requiredFields = [name, title, extension];
    for (var i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value.trim() === '') {
            displayError(requiredFields[i], "Mandatory field");
            hasError = true;
        }
    }
    
    // Additional validation for extension being numeric
    if (!hasError && !/^\d+$/.test(extension.value)) {
        displayError(extension, "Extension must be numeric");
        hasError = true;
    }
    
    if (hasError) {
        return false;
    }
    
    emplist.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });
    
    loadEmployees();
    resetForm(form);
}

function resetForm(form) {
    form.reset();
    hideAllErrors();
}

function hideAllErrors() {
    var errorNodes = document.querySelectorAll('.error');
    errorNodes.forEach(function(error) {
        error.classList.add('hide');
    });
}

function hideError(inputElement) {
    var error = inputElement.parentNode.querySelector('.error');
    if (error) {
        error.classList.add('hide');
    }
}

function displayError(element, message) {
    var error = element.parentNode.querySelector('.error');
    if (error) {
        error.textContent = message;
        error.classList.remove('hide');
    }
}

function deleteEmployee(extension) {
    emplist = emplist.filter(function(employee) {
        return employee.extension != extension;
    });
    loadEmployees();
}