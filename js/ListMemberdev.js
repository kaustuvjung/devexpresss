var employeesdata = []; 

$(() => {
  
    const dataGrid = $('#employees').dxDataGrid({
        dataSource: employeesdata,
        keyExpr: "id",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        groupPanel: {
            visible: true
        },
        columnChooser: {
           /* height: "340px",*/
            enabled: true,
            mode: "select",
            //position: {
            //    my: 'right top',
            //    at: 'right bottom',
            //    of: '.dx-datagrid-column-chooser-button',
            //},
            //search: {
            //    enabled: true,
            //    editorOptions: { placeholder: 'Search column' },
            //},
         
        },
        searchPanel: {
            visible: true,
            width: 300,
            placeholder: "नागारिक बिबाराण नागारिक खोजनुहोस",
            highlightSearchText: true
        },
        headerFilter: {
            visible: true
        },
        filterRow: { visible: true },
        columns: [
            {
                dataField: 'firstName',
                allowHiding: false
            },
            'lastName',
            'position',
            'city',
            'state',
            {
                caption: 'contacts',
                columns: [
                    {
                        dataField: 'mobilePhone',
                        allowHiding: false
                    },
                    'email',
                    {
                        dataField: 'skype',
                        visible: false
                    }
                ]
            },
            {
                dataField: 'hireDate',
                dataType: 'date'
            }
        ],
        showRowLines: true,
        width: '100%',
        showBorders: true,
        paging: {
            pageSize: 50
        },
        pager: {
            allowedPageSize: [50, 100, 200, 300, 500],
            info: 'Page {0} of {1} ({2} members)',
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        }
    }).dxDataGrid('instance');

  
    $.ajax({
        url: "/Survey/getEmployee",
        method: "GET",
        dataType: "json",
        success: function (data) {
            employeesdata = data.result;
            dataGrid.option('dataSource', employeesdata);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching employees:", error);
        }
    });

});
