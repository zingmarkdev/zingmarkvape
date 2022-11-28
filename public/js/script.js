// script.js ZingmarkVape frontend created by Zingmark 2022

// Global variables
var resItems = [];
var itemsElements = [];

// Function of hiding all items
function hideItems() {
    // Pass the array of items with goods and hide
    for (let i = 0; i < itemsElements.length; i++) {
        itemsElements[i].remove();
    }
};

// Function of showing all items blocks
function showAllItems() {
    for (let i = 0; i < resItems.length; i++) {
        // Creating a block in HTML markup based on the data received
        itemsElements[i] = $('<div class="items-container_cell"></div>');
        $('.items-container').append(itemsElements[i]);

        let itemCellPhotoDiv = $('<img class="items-container_cell__photo" src="assets/previews/' + resItems[i].Title + '.jpg"></img>');
        itemsElements[i].append(itemCellPhotoDiv);

        let itemCellTitleDiv = $('<div class="items-container_cell__title"></div');
        itemsElements[i].append(itemCellTitleDiv);

        let itemTitleFormat = '<h1 class="item-cell_title">' + resItems[i].Brand + '</h1>';
        let itemTitle = $(itemTitleFormat);
        itemCellTitleDiv.append(itemTitle);
    }
}

// Function of showing only required items
function showRequiredItems() {
    // Write inputfield value in var
    let inputValue = $('.search-container_field').val();
    
    for (let i = 0; i < resItems.length; i++) {
        if (resItems[i].Title.toUpperCase().includes(inputValue.toUpperCase())) {
            // Creating a block in HTML markup based on the data received
            itemsElements[i] = $('<div class="items-container_cell"></div>');
            $('.items-container').append(itemsElements[i]);

            let itemCellPhotoDiv = $('<img class="items-container_cell__photo" src="assets/previews/' + resItems[i].Title + '.jpg"></img>');
            itemsElements[i].append(itemCellPhotoDiv);

            let itemCellTitleDiv = $('<div class="items-container_cell__title"></div');
            itemsElements[i].append(itemCellTitleDiv);

            let itemTitleFormat = '<h1 class="item-cell_title">' + resItems[i].Brand + '</h1>';
            let itemTitle = $(itemTitleFormat);
            itemCellTitleDiv.append(itemTitle);
        }
    }
}

$(document).ready(function() {                                  // Check if the document is loaded
    // Search bar response function
    $('.search-container_field').on('input', function() {
        if ($(this).length > 0) {                               // If there are 1 or more characters in the string
            hideItems();
            showRequiredItems();
        }

        if (!$(this).val()) {                                   // If the line is empty
            hideItems();
            showAllItems();
        }
    });

    // Send a request for a complete list of items
    let req = new XMLHttpRequest();

    req.open('GET', '/api/items/get', true);                    // Follow the route to get a list of items
    req.onload = function() {                                   // When receive a response from the server
        let respondedItems= this.response;
        resItems = JSON.parse(respondedItems);                  // Parse responded file to JSON
        // Display the list of items on the main page
        showAllItems();
    };
    req.send();                                                 // Sending a request to the server
});