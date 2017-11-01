$(function () {
  "use strict";
  if (!$('#example23').hasClass('dataTable')){
    $('#example23').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });
  }
});
