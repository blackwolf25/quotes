$(document ).ready(function() {
    const limit = 5;
    let start = 0;
    let arrayStart = [];
    const fetchData = (index) => {
        $.get( "https://raw.githubusercontent.com/blackwolf25/quotes-data/master/data.json", function( result ) {
            const dataResult = JSON.parse(result);
            for(i = index; i < start + limit; i++) {
                if(dataResult.length == start) {
                    $('.end').show();
                    break;
                }
                prepareHtml(dataResult[i]);
                index++;
            }
            arrayStart.push(start);
            start = index;
        });
    }

    const prepareHtml = (quote) => {
        let rowHtml = '';
            rowHtml += ' <div class="row">';
            rowHtml += '<div class="col-sm-12">';
            rowHtml += '<blockquote class="blockquote">';
            rowHtml += '<p class="mb-0">';
            rowHtml += quote.quote;
            rowHtml += '</p><footer class="blockquote-footer">';
            rowHtml += '<cite title="Source Title">' + quote.author +'</cite>';
            rowHtml += '</footer></blockquote></div></div>';
        $('.container').append(rowHtml);
    }
    fetchData(start);
    $(window).scroll(function() {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            console.log(start);
            if(!arrayStart.includes(start)) {
                fetchData(start);
            }
        }
    });
});


