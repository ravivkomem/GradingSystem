import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import GradesTable from './GradesTable';
import Table from "react-bootstrap/Table";
import '../App.css'
import {Bar} from 'react-chartjs-2';
import Navbar from 'react-bootstrap/esm/Navbar';


class Scoreboard extends React.Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        // redirectIfNotLecturer(props);
        this.state = { //state is by default an object
            students: [
                {Id: '', Mathematics: '', English: '', Biology: '', Physics: ''},
            ],
            Average: [
                {Mathematics: '', English: '', Biology: '', Physics: ''}
            ]
        }
        this.state.columns = this.columns;
    }

    get columns() {
        return [
            {
                name: "Edit/Remove",
                accessor: "Edit"
            },
            {
                name: "Id",
                accessor: "Id"
            },
            {
                name: "Mathematics",
                accessor: "Mathematics"
            }, {
                name: "English",
                accessor: "English"
            },
            {
                name: "Biology",
                accessor: "Biology"
            }, {
                name: "Physics",
                accessor: "Physics"
            }
        ];
    }

    componentDidMount = async (prevProps) => {
        const data = await fetch('/Scoreboard');
        const data_json = await data.json();
        this.setState({students: data_json, getData: true});
    };

    handlePageChange(oldPage, lastObject, newPage) {
        switch (newPage) {
            case 1:
                this.setState({data: this.initialData});
                break;
            case 2:
                this.setState({data: this.nextData});
                break;
            default:
                this.setState({data: this.initialData});
        }
    }

    handleFilter(filterInput) {
        if (filterInput.trim() === '') {
            this.setState({data: this.initialData});
        } else {
            let filteredData = [];
            this.state.students.forEach((element) => {
                if (element.Id == filterInput) {
                    filteredData.push(element);
                }
            });
    


            this.setState({data: filteredData});
           
        }
    }

    render() {
       
        // const addStudent = Home();
        const details = {
            labels: ['Mathematics', 'English', 'Biology',
                'Physics'],
            datasets: [
                {
                    label: 'average',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [65, 59, 80, 81]
                }
            ]
        }
        return (
           
            <div className="Scoreboard" style={{ backgroundColor: '#FFFFFF'}}>
              
                <center>
                    
                    <Table>
                        <GradesTable style={{backgroundColor: 'white'}} data={this.state.students}
                                     columns={this.state.columns}
                                     onPageChange={this.handlePageChange.bind(this)}
                                     onFilter={this.handleFilter.bind(this)}/>
                    </Table>
                    <Link to="/AddStudent" className="btn btn-primary">Add student</Link>
                    <div style={{
                        width: "600px",
                        height: "300px", backgroundColor: 'white', marginTop: '20px'
                    }}>

                        <Bar
                            data={details}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Average',
                                    fontSize: 40,

                                },
                                legend: {
                                    display: true,
                                    position: 'right',

                                    
                                }
                            }}
                        />
                    </div>

                    {this.props.onPageChange? this.renderPagination(): ''}
                </center>
            </div>
        )
    }
}


export default withRouter(Scoreboard);
