$('#ping').click(function() {
  $.ajax({
    url: 'https://api.twitch.tv/kraken/ingests',
    headers: {
      'Client-ID': '7ic8qlzky9pn3f7v9wz388synbdy64i'
    }
  }).done(function(data) {
    var promises = [];
    data.ingests.forEach(function(ingest) {
      var hostname = new URL('http://' + ingest.url_template.substring(7)).hostname;
      var id = hostname.replace(/\./g, '_');
      promises.push(ping('http://' + hostname + ':1935').then(function(delta) {
        if ($('#' + id).length) {
          $('#' + id + ' td:last-child').text(delta + ' ms');
        }
        else {
          $('tbody').append('<tr id="' + id + '"><td>' + hostname + '</td><td>' + ingest.name + '</td><td>' + delta + ' ms' + '</td></tr>')
        }
      }));
    });
    console.log(promises);
    $.when.apply(null, promises).done(function() {
      $('table').tablesorter();
      console.log('lol');
    });
  });
});
