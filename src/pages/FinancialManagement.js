import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  Alert,
  Snackbar,
  Tooltip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Download,
  Print,
  Edit,
  Delete,
  Visibility,
  Receipt,
  Payment,
  ShoppingCart,
  LocalAtm,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  DateRange,
  Category,
  Description,
  AttachMoney,
  MonetizationOn,
  BarChart as BarChartIcon, // Renamed this import
  PieChart as PieChartIcon,
  CalendarToday,
  CheckCircle,
  Warning,
  FileCopy,
  GetApp,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart, // This is from recharts - it's fine
  Bar,
  PieChart,
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
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subDays, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

// Rest of your code remains exactly the same from here...
// (All the component logic, state, functions, and JSX remain unchanged)

// Mock data - replace with API calls
const initialTransactions = [
  {
    id: 1,
    date: new Date(2024, 0, 15),
    type: 'income',
    category: 'Milk Sales',
    description: 'Daily milk collection - Morning batch',
    amount: 12500,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'INV-2024-001',
    customer: 'Dairy Coop',
  },
  {
    id: 2,
    date: new Date(2024, 0, 15),
    type: 'expense',
    category: 'Feed',
    description: 'Protein supplement purchase',
    amount: 3500,
    paymentMethod: 'Cash',
    status: 'completed',
    reference: 'EXP-2024-001',
    vendor: 'AgriSupply',
  },
  {
    id: 3,
    date: new Date(2024, 0, 14),
    type: 'income',
    category: 'Cattle Sales',
    description: 'Sold 2 calves',
    amount: 45000,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'INV-2024-002',
    customer: 'Farmer John',
  },
  {
    id: 4,
    date: new Date(2024, 0, 14),
    type: 'expense',
    category: 'Veterinary',
    description: 'Vaccination supplies',
    amount: 2800,
    paymentMethod: 'Credit Card',
    status: 'completed',
    reference: 'EXP-2024-002',
    vendor: 'VetCare',
  },
  {
    id: 5,
    date: new Date(2024, 0, 13),
    type: 'expense',
    category: 'Equipment',
    description: 'Milking machine maintenance',
    amount: 5200,
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    reference: 'EXP-2024-003',
    vendor: 'FarmTech',
  },
  {
    id: 6,
    date: new Date(2024, 0, 13),
    type: 'income',
    category: 'Milk Sales',
    description: 'Daily milk collection - Evening batch',
    amount: 11800,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'INV-2024-003',
    customer: 'Dairy Coop',
  },
  {
    id: 7,
    date: new Date(2024, 0, 12),
    type: 'expense',
    category: 'Utilities',
    description: 'Electricity bill',
    amount: 1800,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'EXP-2024-004',
    vendor: 'Power Corp',
  },
  {
    id: 8,
    date: new Date(2024, 0, 12),
    type: 'income',
    category: 'Other',
    description: 'Manure sales',
    amount: 2200,
    paymentMethod: 'Cash',
    status: 'completed',
    reference: 'INV-2024-004',
    customer: 'Green Farms',
  },
  {
    id: 9,
    date: new Date(2024, 0, 11),
    type: 'expense',
    category: 'Labor',
    description: 'Monthly wages',
    amount: 15000,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'EXP-2024-005',
    vendor: 'Staff',
  },
  {
    id: 10,
    date: new Date(2024, 0, 11),
    type: 'income',
    category: 'Milk Sales',
    description: 'Bulk order - Cheese factory',
    amount: 22000,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'INV-2024-005',
    customer: 'Cheese Factory',
  },
  {
    id: 11,
    date: new Date(2024, 0, 10),
    type: 'expense',
    category: 'Feed',
    description: 'Hay purchase',
    amount: 4200,
    paymentMethod: 'Cash',
    status: 'completed',
    reference: 'EXP-2024-006',
    vendor: 'Hay Supplier',
  },
  {
    id: 12,
    date: new Date(2024, 0, 10),
    type: 'income',
    category: 'Breeding',
    description: 'AI service fee',
    amount: 3500,
    paymentMethod: 'Cash',
    status: 'pending',
    reference: 'INV-2024-006',
    customer: 'Local Farmer',
  },
];

const categories = {
  income: ['Milk Sales', 'Cattle Sales', 'Breeding', 'Other'],
  expense: ['Feed', 'Veterinary', 'Equipment', 'Utilities', 'Labor', 'Transport', 'Other'],
};

