//TODO: Arreglar semejante ñapa
"use strict";
if (!$('#datatable').hasClass('dataTable')) {
  $('#datatable').DataTable({
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });
}

