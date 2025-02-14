var employeesdata = [];
var dataGrid; 
function getEmployee() {
    $.ajax({
        url: "/Survey/getEmployee",
        method: "GET",
        dataType: "json",
        success: function (data) {
            employeesdata = data.result;
            // Check if dataGrid is defined and initialized
            if (dataGrid) {
                dataGrid.option('dataSource', employeesdata);
            } else {
                console.error("dataGrid is not initialized yet.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching employees:", error);
        }
    });
}

$(() => {
    dataGrid = $('#employees').dxDataGrid({
        dataSource: employeesdata,
        keyExpr: "id",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        groupPanel: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select",
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

        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: "employee-list"
        },
        onToolbarPreparing: function (e) {
            e.toolbarOptions.items.push(
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: "Reset Layout",
                        onClick: function () {
                            localStorage.removeItem("employee-list");
                            dataGrid.option('state', {
                                columns: []
                            });
                            //dataGrid.option('state', null);
                            dataGrid.repaint();


                            getEmployee();
                        }
                    }
                }
            );
        },
        export: {
            enabled: true,
            allowExportSelectedData: false,
        },
        onExporting(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Employees');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employees.xlsx');
                });
            });
        },
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
        },
       
 


    }).dxDataGrid('instance');


    getEmployee();
});