const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Check', 'Online Payment'];

function FinancialManagement() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState('month');
  const [customStartDate, setCustomStartDate] = useState(startOfMonth(new Date()));
  const [customEndDate, setCustomEndDate] = useState(endOfMonth(new Date()));
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
    pendingInvoices: 0,
    monthlyAverage: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    applyFilters();
    calculateStats();
    prepareChartData();
  }, [transactions, searchTerm, tabValue, dateRange, customStartDate, customEndDate, filterType, filterCategory, filterStatus]);

  const applyFilters = () => {
    let filtered = [...transactions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.customer && t.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.vendor && t.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
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
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
    } else if (dateRange === 'quarter') {
      startDate = subMonths(now, 3);
      endDate = new Date();
    } else if (dateRange === 'year') {
      startDate = subMonths(now, 12);
      endDate = new Date();
    } else if (dateRange === 'custom') {
      startDate = customStartDate;
      endDate = customEndDate;
    }

    if (startDate && endDate) {
      filtered = filtered.filter(t => 
        isWithinInterval(t.date, { start: startDate, end: endDate })
      );
    }

    // Tab filter (type)
    if (tabValue === 0) {
      // All transactions
    } else if (tabValue === 1) {
      filtered = filtered.filter(t => t.type === 'income');
    } else if (tabValue === 2) {
      filtered = filtered.filter(t => t.type === 'expense');
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => b.date - a.date);

    setFilteredTransactions(filtered);
  };

  const calculateStats = () => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingInvoices = filteredTransactions
      .filter(t => t.status === 'pending')
      .length;

    const netProfit = totalIncome - totalExpense;
    const monthlyAverage = filteredTransactions.length > 0 
      ? (totalIncome + totalExpense) / filteredTransactions.length 
      : 0;

    setStats({
      totalIncome,
      totalExpense,
      netProfit,
      pendingInvoices,
      monthlyAverage,
    });
  };

  const prepareChartData = () => {
    // Prepare daily data for the last 30 days
    const dailyData = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      const dayTransactions = filteredTransactions.filter(t => 
        t.date.toDateString() === date.toDateString()
      );
      
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      dailyData.push({
        date: format(date, 'MMM dd'),
        income,
        expense,
        profit: income - expense,
      });
    }
    setChartData(dailyData);

    // Prepare category data for pie chart
    const categoryMap = new Map();
    filteredTransactions.forEach(t => {
      const key = `${t.type} - ${t.category}`;
      categoryMap.set(key, (categoryMap.get(key) || 0) + t.amount);
    });

    const categoryArray = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
    setCategoryData(categoryArray);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (mode, transaction = null) => {
    setDialogMode(mode);
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTransaction(null);
    setOpenDialog(false);
  };

  const handleSaveTransaction = (transactionData) => {
    if (dialogMode === 'edit' && selectedTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(t => 
        t.id === selectedTransaction.id ? { ...t, ...transactionData } : t
      ));
      setSnackbar({
        open: true,
        message: 'Transaction updated successfully!',
        severity: 'success',
      });
    } else if (dialogMode === 'add') {
      // Create new transaction
      const newTransaction = {
        id: transactions.length + 1,
        ...transactionData,
        date: new Date(),
        reference: `TRX-${String(transactions.length + 1).padStart(4, '0')}`,
      };
      setTransactions([newTransaction, ...transactions]);
      setSnackbar({
        open: true,
        message: 'Transaction added successfully!',
        severity: 'success',
      });
    }
    handleCloseDialog();
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions(transactions.filter(t => t.id !== transactionId));
    setSnackbar({
      open: true,
      message: 'Transaction deleted successfully!',
      severity: 'success',
    });
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Payment Method', 'Status', 'Reference'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [
        format(t.date, 'yyyy-MM-dd'),
        t.type,
        t.category,
        `"${t.description}"`,
        t.amount,
        t.paymentMethod,
        t.status,
        t.reference,
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial_report_${format(new Date(), 'yyyyMMdd')}.csv`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Report exported successfully!',
      severity: 'success',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type) => {
    return type === 'income' ? 'success' : 'error';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#795548'];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Financial Management
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
            sx={{ mr: 2 }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrint}
            sx={{ mr: 2 }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog('add')}
          >
            Add Transaction
          </Button>
        </Box>
      </Box>

      {/* Financial Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Income
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {formatCurrency(stats.totalIncome)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <TrendingUp />
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
                    Total Expenses
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {formatCurrency(stats.totalExpense)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <TrendingDown />
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
                    Net Profit
                  </Typography>
                  <Typography 
                    variant="h4" 
                    color={stats.netProfit >= 0 ? 'success.main' : 'error.main'}
                  >
                    {formatCurrency(stats.netProfit)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: stats.netProfit >= 0 ? 'success.main' : 'error.main' }}>
                  <AccountBalance />
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
                    Pending Invoices
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.pendingInvoices}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Receipt />
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
              Income vs Expenses (Last 30 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1"
                  stroke="#4caf50" 
                  fill="#4caf50" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="expense" 
                  stackId="1"
                  stroke="#f44336" 
                  fill="#f44336" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              By Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All Transactions" />
          <Tab label="Income" />
          <Tab label="Expenses" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search transactions..."
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
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">Last 3 Months</MenuItem>
                <MenuItem value="year">Last 12 Months</MenuItem>
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
          <Grid item xs={12} md={dateRange === 'custom' ? 1 : 2}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {filterType !== 'all' ? (
                  categories[filterType].map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))
                ) : (
                  <>
                    {categories.income.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat} (Income)</MenuItem>
                    ))}
                    {categories.expense.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat} (Expense)</MenuItem>
                    ))}
                  </>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Transactions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{format(transaction.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={getTypeColor(transaction.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Tooltip title={transaction.description}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {transaction.description}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                      fontWeight="bold"
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.reference}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog('view', transaction)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog('edit', transaction)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Transaction Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'add' && 'Add New Transaction'}
          {dialogMode === 'edit' && 'Edit Transaction'}
          {dialogMode === 'view' && 'Transaction Details'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedTransaction && dialogMode === 'view' ? (
            // View Mode
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">{selectedTransaction.description}</Typography>
                  <Chip
                    label={selectedTransaction.type}
                    color={getTypeColor(selectedTransaction.type)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="h4" color={selectedTransaction.type === 'income' ? 'success.main' : 'error.main'}>
                  {selectedTransaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(selectedTransaction.amount)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedTransaction.status}
                  color={getStatusColor(selectedTransaction.status)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date
                </Typography>
                <Typography>{format(selectedTransaction.date, 'PPPP')}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Category
                </Typography>
                <Typography>{selectedTransaction.category}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography>{selectedTransaction.paymentMethod}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Reference
                </Typography>
                <Typography>{selectedTransaction.reference}</Typography>
              </Grid>
              {selectedTransaction.customer && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Customer
                  </Typography>
                  <Typography>{selectedTransaction.customer}</Typography>
                </Grid>
              )}
              {selectedTransaction.vendor && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Vendor
                  </Typography>
                  <Typography>{selectedTransaction.vendor}</Typography>
                </Grid>
              )}
            </Grid>
          ) : (
            // Add/Edit Mode
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    label="Transaction Type"
                    defaultValue={selectedTransaction?.type || ''}
                  >
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    defaultValue={selectedTransaction?.category || ''}
                  >
                    {categories.income.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                    {categories.expense.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  defaultValue={selectedTransaction?.description || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  defaultValue={selectedTransaction?.amount || ''}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    label="Payment Method"
                    defaultValue={selectedTransaction?.paymentMethod || ''}
                  >
                    {paymentMethods.map(method => (
                      <MenuItem key={method} value={method}>{method}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={selectedTransaction?.status || ''}
                  >
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer/Vendor"
                  defaultValue={selectedTransaction?.customer || selectedTransaction?.vendor || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    defaultValue={selectedTransaction?.date || new Date()}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {dialogMode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {dialogMode !== 'view' && (
            <Button 
              variant="contained" 
              onClick={() => handleSaveTransaction({})}
            >
              {dialogMode === 'add' ? 'Add Transaction' : 'Save Changes'}
            </Button>
          )}
          {dialogMode === 'view' && (
            <>
              <Button 
                variant="outlined" 
                startIcon={<FileCopy />}
                onClick={() => handleOpenDialog('add', selectedTransaction)}
              >
                Duplicate
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Print />}
                onClick={handlePrint}
              >
                Print
              </Button>
            </>
          )}
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

export default FinancialManagement;