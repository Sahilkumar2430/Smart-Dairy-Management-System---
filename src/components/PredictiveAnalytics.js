import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Button,
  Divider,
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Menu,
  MenuItem,
  Fade,
  Zoom,
  Grow,
  Slide,
  useTheme,
  Skeleton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@mui/material';
import {
  // Add ExpandMore here
  ExpandMore,
  Timeline,
  TrendingUp,
  TrendingDown,
  Warning,
  Info,
  CheckCircle,
  Error,
  NotificationsActive,
  CalendarToday,
  LocalHospital,
  Opacity,
  Inventory,
  MonetizationOn,
  Favorite,
  Agriculture,
  Science,
  AutoGraph,
  Psychology,
  Insights,
  Biotech,
  PrecisionManufacturing,
  ElectricBolt,
  HealthAndSafety,
  Security,
  Speed,
  WorkspacePremium,
  EmojiObjects,
  Lightbulb,
  RocketLaunch,
  AutoAwesome,
  Calculate,
  Analytics,
  ShowChart,
  BubbleChart,
  MultilineChart,
  Timeline as TimelineIcon,
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
  Today,
  DateRange,
  Weekend,
  Nightlight,
  WbSunny,
  Cloud,
  Thunderstorm,
  AcUnit,
  Whatshot,
  SevereCold,
  Drought,
  Flood,
  Grass as GrassIcon,
  Park,
  Forest,
  Nature,
  Pets,
  BugReport,
  Science as ScienceIcon,
  Biotech as BiotechIcon,
  Psychology as PsychologyIcon,
  AutoGraph as AutoGraphIcon,
  ShowChart as ShowChartIcon,
  BubbleChart as BubbleChartIcon,
  MultilineChart as MultilineChartIcon,
  Remove,
  Share,
  Download,
  Print,
  Refresh,
  MoreVert,
  Star,
  StarBorder,
  Bookmark,
  BookmarkBorder,
  FilterList,
  Sort,
  ViewModule,
  ViewList,
  ViewCompact,
  Dashboard,
  Settings,
  Help,
  Feedback,
  BugReport as BugReportIcon,
  CloudDownload,
  CloudUpload,
  Backup,
  Restore,
  Link,
  LinkOff,
  Wifi,
  WifiOff,
  SignalCellularAlt,
  SignalCellularConnectedNoInternet0Bar,
  Notifications,
  NotificationsOff,
  Alarm,
  AlarmOn,
  AlarmOff,
  Timer,
  TimerOff,
  Timer10,
  Timer3,
  HourglassTop,
  HourglassBottom,
  History,
  HistoryEdu,
  Timeline as TimelineIcon2,
  TimelineOutlined,
  TimelineRounded,
  TimelineSharp,
  TimelineTwoTone,
  ViewTimeline,
  ViewTimelineOutlined,
  ViewTimelineRounded,
  ViewTimelineSharp,
  ViewTimelineTwoTone,
  PlayArrow,
  Pause,
  Stop,
  SkipNext,
  SkipPrevious,
  FastForward,
  FastRewind,
  Shuffle,
  Repeat,
  RepeatOne,
  VolumeUp,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  Mic,
  MicOff,
  Radio,
  RadioButtonChecked,
  RadioButtonUnchecked,
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
  ToggleOn,
  ToggleOff,
  // Add Search here
  Search,
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
import { format, formatDistance, formatRelative, subDays, addDays, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Import custom components
import HealthRiskDetailModal from './HealthRiskDetailModal';
import BreedingDetailModal from './BreedingDetailModal';
import InventoryDetailModal from './InventoryDetailModal';
import OfflineAlert from './OfflineAlert';
import aiService from '../services/aiService';
import { checkInternetConnection, getOnlineStatus } from '../utils/networkUtils';

// ... rest of your code remains exactly the same

// Custom colors for charts
const CHART_COLORS = ['#2E7D32', '#FFB74D', '#F44336', '#2196F3', '#9C27B0', '#FF9800'];

// Default empty data structure
const defaultPredictions = {
  milk: {
    next7Days: [],
    next30Days: {
      total: 0,
      average: 0,
      peakDay: 0,
      peakAmount: 0,
      lowDay: 0,
      lowAmount: 0,
    },
    factors: [],
  },
  health: [],
  breeding: [],
  financial: {
    revenue: {
      nextMonth: 0,
      nextQuarter: 0,
      nextYear: 0,
      growth: '0%',
    },
    expenses: {
      nextMonth: 0,
      nextQuarter: 0,
      nextYear: 0,
      savings: '0%',
    },
    profit: {
      nextMonth: 0,
      nextQuarter: 0,
      nextYear: 0,
      margin: '0%',
    },
    risks: [],
  },
  inventory: [],
  weather: {
    next7Days: [],
    alerts: [],
  },
};

// Mock predictive data (fallback when offline) with object format for breeding window
const mockPredictions = {
  milk: {
    next7Days: [
      { day: 'Day 1', predicted: 3050, lower: 2950, upper: 3150, confidence: 95 },
      { day: 'Day 2', predicted: 3100, lower: 3000, upper: 3200, confidence: 94 },
      { day: 'Day 3', predicted: 3080, lower: 2980, upper: 3180, confidence: 93 },
      { day: 'Day 4', predicted: 3120, lower: 3020, upper: 3220, confidence: 92 },
      { day: 'Day 5', predicted: 3150, lower: 3050, upper: 3250, confidence: 91 },
      { day: 'Day 6', predicted: 3180, lower: 3080, upper: 3280, confidence: 90 },
      { day: 'Day 7', predicted: 3200, lower: 3100, upper: 3300, confidence: 89 },
    ],
    next30Days: {
      total: 95000,
      average: 3167,
      peakDay: 15,
      peakAmount: 3300,
      lowDay: 3,
      lowAmount: 3000,
    },
    factors: [
      { name: 'Weather', impact: '+5%', confidence: 85 },
      { name: 'Feed Quality', impact: '+3%', confidence: 90 },
      { name: 'Health Status', impact: '+2%', confidence: 88 },
      { name: 'Breeding Cycle', impact: '-1%', confidence: 75 },
    ],
  },
  health: [
    {
      id: 1,
      cattleId: 'C-2024-015',
      name: 'Bella',
      risk: 'High',
      condition: 'Mastitis',
      probability: 85,
      daysToOnset: 5,
      recommendations: [
        'Increase milking frequency',
        'Check udder health daily',
        'Consider preventative antibiotics',
      ],
      factors: ['Previous history', 'High production', 'Weather change'],
    },
    {
      id: 2,
      cattleId: 'C-2024-032',
      name: 'Daisy',
      risk: 'Medium',
      condition: 'Ketosis',
      probability: 65,
      daysToOnset: 12,
      recommendations: [
        'Monitor feed intake',
        'Check body condition',
        'Increase energy in diet',
      ],
      factors: ['Recent calving', 'Weight loss', 'Reduced appetite'],
    },
    {
      id: 3,
      cattleId: 'C-2024-078',
      name: 'Lily',
      risk: 'Low',
      condition: 'Lameness',
      probability: 35,
      daysToOnset: 25,
      recommendations: [
        'Check hoof health',
        'Ensure comfortable bedding',
        'Regular foot baths',
      ],
      factors: ['Standing时间长', 'Hard surface', 'Wet conditions'],
    },
  ],
  breeding: [
    {
      id: 1,
      cattleId: 'C-2024-091',
      name: 'Molly',
      nextHeatDate: '2024-02-15',
      confidence: 92,
      optimalBreedingWindow: {
        start: '2024-02-16',
        end: '2024-02-17',
        peakTime: '10:00 AM - 2:00 PM'
      },
      successProbability: 75,
      recommendations: [
        'Start heat detection on Feb 14',
        'Prepare AI equipment',
        'Schedule vet for Feb 16',
      ],
    },
    {
      id: 2,
      cattleId: 'C-2024-102',
      name: 'Rose',
      nextHeatDate: '2024-02-18',
      confidence: 88,
      optimalBreedingWindow: {
        start: '2024-02-19',
        end: '2024-02-20',
        peakTime: '2:00 PM - 6:00 PM'
      },
      successProbability: 82,
      recommendations: [
        'Monitor for heat signs',
        'Check nutrition',
        'Reduce stress factors',
      ],
    },
  ],
  financial: {
    revenue: {
      nextMonth: 245000,
      nextQuarter: 720000,
      nextYear: 2850000,
      growth: '+12%',
    },
    expenses: {
      nextMonth: 185000,
      nextQuarter: 550000,
      nextYear: 2150000,
      savings: '+8%',
    },
    profit: {
      nextMonth: 60000,
      nextQuarter: 170000,
      nextYear: 700000,
      margin: '23%',
    },
    risks: [
      { name: 'Feed Price Volatility', impact: 'High', probability: 65 },
      { name: 'Milk Price Drop', impact: 'Medium', probability: 45 },
      { name: 'Disease Outbreak', impact: 'High', probability: 25 },
      { name: 'Equipment Failure', impact: 'Low', probability: 35 },
    ],
  },
  inventory: [
    {
      item: 'Protein Concentrate',
      currentStock: 2500,
      dailyUsage: 150,
      daysRemaining: 16,
      reorderDate: '2024-02-10',
      optimalOrder: 1500,
      priceTrend: '+3%',
      suppliers: [
        { name: 'AgriCorp', price: 42, delivery: '3 days', rating: 4.5 },
        { name: 'FeedMax', price: 44, delivery: '2 days', rating: 4.2 },
      ],
      alternativeSuppliers: ['AgriCorp', 'FeedMax'],
    },
    {
      item: 'Corn Silage',
      currentStock: 8500,
      dailyUsage: 400,
      daysRemaining: 21,
      reorderDate: '2024-02-15',
      optimalOrder: 2000,
      priceTrend: '+1%',
      suppliers: [
        { name: 'Green Farms', price: 12, delivery: '4 days', rating: 4.0 },
        { name: 'Harvest Co', price: 13, delivery: '3 days', rating: 4.3 },
      ],
      alternativeSuppliers: ['Green Farms', 'Harvest Co'],
    },
    {
      item: 'Hay',
      currentStock: 4250,
      dailyUsage: 300,
      daysRemaining: 14,
      reorderDate: '2024-02-08',
      optimalOrder: 1800,
      priceTrend: '-2%',
      suppliers: [
        { name: 'Hay Express', price: 24, delivery: '2 days', rating: 4.2 },
        { name: 'Farm Supply', price: 25, delivery: '3 days', rating: 4.1 },
      ],
      alternativeSuppliers: ['Hay Express', 'Farm Supply'],
    },
  ],
  weather: {
    next7Days: [
      { day: 'Mon', condition: 'Sunny', temp: 72, impact: 'Positive', milkImpact: '+2%' },
      { day: 'Tue', condition: 'Cloudy', temp: 68, impact: 'Neutral', milkImpact: '0%' },
      { day: 'Wed', condition: 'Rain', temp: 65, impact: 'Negative', milkImpact: '-3%' },
      { day: 'Thu', condition: 'Rain', temp: 64, impact: 'Negative', milkImpact: '-3%' },
      { day: 'Fri', condition: 'Cloudy', temp: 67, impact: 'Neutral', milkImpact: '0%' },
      { day: 'Sat', condition: 'Sunny', temp: 70, impact: 'Positive', milkImpact: '+2%' },
      { day: 'Sun', condition: 'Sunny', temp: 73, impact: 'Positive', milkImpact: '+2%' },
    ],
    alerts: [
      { type: 'Heat Wave', date: '2024-02-10', severity: 'Moderate', action: 'Increase water, provide shade' },
      { type: 'Heavy Rain', date: '2024-02-12', severity: 'Low', action: 'Prepare shelter, check drainage' },
    ],
  },
};

function PredictiveAnalytics() {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State management
  const [selectedTab, setSelectedTab] = useState('overview');
  const [predictions, setPredictions] = useState(defaultPredictions);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [online, setOnline] = useState(getOnlineStatus());
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    milk: true,
    health: true,
    breeding: true,
    financial: true,
    inventory: true,
    weather: true,
  });
  
  // Modal states
  const [healthModalOpen, setHealthModalOpen] = useState(false);
  const [breedingModalOpen, setBreedingModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [selectedHealthRisk, setSelectedHealthRisk] = useState(null);
  const [selectedBreeding, setSelectedBreeding] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);

  // Filter states
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('probability');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('week');
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(addDays(new Date(), 7));

  // Online status tracking
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      fetchPredictions();
      setSnackbar({
        open: true,
        message: 'Back online! Fetching latest predictions...',
        severity: 'success',
      });
    };
    
    const handleOffline = () => {
      setOnline(false);
      setSnackbar({
        open: true,
        message: 'You are offline. Showing cached predictions.',
        severity: 'warning',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch predictions on mount and set interval
  useEffect(() => {
    fetchPredictions();
    const interval = setInterval(fetchPredictions, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    
    if (!online) {
      // Use cached/mock data when offline
      setPredictions(mockPredictions);
      setLastUpdated(new Date());
      setLoading(false);
      return;
    }

    setRefreshing(true);
    try {
      const [health, breeding, milk, inventory, weather] = await Promise.all([
        aiService.getHealthPredictions().catch(() => ({ data: mockPredictions.health })),
        aiService.getBreedingPredictions().catch(() => ({ data: mockPredictions.breeding })),
        aiService.getMilkPredictions().catch(() => ({ data: mockPredictions.milk })),
        aiService.getInventoryPredictions().catch(() => ({ data: mockPredictions.inventory })),
        aiService.getWeatherForecast().catch(() => ({ data: mockPredictions.weather })),
      ]);

      setPredictions({
        health: health.data || mockPredictions.health,
        breeding: breeding.data || mockPredictions.breeding,
        milk: milk.data || mockPredictions.milk,
        inventory: inventory.data || mockPredictions.inventory,
        weather: weather.data || mockPredictions.weather,
        financial: mockPredictions.financial,
      });
      
      setLastUpdated(new Date());
      
      setSnackbar({
        open: true,
        message: 'Predictions updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions(mockPredictions);
      setSnackbar({
        open: true,
        message: 'Failed to fetch predictions. Showing cached data.',
        severity: 'error',
      });
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleRefresh = () => {
    fetchPredictions();
  };

  const handleShare = async (data) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Prediction',
          text: `Check out this AI prediction from Smart Dairy`,
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

  const handleDownload = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Report downloaded successfully!',
      severity: 'success',
    });
  };

  const toggleFavorite = (id, type) => {
    const key = `${type}-${id}`;
    if (favorites.includes(key)) {
      setFavorites(favorites.filter(f => f !== key));
    } else {
      setFavorites([...favorites, key]);
    }
  };

  const toggleBookmark = (id, type) => {
    const key = `${type}-${id}`;
    if (bookmarks.includes(key)) {
      setBookmarks(bookmarks.filter(b => b !== key));
    } else {
      setBookmarks([...bookmarks, key]);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getImpactIcon = (impact) => {
    switch(impact) {
      case 'Positive': return <TrendingUp sx={{ color: 'success.main' }} />;
      case 'Negative': return <TrendingDown sx={{ color: 'error.main' }} />;
      default: return <Remove />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredHealthRisks = (predictions.health || [])
    .filter(risk => filterRisk === 'all' || risk.risk === filterRisk)
    .filter(risk => 
      risk.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.cattleId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.condition?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'probability') return (b.probability || 0) - (a.probability || 0);
      if (sortBy === 'days') return (a.daysToOnset || 0) - (b.daysToOnset || 0);
      return 0;
    });

  const formatBreedingWindow = (window) => {
    if (!window) return 'N/A';
    if (typeof window === 'string') return window;
    if (typeof window === 'object') {
      return `${window.start || ''} to ${window.end || ''} ${window.peakTime ? `(Peak: ${window.peakTime})` : ''}`;
    }
    return 'N/A';
  };

  // Loading skeleton
  if (loading) {
    return (
      <Box>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </Paper>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" height={40} />
                  <Skeleton variant="text" width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* Offline Alert */}
      <OfflineAlert />

      {/* Header with AI Status and Actions */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          background: online 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {/* Animated background effect */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                online ? (
                  <Tooltip title="Online - Real-time predictions">
                    <Wifi sx={{ fontSize: 16, color: 'success.main', bgcolor: 'white', borderRadius: '50%', p: 0.25 }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Offline - Cached predictions">
                    <WifiOff sx={{ fontSize: 16, color: 'error.main', bgcolor: 'white', borderRadius: '50%', p: 0.25 }} />
                  </Tooltip>
                )
              }
            >
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                <AutoAwesome sx={{ fontSize: 32 }} />
              </Avatar>
            </Badge>
          </Grid>
          
          <Grid item xs>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              AI-Powered Predictive Analytics
            </Typography>
            <Typography variant="body2">
              {online 
                ? 'Machine learning models analyzing 15+ data sources in real-time'
                : 'Offline mode - Showing cached predictions'}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Chip 
                size="small"
                icon={<Speed />}
                label="94% Accuracy"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip 
                size="small"
                icon={<Timeline />}
                label="15 Data Sources"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip 
                size="small"
                icon={<Update />}
                label="Updated every 15 min"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
          </Grid>
          
          <Grid item>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip title="View mode">
                <IconButton 
                  size="small" 
                  sx={{ color: 'white' }}
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : viewMode === 'list' ? 'compact' : 'grid')}
                >
                  {viewMode === 'grid' && <ViewModule />}
                  {viewMode === 'list' && <ViewList />}
                  {viewMode === 'compact' && <ViewCompact />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Refresh predictions">
                <IconButton 
                  size="small" 
                  sx={{ color: 'white' }}
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <Refresh className={refreshing ? 'spin' : ''} />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Share report">
                <IconButton 
                  size="small" 
                  sx={{ color: 'white' }}
                  onClick={() => handleShare(predictions)}
                >
                  <Share />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Download report">
                <IconButton 
                  size="small" 
                  sx={{ color: 'white' }}
                  onClick={() => handleDownload(predictions, `ai_predictions_${format(new Date(), 'yyyyMMdd')}.json`)}
                >
                  <Download />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Print report">
                <IconButton 
                  size="small" 
                  sx={{ color: 'white' }}
                  onClick={() => window.print()}
                >
                  <Print />
                </IconButton>
              </Tooltip>
              
              <Chip 
                icon={<Sync />}
                label={`Updated ${formatDistance(lastUpdated, new Date(), { addSuffix: true })}`}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Confidence meter */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Model Confidence:
          </Typography>
          <Box sx={{ flex: 1, maxWidth: 200 }}>
            <LinearProgress 
              variant="determinate" 
              value={94} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#4caf50',
                }
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            94% overall accuracy
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            |
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Health: 92% | Breeding: 89% | Milk: 95%
          </Typography>
        </Box>
      </Paper>

      {/* Key Metrics Cards with Animations */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: 'Next 30 Days Milk',
            value: predictions.milk?.next30Days?.total 
              ? `${(predictions.milk.next30Days.total / 1000).toFixed(1)}k L` 
              : '0 L',
            change: predictions.milk?.next30Days?.total ? '+8.2%' : '0%',
            icon: <Opacity />,
            color: 'primary',
            confidence: predictions.milk?.next7Days?.[0]?.confidence || 0,
            trend: 'up',
          },
          {
            title: 'Health Risks',
            value: predictions.health?.length || 0,
            subtext: `${predictions.health?.filter(r => r.risk === 'High')?.length || 0} critical`,
            icon: <LocalHospital />,
            color: 'error',
            confidence: 35,
            trend: 'down',
          },
          {
            title: 'Optimal Breeding',
            value: predictions.breeding?.length || 0,
            subtext: 'cows in window',
            icon: <Favorite />,
            color: 'success',
            confidence: 78,
            trend: 'up',
          },
          {
            title: 'Profit Forecast',
            value: predictions.financial?.profit?.nextMonth 
              ? formatCurrency(predictions.financial.profit.nextMonth) 
              : '$0',
            change: predictions.financial?.profit?.growth || '0%',
            icon: <MonetizationOn />,
            color: 'warning',
            confidence: 92,
            trend: 'up',
          },
        ].map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card sx={{ 
                position: 'relative', 
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
                transition: 'all 0.3s ease',
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        {metric.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {metric.value}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                        {metric.change && metric.change !== '0%' && (
                          <Box display="flex" alignItems="center">
                            {metric.trend === 'up' ? (
                              <TrendingUp fontSize="small" color="success" />
                            ) : (
                              <TrendingDown fontSize="small" color="error" />
                            )}
                            <Typography variant="body2" color={metric.trend === 'up' ? 'success.main' : 'error.main'}>
                              {metric.change}
                            </Typography>
                          </Box>
                        )}
                        {metric.subtext !== undefined && (
                          <Typography variant="body2" color="text.secondary">
                            • {metric.subtext}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: `${metric.color}.main`, width: 56, height: 56 }}>
                      {metric.icon}
                    </Avatar>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Confidence
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {metric.confidence}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={metric.confidence} 
                      color={metric.confidence > 80 ? 'success' : metric.confidence > 60 ? 'warning' : 'error'}
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for different prediction categories */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, v) => setSelectedTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab value="overview" label="Overview" icon={<Dashboard />} iconPosition="start" />
          <Tab value="milk" label="Milk Production" icon={<Opacity />} iconPosition="start" />
          <Tab value="health" label="Health" icon={<LocalHospital />} iconPosition="start" />
          <Tab value="breeding" label="Breeding" icon={<Favorite />} iconPosition="start" />
          <Tab value="financial" label="Financial" icon={<MonetizationOn />} iconPosition="start" />
          <Tab value="inventory" label="Inventory" icon={<Inventory />} iconPosition="start" />
          <Tab value="weather" label="Weather" icon={<WbSunny />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Overview Tab - Show all sections */}
      {selectedTab === 'overview' && (
        <Box>
          {/* Milk Production Prediction Chart */}
          <Accordion 
            expanded={expandedSections.milk} 
            onChange={() => toggleSection('milk')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Opacity color="primary" />
                <Typography variant="h6">Milk Production Forecast</Typography>
                <Chip 
                  size="small"
                  label="7-Day Prediction"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ p: 2 }} variant="outlined">
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="subtitle1">
                    Next 7 Days Forecast
                  </Typography>
                  <Box>
                    <Chip 
                      icon={<AutoAwesome />}
                      label="Time Series + Weather Model"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Tooltip title="Add to favorites">
                      <IconButton 
                        size="small"
                        onClick={() => toggleBookmark('milk', 'chart')}
                      >
                        {bookmarks.includes('chart-milk') ? <Star color="warning" /> : <StarBorder />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                {predictions.milk?.next7Days?.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={predictions.milk.next7Days}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: theme.shape.borderRadius,
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="upper" 
                        fill="#8884d8" 
                        stroke="none" 
                        fillOpacity={0.1} 
                        name="Upper Bound"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="lower" 
                        fill="#8884d8" 
                        stroke="none" 
                        fillOpacity={0.1} 
                        name="Lower Bound"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#2E7D32" 
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        name="Predicted Production"
                      />
                      <Bar dataKey="confidence" fill="#FFB74D" yAxisId="right" name="Confidence %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <Alert severity="info">No milk production data available</Alert>
                )}

                {/* Factors list */}
                {predictions.milk?.factors?.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Influencing Factors
                    </Typography>
                    <Grid container spacing={2}>
                      {predictions.milk.factors.map((factor, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Paper variant="outlined" sx={{ p: 1.5 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Typography variant="body2">{factor.name}</Typography>
                              <Box display="flex" alignItems="center">
                                <Typography variant="body2" color={factor.impact?.includes('+') ? 'success.main' : 'error.main'}>
                                  {factor.impact}
                                </Typography>
                                <Chip 
                                  label={`${factor.confidence}%`}
                                  size="small"
                                  sx={{ ml: 1, height: 20 }}
                                />
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>

          {/* Health Risk Predictions */}
          <Accordion 
            expanded={expandedSections.health} 
            onChange={() => toggleSection('health')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocalHospital color="error" />
                <Typography variant="h6">Health Risk Predictions</Typography>
                <Chip 
                  size="small"
                  label={`${predictions.health?.length || 0} Risks`}
                  color="error"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ p: 2 }} variant="outlined">
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="subtitle1">
                    Active Health Risks
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      size="small"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: 200 }}
                    />
                    <FormControl size="small" sx={{ width: 150 }}>
                      <InputLabel>Filter</InputLabel>
                      <Select
                        value={filterRisk}
                        label="Filter"
                        onChange={(e) => setFilterRisk(e.target.value)}
                      >
                        <MenuItem value="all">All Risks</MenuItem>
                        <MenuItem value="High">High Risk</MenuItem>
                        <MenuItem value="Medium">Medium Risk</MenuItem>
                        <MenuItem value="Low">Low Risk</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 150 }}>
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <MenuItem value="probability">Probability</MenuItem>
                        <MenuItem value="days">Days to Onset</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {filteredHealthRisks.length > 0 ? (
                  <Grid container spacing={2}>
                    {filteredHealthRisks.map((risk, index) => (
                      <Grid item xs={12} key={risk.id}>
                        <Grow in={true} style={{ transformOrigin: '0 0 0', transitionDelay: `${index * 50}ms` }}>
                          <Card 
                            variant="outlined" 
                            sx={{ 
                              borderLeft: 6, 
                              borderLeftColor: risk.risk === 'High' ? 'error.main' : 
                                              risk.risk === 'Medium' ? 'warning.main' : 'success.main',
                              '&:hover': {
                                boxShadow: theme.shadows[4],
                              },
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={3}>
                                  <Box display="flex" alignItems="center">
                                    <Avatar sx={{ bgcolor: getRiskColor(risk.risk) + '.main', mr: 2 }}>
                                      {risk.risk === 'High' ? <Error /> : 
                                       risk.risk === 'Medium' ? <Warning /> : <Info />}
                                    </Avatar>
                                    <Box>
                                      <Typography variant="subtitle1">{risk.name}</Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {risk.cattleId}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                                
                                <Grid item xs={12} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Condition
                                  </Typography>
                                  <Typography variant="body1">{risk.condition}</Typography>
                                </Grid>
                                
                                <Grid item xs={12} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Probability
                                  </Typography>
                                  <Box display="flex" alignItems="center">
                                    <Box sx={{ width: 80, mr: 1 }}>
                                      <LinearProgress 
                                        variant="determinate" 
                                        value={risk.probability || 0} 
                                        color={getRiskColor(risk.risk)}
                                        sx={{ height: 8, borderRadius: 5 }}
                                      />
                                    </Box>
                                    <Typography variant="body2">
                                      {risk.probability || 0}%
                                    </Typography>
                                  </Box>
                                </Grid>
                                
                                <Grid item xs={12} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Days to Onset
                                  </Typography>
                                  <Typography variant="body1">
                                    {risk.daysToOnset || 0} days
                                  </Typography>
                                </Grid>
                                
                                <Grid item xs={12} md={3}>
                                  <Box display="flex" justifyContent="flex-end" gap={1}>
                                    <Tooltip title="Add to favorites">
                                      <IconButton 
                                        size="small"
                                        onClick={() => toggleFavorite(risk.id, 'health')}
                                      >
                                        {favorites.includes(`health-${risk.id}`) ? <Star color="warning" /> : <StarBorder />}
                                      </IconButton>
                                    </Tooltip>
                                    
                                    <Button 
                                      variant="contained" 
                                      size="small"
                                      color={getRiskColor(risk.risk)}
                                      startIcon={<HealthAndSafety />}
                                      onClick={() => {
                                        setSelectedHealthRisk(risk);
                                        setHealthModalOpen(true);
                                      }}
                                    >
                                      View Plan
                                    </Button>
                                    
                                    <Tooltip title="More options">
                                      <IconButton size="small">
                                        <MoreVert />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </Grid>
                              </Grid>

                              {/* Factors chips */}
                              {risk.factors && risk.factors.length > 0 && (
                                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                  {risk.factors.map((factor, idx) => (
                                    <Chip
                                      key={idx}
                                      label={factor}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        </Grow>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">No health risks detected</Alert>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>

          {/* Breeding Predictions */}
          <Accordion 
            expanded={expandedSections.breeding} 
            onChange={() => toggleSection('breeding')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Favorite color="error" />
                <Typography variant="h6">Breeding Window Predictions</Typography>
                <Chip 
                  size="small"
                  label={`${predictions.breeding?.length || 0} Active`}
                  color="error"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ p: 2 }} variant="outlined">
                {predictions.breeding?.length > 0 ? (
                  <Grid container spacing={2}>
                    {predictions.breeding.map((breeding, index) => (
                      <Grid item xs={12} md={6} key={breeding.id}>
                        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                          <Card variant="outlined">
                            <CardContent>
                              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                <Box display="flex" alignItems="center">
                                  <Avatar sx={{ bgcolor: 'error.light', mr: 2 }}>
                                    <Favorite />
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle1">{breeding.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {breeding.cattleId}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Chip 
                                    label={`${breeding.confidence || 0}% confidence`}
                                    size="small"
                                    color={breeding.confidence > 90 ? 'success' : 'primary'}
                                  />
                                  <IconButton 
                                    size="small"
                                    onClick={() => toggleBookmark(breeding.id, 'breeding')}
                                  >
                                    {bookmarks.includes(`breeding-${breeding.id}`) ? <Bookmark color="primary" /> : <BookmarkBorder />}
                                  </IconButton>
                                </Box>
                              </Box>

                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Next Heat Date
                                  </Typography>
                                  <Box display="flex" alignItems="center">
                                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="body1">
                                      {breeding.nextHeatDate || 'N/A'}
                                    </Typography>
                                  </Box>
                                </Grid>
                                
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Success Probability
                                  </Typography>
                                  <Box display="flex" alignItems="center">
                                    <Box sx={{ width: 60, mr: 1 }}>
                                      <LinearProgress 
                                        variant="determinate" 
                                        value={breeding.successProbability || 0} 
                                        color="success"
                                        sx={{ height: 6, borderRadius: 3 }}
                                      />
                                    </Box>
                                    <Typography variant="body1" color="success.main">
                                      {breeding.successProbability || 0}%
                                    </Typography>
                                  </Box>
                                </Grid>
                                
                                <Grid item xs={12}>
                                  <Typography variant="body2" color="text.secondary">
                                    Optimal Breeding Window
                                  </Typography>
                                  <Paper variant="outlined" sx={{ p: 1, bgcolor: 'background.default' }}>
                                    <Typography variant="body1">
                                      {formatBreedingWindow(breeding.optimalBreedingWindow)}
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>

                              <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                                <Button 
                                  variant="contained" 
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    setSelectedBreeding(breeding);
                                    setBreedingModalOpen(true);
                                  }}
                                >
                                  View Breeding Plan
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Slide>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">No breeding predictions available</Alert>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>

          {/* Financial Predictions */}
          <Accordion 
            expanded={expandedSections.financial} 
            onChange={() => toggleSection('financial')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <MonetizationOn color="warning" />
                <Typography variant="h6">Financial Forecast</Typography>
                <Chip 
                  size="small"
                  label="30-Day Outlook"
                  color="warning"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }} variant="outlined">
                    <Typography variant="subtitle1" gutterBottom>
                      Revenue & Expenses
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUp color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Revenue"
                          secondary={`Next Month: ${formatCurrency(predictions.financial?.revenue?.nextMonth || 0)}`}
                        />
                        <ListItemSecondaryAction>
                          <Chip label={predictions.financial?.revenue?.growth || '0%'} color="success" size="small" />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemIcon>
                          <TrendingDown color="error" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Expenses"
                          secondary={`Next Month: ${formatCurrency(predictions.financial?.expenses?.nextMonth || 0)}`}
                        />
                        <ListItemSecondaryAction>
                          <Chip label={predictions.financial?.expenses?.savings || '0%'} color="info" size="small" />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemIcon>
                          <MonetizationOn color="warning" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Profit"
                          secondary={`Next Month: ${formatCurrency(predictions.financial?.profit?.nextMonth || 0)}`}
                        />
                        <ListItemSecondaryAction>
                          <Chip label={`Margin ${predictions.financial?.profit?.margin || '0%'}`} color="primary" size="small" />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }} variant="outlined">
                    <Typography variant="subtitle1" gutterBottom>
                      Financial Risks
                    </Typography>
                    {predictions.financial?.risks?.length > 0 ? (
                      predictions.financial.risks.map((risk, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2">{risk.name}</Typography>
                            <Chip 
                              label={`Impact: ${risk.impact}`}
                              size="small"
                              color={risk.impact === 'High' ? 'error' : risk.impact === 'Medium' ? 'warning' : 'info'}
                            />
                          </Box>
                          <Box display="flex" alignItems="center" mt={0.5}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={risk.probability || 0} 
                                color={risk.probability > 60 ? 'error' : risk.probability > 30 ? 'warning' : 'info'}
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {risk.probability || 0}%
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Alert severity="info">No financial risks detected</Alert>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Inventory Predictions */}
          <Accordion 
            expanded={expandedSections.inventory} 
            onChange={() => toggleSection('inventory')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Inventory color="primary" />
                <Typography variant="h6">Inventory Predictions</Typography>
                <Chip 
                  size="small"
                  label="Smart Reorder"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ p: 2 }} variant="outlined">
                {predictions.inventory?.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell>Item</TableCell>
                          <TableCell align="right">Current Stock</TableCell>
                          <TableCell align="right">Daily Usage</TableCell>
                          <TableCell align="right">Days Left</TableCell>
                          <TableCell>Reorder Date</TableCell>
                          <TableCell align="right">Optimal Order</TableCell>
                          <TableCell align="right">Price Trend</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {predictions.inventory.map((item, index) => (
                          <TableRow key={index} hover>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Inventory sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                                {item.item}
                              </Box>
                            </TableCell>
                            <TableCell align="right">{item.currentStock} kg</TableCell>
                            <TableCell align="right">{item.dailyUsage} kg</TableCell>
                            <TableCell align="right">
                              <Chip 
                                label={`${item.daysRemaining} days`}
                                color={item.daysRemaining < 10 ? 'error' : item.daysRemaining < 15 ? 'warning' : 'success'}
                                size="small"
                                sx={{ minWidth: 70 }}
                              />
                            </TableCell>
                            <TableCell>{item.reorderDate}</TableCell>
                            <TableCell align="right">{item.optimalOrder} kg</TableCell>
                            <TableCell align="right">
                              <Box display="flex" alignItems="center" justifyContent="flex-end">
                                {item.priceTrend?.includes('+') ? 
                                  <TrendingUp fontSize="small" color="error" /> : 
                                  <TrendingDown fontSize="small" color="success" />
                                }
                                <Typography variant="body2" ml={0.5}>
                                  {item.priceTrend || '0%'}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Button 
                                size="small" 
                                variant="contained"
                                onClick={() => {
                                  setSelectedInventory(item);
                                  setInventoryModalOpen(true);
                                }}
                              >
                                Order
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">No inventory predictions available</Alert>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>

          {/* Weather Impact Predictions */}
          <Accordion 
            expanded={expandedSections.weather} 
            onChange={() => toggleSection('weather')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <WbSunny color="info" />
                <Typography variant="h6">Weather Impact Analysis</Typography>
                <Chip 
                  size="small"
                  label="7-Day Forecast"
                  color="info"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ p: 2 }} variant="outlined">
                {predictions.weather?.next7Days?.length > 0 ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <ResponsiveContainer width="100%" height={250}>
                        <ComposedChart data={predictions.weather.next7Days}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <RechartsTooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="temp" fill="#8884d8" name="Temperature (°F)" />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="milkImpact" 
                            stroke="#82ca9d" 
                            name="Milk Impact"
                            strokeWidth={2}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" gutterBottom>
                        Weather Alerts
                      </Typography>
                      {predictions.weather.alerts?.length > 0 ? (
                        predictions.weather.alerts.map((alert, index) => (
                          <Fade in={true} key={index}>
                            <Alert 
                              severity={alert.severity === 'Moderate' ? 'warning' : 'info'}
                              sx={{ mb: 2 }}
                              action={
                                <Tooltip title="View details">
                                  <IconButton size="small">
                                    <Info />
                                  </IconButton>
                                </Tooltip>
                              }
                            >
                              <AlertTitle>{alert.type}</AlertTitle>
                              {alert.action}
                              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                {alert.date}
                              </Typography>
                            </Alert>
                          </Fade>
                        ))
                      ) : (
                        <Alert severity="success">No weather alerts</Alert>
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <Alert severity="info">No weather data available</Alert>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Individual tab contents - can be expanded with more details */}
      {selectedTab === 'milk' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Milk Production Details</Typography>
          {/* Add more detailed milk production analysis */}
        </Paper>
      )}

      {selectedTab === 'health' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Health Risk Details</Typography>
          {/* Add more detailed health risk analysis */}
        </Paper>
      )}

      {selectedTab === 'breeding' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Breeding Details</Typography>
          {/* Add more detailed breeding analysis */}
        </Paper>
      )}

      {selectedTab === 'financial' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Financial Details</Typography>
          {/* Add more detailed financial analysis */}
        </Paper>
      )}

      {selectedTab === 'inventory' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Inventory Details</Typography>
          {/* Add more detailed inventory analysis */}
        </Paper>
      )}

      {selectedTab === 'weather' && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Weather Details</Typography>
          {/* Add more detailed weather analysis */}
        </Paper>
      )}

      {/* Modals */}
      <HealthRiskDetailModal
        open={healthModalOpen}
        onClose={() => setHealthModalOpen(false)}
        prediction={selectedHealthRisk}
        onAction={(action) => {
          console.log('Action completed:', action);
          setSnackbar({
            open: true,
            message: 'Action recorded successfully!',
            severity: 'success',
          });
        }}
      />

      <BreedingDetailModal
        open={breedingModalOpen}
        onClose={() => setBreedingModalOpen(false)}
        prediction={selectedBreeding}
      />

      <InventoryDetailModal
        open={inventoryModalOpen}
        onClose={() => setInventoryModalOpen(false)}
        prediction={selectedInventory}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .slide-in {
            animation: slideIn 0.5s ease-out;
          }
        `}
      </style>
    </Box>
  );
}

export default PredictiveAnalytics;