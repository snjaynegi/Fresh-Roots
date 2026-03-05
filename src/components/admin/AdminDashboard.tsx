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

  // Mock Data for Charts
  const salesData = [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 2000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 1890 },
    { name: "Sat", sales: 2390 },
    { name: "Sun", sales: 3490 },
  ];

  // Mock Data for Recent Orders
  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", total: 1200, status: "completed" },
    { id: "ORD-002", customer: "Jane Smith", total: 850, status: "processing" },
    { id: "ORD-003", customer: "Bob Johnson", total: 2300, status: "pending" },
    { id: "ORD-004", customer: "Alice Brown", total: 450, status: "completed" },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "₹45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: "+2350",
      description: "+180.1% from last month",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Active Products",
      value: "12,234",
      description: "+19% from last month",
      icon: Package,
      color: "text-orange-600",
    },
    {
      title: "Active Users",
      value: "+573",
      description: "+201 since last hour",
      icon: Users,
      color: "text-purple-600",
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
            <div className="h-[300px] w-full">
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
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders Section */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t("Recent Orders")}</CardTitle>
            <CardDescription>
              {t("You made 265 sales this month.")}
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
                {recentOrders.map((order) => (
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
