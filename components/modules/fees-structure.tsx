"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CreditCard, CheckCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { SQLDatabase } from "@/lib/sql-database"
import { useMemo } from "react"

interface FeesStructureProps {
  studentId: string
}

export function FeesStructure({ studentId }: FeesStructureProps) {
  const feesData = useMemo(() => {
    const fees = SQLDatabase.getStudentFees(studentId)

    if (!fees) {
      return null
    }

    const feesBreakdown = [
      { category: "College Fee", amount: fees.collegeFee, paid: fees.paidAmount, status: "Paid" },
      { category: "Hostel Fee", amount: fees.hostelFee, paid: fees.hostelFee, status: "Paid" },
      { category: "Bus Fee", amount: fees.busFee, paid: fees.busFee, status: fees.busFee > 0 ? "Paid" : "N/A" },
      { category: "Back Fee", amount: fees.backFee, paid: fees.backFee, status: fees.backFee > 0 ? "Pending" : "N/A" },
    ]

    const totalFees = fees.totalFee
    const totalPaid = fees.paidAmount
    const totalPending = totalFees - totalPaid

    const chartData = feesBreakdown.map((f) => ({
      name: f.category,
      amount: f.amount,
    }))

    const pieData = [
      { name: "Paid", value: totalPaid },
      { name: "Pending", value: totalPending },
    ]

    return {
      feesBreakdown,
      totalFees,
      totalPaid,
      totalPending,
      chartData,
      pieData,
      dueDate: fees.dueDate,
      status: fees.status,
    }
  }, [studentId])

  if (!feesData) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="pt-6">
          <p className="text-destructive">No fees information found</p>
        </CardContent>
      </Card>
    )
  }

  const COLORS = ["hsl(var(--color-primary))", "hsl(var(--color-destructive))"]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Fees</p>
                <p className="text-3xl font-bold text-primary">₹{feesData.totalFees.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Paid</p>
                <p className="text-3xl font-bold text-green-600">₹{feesData.totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-destructive">₹{feesData.totalPending.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Fees Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feesData.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="hsl(var(--color-primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={feesData.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) => `${name}: ₹${value.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {feesData.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Fees Details Table */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Fees Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feesData.feesBreakdown.map((fee) => (
              <div key={fee.category} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{fee.category}</p>
                  </div>
                  <Badge
                    className={
                      fee.status === "Paid"
                        ? "bg-green-500/20 text-green-700"
                        : fee.status === "N/A"
                          ? "bg-muted text-muted-foreground"
                          : "bg-destructive/20 text-destructive"
                    }
                  >
                    {fee.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amount: ₹{fee.amount.toLocaleString()}</span>
                  <span className="font-medium">Paid: ₹{fee.paid.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Notice */}
      {feesData.totalPending > 0 && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive mb-1">Pending Payment</p>
              <p className="text-sm text-muted-foreground">
                You have pending fees of ₹{feesData.totalPending.toLocaleString()}. Please make the payment before{" "}
                {new Date(feesData.dueDate).toLocaleDateString()}.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {feesData.status === "paid" && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-600 mb-1">All Fees Paid</p>
              <p className="text-sm text-muted-foreground">Your fees for this semester have been paid in full.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
