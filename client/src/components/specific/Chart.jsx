import React from 'react'
import { Line, Doughnut } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales } from "chart.js";
import { getLast7Days } from '../../libs/features';

ChartJS.register(CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend)

const lineChartOption = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                beginAtZero: true,
                display: false,
            }
        }
    }
}

const labels=getLast7Days()

const LineChart = ({value=[]}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Message",
                fill: true,
                backgroundColor: "rgba(75,192,192,0.1)",
                borderColor: "rgba(75,125,192,1)"
            }
        ],
    };
    return (
        <Line data={data} options={lineChartOption} ></Line>
    )
}

const DoughnutChartOption={
    responsive:true,
    plugins:{
        legend:{
            display:true,
        },
    },
    cutout:100
}

const DoughnutChart = ({value=[],labels=[]}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                fill: false,
                backgroundColor: ["rgba(75,192,192,0.2)","rgba(56,25,36,0.2)"],
                hoverBackgroundColor:["rgba(75,192,192,1)","rgba(56,25,36,1)"],
                borderColor: ["rgba(75,12,12,1)","rgba(75,12,255,1)"],
                offset:10,
            }
        ],
    };
    return (
        <Doughnut data={data} style={{zIndex:'10'}} options={DoughnutChartOption} />
    )
}

export { LineChart, DoughnutChart }