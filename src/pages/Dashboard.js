import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Divider,
  Button,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Badge,
  Collapse,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  LocalHospital,
  Opacity,
  Inventory,
  Warning,
  CalendarToday,
  MonetizationOn,
  Favorite,
  Pets,
  Assignment,
  AutoAwesome,
  Psychology,
  Biotech,
  Science,
  Analytics,
  ShowChart,
  Timeline,
  NotificationsActive,
  ExpandMore,
  ExpandLess,
  Refresh,
  Download,
  Print,
  Share,
  Star,
  StarBorder,
  Lightbulb,
  RocketLaunch,
  Speed,
  PrecisionManufacturing,
  HealthAndSafety,
  Agriculture,
  Grass,
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
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';
import { fetchTasks } from '../redux/slices/taskSlice';
import { format, subDays, addDays } from 'date-fns';
import PredictiveAnalytics from '../components/PredictiveAnalytics';

// Custom colors
const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0'];

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State for dashboard data
  const [stats, setStats] = useState({
    totalCattle: 0,
    milkProduction: 0,
    healthAlerts: 0,
    feedStock: 0,
    pendingTasks: 0,
    monthlyRevenue: 0,
    loading: true,
    error: null,
  });

  const [milkProductionData, setMilkProductionData] = useState([]);
  const [cattleHealthData, setCattleHealthData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  
  // New state for AI features
  const [showPredictiveAnalytics, setShowPredictiveAnalytics] = useState(true);
  const [aiInsights, setAiInsights] = useState([]);
  const [showAiInsights, setShowAiInsights] = useState(true);
  const [lastAIPrediction, setLastAIPrediction] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [aiConfidence, setAiConfidence] = useState(94);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
    fetchRecentActivities();
    fetchUpcomingTasks();
    generateAIInsights();
  }, []);

  const fetchDashboardData = async () => {
    setStats(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API calls - Replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API response
      const mockStats = {
        totalCattle: 156,
        milkProduction: 2450,
        healthAlerts: 8,
        feedStock: 75,
        pendingTasks: 12,
        monthlyRevenue: 45800,
      };

      const mockMilkData = [
        { month: 'Jan', production: 4500, predicted: 4600, upper: 4800, lower: 4400 },
        { month: 'Feb', production: 4800, predicted: 4900, upper: 5100, lower: 4700 },
        { month: 'Mar', production: 5200, predicted: 5300, upper: 5500, lower: 5100 },
        { month: 'Apr', production: 5000, predicted: 5150, upper: 5350, lower: 4950 },
        { month: 'May', production: 5500, predicted: 5600, upper: 5800, lower: 5400 },
        { month: 'Jun', production: 5800, predicted: 5950, upper: 6150, lower: 5750 },
      ];

      const mockHealthData = [
        { name: 'Healthy', value: 85 },
        { name: 'Under Treatment', value: 10 },
        { name: 'Critical', value: 5 },
      ];

      setStats({
        ...mockStats,
        loading: false,
        error: null,
      });
      setMilkProductionData(mockMilkData);
      setCattleHealthData(mockHealthData);
    } catch (error) {
      setStats(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to load dashboard data' 
      }));
    }
  };

  const fetchRecentActivities = async () => {
    try {
      // Simulate API call - Replace with actual API
      const mockActivities = [
        { 
          id: 1, 
          type: 'health', 
          message: 'Vaccination completed for 15 cattle', 
          time: '2 hours ago',
          timestamp: new Date(2024, 0, 15, 10, 30),
          aiPredicted: true,
        },
        { 
          id: 2, 
          type: 'milk', 
          message: 'Milk production: 2450L collected today', 
          time: '5 hours ago',
          timestamp: new Date(2024, 0, 15, 7, 15),
          aiPredicted: false,
        },
        { 
          id: 3, 
          type: 'breeding', 
          message: 'New calf born: ID #C-2024-001', 
          time: '1 day ago',
          timestamp: new Date(2024, 0, 14, 14, 20),
          aiPredicted: true,
        },
        { 
          id: 4, 
          type: 'inventory', 
          message: 'Feed inventory low: Protein supplement', 
          time: '2 days ago',
          timestamp: new Date(2024, 0, 13, 9, 45),
          aiPredicted: true,
        },
        { 
          id: 5, 
          type: 'financial', 
          message: 'Monthly revenue: $45,800', 
          time: '3 days ago',
          timestamp: new Date(2024, 0, 12, 11, 0),
          aiPredicted: false,
        },
      ];
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const fetchUpcomingTasks = async () => {
    try {
      // Simulate API call - Replace with actual API
      const mockTasks = [
        {
          id: 1,
          title: 'Vaccination Schedule',
          description: '15 cattle due for vaccination',
          dueDate: new Date(2024, 0, 16),
          priority: 'high',
          category: 'health',
          aiRecommended: true,
          confidence: 95,
        },
        {
          id: 2,
          title: 'Breeding Check',
          description: '5 cows in heat - check today',
          dueDate: new Date(2024, 0, 15),
          priority: 'urgent',
          category: 'breeding',
          aiRecommended: true,
          confidence: 92,
        },
        {
          id: 3,
          title: 'Feed Order',
          description: 'Protein supplement running low',
          dueDate: new Date(2024, 0, 18),
          priority: 'medium',
          category: 'inventory',
          aiRecommended: true,
          confidence: 88,
        },
        {
          id: 4,
          title: 'Equipment Maintenance',
          description: 'Milking machine service due',
          dueDate: new Date(2024, 0, 20),
          priority: 'low',
          category: 'maintenance',
          aiRecommended: false,
          confidence: 0,
        },
        {
          id: 5,
          title: 'Financial Review',
          description: 'Monthly expense review',
          dueDate: new Date(2024, 0, 25),
          priority: 'medium',
          category: 'financial',
          aiRecommended: true,
          confidence: 85,
        },
      ];
      setUpcomingTasks(mockTasks.slice(0, 3)); // Show only first 3 in dashboard
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const generateAIInsights = () => {
    // Generate AI insights based on data
    const insights = [
      {
        id: 1,
        type: 'success',
        title: 'Milk Production Optimization',
        message: 'AI predicts 8% increase in milk production if you adjust feeding schedule to 6 AM and 4 PM.',
        action: 'View Details',
        icon: <Opacity />,
        color: 'success',
      },
      {
        id: 2,
        type: 'warning',
        title: 'Health Risk Detected',
        message: 'Cow #C-2024-015 shows 85% probability of mastitis in next 5 days. Preventive action recommended.',
        action: 'View Health Plan',
        icon: <LocalHospital />,
        color: 'warning',
      },
      {
        id: 3,
        type: 'info',
        title: 'Optimal Breeding Window',
        message: '3 cows will be in heat between Feb 15-17. Prepare AI equipment now.',
        action: 'Schedule Breeding',
        icon: <Favorite />,
        color: 'info',
      },
      {
        id: 4,
        type: 'success',
        title: 'Cost Saving Opportunity',
        message: 'Buy protein concentrate now - prices predicted to rise 12% next month.',
        action: 'Place Order',
        icon: <MonetizationOn />,
        color: 'success',
      },
      {
        id: 5,
        type: 'warning',
        title: 'Weather Impact Alert',
        message: 'Heavy rain predicted on Feb 12. Milk production may drop by 3%. Prepare shelter.',
        action: 'View Weather',
        icon: <Warning />,
        color: 'warning',
      },
    ];
    setAiInsights(insights);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    await fetchRecentActivities();
    await fetchUpcomingTasks();
    generateAIInsights();
    setLastAIPrediction(new Date());
    setIsRefreshing(false);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'health': return <LocalHospital />;
      case 'milk': return <Opacity />;
      case 'breeding': return <Favorite />;
      case 'inventory': return <Inventory />;
      case 'financial': return <MonetizationOn />;
      default: return <Assignment />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'health': return 'error.light';
      case 'milk': return 'info.light';
      case 'breeding': return 'success.light';
      case 'inventory': return 'warning.light';
      case 'financial': return 'primary.light';
      default: return 'grey.400';
    }
  };

  const formatDueDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return format(date, 'MMM dd');
    }
  };

  if (stats.loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={30} />
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

  if (stats.error) {
    return (
      <Box>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={fetchDashboardData}>
              Retry
            </Button>
          }
        >
          {stats.error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with AI Status and Actions */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box>
          <Tooltip title="AI Predictions">
            <IconButton onClick={() => setShowPredictiveAnalytics(!showPredictiveAnalytics)} sx={{ mr: 1 }}>
              <Badge badgeContent={aiInsights.length} color="primary">
                <AutoAwesome color={showPredictiveAnalytics ? 'primary' : 'action'} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} disabled={isRefreshing} sx={{ mr: 1 }}>
              <Refresh className={isRefreshing ? 'spin' : ''} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Dashboard">
            <IconButton sx={{ mr: 1 }}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton>
              <Print />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* AI Status Bar */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
              <AutoAwesome />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              AI-Powered Insights Active
            </Typography>
            <Typography variant="body2">
              Analyzing 15 data sources • {aiConfidence}% prediction accuracy • Last updated {format(lastAIPrediction, 'hh:mm a')}
            </Typography>
          </Grid>
          <Grid item>
            <Chip 
              icon={<Speed />}
              label={`${aiInsights.length} New Insights`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* AI Insights Carousel */}
      <Collapse in={showAiInsights}>
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <Lightbulb sx={{ color: 'warning.main', mr: 1 }} />
              <Typography variant="h6">AI Recommendations</Typography>
            </Box>
            <IconButton size="small" onClick={() => setShowAiInsights(false)}>
              <ExpandLess />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {aiInsights.map((insight) => (
              <Grid item xs={12} md={6} lg={4} key={insight.id}>
                <Zoom in={true} style={{ transitionDelay: `${insight.id * 100}ms` }}>
                  <Card variant="outlined" sx={{ 
                    borderLeft: 6, 
                    borderLeftColor: `${insight.color}.main`,
                    position: 'relative',
                  }}>
                    <CardContent>
                      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                        <Box display="flex" alignItems="center" mb={1}>
                          <Avatar sx={{ bgcolor: `${insight.color}.light`, mr: 1, width: 32, height: 32 }}>
                            {insight.icon}
                          </Avatar>
                          <Typography variant="subtitle2">{insight.title}</Typography>
                        </Box>
                        <IconButton size="small" onClick={() => toggleFavorite(insight.id)}>
                          {favorites.includes(insight.id) ? <Star color="warning" /> : <StarBorder />}
                        </IconButton>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {insight.message}
                      </Typography>
                      <Button size="small" variant="outlined" fullWidth>
                        {insight.action}
                      </Button>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Collapse>

      {/* Statistics Cards with AI Indicators */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2, position: 'relative' }}>
            <CardContent>
              <Box position="absolute" top={8} right={8}>
                <Tooltip title="AI Prediction: +5% next month">
                  <Chip 
                    icon={<AutoAwesome />} 
                    label="+5%" 
                    size="small" 
                    color="success"
                    sx={{ height: 20 }}
                  />
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Cattle
                  </Typography>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    {stats.totalCattle}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                    <Typography variant="body2" color="success.main" ml={0.5}>
                      +12 this month
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <Pets />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2, position: 'relative' }}>
            <CardContent>
              <Box position="absolute" top={8} right={8}>
                <Tooltip title="AI Prediction: +8% tomorrow">
                  <Chip 
                    icon={<AutoAwesome />} 
                    label="+8%" 
                    size="small" 
                    color="success"
                    sx={{ height: 20 }}
                  />
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Today's Milk (L)
                  </Typography>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    {stats.milkProduction}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                    <Typography variant="body2" color="success.main" ml={0.5}>
                      +8% vs yesterday
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                  <Opacity />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2, position: 'relative' }}>
            <CardContent>
              <Box position="absolute" top={8} right={8}>
                <Tooltip title="2 high-risk cases detected">
                  <Chip 
                    icon={<Warning />} 
                    label="2 Critical" 
                    size="small" 
                    color="error"
                    sx={{ height: 20 }}
                  />
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Health Alerts
                  </Typography>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                    {stats.healthAlerts}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Warning sx={{ color: 'warning.main', fontSize: 16 }} />
                    <Typography variant="body2" color="warning.main" ml={0.5}>
                      3 critical
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <LocalHospital />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2, position: 'relative' }}>
            <CardContent>
              <Box position="absolute" top={8} right={8}>
                <Tooltip title="Reorder in 5 days">
                  <Chip 
                    icon={<Inventory />} 
                    label="5 days left" 
                    size="small" 
                    color="warning"
                    sx={{ height: 20 }}
                  />
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Feed Stock
                  </Typography>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    {stats.feedStock}%
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.feedStock} 
                      sx={{ width: 100, height: 8, borderRadius: 5 }}
                    />
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light', width: 56, height: 56 }}>
                  <Inventory />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section with AI Predictions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Milk Production Trend with AI Predictions
              </Typography>
              <Chip 
                icon={<AutoAwesome />}
                label="95% Confidence"
                color="primary"
                size="small"
              />
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={milkProductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  fill="#8884d8" 
                  stroke="none" 
                  fillOpacity={0.1} 
                  name="Prediction Range"
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  fill="#8884d8" 
                  stroke="none" 
                  fillOpacity={0.1} 
                />
                <Line 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#2E7D32" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Actual Production"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#FFB74D" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="AI Prediction"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Cattle Health Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cattleHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cattleHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <Box mt={2}>
              <Alert severity="info" icon={<Biotech />}>
                AI predicts 2 cows may develop health issues in next 7 days
              </Alert>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Predictive Analytics Section */}
      <Collapse in={showPredictiveAnalytics}>
        <Box sx={{ mb: 4 }}>
          <PredictiveAnalytics />
        </Box>
      </Collapse>

      {/* Recent Activities and Upcoming Tasks with AI Indicators */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Recent Activities
              </Typography>
              <Chip 
                icon={<AutoAwesome />}
                label="AI Analyzed"
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          activity.aiPredicted ? (
                            <Tooltip title="AI Predicted">
                              <AutoAwesome sx={{ fontSize: 14, color: 'primary.main' }} />
                            </Tooltip>
                          ) : null
                        }
                      >
                        <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                          {getActivityIcon(activity.type)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.message}
                      secondary={activity.time}
                    />
                    {activity.aiPredicted && (
                      <Chip 
                        label="AI" 
                        size="small" 
                        color="primary"
                        sx={{ ml: 1, height: 20 }}
                      />
                    )}
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate('/activities')}
            >
              View All Activities
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                AI-Recommended Tasks
              </Typography>
              <Chip 
                icon={<Psychology />}
                label="Smart Prioritization"
                size="small"
                color="secondary"
              />
            </Box>
            <List>
              {upcomingTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={!task.aiRecommended}
                      >
                        <CalendarToday color={getPriorityColor(task.priority)} />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box display="flex" alignItems="center">
                          {task.title}
                          {task.aiRecommended && (
                            <Chip 
                              icon={<AutoAwesome />}
                              label={`${task.confidence}%`}
                              size="small"
                              color="primary"
                              sx={{ ml: 1, height: 20 }}
                            />
                          )}
                        </Box>
                      }
                      secondary={task.description}
                    />
                    <Chip 
                      label={formatDueDate(task.dueDate)} 
                      color={getPriorityColor(task.priority)} 
                      size="small" 
                    />
                  </ListItem>
                  {index < upcomingTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate('/tasks')}
            >
              View All Tasks ({stats.pendingTasks})
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Add CSS for spin animation */}
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}

export default Dashboard;