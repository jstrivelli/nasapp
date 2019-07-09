import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ToolkitProvider, {CSVExport, Search} from 'react-bootstrap-table2-toolkit'

const {SearchBar} = Search;
const {ExportCSVButton} = CSVExport;

function priceFormatter(column, colIndex, { sortElement, filterElement }) {
  return (
    <div style={ { display: 'flex', flexDirection: 'column', 'color': 'white', 'text-align': 'center'} }>
      { filterElement }
      { column.text }
      { sortElement }
    </div>
  );
}

function columnAddFilter(data){
  var columns = Object.keys(data[0])
  var list = []
  for(var i = 0; i < columns.length; i++){
    list.push({'dataField': columns[i], 'text': columns[i], 'filter':textFilter(), 'headerFormatter':priceFormatter })
  }
  return list
}



class TableSheet extends Component {
  handleNextPage = ({
    page,
    onPageChange,
    sizePerPage
  }) => () => {
    if(page < Math.floor(this.props.data.length/sizePerPage)){
    onPageChange(page + 1);
  }

  }

  handlePrevPage = ({
    page,
    onPageChange
  }) => () => {
    if(page > 0){
    onPageChange(page - 1);
  }
  }

  handleSizePerPage = ({
    page,
    onSizePerPageChange
  }, newSizePerPage) => {
    onSizePerPageChange(newSizePerPage, page);
  }
  render() {
      console.log(this.props.data)
      const rowStyle = (row, rowIndex) => {
        if(rowIndex %2 === 0){
          return {backgroundColor: "#8faece", "text-align": "center", "position": "relative", "word-break": "break-all"}
        }
        return {backgroundColor: "rgba(143,174,206,0.45)", "text-align": "center", "position": "relative", "word-break": "break-all"}
      }
      const options = {
          paginationSize: 4,
          pageStartIndex: 0,
          custom:true,
          hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
          firstPageText: 'First',
          prePageText: 'Back',
          nextPageText: 'Next',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          showTotal: true,
          sizePerPageList: [{
            text: '5', value: 5
          }, {
            text: '10', value: 10
          }, {
            text: 'All', value: this.props.data.length
          }] // A numeric array is also available. the purpose of above example is custom the text
        };

        const selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          bgColor: (row, rowIndex) => (rowIndex > 1 ? 'rgba(68, 181, 55, 1)' : 'rgba(68, 181, 55, 1)')
        };
        return(
            <div style={{"width": "100%", "padding": "10px"}}>
            <div style={{"width": "100%", "overflow-x":"scroll", "align-items": "center", "margin": "0 auto", "border-radius": "25px", "border": "2px solid white"}}>
            <div style={{"width": "6000px", backgroundColor: "rgba(0,0,0,0.37)"}}>
            <ToolkitProvider
            keyField="VolumeName"
            columns={columnAddFilter(this.props.data)}
            data={this.props.data}
            exportCSV={{onlyExportSelection: true, exportAll: false}}
            search>
            {
              toolkitprops => (
                    <PaginationProvider
                        pagination={ paginationFactory(options) }
                    >
                      {
                       ({
                         paginationProps,
                         paginationTableProps
                       }) => (
                         <div>
                               <div style={{padding: "20px"}}>
                                   <button className="btn btn-primary" style={{'background-color': 'black'}} onClick={ this.handleNextPage(paginationProps) }>Next Page</button>
                                   <button className="btn btn-success" style={{'background-color': 'black'}} onClick={ this.handlePrevPage(paginationProps) }>Prev Page</button>
                                   <button className="btn btn-danger" style={{'background-color': 'black'}}  onClick={ () => this.handleSizePerPage(paginationProps, 10) }>Size Per Page: 10</button>
                                   <button className="btn btn-warning" style={{'background-color': 'black', 'color': 'white'}} onClick={ () => this.handleSizePerPage(paginationProps, 25) }>Size Per Page: 25</button>
                               </div>
                               <div style={{padding:"20px"}}>
                                  <div style={{float: "left"}}>
                                  <SearchBar {...toolkitprops.searchProps}/>
                                  </div>
                                  <div style={{float: "left", "padding-left": "10px"}}>
                                  <ExportCSVButton {...toolkitprops.csvProps} className="btn btn-success">Export Selected Items to CSV</ExportCSVButton>

                                  </div>
                              </div>
                           <BootstrapTable
                             rowStyle={rowStyle}
                             selectRow={selectRow}
                             filter={filterFactory()}
                             {...paginationTableProps}
                             {...toolkitprops.baseProps}
                           />

                           <div style={{padding:"10px","color": "white"}}>
                             <b>
                                <p>Current Page: { paginationProps.page }</p>
                                <p>Current SizePerPage: { paginationProps.sizePerPage }</p>
                                <p>Total Number of Elements: {this.props.data.length}</p>
                                <p>Number of pages: {Math.floor(this.props.data.length/paginationProps.sizePerPage)}</p>
                            </b>
                           </div>
                         </div>
                       )
                     }
                </PaginationProvider>
              )}
              </ToolkitProvider>
           </div>
           </div>
           </div>
        )
  }
}

export default TableSheet;
