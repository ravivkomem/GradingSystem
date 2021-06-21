import React from 'react';
import {withRouter} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";





class AddStudent extends React.Component {
    constructor(props) {
        // const name = useNavigationParam('name');
        // console.log("name",name);
        super(props);
        console.log("props", this.props.history.location);
        // console.log("props ID",props.Id);

        this.state = {
            Id: this.props.history.location.Id,
            Mathematics: this.props.history.location.Mathematics,
            English: this.props.history.location.English,
            Biology: this.props.history.location.Biology,
            Physics: this.props.history.location.Physics,
            edit:this.props.history.location.edit,
            data: '',
            getData: true
        }
    }

    componentDidMount = async (prevProps) => {
        const datas = await fetch('/Scoreboard')
        const dataa = await datas.json();
        this.setState({data: dataa, getData: true})
        document.getElementById('Id').disabled = this.state.edit;

    }


    postData = async (data = {}) => {
        if(this.state.edit)
        {
            const response = await fetch('/updateRow', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
             // rts =response To Use
        const rts = await response.json()
        return rts
        }
        else
        {
            const response = await fetch('/addRow', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
             // rts =response To Use
        const rts = await response.json()
        return rts
        }
     
       
    }

    handleSaveRow = () => {
        if (this.state.Id) {
            for (let i = 0; i < this.state.data.length; i++) {
                console.log("state.Id", this.state.Id);
                console.log("data[i].Id", this.state.data[i].Id);
                if(!this.state.edit)
                    if (this.state.Id == this.state.data[i].Id) {
                        alert('Error: Id already exists.')
                        return;
                    }
            }
            this.postData({
                Id: this.state.Id,
                Mathematics: this.state.Mathematics,
                Physics: this.state.Physics,
                English: this.state.English,
                Biology: this.state.Biology
            });
            return (
                this.props.history.push('/Scoreboard')
            )

        } else {
            alert("Error: please insert your Id")
        }


    };

    render() {
        
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <center>
                    <Card style={{width: '50rem', marginTop: '2rem'}}>

                    <h1 id='loginTitle'>Add student</h1>
                    <div className="content">

                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="Id">Id</label>
                                <input id="Id" type="int" name="Id"
                             placeholder="Id" value={this.state.Id} onChange={(event) => {
                                    this.setState({
                                        Id: event.target.value
                                    })
                                }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Mathematics">Mathematics</label>
                                <input type="int" name="Mathematics" placeholder="Mathematics" value={this.state.Mathematics} onChange={(event) => {
                                    this.setState({
                                        Mathematics: event.target.value
                                    })
                                }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="English">English</label>
                                <input type="int" name="English" placeholder="English" value={this.state.English} onChange={(event) => {
                                    this.setState({
                                        English: event.target.value
                                    })
                                }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Biology">Biology</label>
                                <input type="text" name="Biology" placeholder="Biology" value={this.state.Biology} onChange={(event) => {
                                    this.setState({
                                        Biology: event.target.value
                                    })
                                }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Physics">Physics</label>
                                <input type="text" name="Physics" placeholder="Physics" value={this.state.Physics} onChange={(event) => {
                                    
                                    this.setState({
                                        Physics: event.target.value
                                    })
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <Button type="button" className="btn"
                                onClick={this.handleSaveRow}>
                            Save
                        </Button>
                    </div>
                    </Card>

                </center>
            </div>
        );

    }


}


export default withRouter(AddStudent);
