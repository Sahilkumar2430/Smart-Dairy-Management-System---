import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Tooltip,
  Divider,
  Alert,
  Snackbar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  Badge,
} from '@mui/material';
import {
  Opacity,
  TrendingUp,
  TrendingDown,
  CalendarToday,
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Download,
  Print,
  Refresh,
  Assessment,
  MonetizationOn,
  AttachMoney,
  LocalAtm,
  BarChart,
  PieChart,
  Timeline,
  Warning,
  CheckCircle,
  Cancel,
  Info,
  Calculate,
  PriceChange,
  Store,
  LocationOn,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subDays, subWeeks, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

// Mock milk production data
const initialMilkRecords = [
  { id: 1, date: new Date(2024, 0, 15, 6, 0), time: '6 AM', production: 850, temperature: 4.2, fat: 4.5, snf: 8.7, cowCount: 38, quality: 'A' },
  { id: 2, date: new Date(2024, 0, 15, 10, 0), time: '10 AM', production: 750, temperature: 4.1, fat: 4.3, snf: 8.5, cowCount: 35, quality: 'A' },
  { id: 3, date: new Date(2024, 0, 15, 14, 0), time: '2 PM', production: 650, temperature: 4.0, fat: 4.4, snf: 8.6, cowCount: 32, quality: 'A' },
  { id: 4, date: new Date(2024, 0, 15, 18, 0), time: '6 PM', production: 800, temperature: 4.3, fat: 4.6, snf: 8.8, cowCount: 37, quality: 'A' },
  { id: 5, date: new Date(2024, 0, 14, 6, 0), time: '6 AM', production: 820, temperature: 4.2, fat: 4.4, snf: 8.6, cowCount: 37, quality: 'A' },
  { id: 6, date: new Date(2024, 0, 14, 10, 0), time: '10 AM', production: 730, temperature: 4.1, fat: 4.3, snf: 8.5, cowCount: 34, quality: 'A' },
  { id: 7, date: new Date(2024, 0, 14, 14, 0), time: '2 PM', production: 620, temperature: 4.0, fat: 4.4, snf: 8.6, cowCount: 30, quality: 'A' },
  { id: 8, date: new Date(2024, 0, 14, 18, 0), time: '6 PM', production: 780, temperature: 4.3, fat: 4.5, snf: 8.7, cowCount: 36, quality: 'A' },
];

// Mock daily production data
const dailyProductionData = [
  { date: '2024-01-08', day: 'Mon', amount: 2450, avgFat: 4.4, avgSnf: 8.6, cowCount: 82, revenue: 73500 },
  { date: '2024-01-09', day: 'Tue', amount: 2520, avgFat: 4.5, avgSnf: 8.7, cowCount: 83, revenue: 75600 },
  { date: '2024-01-10', day: 'Wed', amount: 2480, avgFat: 4.3, avgSnf: 8.5, cowCount: 82, revenue: 74400 },
  { date: '2024-01-11', day: 'Thu', amount: 2600, avgFat: 4.6, avgSnf: 8.8, cowCount: 84, revenue: 78000 },
  { date: '2024-01-12', day: 'Fri', amount: 2550, avgFat: 4.4, avgSnf: 8.6, cowCount: 83, revenue: 76500 },
  { date: '2024-01-13', day: 'Sat', amount: 2700, avgFat: 4.5, avgSnf: 8.7, cowCount: 85, revenue: 81000 },
  { date: '2024-01-14', day: 'Sun', amount: 2650, avgFat: 4.4, avgSnf: 8.6, cowCount: 84, revenue: 79500 },
];

// Mock cow production data
const cowProductionData = [
  { id: 1, tagId: 'C-2024-001', name: 'Bossy', breed: 'Holstein', today: 32, average: 30.5, weekly: 215, monthly: 890, fat: 4.6, snf: 8.8, health: 'Excellent' },
  { id: 2, tagId: 'C-2024-015', name: 'Daisy', breed: 'Holstein', today: 30, average: 29.8, weekly: 208, monthly: 865, fat: 4.5, snf: 8.7, health: 'Good' },
  { id: 3, tagId: 'C-2024-032', name: 'Bella', breed: 'Jersey', today: 28, average: 27.5, weekly: 192, monthly: 810, fat: 5.2, snf: 9.1, health: 'Excellent' },
  { id: 4, tagId: 'C-2024-078', name: 'Lily', breed: 'Brown Swiss', today: 26, average: 25.8, weekly: 180, monthly: 750, fat: 4.8, snf: 8.9, health: 'Good' },
  { id: 5, tagId: 'C-2024-091', name: 'Molly', breed: 'Holstein', today: 29, average: 28.5, weekly: 199, monthly: 835, fat: 4.4, snf: 8.6, health: 'Fair' },
];

// State-wise milk rates in India (per liter)
const stateMilkRates = [
  { state: 'Gujarat', rate: 52, rateA1: 54, rateA2: 48, demand: 'High', trend: '+5%', quality: 'Premium' },
  { state: 'Maharashtra', rate: 48, rateA1: 50, rateA2: 45, demand: 'High', trend: '+3%', quality: 'Good' },
  { state: 'Uttar Pradesh', rate: 45, rateA1: 47, rateA2: 42, demand: 'Medium', trend: '+2%', quality: 'Average' },
  { state: 'Punjab', rate: 50, rateA1: 52, rateA2: 47, demand: 'High', trend: '+4%', quality: 'Premium' },
  { state: 'Haryana', rate: 49, rateA1: 51, rateA2: 46, demand: 'High', trend: '+4%', quality: 'Good' },
  { state: 'Rajasthan', rate: 46, rateA1: 48, rateA2: 43, demand: 'Medium', trend: '+2%', quality: 'Average' },
  { state: 'Madhya Pradesh', rate: 44, rateA1: 46, rateA2: 41, demand: 'Medium', trend: '+1%', quality: 'Average' },
  { state: 'Bihar', rate: 42, rateA1: 44, rateA2: 39, demand: 'Low', trend: '0%', quality: 'Standard' },
  { state: 'West Bengal', rate: 47, rateA1: 49, rateA2: 44, demand: 'Medium', trend: '+3%', quality: 'Good' },
  { state: 'Tamil Nadu', rate: 51, rateA1: 53, rateA2: 48, demand: 'High', trend: '+6%', quality: 'Premium' },
  { state: 'Karnataka', rate: 49, rateA1: 51, rateA2: 46, demand: 'High', trend: '+4%', quality: 'Good' },
  { state: 'Andhra Pradesh', rate: 48, rateA1: 50, rateA2: 45, demand: 'High', trend: '+3%', quality: 'Good' },
  { state: 'Telangana', rate: 47, rateA1: 49, rateA2: 44, demand: 'Medium', trend: '+2%', quality: 'Good' },
  { state: 'Kerala', rate: 53, rateA1: 55, rateA2: 50, demand: 'High', trend: '+7%', quality: 'Premium' },
  { state: 'Odisha', rate: 43, rateA1: 45, rateA2: 40, demand: 'Low', trend: '+1%', quality: 'Standard' },
];

function MilkProduction() {
  const [milkRecords, setMilkRecords] = useState(initialMilkRecords);
  const [dailyProduction, setDailyProduction] = useState(dailyProductionData);
  const [cowProduction, setCowProduction] = useState(cowProductionData);
  const [filteredRecords, setFilteredRecords] = useState(initialMilkRecords);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState('week');
  const [customStartDate, setCustomStartDate] = useState(startOfWeek(new Date()));
  const [customEndDate, setCustomEndDate] = useState(endOfWeek(new Date()));
  const [filterQuality, setFilterQuality] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    quantity: 100,
    fat: 4.5,
    snf: 8.5,
    selectedState: 'Maharashtra',
    baseRate: 48,
    totalValue: 4800,
    qualityPremium: 0,
    finalAmount: 4800,
  });
  const [stats, setStats] = useState({
    todayTotal: 3050,
    yesterdayTotal: 2950,
    averagePerCow: 22.5,
    milkingCows: 85,
    monthlyTotal: 78500,
    lastMonthTotal: 70100,
    totalRevenue: 2355000,
    avgFat: 4.5,
    avgSnf: 8.7,
    qualityA: 92,
  });

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [milkRecords, dailyProduction, searchTerm, tabValue, dateRange, customStartDate, customEndDate, filterQuality]);

  const applyFilters = () => {
    let filtered = [...milkRecords];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.quality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date range filter
    const now = new Date();
    let startDate, endDate;

    if (dateRange === 'today') {
      startDate = new Date(now.setHours(0, 0, 0, 0));
      endDate = new Date(now.setHours(23, 59, 59, 999));
    } else if (dateRange === 'week') {
      startDate = subDays(now, 7);
      endDate = new Date();
    } else if (dateRange === 'month') {
      startDate = subDays(now, 30);
      endDate = new Date();
    } else if (dateRange === 'custom') {
      startDate = customStartDate;
      endDate = customEndDate;
    }

    if (startDate && endDate) {
      filtered = filtered.filter(record => 
        isWithinInterval(record.date, { start: startDate, end: endDate })
      );
    }

    // Quality filter
    if (filterQuality !== 'all') {
      filtered = filtered.filter(record => record.quality === filterQuality);
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => b.date - a.date);

    setFilteredRecords(filtered);
  };

  const calculateStats = () => {
    const today = new Date();
    const todayStr = today.toDateString();
    
    const todayRecords = milkRecords.filter(r => r.date.toDateString() === todayStr);
    const todayTotal = todayRecords.reduce((sum, r) => sum + r.production, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayRecords = milkRecords.filter(r => r.date.toDateString() === yesterday.toDateString());
    const yesterdayTotal = yesterdayRecords.reduce((sum, r) => sum + r.production, 0);
    
    const percentChange = yesterdayTotal > 0 
      ? ((todayTotal - yesterdayTotal) / yesterdayTotal * 100).toFixed(1)
      : 0;

    const avgPerCow = todayRecords.length > 0 
      ? (todayTotal / todayRecords.reduce((sum, r) => sum + r.cowCount, 0) * 100).toFixed(1)
      : 0;

    const avgFat = milkRecords.reduce((sum, r) => sum + r.fat, 0) / milkRecords.length;
    const avgSnf = milkRecords.reduce((sum, r) => sum + r.snf, 0) / milkRecords.length;

    const qualityACount = milkRecords.filter(r => r.quality === 'A').length;
    const qualityAPercent = (qualityACount / milkRecords.length * 100).toFixed(0);

    setStats({
      todayTotal,
      yesterdayTotal,
      averagePerCow: avgPerCow,
      milkingCows: 85,
      monthlyTotal: 78500,
      lastMonthTotal: 70100,
      totalRevenue: todayTotal * 30, // Assuming ₹30 per liter
      avgFat: parseFloat(avgFat.toFixed(1)),
      avgSnf: parseFloat(avgSnf.toFixed(1)),
      qualityA: qualityAPercent,
      percentChange,
    });
  };

  const handleCalculatorChange = (field, value) => {
    const newData = { ...calculatorData, [field]: value };
    
    // Recalculate total
    const stateRate = stateMilkRates.find(s => s.state === newData.selectedState)?.rate || 48;
    const baseValue = newData.quantity * stateRate;
    
    // Calculate quality premium based on fat and SNF
    let qualityPremium = 0;
    if (newData.fat >= 4.5 && newData.snf >= 8.5) {
      qualityPremium = baseValue * 0.1; // 10% premium for premium quality
    } else if (newData.fat >= 4.0 && newData.snf >= 8.0) {
      qualityPremium = baseValue * 0.05; // 5% premium for good quality
    }
    
    newData.baseRate = stateRate;
    newData.totalValue = baseValue;
    newData.qualityPremium = qualityPremium;
    newData.finalAmount = baseValue + qualityPremium;
    
    setCalculatorData(newData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (mode, record = null) => {
    setDialogMode(mode);
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRecord(null);
    setOpenDialog(false);
  };

  const handleAddReading = () => {
    setSnackbar({
      open: true,
      message: 'Milk reading added successfully!',
      severity: 'success',
    });
    handleCloseDialog();
  };

  const handleRefresh = () => {
    setSnackbar({
      open: true,
      message: 'Data refreshed successfully!',
      severity: 'success',
    });
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'Time', 'Production (L)', 'Temperature (°C)', 'Fat %', 'SNF %', 'Cow Count', 'Quality'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(r => [
        format(r.date, 'yyyy-MM-dd'),
        r.time,
        r.production,
        r.temperature,
        r.fat,
        r.snf,
        r.cowCount,
        r.quality,
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `milk_production_${format(new Date(), 'yyyyMMdd')}.csv`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Report exported successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0'];

  // Prepare chart data
  const qualityData = [
    { name: 'Grade A', value: stats.qualityA },
    { name: 'Grade B', value: 100 - stats.qualityA },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Milk Production Management
        </Typography>
        <Box>
          <Tooltip title="Milk Rate Calculator">
            <Button
              variant="outlined"
              startIcon={<Calculate />}
              onClick={() => setCalculatorOpen(true)}
              sx={{ mr: 2 }}
            >
              Rate Calculator
            </Button>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton onClick={handleExport} sx={{ mr: 1 }}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton onClick={() => window.print()} sx={{ mr: 1 }}>
              <Print />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog('add')}
          >
            Add Reading
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Today's Total
                  </Typography>
                  <Typography variant="h4">{stats.todayTotal.toLocaleString()} L</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    {stats.percentChange >= 0 ? (
                      <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                    ) : (
                      <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
                    )}
                    <Typography 
                      variant="body2" 
                      color={stats.percentChange >= 0 ? 'success.main' : 'error.main'} 
                      ml={0.5}
                    >
                      {stats.percentChange}% vs yesterday
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <Opacity />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Average/Cow
                  </Typography>
                  <Typography variant="h4">{stats.averagePerCow} L</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                    <Typography variant="body2" color="success.main" ml={0.5}>
                      +1.2 L vs avg
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                  <Assessment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Avg. Quality
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4" mr={1}>{stats.avgFat}%</Typography>
                    <Chip label={`SNF ${stats.avgSnf}%`} size="small" />
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />
                    <Typography variant="body2" color="success.main" ml={0.5}>
                      Grade A: {stats.qualityA}%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <Assessment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Revenue (Today)
                  </Typography>
                  <Typography variant="h4">₹{(stats.todayTotal * 30).toLocaleString()}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                    <Typography variant="body2" color="success.main" ml={0.5}>
                      +12% vs yesterday
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <MonetizationOn />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Production Trend (Last 7 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={dailyProduction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="amount" fill="#2E7D32" name="Production (L)" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ff9800" name="Revenue (₹)" />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quality Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Hourly Records" />
          <Tab label="Daily Summary" />
          <Tab label="Cow Performance" />
          <Tab label="Quality Analysis" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">Last 7 Days</MenuItem>
                <MenuItem value="month">Last 30 Days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {dateRange === 'custom' && (
            <>
              <Grid item xs={12} md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={customStartDate}
                    onChange={setCustomStartDate}
                    renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={customEndDate}
                    onChange={setCustomEndDate}
                    renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </>
          )}
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Quality</InputLabel>
              <Select
                value={filterQuality}
                label="Quality"
                onChange={(e) => setFilterQuality(e.target.value)}
              >
                <MenuItem value="all">All Grades</MenuItem>
                <MenuItem value="A">Grade A</MenuItem>
                <MenuItem value="B">Grade B</MenuItem>
                <MenuItem value="C">Grade C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={dateRange === 'custom' ? 1 : 3}>
            <Button fullWidth variant="outlined" startIcon={<FilterList />}>
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Production (L)</TableCell>
                <TableCell>Temperature (°C)</TableCell>
                <TableCell>Fat %</TableCell>
                <TableCell>SNF %</TableCell>
                <TableCell>Cows</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow key={record.id} hover>
                    <TableCell>{format(record.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>{record.production} L</TableCell>
                    <TableCell>{record.temperature}°C</TableCell>
                    <TableCell>{record.fat}%</TableCell>
                    <TableCell>{record.snf}%</TableCell>
                    <TableCell>{record.cowCount}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`Grade ${record.quality}`} 
                        color={record.quality === 'A' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRecords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {tabValue === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Date</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Total Production</TableCell>
                <TableCell>Avg Fat</TableCell>
                <TableCell>Avg SNF</TableCell>
                <TableCell>Cows Milked</TableCell>
                <TableCell>Revenue</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyProduction.map((day, index) => (
                <TableRow key={index} hover>
                  <TableCell>{day.date}</TableCell>
                  <TableCell>{day.day}</TableCell>
                  <TableCell>{day.amount} L</TableCell>
                  <TableCell>{day.avgFat}%</TableCell>
                  <TableCell>{day.avgSnf}%</TableCell>
                  <TableCell>{day.cowCount}</TableCell>
                  <TableCell>₹{day.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 2 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Tag ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Breed</TableCell>
                <TableCell>Today (L)</TableCell>
                <TableCell>Average (L)</TableCell>
                <TableCell>Weekly (L)</TableCell>
                <TableCell>Monthly (L)</TableCell>
                <TableCell>Fat %</TableCell>
                <TableCell>Health</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cowProduction.map((cow) => (
                <TableRow key={cow.id} hover>
                  <TableCell>{cow.tagId}</TableCell>
                  <TableCell>{cow.name}</TableCell>
                  <TableCell>{cow.breed}</TableCell>
                  <TableCell>
                    <Typography color="success.main" fontWeight="bold">
                      {cow.today} L
                    </Typography>
                  </TableCell>
                  <TableCell>{cow.average} L</TableCell>
                  <TableCell>{cow.weekly} L</TableCell>
                  <TableCell>{cow.monthly} L</TableCell>
                  <TableCell>{cow.fat}%</TableCell>
                  <TableCell>
                    <Chip 
                      label={cow.health} 
                      color={cow.health === 'Excellent' ? 'success' : cow.health === 'Good' ? 'info' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Milk Quality Analysis
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Quality Parameters
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Average Fat Content" 
                        secondary={`${stats.avgFat}% (Standard: 4.0%)`}
                      />
                      <Chip label="Excellent" color="success" size="small" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Average SNF Content" 
                        secondary={`${stats.avgSnf}% (Standard: 8.5%)`}
                      />
                      <Chip label="Good" color="info" size="small" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Temperature Control" 
                        secondary="Consistently maintained at 4°C"
                      />
                      <Chip label="Optimal" color="success" size="small" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Quality Recommendations
                  </Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Your milk quality is above industry standards. Consider premium pricing.
                  </Alert>
                  <Alert severity="warning">
                    Monitor fat content in Jersey breed - currently at 5.2% (excellent)
                  </Alert>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* State-wise Milk Rates Table */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            State-wise Milk Rates in India
          </Typography>
          <Chip 
            icon={<PriceChange />}
            label="Rates updated daily"
            color="primary"
            variant="outlined"
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>State</TableCell>
                <TableCell>Base Rate (₹/L)</TableCell>
                <TableCell>Grade A (₹/L)</TableCell>
                <TableCell>Grade B (₹/L)</TableCell>
                <TableCell>Demand</TableCell>
                <TableCell>Trend</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateMilkRates.map((state, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <LocationOn sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                      {state.state}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">₹{state.rate}</Typography>
                  </TableCell>
                  <TableCell>₹{state.rateA1}</TableCell>
                  <TableCell>₹{state.rateA2}</TableCell>
                  <TableCell>
                    <Chip 
                      label={state.demand} 
                      color={state.demand === 'High' ? 'success' : state.demand === 'Medium' ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" color="success.main">
                        {state.trend}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={state.quality} 
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => {
                        setCalculatorData({
                          ...calculatorData,
                          selectedState: state.state,
                          baseRate: state.rate,
                        });
                        setCalculatorOpen(true);
                      }}
                    >
                      Calculate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Reading Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add Milk Reading' : 'Edit Milk Reading'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  defaultValue={new Date()}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Time</InputLabel>
                <Select label="Time" defaultValue="6 AM">
                  <MenuItem value="6 AM">6 AM</MenuItem>
                  <MenuItem value="10 AM">10 AM</MenuItem>
                  <MenuItem value="2 PM">2 PM</MenuItem>
                  <MenuItem value="6 PM">6 PM</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Production (L)"
                type="number"
                defaultValue=""
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Temperature (°C)"
                type="number"
                defaultValue="4.0"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fat %"
                type="number"
                step="0.1"
                defaultValue="4.5"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SNF %"
                type="number"
                step="0.1"
                defaultValue="8.5"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cow Count"
                type="number"
                defaultValue=""
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Quality Grade</InputLabel>
                <Select label="Quality Grade" defaultValue="A">
                  <MenuItem value="A">Grade A</MenuItem>
                  <MenuItem value="B">Grade B</MenuItem>
                  <MenuItem value="C">Grade C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddReading}>
            Save Reading
          </Button>
        </DialogActions>
      </Dialog>

      {/* Milk Rate Calculator Dialog */}
      <Dialog open={calculatorOpen} onClose={() => setCalculatorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Calculate sx={{ mr: 1 }} />
            Milk Rate Calculator
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Input Parameters
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select State</InputLabel>
                    <Select
                      value={calculatorData.selectedState}
                      label="Select State"
                      onChange={(e) => handleCalculatorChange('selectedState', e.target.value)}
                    >
                      {stateMilkRates.map(state => (
                        <MenuItem key={state.state} value={state.state}>
                          {state.state} (₹{state.rate}/L)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Quantity (Liters)"
                    type="number"
                    value={calculatorData.quantity}
                    onChange={(e) => handleCalculatorChange('quantity', parseFloat(e.target.value) || 0)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">L</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fat %"
                    type="number"
                    step="0.1"
                    value={calculatorData.fat}
                    onChange={(e) => handleCalculatorChange('fat', parseFloat(e.target.value) || 0)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SNF %"
                    type="number"
                    step="0.1"
                    value={calculatorData.snf}
                    onChange={(e) => handleCalculatorChange('snf', parseFloat(e.target.value) || 0)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Calculation Results
              </Typography>
              <Card sx={{ bgcolor: 'primary.light', mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Total Value
                  </Typography>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    ₹{calculatorData.finalAmount.toLocaleString()}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Base Rate" 
                        secondary={`${calculatorData.selectedState} - ₹${calculatorData.baseRate}/L`}
                      />
                      <Typography>₹{calculatorData.totalValue.toLocaleString()}</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Quality Premium" 
                        secondary="Based on fat & SNF content"
                      />
                      <Typography color="success.main">+₹{calculatorData.qualityPremium.toLocaleString()}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Final Amount" />
                      <Typography variant="h6">₹{calculatorData.finalAmount.toLocaleString()}</Typography>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
              <Alert severity="info">
                <Typography variant="body2">
                  Premium applies for fat ≥ 4.5% and SNF ≥ 8.5% (10% premium)
                  <br />
                  Good quality bonus for fat ≥ 4.0% and SNF ≥ 8.0% (5% premium)
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCalculatorOpen(false)}>Close</Button>
          <Button 
            variant="contained" 
            startIcon={<Download />}
            onClick={() => {
              // Download calculation as text
              const text = `Milk Rate Calculation
State: ${calculatorData.selectedState}
Quantity: ${calculatorData.quantity} L
Fat: ${calculatorData.fat}%
SNF: ${calculatorData.snf}%
Base Rate: ₹${calculatorData.baseRate}/L
Total Value: ₹${calculatorData.totalValue}
Quality Premium: ₹${calculatorData.qualityPremium}
Final Amount: ₹${calculatorData.finalAmount}`;
              
              const blob = new Blob([text], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `milk_calculation_${format(new Date(), 'yyyyMMdd_HHmm')}.txt`;
              a.click();
            }}
          >
            Save Calculation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MilkProduction;