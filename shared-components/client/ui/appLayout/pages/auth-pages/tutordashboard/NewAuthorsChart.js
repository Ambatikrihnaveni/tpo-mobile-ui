import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Earning', value: 5599, color: '#f7f2f2' },
    { name: 'Pending', value: 18756, color: '#05cceb' },
];

const NewAuthorsChart = () => {
    return (
        <ResponsiveContainer height={150}>
            <PieChart>
                <text x="50%" fontSize={16} y="50%" textAnchor="middle" dominantBaseline="middle">
                    Revenue 68%
                </text>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={70} fill="#8884d8">
                    {
                        data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default NewAuthorsChart;
