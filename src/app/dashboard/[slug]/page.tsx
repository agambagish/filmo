"use client";

import { RefreshCwIcon, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const Page = () => {
  return (
    <main className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Ticket Sales</h1>
        <Button
          variant="outline"
          size="icon"
          // onClick={handleRefresh}
          // disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCwIcon
            // className={`h-4 w-4 ${
            //   weatherQuery.isFetching ? "animate-spin" : ""
            // }`}
            className="size-4"
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart - Multiple</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  desktop: {
                    label: "Desktop",
                    color: "hsl(var(--chart-1))",
                  },
                  mobile: {
                    label: "Mobile",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <BarChart
                  accessibilityLayer
                  data={[
                    { month: "January", desktop: 186, mobile: 80 },
                    { month: "February", desktop: 305, mobile: 200 },
                    { month: "March", desktop: 237, mobile: 120 },
                    { month: "April", desktop: 73, mobile: 190 },
                    { month: "May", desktop: 209, mobile: 130 },
                    { month: "June", desktop: 214, mobile: 140 },
                  ]}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Line Chart - Multiple</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  desktop: {
                    label: "Desktop",
                    color: "hsl(var(--chart-1))",
                  },
                  mobile: {
                    label: "Mobile",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <LineChart
                  accessibilityLayer
                  data={[
                    { month: "January", desktop: 186, mobile: 80 },
                    { month: "February", desktop: 305, mobile: 200 },
                    { month: "March", desktop: 237, mobile: 120 },
                    { month: "April", desktop: 73, mobile: 190 },
                    { month: "May", desktop: 209, mobile: 130 },
                    { month: "June", desktop: 214, mobile: 140 },
                  ]}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="mobile"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid items-start gap-6 md:grid-cols-2">
          {/* <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} /> */}
        </div>
      </div>
    </main>
  );
};

export default Page;
