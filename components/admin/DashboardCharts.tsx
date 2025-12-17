"use client";

import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    PieLabelRenderProps,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

// --- DEFINISI TIPE (INTERFACE) ---

interface MonthlyInnovation {
  month: string;
  count: number;
}

// 1. PERBAIKAN TIPE CategoryInnovation
// Kita perlu menambahkan Index Signature agar kompatibel dengan data Recharts
interface CategoryInnovation {
    category: string;
    total: number;
    // Tambahkan Index Signature
    [key: string]: any; 
}

interface DashboardChartsProps {
    monthlyData: MonthlyInnovation[];
    categoryData: CategoryInnovation[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- Komponen Grafik Batang (Tidak ada perubahan signifikan) ---
const MonthlyInnovationChart: React.FC<{ data: MonthlyInnovation[] }> = ({ data }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 h-96">
    <h3 className="text-xl font-semibold mb-4 text-gray-700">📈 Inovasi Produk per Bulan</h3>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" stroke="#555" />
        <YAxis stroke="#555" />
        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        <Legend />
        <Bar dataKey="count" name="Jumlah Inovasi" fill="#007bff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Komponen Grafik Lingkaran (Perubahan pada Pie Chart) ---
const CategoryInnovationChart: React.FC<{ data: CategoryInnovation[] }> = ({ data }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 h-96 flex flex-col">
    <h3 className="text-xl font-semibold mb-4 text-gray-700">📊 Total Inovasi per Kategori</h3>
    <div className="grow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            labelLine={false}
            // 2. PERBAIKAN LABEL CALLBACK
            // Menggunakan PieLabelRenderProps dan mengakses data melalui payload.nameKey
            label={(props: PieLabelRenderProps) => {
                const categoryName = props.name as string; // name diambil dari nameKey="category"
                const percent = props.percent as number; // 'percent' sudah dipastikan ada
                
                // Menangani kemungkinan 'undefined' pada percent
                if (typeof percent === 'undefined') return '';

                return `${categoryName} (${(percent * 100).toFixed(0)}%)`;
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// --- Komponen Gabungan Client Component ---
const DashboardCharts: React.FC<DashboardChartsProps> = ({ monthlyData, categoryData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyInnovationChart data={monthlyData} />
            <CategoryInnovationChart data={categoryData} />
        </div>
    );
};

export default DashboardCharts;