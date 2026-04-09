import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  Checkbox,
  FormGroup,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Zoom,
  Grow,
  Slide,
  Collapse,
  Backdrop,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  // Main icons
  PictureAsPdf,
  TableChart,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline,
  ShowChart,
  Assessment,
  Download,
  Print,
  Share,
  Refresh,
  Delete,
  Edit,
  Visibility,
  Add,
  FilterList,
  Sort,
  CalendarToday,
  DateRange,
  CheckCircle,
  Cancel,
  Error,
  Warning,
  Info,
  Lightbulb,
  AutoAwesome,
  Science,
  Biotech,
  Analytics,
  Insights,
  Psychology,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  MonetizationOn,
  LocalHospital,
  Opacity,
  Inventory,
  Favorite,
  Agriculture,
  Grass,
  Pets,
  Store,
  ShoppingCart,
  LocalShipping,
  Warehouse,
  Savings,
  AccountBalance,
  Receipt,
  Payment,
  CreditCard,
  Calculate,
  CompareArrows,
  SwapHoriz,
  SwapVert,
  AllInclusive,
  Cached,
  Sync,
  Update,
  Pending,
  HourglassEmpty,
  HourglassFull,
  AccessTime,
  Schedule,
  Event,
  EventAvailable,
  EventBusy,
  History,
  ViewTimeline,
  PlayArrow,
  Pause,
  Stop,
  SkipNext,
  SkipPrevious,
  FastForward,
  FastRewind,
  Shuffle,
  Repeat,
  VolumeUp,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  Mic,
  MicOff,
  RadioButtonChecked,
  RadioButtonUnchecked,
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
  ToggleOn,
  ToggleOff,
  ExpandMore,
  ChevronRight,
  ChevronLeft,
  FirstPage,
  LastPage,
  ArrowUpward,
  ArrowDownward,
  ArrowBack,
  ArrowForward,
  ArrowDropDown,
  ArrowDropUp,
  MoreVert,
  MoreHoriz,
  Settings,
  Help,
  Feedback,
  BugReport,
  CloudDownload,
  CloudUpload,
  Backup,
  Restore,
  Link,
  LinkOff,
  Wifi,
  WifiOff,
  NotificationsActive,
  NotificationsOff,
  Alarm,
  AlarmOn,
  AlarmOff,
  Timer,
  TimerOff,
  Star,
  StarBorder,
  Bookmark,
  BookmarkBorder,
  Save,
  Close,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
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
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
  Sankey,
  Funnel,
  FunnelChart,
  LabelList,
  ReferenceLine,
  ReferenceArea,
  ReferenceDot,
  Brush,
  CartesianAxis,
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, differenceInDays } from 'date-fns';
import { CSVLink } from 'react-csv';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

// Mock data - Replace with API calls
const mockMilkData = [
  { date: '2024-01-01', production: 2450, revenue: 73500, cows: 82, fat: 4.2, snf: 8.5 },
  { date: '2024-01-02', production: 2520, revenue: 75600, cows: 83, fat: 4.3, snf: 8.6 },
  { date: '2024-01-03', production: 2480, revenue: 74400, cows: 82, fat: 4.1, snf: 8.4 },
  { date: '2024-01-04', production: 2600, revenue: 78000, cows: 84, fat: 4.4, snf: 8.7 },
  { date: '2024-01-05', production: 2550, revenue: 76500, cows: 83, fat: 4.2, snf: 8.5 },
  { date: '2024-01-06', production: 2700, revenue: 81000, cows: 85, fat: 4.5, snf: 8.8 },
  { date: '2024-01-07', production: 2650, revenue: 79500, cows: 84, fat: 4.3, snf: 8.6 },
  { date: '2024-01-08', production: 2580, revenue: 77400, cows: 83, fat: 4.2, snf: 8.5 },
  { date: '2024-01-09', production: 2620, revenue: 78600, cows: 84, fat: 4.4, snf: 8.7 },
  { date: '2024-01-10', production: 2680, revenue: 80400, cows: 85, fat: 4.3, snf: 8.6 },
];

