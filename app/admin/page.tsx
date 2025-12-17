import React from 'react';
// Import komponen Client yang baru dibuat (tanpa perlu 'use client' di file ini)
import DashboardCharts from '@/components/admin/DashboardCharts';

// --- DEFINISI TIPE (Interface InfoCard tetap di sini karena ia tidak menggunakan hooks/context) ---

interface CategoryInnovation {
    category: string;
    total: number;
}

interface InfoCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface MonthlyInnovation {
    month: string;
    count: number;
}

// --- Dummy Data (Bisa disimulasikan sebagai hasil Server-side Fetching) ---

const monthlyInnovationData: MonthlyInnovation[] = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 15 },
  { month: 'Mar', count: 20 },
  { month: 'Apr', count: 18 },
  { month: 'Mei', count: 25 },
  { month: 'Jun', count: 30 },
];

const categoryInnovationData: CategoryInnovation[] = [
  { category: 'Aplikasi Mobile', total: 75 },
  { category: 'Perangkat Keras', total: 40 },
  { category: 'Sistem Informasi', total: 60 },
  { category: 'Lainnya', total: 25 },
];

const approvalData = {
  pendingRequest: 5,
  registeredInnovators: 120,
};
// --------------------

// --- Komponen Info Card (Tetap sebagai Server Component) ---
const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, color }) => (
  <div className={`bg-white shadow-xl rounded-xl p-6 border-l-4 ${color}`}>
    <div className="flex justify-between items-center">
        <div className="text-4xl font-light">{icon}</div>
        <div className="text-right">
            <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
            <h4 className="text-3xl font-bold text-gray-800 mt-1">{value}</h4>
        </div>
    </div>
  </div>
);
// --------------------

// --- Komponen Utama Dashboard Admin (Server Component) ---
export default function AdminPage() {
  // Semua logika data di sini berjalan di server (lebih cepat dan aman)
  const totalInnovation = categoryInnovationData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Dashboard Inovasi Admin</h1>
        <p className="text-gray-500 mt-2">Ringkasan real-time aktivitas inovasi platform.</p>
      </header>

      {/* Bagian 1: Info Cards (Rendered di Server) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <InfoCard 
          title="Permintaan Approval Baru" 
          value={approvalData.pendingRequest} 
          icon="🔔" 
          color="border-blue-500"
        />
        <InfoCard 
          title="Total Inovator Terdaftar" 
          value={approvalData.registeredInnovators} 
          icon="👥" 
          color="border-green-500"
        />
        <InfoCard 
          title="Total Inovasi (Semua)" 
          value={totalInnovation} 
          icon="💡" 
          color="border-yellow-500"
        />
      </div>

      {/* Bagian 2: Grafik Analisis Data (Diimpor sebagai Client Component) */}
      {/* Client Component hanya dimuat di sisi klien, memecahkan masalah createContext */}
      <DashboardCharts 
        monthlyData={monthlyInnovationData} 
        categoryData={categoryInnovationData} 
      />

    </div>
  );
}



