import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ShoppingCart, DollarSign, Package, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const { t } = useTranslation();

  // Initial empty state
  const salesData: { name: string; sales: number }[] = [];

  // Initial empty state
  const recentOrders: { id: string; customer: string; total: number; status: string }[] = [];

  const stats = [
    {
      title: "Total Revenue",
      value: "₹0.00",
      description: "No data available",
      icon: DollarSign,
      color: "text-gray-400",
    },
    {
      title: "Orders",
      value: "0",
      description: "No data available",
      icon: ShoppingCart,
      color: "text-gray-400",
    },
    {
      title: "Active Products",
      value: "0",
      description: "No data available",
      icon: Package,
      color: "text-gray-400",
    },
    {
      title: "Active Users",
      value: "0",
      description: "No data available",
      icon: Users,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t("Dashboard")}</h2>
      
      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t(stat.title)}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Section */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("Overview")}</CardTitle>
            <CardDescription>{t("Weekly sales performance")}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full flex items-center justify-center">
              {salesData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `₹${value}`} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar 
                      dataKey="sales" 
                      fill="#4F7942" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-gray-400 text-sm">{t("No sales data available")}</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders Section */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t("Recent Orders")}</CardTitle>
            <CardDescription>
              {recentOrders.length > 0 
                ? t("You made sales this month.") 
                : t("No recent orders.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Order")}</TableHead>
                  <TableHead>{t("Customer")}</TableHead>
                  <TableHead className="text-right">{t("Amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      {t("No recent orders")}
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id}
                        <div className="hidden text-xs text-muted-foreground md:inline ml-2">
                          <Badge variant={order.status === 'completed' ? 'default' : order.status === 'processing' ? 'secondary' : 'outline'} className="text-[10px] h-5 px-1">
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="text-right">₹{order.total}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
