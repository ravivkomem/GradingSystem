import React from "react";
import Table from "react-bootstrap/Table";


class GradeTableForStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tableData: props.tableData};
        // console.log(this.state);
    };

    renderStudentGrades(col, idx) {
        return (
            <tr key={idx}>
                <td>{col.Biology}</td>
                <td>{col.English}</td>
                <td>{col.Mathematics}</td>
                <td>{col.Physics}</td>
            </tr>
        )
    };

    render() {
        return (
            <div>
                <Table striped bordered hover responsive="md" >
                    <thead>
                    <td><b>Biology</b></td>
                    <td><b>English</b></td>
                    <td><b>Mathematics</b></td>
                    <td><b>Physics</b></td>
                    </thead>
                    <tbody>
                    {this.state.tableData.map(this.renderStudentGrades)}
                    </tbody>
                </Table>
            </div>
        );
    }


}


export default GradeTableForStudent;
