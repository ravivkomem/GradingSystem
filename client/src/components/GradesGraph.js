import React from "react";
// import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
import {CanvasJSChart} from 'canvasjs-react-charts'

class GradesGraph extends React.Component {
    constructor(props) {
        super(props);
        if(props.tableData!==null&&props.tableData!==undefined&&props.tableData.length!==0)
        {
            this.state = {tableData: props.tableData};

            let jsonKeys = Object.keys(this.state.tableData[0]);
            let jsonVals = Object.values(this.state.tableData[0]);
            jsonKeys.splice(0, 2); // Delete the first two array elements
            jsonVals.splice(0, 2); // Delete the first two array elements
    
    
            let GradesToGraph = [];
            let gradesSum = 0;
            for (let i = 0; i < jsonKeys.length; i++) {
                GradesToGraph.push({label: jsonKeys[i], y: jsonVals[i]});
                gradesSum += jsonVals[i];
            }
            let GradesAvg = gradesSum / jsonKeys.length;
            this.state = {
                GradesToGraph: GradesToGraph,
                GradesAverage: GradesAvg
            };
        }
 
    };

    render() {
        if(this.props.tableData!==null&&this.props.tableData!==undefined&&this.props.tableData.length!==0)
        {

            const options = {
                animationEnabled: true,
                theme: "light2",
                height: 300,
                axisY: {
                    maximum: 100,
                    stripLines: [
                        {
                            startValue: this.state.GradesAverage,
                            endValue: this.state.GradesAverage-1,
                            color: "#d8d8d8",
                            label: "Average = " + this.state.GradesAverage,
                            labelFontColor: "#a8a8a8",
                        }
                    ]
                },
                // title: {
                //
                // },
                data: [{
                    type: "column",
                    dataPoints: this.state.GradesToGraph
                }]
            };
            return (
                <div>
                    <CanvasJSChart options={options}
                        /* onRef = {ref => this.chart = ref} */
                    />
                </div>
            );
        }
        else{
            return (
               <div></div> 
            )

    

        }

     
    }


}


export default GradesGraph;
