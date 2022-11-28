var resItems = [];
var existItems = [];

function hideItems() {
    // Pass the array of items with goods and hide
    for (var i = 0; i < existItems.length; i++) {
        existItems[i].remove();
    }
};

function showAllItems() {
    for (let i = 0; i < resItems.length; i++) {
        // Creating a new block in HTML markup based on the data received
        existItems[i] = $('<div class="items-container_cell"></div>');
        $('.items-container').append(existItems[i]);

        let itemPhotoDiv = $('<img class="items-container_cell_photo" src="assets/previews/' + resItems[i].Title + '.jpg"></img>');
        existItems[i].append(itemPhotoDiv);

        let aboutDiv = $('<div class="items-container_about"></div');
        existItems[i].append(aboutDiv);

        let itemTitleDiv = $('<div class="items-container_cell_title"></div');
        aboutDiv.append(itemTitleDiv);

        let itemTitleFormat = '<h1 class="item-cell_title">' + resItems[i].Title + '</h1>';
        let itemTitle = $(itemTitleFormat);
        itemTitleDiv.append(itemTitle);

        let itemDetailsDiv = $('<div class="items-container_details"></div>');
        aboutDiv.append(itemDetailsDiv);

        let itemStockFormat = '<p class="item-cell_stock">' + resItems[i].Stock + ' в наличии' + '</p>';
        let itemStock = $(itemStockFormat);
        itemDetailsDiv.append(itemStock);

        let itemPriceFormat = '<p class="item-cell_price">' + resItems[i].Price + 'р.' + '</p>';
        let itemPrice = $(itemPriceFormat);
        itemDetailsDiv.append(itemPrice);
    }
}

function showRequiredItems() {
    var inputValue = $('.search-container_field').val();
    
    for (var i = 0; i < resItems.length; i++) {
        if(resItems[i].Title.toUpperCase().includes(inputValue.toUpperCase())) {
            existItems[i] = $('<div class="items-container_cell"></div>');
            $('.items-container').append(existItems[i]);

            let itemPhotoDiv = $('<img class="items-container_cell_photo" src="assets/previews/' + resItems[i].Title + '.jpg"></img>');
            existItems[i].append(itemPhotoDiv);

            let aboutDiv = $('<div class="items-container_about"></div');
            existItems[i].append(aboutDiv);

            let itemTitleDiv = $('<div class="items-container_cell_title"></div');
            aboutDiv.append(itemTitleDiv);

            let itemTitleFormat = '<h1 class="item-cell_title">' + resItems[i].Title + '</h1>';
            let itemTitle = $(itemTitleFormat);
            itemTitleDiv.append(itemTitle);

            let itemDetailsDiv = $('<div class="items-container_details"></div>');
            aboutDiv.append(itemDetailsDiv);

            let itemStockFormat = '<p class="item-cell_stock">' + resItems[i].Stock + ' в наличии' + '</p>';
            let itemStock = $(itemStockFormat);
            itemDetailsDiv.append(itemStock);

            let itemPriceFormat = '<p class="item-cell_price">' + resItems[i].Price + 'р.' + '</p>';
            let itemPrice = $(itemPriceFormat);
            itemDetailsDiv.append(itemPrice);
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