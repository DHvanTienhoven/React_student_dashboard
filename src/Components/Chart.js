import React, { useContext } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLegend,
    VictoryLabel,
    VictoryAxis,
    VictoryLine,
    VictoryTooltip
} from 'victory';
import { StudentContext } from './StudentContext';
import { SortContext } from './SortContext';
import { AssignmentContext } from './AssignmentContext';


const Chart = ({ pagename }) => {

    const [students] = useContext(StudentContext)

    const filterStudents = () => {
        return pagename ? students.filter(student => student.name === pagename):
            students.filter(student => student.checked)
    };

    const filteredStudents = filterStudents();

    const [assignments] = useContext(AssignmentContext)

    const weighedAssignments = assignments.filter(assignment => assignment.checked).map(item => item.assignmentName);

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

    const [sort] = useContext(SortContext);

    const sortAssignments = array => {
        if (sort.moeilijk) {
            return array.sort((a, b) => b.moeilijk - a.moeilijk)
        } if (sort.leuk) {
            return array.sort((a, b) => b.leuk - a.leuk)
        } else {
            return array
        }
    };

    const sortedAssignments = sortAssignments(averageObjects);

    const createxyObject = () => {
        const data = {};
        data.moeilijk = []
        data.leuk = []
        sortedAssignments.forEach(item => {
            data.moeilijk.push({ x: item.assignmentName, y: item.moeilijk })
            data.leuk.push({ x: item.assignmentName, y: item.leuk })
        })
        return data
    };

    const barData = createxyObject();

    const getConditiontalLabel = () => {
        return pagename ? "Rating voor 'moeilijk' en 'leuk' per opdracht" :
            "Gemiddelde rating voor 'moeilijk' en 'leuk' per opdracht"
    }

    const conditionalLabel = getConditiontalLabel()

    return (
        <div className="chartcomponent">
            {filteredStudents.length > 0 && weighedAssignments.length > 0 &&
                <VictoryChart
                    height={200}
                >
                    <VictoryLabel
                        text={conditionalLabel}
                        x={225}
                        y={8}
                        textAnchor="middle"
                        style={{ fill: "#120faa" }} />
                    <VictoryLine y={() => 1}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 2}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 3}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 4}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 5}
                        style={{
                            data: {
                                stroke: "#bbbbbb",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 4.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 0.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 1.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 2.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryLine y={() => 3.5}
                        style={{
                            data: {
                                stroke: "#e8e8e8",
                                strokeWidth: 0.3
                            }
                        }} />
                    <VictoryGroup offset={160 / weighedAssignments.length}>
                        <VictoryBar
                            data={barData.moeilijk}
                            style={{ data: { fill: 'red' } }}
                            barWidth={130 / weighedAssignments.length}
                            animate={{
                                duration: 1500,
                                onLoad: { duration: 1000 }
                            }}
                            labels={({ datum }) => `${datum.x} \n moeilijk-rating: ${datum.y.toString().slice(0, 3)}`}
                            labelComponent={<VictoryTooltip
                                flyoutWidth={60}
                                flyoutHeight={16}
                                cornerRadius={2}
                                pointerLength={4}
                                pointerWidth={4}
                                flyoutStyle={{
                                    stroke: "#120faa",
                                    strokeWidth: 0.6,
                                    fill: "#ffffa0"
                                }}
                                style={{
                                    fontSize: 6,
                                    fill: "#120faa"
                                }} />} />
                        <VictoryBar
                            data={barData.leuk}
                            style={{ data: { fill: 'gold' } }}
                            barWidth={130 / weighedAssignments.length}
                            animate={{
                                duration: 1500,
                                onLoad: { duration: 1000 }
                            }}
                            labels={({ datum }) => `${datum.x} \n leuk-rating: ${datum.y.toString().slice(0, 3)}`}
                            labelComponent={<VictoryTooltip
                                flyoutWidth={60}
                                flyoutHeight={16}
                                cornerRadius={2}
                                pointerLength={4}
                                pointerWidth={4}
                                flyoutStyle={{
                                    stroke: "#120faa",
                                    strokeWidth: 0.6,
                                    fill: "#ffffa0"
                                }}
                                style={{
                                    fontSize: 6,
                                    fill: "#120faa"
                                }} />} />
                    </VictoryGroup>
                    <VictoryAxis
                        tickLabelComponent={<VictoryLabel
                            angle={-45}
                            dx={6}
                            dy={-9}
                            style={{
                                fontSize: 5,
                                fill: "#120faa"
                            }}
                            textAnchor={"end"}
                        />}
                    />
                    <VictoryAxis dependentAxis
                        label="Rating op een schaal van 1 tot 5"
                        domain={[0, 5]}
                        style={{
                            tickLabels:
                            {
                                fontSize: 7,
                                fill: "#120faa"
                            },
                            axisLabel:
                            {
                                fontSize: 6,
                                padding: 35,
                                fill: "#120faa"
                            }
                        }} />
                    <VictoryLegend
                        x={185}
                        y={30}
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
                            {
                                labels: {
                                    fontSize: 6,
                                    fill: "#120faa"
                                }
                            }

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
