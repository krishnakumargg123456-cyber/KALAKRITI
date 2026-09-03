"use client";

import {
  BarChart3,
  Boxes,
  
  Package,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

function StatCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-card border border-border bg-cream p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{title}</p>
        <div className="rounded-full border border-gold/40 bg-parchment p-2 text-maroon">
          {icon}
        </div>
      </div>

      <p className="mt-4 font-serif text-3xl font-bold text-deep-maroon">
        {value}
      </p>
    </div>
  );
}

type Dashboard = {
  summary: {
    total_users: number;
    total_artisans: number;
    total_products: number;
    total_orders: number;
    total_categories: number;
    low_stock_products: number;
  };
};

export default function AdminStats({ data }: { data: Dashboard }) {
  const { summary } = data;

  const stats = [
    {
      title: "Total Users",
      value: summary.total_users,
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Artisans",
      value: summary.total_artisans,
      icon: <Store className="h-5 w-5" />,
    },
    {
      title: "Products",
      value: summary.total_products,
      icon: <Boxes className="h-5 w-5" />,
    },
    {
      title: "Orders",
      value: summary.total_orders,
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Categories",
      value: summary.total_categories,
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Low Stock",
      value: summary.low_stock_products,
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
