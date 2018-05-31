var symbols = [];

$(document).ready(function() {

  let template = Handlebars.compile($("#stock-template").html());

  $.get('https://api.iextrading.com/1.0/ref-data/symbols', (data) => {
    symbols = data.filter(stock => stock.isEnabled);
  });
  
  $("#query").keypress(ev => {
    var term = $("#query").val().toLowerCase();
    if(ev.originalEvent.keyCode == 13 && term.length > 0) {

      var results = symbols.filter(obj => {
        if(term.length > 0 && term.length < 4) {
          return obj.symbol.toLowerCase() == term;
        } else if(term.length >= 4) {
          return obj.symbol.toLowerCase().indexOf(term) > -1 || obj.name.toLowerCase().indexOf(term) > -1;
        } else {
          return false;
        }
      });

      $("#results").empty().html(template({
          "stocks": results
      }));

    }
  });

});