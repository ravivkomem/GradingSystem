import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles.css'
import edit_icon from '../img/edit-icon.png';
import delete_icon from '../img/remove.png';


class GradesTable extends React.Component {

    static propTypes() {
        return {
            data: PropTypes.array,
            columns: PropTypes.array,
            onPageChange: PropTypes.func,
            onSort: PropTypes.func,
            onFilter: PropTypes.func
        }
    }

    constructor(props) {
        super(props);
        // Initial setup
        this.initialState = {};

        if (props.onPageChange) {
            this.initialState.currentPage = 1;
            this.initialState.lastObject = props.data[props.data.length - 1];
        }
        if (props.onFilter) {
            this.initialState.filterInput = '';
        }

        this.state = this.initialState;
    }


    sortColumn(column) {
        if (this.props.onSort) {
            this.props.onSort(column);
        }
    }

    generateColumn(col, index) {
        return <th key={col.name} onClick={this.sortColumn.bind(this, col)}>{col.name}</th>;
    }

    showPrevious() {
        if (this.props.onPageChange) {
            this.props.onPageChange(this.state.currentPage, this.state.lastObject, this.state.currentPage - 1);
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    componentWillReceiveProps(nextProps) {
        // Might have unnecessary updates.
        this.setState({ lastObject: nextProps.data[nextProps.data.length - 1] });
    }


    onFilterInputChange(e) {
        this.setState({ filterInput: e.target.value });
        if (this.props.onFilter) {
           
           this.props.onFilter(e.target.value);
        }
    
    }


 
    handleRemoveButtonClick = (state) => {
        console.log("this.state",state)
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'RemoveRow',
                    ID: state.Id,
                })
        };
        console.log("requesting");

        const response =  fetch('/Remove', requestMsg);


        alert('Deleted');
    };


    handleEditButtonClick = (state) => {
        console.log('state: ', state.FullName);
        // return (this.props.history.push({
        //     '/AddStudent'}))
        // console.log('props', this.props);
        return this.props.history.push({
            pathname: '/AddStudent',
            Id: state.Id,
            Mathematics: state.Mathematics,
            English: state.English,
            Biology: state.Biology,
            Physics: state.Physics,
            edit:true
        })


        // console.log('clicked');
        // console.log(state.target.id);
    };

    render() {
        
        const { data, columns, onPageChange, onFilter, onSort, ...props } = this.props;
        return (
            <div className="react-table">
  
                <center>
                    <table  {...props}>
                        <thead>
                            <tr key="table-header">{this.props.columns.map(this.generateColumn, this)}</tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((row, rowIndex) => {
                                return (
                                    <tr key={rowIndex}>
                                        <td>
                                            {/*<Link to={{*/}
                                            {/*    pathname: '/AddStudent',*/}
                                            {/*    state: { rowData: data[rowIndex] }*/}
                                            {/*}}>*/}
                                            {/*    <img src={edit_icon} width={20}/>*/}
                                            {/*</Link>*/}
                                            <img src={edit_icon} width={20} id={row.ID} onClick={() => this.handleEditButtonClick(row)} />
                                            <img src={delete_icon} style={{marginLeft: '3rem'}} width={20} id={row.ID} onClick={() => this.handleRemoveButtonClick(row)} />

                                        </td>
                                        {this.props.columns.map((col, colIndex) => {
                                            let rowHtml;
                                            if (colIndex > 0) {
                                                rowHtml = <td key={col.name + rowIndex}>{row[col.accessor.toString()]}</td>;
                                                // if (typeof col.accessor === "function") {
                                                //     rowHtml = <td key={col.name + rowIndex}>{col.accessor(row, rowIndex)}</td>
                                                // } else {
                                                //     rowHtml = <td key={col.name + rowIndex}>{row[col.accessor.toString()]}</td>;
                                                // }
                                            }
                                            return rowHtml;
                                        })
                                        }
                                  
                                    </tr>
                                );
                            }
                            )}
                        </tbody>
                    </table>
                </center>

                {''}
            </div>
        )
    }


}

export default withRouter(GradesTable);