const mockHealthData = [
  { category: 'Vaccinations', count: 45, cost: 2250, completed: 42, pending: 3 },
  { category: 'Treatments', count: 28, cost: 5600, completed: 22, pending: 6 },
  { category: 'Checkups', count: 32, cost: 1920, completed: 30, pending: 2 },
  { category: 'Surgeries', count: 8, cost: 3200, completed: 7, pending: 1 },
];

const mockBreedingData = [
  { month: 'Jan', inseminations: 15, pregnancies: 12, births: 8, success: 80 },
  { month: 'Feb', inseminations: 18, pregnancies: 15, births: 10, success: 83 },
  { month: 'Mar', inseminations: 22, pregnancies: 18, births: 14, success: 82 },
  { month: 'Apr', inseminations: 20, pregnancies: 16, births: 12, success: 80 },
  { month: 'May', inseminations: 25, pregnancies: 20, births: 16, success: 80 },
  { month: 'Jun', inseminations: 28, pregnancies: 22, births: 18, success: 79 },
];

const mockFinancialData = [
  { month: 'Jan', revenue: 125000, expenses: 85000, profit: 40000, margin: 32 },
  { month: 'Feb', revenue: 132000, expenses: 88000, profit: 44000, margin: 33 },
  { month: 'Mar', revenue: 148000, expenses: 92000, profit: 56000, margin: 38 },
  { month: 'Apr', revenue: 142000, expenses: 90000, profit: 52000, margin: 37 },
  { month: 'May', revenue: 156000, expenses: 95000, profit: 61000, margin: 39 },
  { month: 'Jun', revenue: 168000, expenses: 98000, profit: 70000, margin: 42 },
];

const mockInventoryData = [
  { item: 'Protein Concentrate', stock: 2500, reorderLevel: 2000, usage: 150, cost: 112500 },
  { item: 'Corn Silage', stock: 8500, reorderLevel: 3000, usage: 400, cost: 102000 },
  { item: 'Hay', stock: 4250, reorderLevel: 2500, usage: 300, cost: 106250 },
  { item: 'Mineral Mix', stock: 850, reorderLevel: 500, usage: 25, cost: 72250 },
  { item: 'Soybean Meal', stock: 3200, reorderLevel: 1500, usage: 200, cost: 176000 },
];

const reportTypes = [
  { value: 'milk', label: 'Milk Production Report', icon: <Opacity /> },
  { value: 'health', label: 'Health Records Report', icon: <LocalHospital /> },
  { value: 'breeding', label: 'Breeding Report', icon: <Favorite /> },
  { value: 'financial', label: 'Financial Report', icon: <MonetizationOn /> },
  { value: 'inventory', label: 'Inventory Report', icon: <Inventory /> },
  { value: 'comprehensive', label: 'Comprehensive Farm Report', icon: <Assessment /> },
];

const chartTypes = [
  { value: 'line', label: 'Line Chart', icon: <ShowChart /> },
  { value: 'bar', label: 'Bar Chart', icon: <BarChartIcon /> },
  { value: 'pie', label: 'Pie Chart', icon: <PieChartIcon /> },
  { value: 'area', label: 'Area Chart', icon: <Timeline /> },
  { value: 'composed', label: 'Composed Chart', icon: <CompareArrows /> },
];

const COLORS = ['#2E7D32', '#FFB74D', '#F44336', '#2196F3', '#9C27B0', '#FF9800', '#4CAF50', '#FF5722'];

