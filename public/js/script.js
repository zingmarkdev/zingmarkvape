var resItems = [];
var existItems = [];

function hideItems() {
    for(var i = 0; i < existItems.length; i++) {
        existItems[i].remove();
    }
};

function showAllItems() {
    for (let i = 0; i < resItems.length; i++) {
        existItems[i] = $('<div class="items-container_cell"></div>');
        $('.items-container').append(existItems[i]);
        existItems[i].on('click', function() {
            var itemModalPhoto = '<img class="item-modal_photo" src="assets/previews/' + resItems[i].Title + '.jpg"></img>';
            $('.item-modal_canvas').append(itemModalPhoto);

            let itemModalMain = '<div class="item-modal_main"></div>';
            $('.item-modal_canvas').append(itemModalMain);

            let itemModalTitle = '<h1 class="item-modal_title">' + resItems[i].Title + '</h1>';
            $('.item-modal_main').append(itemModalTitle);

            let itemModalDetails = '<div class="item-modal_details"></div>';
            $('.item-modal_main').append(itemModalDetails);

            let itemModalStock = '<p class="item-modal_stock">' + resItems[i].Stock + ' в наличии' + '</p>';
            $('.item-modal_details').append(itemModalStock);

            let itemModalPrice = '<p class="item-modal_price">' + resItems[i].Price + 'р.' + '</p>';
            $('.item-modal_details').append(itemModalPrice);

            $('.item-modal_canvas').arcticmodal({
                afterClose: function() {
                    $('.item-modal_photo').remove();
                    $('.item-modal_main').remove();
                    $('.item-modal_title').remove();
                    $('.item-modal_details').remove();
                    $('.item-modal_stock').remove();
                    $('.item-modal_price').remove();
                }
            });
        });

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
    
    for (var i = 0; i < resItems.length; i++) { // Проходим по всем позициям
        if(resItems[i].Title.toUpperCase().includes(inputValue.toUpperCase())) {
            existItems[i] = $('<div class="items-container_cell"></div>');
            $('.items-container').append(existItems[i]);
            existItems[i].on('click', function() {
                $('.item-modal_canvas').arcticmodal();
                
            });

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

$(document).ready(function() {
    $('.search-container_field').on('input', function() {
        if($(this).length > 0) {
            hideItems();
            showRequiredItems();
        }
        if(!$(this).val()) {
            hideItems();
            showAllItems();
        }
    });

    var req = new XMLHttpRequest();

    req.open('GET', '/api/items/get', true);
    req.onload = function() {
        var resItemsUnparsed = this.response;
        resItems = JSON.parse(resItemsUnparsed);

        showAllItems();
    };
    req.send();
});