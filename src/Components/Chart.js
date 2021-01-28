import React, { useContext } from 'react';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryLabel, VictoryAxis, VictoryLine } from 'victory';
import { StudentContext } from './StudentContext';
import { SortContext } from './SortContext';


const Chart = ({ pagename }) => {

    const [students, setStudents] = useContext(StudentContext)

    const filterStudents = () => {
        if (pagename) {
            return students.filter(student => student.name === pagename)
        } else {
            return students.filter(student => student.checked)
        }
    };

    const filteredStudents = filterStudents();

    const weighedAssignments = students[0].assignments.filter(assignment => assignment.checked).map(item => item.assignmentName);

    const assembleAssignments = () => {
        const newArray = []
        weighedAssignments.forEach(item => {
            newArray.push(filteredStudents.map(student => student.assignments
                .filter(assignment => assignment.assignmentName === item))
            )
        })
        return newArray
    };

    const allAssignmentsAssembled = assembleAssignments();

    const createAverageObjects = () => {
        const newArray = []
        if (filteredStudents.length > 0) {
            allAssignmentsAssembled.forEach(item => {
                if (item[0][0].assignmentName.length < 7) {
                    newArray.push({
                        assignmentName: item[0][0].assignmentName,
                        moeilijk: item.flat().map(item => item.moeilijk).reduce((a, b) => a + b) / item.length,
                        leuk: item.flat().map(item => item.leuk).reduce((a, b) => a + b) / item.length
                    })
                } else {
                    newArray.push({
                        assignmentName: item[0][0].assignmentName.slice(17),
                        moeilijk: item.flat().map(item => item.moeilijk).reduce((a, b) => a + b) / item.length,
                        leuk: item.flat().map(item => item.leuk).reduce((a, b) => a + b) / item.length
                    })
                }
            })
        }
        return newArray
    };

    const averageObjects = createAverageObjects();

    const [sort, setSort] = useContext(SortContext);

    const sortAssignments = array => {
        if (sort.moeilijk === true) {
            return array.sort((a, b) => b.moeilijk - a.moeilijk)
        } if (sort.leuk === true) {
            return array.sort((a, b) => b.leuk - a.leuk)
        } else {
            return array
        }
    };

    const sortedAssignments = sortAssignments(averageObjects);

    const xyObject = () => {
        const data = {};
        data.moeilijk = []
        data.leuk = []
        sortedAssignments.forEach(item => {
            data.moeilijk.push({ x: item.assignmentName, y: item.moeilijk })
            data.leuk.push({ x: item.assignmentName, y: item.leuk })
        })
        return data
    };

    const data = xyObject();

    return (
        <div className = "chartcomponent">
            {filteredStudents.length > 0 && weighedAssignments.length > 0 &&
                <VictoryChart
                height={200}>
                    <VictoryLine y={() => 1}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 2}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 3}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 4}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 5}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 4.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 0.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 1.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 2.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryLine y={() => 3.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }
                        } />
                    <VictoryGroup offset={160 / weighedAssignments.length}>
                        <VictoryBar
                            data={data.moeilijk}
                            style={{ data: { fill: 'red' } }}
                            barWidth={130 / weighedAssignments.length}
                            animate={{
                                duration: 1500,
                                onLoad: { duration: 1000 }
                            }} />
                        <VictoryBar
                            data={data.leuk}
                            style={{ data: { fill: 'gold' } }}
                            barWidth={130 / weighedAssignments.length}
                            animate={{
                                duration: 1500,
                                onLoad: { duration: 1000 }
                            }} />
                    </VictoryGroup>
                    <VictoryAxis
                        tickLabelComponent={<VictoryLabel
                            angle={-45}
                            dx={6}
                            dy={-9}
                            style={{ fontSize: 5 }}
                            textAnchor={"end"}
                        />}
                    />
                    <VictoryAxis dependentAxis
                        label="rating"
                        domain={[0, 5]}
                        style={{
                            tickLabels:
                                { fontSize: 7 },
                            axisLabel:
                            {
                                fontSize: 8,
                                padding: 35
                            }
                        }} />
                    <VictoryLegend
                        x={150}
                        y = {30}
                        orientation="horizontal"
                        data={[
                            {
                                name: "moeilijk",
                                symbol: { fill: 'red' }
                            },
                            {
                                name: "leuk",
                                symbol: { fill: 'gold' }
                            }]}
                        style={
                            { labels: { fontSize: 6} }
                            
                        }
                    />
                </VictoryChart>}
            {filteredStudents.length === 0 &&
                <h1>Selecteer alstublieft tenminste één student. </h1>}
            {weighedAssignments.length === 0 &&
                <h1>Selecteer alstublieft tenminste één opdracht.</h1>}
        </div>
    )
};

export default Chart