function Reports() {
  const theme = useTheme();
  
  // State management
  const [reportType, setReportType] = useState('milk');
  const [dateRange, setDateRange] = useState('month');
  const [customStartDate, setCustomStartDate] = useState(startOfMonth(new Date()));
  const [customEndDate, setCustomEndDate] = useState(endOfMonth(new Date()));
  const [chartType, setChartType] = useState('line');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [groupBy, setGroupBy] = useState('day');
  
  const [generatedReports, setGeneratedReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data when report type or date range changes
  useEffect(() => {
    fetchReportData();
  }, [reportType, dateRange, customStartDate, customEndDate, groupBy]);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let data;
      let summary;
      
      // Calculate date range
      const { startDate, endDate } = getDateRange();
      
      switch(reportType) {
        case 'milk':
          data = filterDataByDate(mockMilkData, startDate, endDate);
          summary = calculateMilkSummary(data);
          break;
        case 'health':
          data = mockHealthData;
          summary = calculateHealthSummary(data);
          break;
        case 'breeding':
          data = filterDataByDate(mockBreedingData, startDate, endDate, 'month');
          summary = calculateBreedingSummary(data);
          break;
        case 'financial':
          data = filterDataByDate(mockFinancialData, startDate, endDate, 'month');
          summary = calculateFinancialSummary(data);
          break;
        case 'inventory':
          data = mockInventoryData;
          summary = calculateInventorySummary(data);
          break;
        case 'comprehensive':
          data = {
            milk: filterDataByDate(mockMilkData, startDate, endDate),
            health: mockHealthData,
            breeding: filterDataByDate(mockBreedingData, startDate, endDate, 'month'),
            financial: filterDataByDate(mockFinancialData, startDate, endDate, 'month'),
            inventory: mockInventoryData,
          };
          summary = calculateComprehensiveSummary(data);
          break;
        default:
          data = [];
      }
      
      setReportData({
        type: reportType,
        dateRange: { start: startDate, end: endDate },
        data,
        summary,
        generatedAt: new Date(),
      });
    } catch (err) {
      setError('Failed to fetch report data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDateRange = () => {
    const now = new Date();
    let startDate, endDate;
    
    switch(dateRange) {
      case 'today':
        startDate = startOfDay(now);
        endDate = endOfDay(now);
        break;
      case 'week':
        startDate = startOfWeek(now);
        endDate = endOfWeek(now);
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'quarter':
        startDate = subMonths(now, 3);
        endDate = now;
        break;
      case 'year':
        startDate = startOfYear(now);
        endDate = endOfYear(now);
        break;
      case 'custom':
        startDate = customStartDate;
        endDate = customEndDate;
        break;
      default:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
    }
    
    return { startDate, endDate };
  };

  const filterDataByDate = (data, startDate, endDate, dateKey = 'date') => {
    return data.filter(item => {
      const itemDate = new Date(item[dateKey]);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const calculateMilkSummary = (data) => {
    const totalProduction = data.reduce((sum, item) => sum + item.production, 0);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const avgProduction = data.length > 0 ? totalProduction / data.length : 0;
    const avgFat = data.reduce((sum, item) => sum + item.fat, 0) / data.length;
    const avgSnf = data.reduce((sum, item) => sum + item.snf, 0) / data.length;
    
    return {
      totalProduction,
      totalRevenue,
      avgProduction,
      avgFat: avgFat.toFixed(1),
      avgSnf: avgSnf.toFixed(1),
      days: data.length,
    };
  };

  const calculateHealthSummary = (data) => {
    const totalRecords = data.reduce((sum, item) => sum + item.count, 0);
    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    const completed = data.reduce((sum, item) => sum + item.completed, 0);
    const pending = data.reduce((sum, item) => sum + item.pending, 0);
    
    return {
      totalRecords,
      totalCost,
      completed,
      pending,
      completionRate: totalRecords > 0 ? (completed / totalRecords * 100).toFixed(1) : 0,
    };
  };

  const calculateBreedingSummary = (data) => {
    const totalInseminations = data.reduce((sum, item) => sum + item.inseminations, 0);
    const totalPregnancies = data.reduce((sum, item) => sum + item.pregnancies, 0);
    const totalBirths = data.reduce((sum, item) => sum + item.births, 0);
    const avgSuccess = data.reduce((sum, item) => sum + item.success, 0) / data.length;
    
    return {
      totalInseminations,
      totalPregnancies,
      totalBirths,
      avgSuccess: avgSuccess.toFixed(1),
      conceptionRate: totalInseminations > 0 ? (totalPregnancies / totalInseminations * 100).toFixed(1) : 0,
    };
  };

  const calculateFinancialSummary = (data) => {
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
    const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
    const avgMargin = data.reduce((sum, item) => sum + item.margin, 0) / data.length;
    
    return {
      totalRevenue,
      totalExpenses,
      totalProfit,
      avgMargin: avgMargin.toFixed(1),
      profitMargin: totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(1) : 0,
    };
  };

  const calculateInventorySummary = (data) => {
    const totalStock = data.reduce((sum, item) => sum + item.stock, 0);
    const totalValue = data.reduce((sum, item) => sum + item.cost, 0);
    const lowStock = data.filter(item => item.stock <= item.reorderLevel).length;
    const totalUsage = data.reduce((sum, item) => sum + item.usage, 0);
    
    return {
      totalStock,
      totalValue,
      lowStock,
      totalUsage,
      items: data.length,
    };
  };

  const calculateComprehensiveSummary = (data) => {
    return {
      milk: calculateMilkSummary(data.milk),
      health: calculateHealthSummary(data.health),
      breeding: calculateBreedingSummary(data.breeding),
      financial: calculateFinancialSummary(data.financial),
      inventory: calculateInventorySummary(data.inventory),
    };
  };

  const handleGenerateReport = () => {
    if (!reportData) return;
    
    const newReport = {
      id: Date.now(),
      ...reportData,
      name: `${reportTypes.find(r => r.value === reportType)?.label} - ${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
      format: exportFormat,
      favorite: false,
    };
    
    setGeneratedReports([newReport, ...generatedReports]);
    setCurrentReport(newReport);
    setSnackbar({
      open: true,
      message: 'Report generated successfully!',
      severity: 'success',
    });
  };

  const handleExportPDF = async (report) => {
    setLoading(true);
    try {
      const element = document.getElementById('report-preview');
      if (!element) return;
      
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${report?.name || 'report'}.pdf`);
      
      setSnackbar({
        open: true,
        message: 'PDF exported successfully!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to export PDF',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleExportExcel = (report) => {
    try {
      const data = report?.data || reportData?.data;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      XLSX.writeFile(wb, `${report?.name || 'report'}.xlsx`);
      
      setSnackbar({
        open: true,
        message: 'Excel file exported successfully!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to export Excel',
        severity: 'error',
      });
    }
  };

  const handleExportCSV = (report) => {
    const data = report?.data || reportData?.data;
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(item => Object.values(item).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report?.name || 'report'}.csv`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'CSV file exported successfully!',
      severity: 'success',
    });
  };

  const handleShare = async (report) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: report?.name || 'Farm Report',
          text: `Check out this farm report from ${format(report?.generatedAt || new Date(), 'PPP')}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: 'Link copied to clipboard!',
        severity: 'success',
      });
    }
  };

  const handleDeleteReport = (reportId) => {
    setGeneratedReports(generatedReports.filter(r => r.id !== reportId));
    setSnackbar({
      open: true,
      message: 'Report deleted successfully!',
      severity: 'success',
    });
  };

  const handleToggleFavorite = (reportId) => {
    setGeneratedReports(generatedReports.map(r => 
      r.id === reportId ? { ...r, favorite: !r.favorite } : r
    ));
  };

  const handlePreview = (report) => {
    setSelectedReport(report);
    setOpenPreview(true);
  };

  const handleSaveReport = () => {
    setSnackbar({
      open: true,
      message: 'Report saved successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderChart = () => {
    if (!reportData?.data) return null;
    
    const data = reportData.data;
    
    switch(chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={reportType === 'milk' ? 'date' : reportType === 'breeding' ? 'month' : 'month'} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {reportType === 'milk' && (
                <>
                  <Line type="monotone" dataKey="production" stroke="#2E7D32" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#FFB74D" strokeWidth={2} />
                </>
              )}
              {reportType === 'breeding' && (
                <>
                  <Line type="monotone" dataKey="inseminations" stroke="#2196F3" strokeWidth={2} />
                  <Line type="monotone" dataKey="pregnancies" stroke="#4CAF50" strokeWidth={2} />
                  <Line type="monotone" dataKey="births" stroke="#FF9800" strokeWidth={2} />
                </>
              )}
              {reportType === 'financial' && (
                <>
                  <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#F44336" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#2196F3" strokeWidth={2} />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={reportType === 'milk' ? 'date' : reportType === 'breeding' ? 'month' : 'month'} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {reportType === 'milk' && <Bar dataKey="production" fill="#2E7D32" />}
              {reportType === 'health' && <Bar dataKey="count" fill="#2196F3" />}
              {reportType === 'breeding' && (
                <>
                  <Bar dataKey="inseminations" fill="#2196F3" />
                  <Bar dataKey="pregnancies" fill="#4CAF50" />
                  <Bar dataKey="births" fill="#FF9800" />
                </>
              )}
              {reportType === 'financial' && (
                <>
                  <Bar dataKey="revenue" fill="#4CAF50" />
                  <Bar dataKey="expenses" fill="#F44336" />
                </>
              )}
              {reportType === 'inventory' && <Bar dataKey="stock" fill="#9C27B0" />}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={reportType === 'health' ? data : data.map((item, index) => ({
                  name: item.category || item.month || item.item,
                  value: item.count || item.production || item.revenue || item.stock,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={reportType === 'milk' ? 'date' : reportType === 'breeding' ? 'month' : 'month'} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {reportType === 'milk' && (
                <Area type="monotone" dataKey="production" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.3} />
              )}
              {reportType === 'financial' && (
                <>
                  <Area type="monotone" dataKey="revenue" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="expenses" stroke="#F44336" fill="#F44336" fillOpacity={0.3} />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={reportType === 'milk' ? 'date' : reportType === 'breeding' ? 'month' : 'month'} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {reportType === 'milk' && (
                <>
                  <Bar dataKey="production" fill="#2E7D32" />
                  <Line type="monotone" dataKey="revenue" stroke="#FFB74D" strokeWidth={2} />
                </>
              )}
              {reportType === 'financial' && (
                <>
                  <Bar dataKey="revenue" fill="#4CAF50" />
                  <Bar dataKey="expenses" fill="#F44336" />
                  <Line type="monotone" dataKey="profit" stroke="#2196F3" strokeWidth={2} />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Reports & Analytics
        </Typography>
        <Box>
          <Tooltip title="Refresh">
            <IconButton onClick={fetchReportData} sx={{ mr: 1 }}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Saved Reports">
            <IconButton onClick={() => setTabValue(1)} sx={{ mr: 1 }}>
              <Save />
            </IconButton>
          </Tooltip>
          <Tooltip title="Help">
            <IconButton sx={{ mr: 1 }}>
              <Help />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Report Generator" icon={<Assessment />} iconPosition="start" />
          <Tab label="Saved Reports" icon={<Save />} iconPosition="start" />
          <Tab label="Analytics" icon={<Analytics />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Report Generator Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Report Configuration */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Report Configuration
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    {reportTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box display="flex" alignItems="center">
                          {type.icon}
                          <Typography ml={1}>{type.label}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="week">This Week</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="quarter">Last 3 Months</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>

                {dateRange === 'custom' && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <DatePicker
                          label="Start Date"
                          value={customStartDate}
                          onChange={setCustomStartDate}
                          renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          label="End Date"
                          value={customEndDate}
                          onChange={setCustomEndDate}
                          renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                        />
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                )}

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Chart Type</InputLabel>
                  <Select
                    value={chartType}
                    label="Chart Type"
                    onChange={(e) => setChartType(e.target.value)}
                  >
                    {chartTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box display="flex" alignItems="center">
                          {type.icon}
                          <Typography ml={1}>{type.label}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Group By</InputLabel>
                  <Select
                    value={groupBy}
                    label="Group By"
                    onChange={(e) => setGroupBy(e.target.value)}
                  >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Export Format</InputLabel>
                  <Select
                    value={exportFormat}
                    label="Export Format"
                    onChange={(e) => setExportFormat(e.target.value)}
                  >
                    <MenuItem value="pdf">PDF Document</MenuItem>
                    <MenuItem value="excel">Excel Spreadsheet</MenuItem>
                    <MenuItem value="csv">CSV File</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Include in Report
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={includeCharts} onChange={(e) => setIncludeCharts(e.target.checked)} />}
                    label="Charts"
                  />
                  <FormControlLabel
                    control={<Switch checked={includeTables} onChange={(e) => setIncludeTables(e.target.checked)} />}
                    label="Data Tables"
                  />
                  <FormControlLabel
                    control={<Switch checked={includeSummary} onChange={(e) => setIncludeSummary(e.target.checked)} />}
                    label="Summary Statistics"
                  />
                </FormGroup>

                <Box sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleGenerateReport}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Generate Report'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Report Preview */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }} id="report-preview">
              {loading ? (
                <Box textAlign="center" py={4}>
                  <CircularProgress />
                  <Typography sx={{ mt: 2 }}>Generating report...</Typography>
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : reportData ? (
                <>
                  {/* Report Header */}
                  <Box mb={3}>
                    <Typography variant="h5" gutterBottom>
                      {reportTypes.find(r => r.value === reportType)?.label}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Period: {format(reportData.dateRange.start, 'PPP')} - {format(reportData.dateRange.end, 'PPP')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Generated: {format(reportData.generatedAt, 'PPP pp')}
                    </Typography>
                  </Box>

                  {/* Summary Statistics */}
                  {includeSummary && reportData.summary && (
                    <Box mb={4}>
                      <Typography variant="h6" gutterBottom>
                        Summary Statistics
                      </Typography>
                      <Grid container spacing={2}>
                        {reportType === 'milk' && (
                          <>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Total Production
                                  </Typography>
                                  <Typography variant="h6">
                                    {reportData.summary.totalProduction.toLocaleString()} L
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Total Revenue
                                  </Typography>
                                  <Typography variant="h6">
                                    ${reportData.summary.totalRevenue.toLocaleString()}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Average Daily
                                  </Typography>
                                  <Typography variant="h6">
                                    {Math.round(reportData.summary.avgProduction)} L
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Quality (Fat/SNF)
                                  </Typography>
                                  <Typography variant="h6">
                                    {reportData.summary.avgFat}% / {reportData.summary.avgSnf}%
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </>
                        )}

                        {reportType === 'financial' && (
                          <>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Total Revenue
                                  </Typography>
                                  <Typography variant="h6" color="success.main">
                                    ${reportData.summary.totalRevenue.toLocaleString()}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Total Expenses
                                  </Typography>
                                  <Typography variant="h6" color="error.main">
                                    ${reportData.summary.totalExpenses.toLocaleString()}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Net Profit
                                  </Typography>
                                  <Typography variant="h6" color="primary.main">
                                    ${reportData.summary.totalProfit.toLocaleString()}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Profit Margin
                                  </Typography>
                                  <Typography variant="h6">
                                    {reportData.summary.profitMargin}%
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </>
                        )}

                        {reportType === 'health' && (
                          <>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Total Records
                                  </Typography>
                                  <Typography variant="h6">
                                    {reportData.summary.totalRecords}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Total Cost
                                  </Typography>
                                  <Typography variant="h6">
                                    ${reportData.summary.totalCost.toLocaleString()}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Completed
                                  </Typography>
                                  <Typography variant="h6" color="success.main">
                                    {reportData.summary.completed}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography color="textSecondary" gutterBottom>
                                    Completion Rate
                                  </Typography>
                                  <Typography variant="h6">
                                    {reportData.summary.completionRate}%
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  )}

                  {/* Chart */}
                  {includeCharts && renderChart()}

                  {/* Data Table */}
                  {includeTables && (
                    <Box mt={4}>
                      <Typography variant="h6" gutterBottom>
                        Data Details
                      </Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              {reportData.data[0] && Object.keys(reportData.data[0]).map(key => (
                                <TableCell key={key}>
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {reportData.data.map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value, i) => (
                                  <TableCell key={i}>
                                    {typeof value === 'number' && value > 1000 
                                      ? value.toLocaleString() 
                                      : value}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}

                  {/* Export Actions */}
                  <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
                    <Button
                      variant="outlined"
                      startIcon={<Save />}
                      onClick={handleSaveReport}
                    >
                      Save Report
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => handleShare(currentReport)}
                    >
                      Share
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      onClick={() => {
                        if (exportFormat === 'pdf') handleExportPDF(currentReport);
                        else if (exportFormat === 'excel') handleExportExcel(currentReport);
                        else handleExportCSV(currentReport);
                      }}
                    >
                      Export as {exportFormat.toUpperCase()}
                    </Button>
                  </Box>
                </>
              ) : (
                <Box textAlign="center" py={4}>
                  <Assessment sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No report generated yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure your report settings and click "Generate Report"
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Saved Reports Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6">
                  Saved Reports
                </Typography>
                <TextField
                  size="small"
                  placeholder="Search reports..."
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
              </Box>

              {generatedReports.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Report Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Date Range</TableCell>
                        <TableCell>Generated</TableCell>
                        <TableCell>Format</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {generatedReports
                        .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((report) => (
                          <TableRow key={report.id} hover>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                {report.favorite && <Star sx={{ color: 'warning.main', mr: 1, fontSize: 20 }} />}
                                {report.name}
                              </Box>
                            </TableCell>
                            <TableCell>
                              {reportTypes.find(t => t.value === report.type)?.label}
                            </TableCell>
                            <TableCell>
                              {format(report.dateRange.start, 'MMM dd')} - {format(report.dateRange.end, 'MMM dd')}
                            </TableCell>
                            <TableCell>
                              {format(report.generatedAt, 'MMM dd, yyyy HH:mm')}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={report.format.toUpperCase()} 
                                size="small"
                                color={report.format === 'pdf' ? 'error' : report.format === 'excel' ? 'success' : 'info'}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Preview">
                                <IconButton size="small" onClick={() => handlePreview(report)}>
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Download">
                                <IconButton size="small" onClick={() => {
                                  if (report.format === 'pdf') handleExportPDF(report);
                                  else if (report.format === 'excel') handleExportExcel(report);
                                  else handleExportCSV(report);
                                }}>
                                  <Download />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Share">
                                <IconButton size="small" onClick={() => handleShare(report)}>
                                  <Share />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={report.favorite ? 'Remove from favorites' : 'Add to favorites'}>
                                <IconButton size="small" onClick={() => handleToggleFavorite(report.id)}>
                                  {report.favorite ? <Star color="warning" /> : <StarBorder />}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => handleDeleteReport(report.id)}>
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
                    count={generatedReports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                <Box textAlign="center" py={4}>
                  <Save sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No saved reports yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Generate a report and save it to see it here
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Analytics Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#2196F3" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Health Records Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockHealthData}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {mockHealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Key Performance Indicators
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Average Daily Milk
                        </Typography>
                        <Typography variant="h4">2,580 L</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <TrendingUp color="success" fontSize="small" />
                          <Typography variant="body2" color="success.main" ml={0.5}>
                            +8.2% vs last month
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Conception Rate
                        </Typography>
                        <Typography variant="h4">82%</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <TrendingUp color="success" fontSize="small" />
                          <Typography variant="body2" color="success.main" ml={0.5}>
                            +3.5% vs last month
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Profit Margin
                        </Typography>
                        <Typography variant="h4">35.2%</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <TrendingUp color="success" fontSize="small" />
                          <Typography variant="body2" color="success.main" ml={0.5}>
                            +2.1% vs last month
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Inventory Turnover
                        </Typography>
                        <Typography variant="h4">12.5</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <TrendingUp color="success" fontSize="small" />
                          <Typography variant="body2" color="success.main" ml={0.5}>
                            +1.2 vs last month
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Report Preview Dialog */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{selectedReport?.name}</Typography>
            <IconButton onClick={() => setOpenPreview(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedReport && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Generated: {format(selectedReport.generatedAt, 'PPP pp')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              {/* Summary */}
              {selectedReport.summary && (
                <Box mb={3}>
                  <Typography variant="h6" gutterBottom>
                    Summary
                  </Typography>
                  <pre style={{ fontFamily: 'inherit' }}>
                    {JSON.stringify(selectedReport.summary, null, 2)}
                  </pre>
                </Box>
              )}

              {/* Data Table */}
              <Typography variant="h6" gutterBottom>
                Data
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {selectedReport.data[0] && Object.keys(selectedReport.data[0]).map(key => (
                        <TableCell key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedReport.data.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i}>
                            {typeof value === 'number' && value > 1000 
                              ? value.toLocaleString() 
                              : value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => {
              if (selectedReport?.format === 'pdf') handleExportPDF(selectedReport);
              else if (selectedReport?.format === 'excel') handleExportExcel(selectedReport);
              else handleExportCSV(selectedReport);
            }}
          >
            Download
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

export default Reports;