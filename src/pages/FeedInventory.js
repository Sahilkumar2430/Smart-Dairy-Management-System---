import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Tooltip,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Badge,
  Rating,
  Slider,
  Switch,
  FormControlLabel,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  CircularProgress,
  Breadcrumbs,
  Link,
  Stack,
} from '@mui/material';
import {
  Inventory,
  Warning,
  AddShoppingCart,
  TrendingUp,
  TrendingDown,
  Agriculture,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Download,
  Print,
  Refresh,
  Add,
  Remove,
  ShoppingCart,
  LocalShipping,
  History,
  Assessment,
  BarChart,
  PieChart,
  Image as ImageIcon,
  CloudUpload,
  PhotoCamera,
  ImageSearch,
  AutoAwesome,
  Save,
  Share,
  Favorite,
  FavoriteBorder,
  OpenInNew,
  Link as LinkIcon,
  CheckCircle,
  Cancel,
  Schedule,
  AttachMoney,
  Calculate,
  PriceChange,
  Store,
  Restaurant,
  Grass,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addDays, differenceInDays } from 'date-fns';

// Mock feed inventory data
const initialFeedItems = [
  {
    id: 1,
    name: 'Protein Concentrate',
    category: 'Concentrate',
    currentStock: 2500,
    unit: 'kg',
    unitPrice: 45,
    dailyUsage: 150,
    reorderLevel: 2000,
    maxStock: 5000,
    supplier: 'AgriSupply Co.',
    lastOrdered: new Date(2024, 0, 10),
    nextDelivery: new Date(2024, 0, 20),
    status: 'low',
    image: 'https://images.unsplash.com/photo-1597764690523-15a1e1e8d2b5?w=400',
    nutritionalInfo: {
      protein: 32,
      fat: 5,
      fiber: 8,
      moisture: 12,
    },
    storage: 'Silo A',
    expiryDate: new Date(2024, 5, 15),
    orders: [
      { date: new Date(2024, 0, 10), quantity: 1000, status: 'delivered' },
      { date: new Date(2023, 11, 15), quantity: 1000, status: 'delivered' },
    ],
  },
  {
    id: 2,
    name: 'Corn Silage',
    category: 'Silage',
    currentStock: 8500,
    unit: 'kg',
    unitPrice: 12,
    dailyUsage: 400,
    reorderLevel: 3000,
    maxStock: 15000,
    supplier: 'Green Farms',
    lastOrdered: new Date(2024, 0, 5),
    nextDelivery: new Date(2024, 0, 25),
    status: 'good',
    image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=400',
    nutritionalInfo: {
      protein: 8,
      fat: 3,
      fiber: 25,
      moisture: 65,
    },
    storage: 'Silo B',
    expiryDate: new Date(2024, 8, 10),
    orders: [
      { date: new Date(2024, 0, 5), quantity: 2000, status: 'delivered' },
      { date: new Date(2023, 11, 20), quantity: 2000, status: 'delivered' },
    ],
  },
  {
    id: 3,
    name: 'Alfalfa Hay',
    category: 'Hay',
    currentStock: 4250,
    unit: 'kg',
    unitPrice: 25,
    dailyUsage: 300,
    reorderLevel: 2500,
    maxStock: 8000,
    supplier: 'Hay Suppliers Inc.',
    lastOrdered: new Date(2024, 0, 8),
    nextDelivery: new Date(2024, 0, 18),
    status: 'moderate',
    image: 'https://images.unsplash.com/photo-1597764690523-15a1e1e8d2b5?w=400',
    nutritionalInfo: {
      protein: 18,
      fat: 2,
      fiber: 30,
      moisture: 15,
    },
    storage: 'Barn A',
    expiryDate: new Date(2024, 10, 5),
    orders: [
      { date: new Date(2024, 0, 8), quantity: 1500, status: 'delivered' },
      { date: new Date(2023, 11, 10), quantity: 1500, status: 'delivered' },
    ],
  },
  {
    id: 4,
    name: 'Mineral Mix',
    category: 'Supplements',
    currentStock: 850,
    unit: 'kg',
    unitPrice: 85,
    dailyUsage: 25,
    reorderLevel: 500,
    maxStock: 2000,
    supplier: 'VetCare',
    lastOrdered: new Date(2024, 0, 12),
    nextDelivery: new Date(2024, 0, 19),
    status: 'critical',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    nutritionalInfo: {
      calcium: 15,
      phosphorus: 8,
      salt: 5,
      minerals: 72,
    },
    storage: 'Store Room',
    expiryDate: new Date(2024, 8, 20),
    orders: [
      { date: new Date(2024, 0, 12), quantity: 500, status: 'pending' },
    ],
  },
  {
    id: 5,
    name: 'Soybean Meal',
    category: 'Concentrate',
    currentStock: 3200,
    unit: 'kg',
    unitPrice: 55,
    dailyUsage: 200,
    reorderLevel: 1500,
    maxStock: 6000,
    supplier: 'Protein Corp',
    lastOrdered: new Date(2024, 0, 7),
    nextDelivery: new Date(2024, 0, 22),
    status: 'good',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    nutritionalInfo: {
      protein: 48,
      fat: 1,
      fiber: 6,
      moisture: 10,
    },
    storage: 'Silo C',
    expiryDate: new Date(2024, 7, 15),
    orders: [
      { date: new Date(2024, 0, 7), quantity: 1000, status: 'delivered' },
    ],
  },
];

// Mock suppliers
const suppliers = [
  'AgriSupply Co.',
  'Green Farms',
  'Hay Suppliers Inc.',
  'VetCare',
  'Protein Corp',
  'Organic Feeds',
  'Farm Fresh Supplies',
];

// Mock categories
const categories = ['All', 'Concentrate', 'Silage', 'Hay', 'Supplements', 'Grains'];

// Mock AI generated images (for demo purposes - in production, these would come from AI image APIs)
const aiGeneratedImages = [
  'https://images.unsplash.com/photo-1597764690523-15a1e1e8d2b5?w=400',
  'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=400',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
];

function FeedInventory() {
  const [feedItems, setFeedItems] = useState(initialFeedItems);
  const [filteredItems, setFilteredItems] = useState(initialFeedItems);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSupplier, setFilterSupplier] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageSearchOpen, setImageSearchOpen] = useState(false);
  const [aiImageOpen, setAiImageOpen] = useState(false);
  const [searchImageQuery, setSearchImageQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderItem, setOrderItem] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [stats, setStats] = useState({
    totalStock: 0,
    totalValue: 0,
    dailyConsumption: 0,
    daysRemaining: 0,
    lowStockItems: 0,
    criticalItems: 0,
    monthlyCost: 0,
  });

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [feedItems, searchTerm, tabValue, filterCategory, filterStatus, filterSupplier]);

  const applyFilters = () => {
    let filtered = [...feedItems];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(item => item.status === 'critical');
    } else if (tabValue === 2) {
      filtered = filtered.filter(item => item.status === 'low');
    } else if (tabValue === 3) {
      filtered = filtered.filter(item => item.status === 'moderate');
    } else if (tabValue === 4) {
      filtered = filtered.filter(item => item.status === 'good');
    }

    // Category filter
    if (filterCategory !== 'All') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Supplier filter
    if (filterSupplier !== 'all') {
      filtered = filtered.filter(item => item.supplier === filterSupplier);
    }

    setFilteredItems(filtered);
  };

  const calculateStats = () => {
    const totalStock = feedItems.reduce((sum, item) => sum + item.currentStock, 0);
    const totalValue = feedItems.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);
    const dailyConsumption = feedItems.reduce((sum, item) => sum + item.dailyUsage, 0);
    const daysRemaining = dailyConsumption > 0 ? Math.floor(totalStock / dailyConsumption) : 0;
    const lowStockItems = feedItems.filter(item => item.status === 'low' || item.status === 'critical').length;
    const criticalItems = feedItems.filter(item => item.status === 'critical').length;
    const monthlyCost = feedItems.reduce((sum, item) => sum + (item.dailyUsage * 30 * item.unitPrice), 0);

    setStats({
      totalStock,
      totalValue,
      dailyConsumption,
      daysRemaining,
      lowStockItems,
      criticalItems,
      monthlyCost,
    });
  };

  const handleImageSearch = async () => {
    if (!searchImageQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate image search API call
    setTimeout(() => {
      // Mock search results - in production, use Unsplash API, Pexels API, etc.
      const mockResults = [
        { id: 1, url: 'https://images.unsplash.com/photo-1597764690523-15a1e1e8d2b5?w=400', title: 'Protein Feed', author: 'John Doe' },
        { id: 2, url: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=400', title: 'Corn Silage', author: 'Jane Smith' },
        { id: 3, url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', title: 'Mineral Mix', author: 'Bob Johnson' },
        { id: 4, url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400', title: 'Soybean Meal', author: 'Alice Brown' },
        { id: 5, url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', title: 'Hay Bales', author: 'Charlie Wilson' },
        { id: 6, url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', title: 'Feed Storage', author: 'Diana Miller' },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleAIGenerate = () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI image generation
    setTimeout(() => {
      setGeneratedImages(aiGeneratedImages);
      setIsGenerating(false);
    }, 3000);
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    if (selectedItem) {
      // Update the selected item's image
      setFeedItems(feedItems.map(item => 
        item.id === selectedItem.id ? { ...item, image: imageUrl } : item
      ));
      setSnackbar({
        open: true,
        message: 'Image updated successfully!',
        severity: 'success',
      });
    }
    setImageDialogOpen(false);
    setAiImageOpen(false);
    setImageSearchOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleFavorite = (imageUrl) => {
    if (favorites.includes(imageUrl)) {
      setFavorites(favorites.filter(fav => fav !== imageUrl));
    } else {
      setFavorites([...favorites, imageUrl]);
    }
  };

  const handleReorder = (item) => {
    setOrderItem(item);
    setOrderQuantity(Math.max(item.reorderLevel - item.currentStock, item.dailyUsage * 7));
    setOrderDialogOpen(true);
  };

  const handlePlaceOrder = () => {
    if (orderItem && orderQuantity > 0) {
      const updatedItems = feedItems.map(item => 
        item.id === orderItem.id 
          ? { 
              ...item, 
              orders: [...item.orders, { 
                date: new Date(), 
                quantity: orderQuantity, 
                status: 'pending' 
              }],
              nextDelivery: addDays(new Date(), 7),
            } 
          : item
      );
      setFeedItems(updatedItems);
      setSnackbar({
        open: true,
        message: `Order placed for ${orderQuantity} ${orderItem.unit} of ${orderItem.name}`,
        severity: 'success',
      });
      setOrderDialogOpen(false);
    }
  };

  const handleUpdateStock = (item, adjustment) => {
    const newStock = item.currentStock + adjustment;
    if (newStock >= 0) {
      const updatedItems = feedItems.map(i => 
        i.id === item.id 
          ? { 
              ...i, 
              currentStock: newStock,
              status: getStockStatus(newStock, i.reorderLevel, i.maxStock),
            } 
          : i
      );
      setFeedItems(updatedItems);
      setSnackbar({
        open: true,
        message: `Stock updated to ${newStock} ${item.unit}`,
        severity: 'success',
      });
    }
  };

  const getStockStatus = (stock, reorderLevel, maxStock) => {
    if (stock <= reorderLevel * 0.5) return 'critical';
    if (stock <= reorderLevel) return 'low';
    if (stock >= maxStock * 0.8) return 'good';
    return 'moderate';
  };

  const getStockLevel = (stock, maxStock) => {
    return (stock / maxStock) * 100;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'error';
      case 'low': return 'warning';
      case 'moderate': return 'info';
      case 'good': return 'success';
      default: return 'default';
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const days = differenceInDays(expiryDate, new Date());
    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires today';
    if (days <= 7) return `Expires in ${days} days`;
    return `${days} days left`;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link color="inherit" href="/">Dashboard</Link>
        <Link color="inherit" href="/inventory">Inventory</Link>
        <Typography color="text.primary">Feed Inventory</Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Feed Inventory Management
        </Typography>
        <Box>
          <Tooltip title="AI Image Generator">
            <Button
              variant="outlined"
              startIcon={<AutoAwesome />}
              onClick={() => setAiImageOpen(true)}
              sx={{ mr: 2 }}
            >
              AI Generate
            </Button>
          </Tooltip>
          <Tooltip title="Image Search">
            <Button
              variant="outlined"
              startIcon={<ImageSearch />}
              onClick={() => setImageSearchOpen(true)}
              sx={{ mr: 2 }}
            >
              Search Images
            </Button>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={() => setSnackbar({ open: true, message: 'Data refreshed!', severity: 'success' })} sx={{ mr: 1 }}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton onClick={() => {}} sx={{ mr: 1 }}>
              <Download />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddShoppingCart />}
            onClick={() => handleOpenDialog('add')}
          >
            Add Feed Item
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Stock
                  </Typography>
                  <Typography variant="h6">{stats.totalStock.toLocaleString()} kg</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Value: ₹{stats.totalValue.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Inventory />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Daily Consumption
                  </Typography>
                  <Typography variant="h6">{stats.dailyConsumption} kg</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Days left: {stats.daysRemaining}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Low Stock Items
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {stats.lowStockItems}
                  </Typography>
                  <Typography variant="caption" color="error.main">
                    Critical: {stats.criticalItems}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Warning />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Monthly Cost
                  </Typography>
                  <Typography variant="h6">₹{stats.monthlyCost.toLocaleString()}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
                    <Typography variant="caption" color="error.main" ml={0.5}>
                      -5% vs last month
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Suppliers
                  </Typography>
                  <Typography variant="h6">{suppliers.length}</Typography>
                  <Typography variant="caption" color="success.main">
                    3 new this month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Store />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All Items" />
          <Tab label="Critical" />
          <Tab label="Low Stock" />
          <Tab label="Moderate" />
          <Tab label="Good Stock" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search feed items..."
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
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
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
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="good">Good</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Supplier</InputLabel>
              <Select
                value={filterSupplier}
                label="Supplier"
                onChange={(e) => setFilterSupplier(e.target.value)}
              >
                <MenuItem value="all">All Suppliers</MenuItem>
                {suppliers.map(supplier => (
                  <MenuItem key={supplier} value={supplier}>{supplier}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button fullWidth variant="outlined" startIcon={<FilterList />}>
              Advanced Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Feed Items Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredItems
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: '100%',
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 1,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedItem(item);
                          setImageDialogOpen(true);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.category} • {item.supplier}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip
                            label={item.status.toUpperCase()}
                            color={getStatusColor(item.status)}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <IconButton size="small" onClick={() => handleOpenDialog('edit', item)}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small">
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>

                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="caption" color="text.secondary">
                            Current Stock
                          </Typography>
                          <Typography variant="body1">
                            {item.currentStock.toLocaleString()} {item.unit}
                          </Typography>
                          <Box sx={{ width: '100%', mt: 0.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={getStockLevel(item.currentStock, item.maxStock)}
                              color={getStatusColor(item.status)}
                              sx={{ height: 8, borderRadius: 5 }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                          <Typography variant="caption" color="text.secondary">
                            Daily Usage
                          </Typography>
                          <Typography variant="body1">
                            {item.dailyUsage} {item.unit}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                          <Typography variant="caption" color="text.secondary">
                            Unit Price
                          </Typography>
                          <Typography variant="body1">
                            ₹{item.unitPrice}/{item.unit}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                          <Typography variant="caption" color="text.secondary">
                            Reorder Level
                          </Typography>
                          <Typography variant="body1">
                            {item.reorderLevel} {item.unit}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="caption" color="text.secondary">
                            Next Delivery
                          </Typography>
                          <Typography variant="body1">
                            {format(item.nextDelivery, 'MMM dd, yyyy')}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Box>
                          <Chip
                            icon={<Schedule />}
                            label={getDaysUntilExpiry(item.expiryDate)}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            icon={<Grass />}
                            label={`Protein: ${item.nutritionalInfo.protein || item.nutritionalInfo.calcium || 'N/A'}%`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        <Box>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Remove />}
                            onClick={() => handleUpdateStock(item, -item.dailyUsage)}
                            sx={{ mr: 1 }}
                          >
                            Use
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => handleUpdateStock(item, item.dailyUsage)}
                            sx={{ mr: 1 }}
                          >
                            Add
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<ShoppingCart />}
                            onClick={() => handleReorder(item)}
                          >
                            Reorder
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Image Selection Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Select Image for {selectedItem?.name}</Typography>
            <Box>
              <Tooltip title="Search Images">
                <IconButton onClick={() => { setImageDialogOpen(false); setImageSearchOpen(true); }}>
                  <ImageSearch />
                </IconButton>
              </Tooltip>
              <Tooltip title="AI Generate">
                <IconButton onClick={() => { setImageDialogOpen(false); setAiImageOpen(true); }}>
                  <AutoAwesome />
                </IconButton>
              </Tooltip>
              <Tooltip title="Upload">
                <IconButton component="label">
                  <CloudUpload />
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <ImageList cols={3} rowHeight={200}>
            {feedItems.map((item) => (
              <ImageListItem key={item.id} sx={{ cursor: 'pointer' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  style={{ height: 200, objectFit: 'cover' }}
                  onClick={() => handleImageSelect(item.image)}
                />
                <ImageListItemBar
                  title={item.name}
                  subtitle={item.category}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      onClick={() => handleToggleFavorite(item.image)}
                    >
                      {favorites.includes(item.image) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>

      {/* Image Search Dialog */}
      <Dialog open={imageSearchOpen} onClose={() => setImageSearchOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <ImageSearch sx={{ mr: 1 }} />
            Search Images Online
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              placeholder="Search for feed images..."
              value={searchImageQuery}
              onChange={(e) => setSearchImageQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleImageSearch()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={handleImageSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? <CircularProgress size={24} /> : 'Search'}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {isSearching && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {searchResults.length > 0 && !isSearching && (
            <ImageList cols={3} rowHeight={200} sx={{ mt: 3 }}>
              {searchResults.map((result) => (
                <ImageListItem key={result.id} sx={{ cursor: 'pointer' }}>
                  <img
                    src={result.url}
                    alt={result.title}
                    loading="lazy"
                    style={{ height: 200, objectFit: 'cover' }}
                    onClick={() => handleImageSelect(result.url)}
                  />
                  <ImageListItemBar
                    title={result.title}
                    subtitle={`by ${result.author}`}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        onClick={() => window.open(result.url, '_blank')}
                      >
                        <OpenInNew />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Image Generation Dialog */}
      <Dialog open={aiImageOpen} onClose={() => setAiImageOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
            AI Image Generator
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Describe the image you want to generate... (e.g., 'high quality cattle feed in a barn', 'organic feed storage')"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleAIGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesome />}
              >
                {isGenerating ? 'Generating...' : 'Generate Images'}
              </Button>
            </Box>
          </Box>

          {isGenerating && (
            <Box textAlign="center" sx={{ mt: 4 }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>
                AI is generating your images... This may take a moment.
              </Typography>
            </Box>
          )}

          {generatedImages.length > 0 && !isGenerating && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Generated Images
              </Typography>
              <ImageList cols={3} rowHeight={200}>
                {generatedImages.map((image, index) => (
                  <ImageListItem key={index} sx={{ cursor: 'pointer' }}>
                    <img
                      src={image}
                      alt={`Generated ${index + 1}`}
                      loading="lazy"
                      style={{ height: 200, objectFit: 'cover' }}
                      onClick={() => handleImageSelect(image)}
                    />
                    <ImageListItemBar
                      title={`AI Generated ${index + 1}`}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          onClick={() => handleToggleFavorite(image)}
                        >
                          {favorites.includes(image) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <ShoppingCart sx={{ mr: 1 }} />
            Place Order - {orderItem?.name}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Current Stock: {orderItem?.currentStock} {orderItem?.unit}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reorder Level: {orderItem?.reorderLevel} {orderItem?.unit}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Daily Usage: {orderItem?.dailyUsage} {orderItem?.unit}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Order Quantity"
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 0)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{orderItem?.unit}</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Estimated Cost: ₹{(orderQuantity * (orderItem?.unitPrice || 0)).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated Delivery: {format(addDays(new Date(), 7), 'MMM dd, yyyy')}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Feed Item Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Feed Item' : 'Edit Feed Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Feed Name" defaultValue={selectedItem?.name} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue={selectedItem?.category || ''}>
                  <MenuItem value="Concentrate">Concentrate</MenuItem>
                  <MenuItem value="Silage">Silage</MenuItem>
                  <MenuItem value="Hay">Hay</MenuItem>
                  <MenuItem value="Supplements">Supplements</MenuItem>
                  <MenuItem value="Grains">Grains</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Initial Stock"
                type="number"
                defaultValue={selectedItem?.currentStock || ''}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                defaultValue={selectedItem?.unitPrice || ''}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  endAdornment: <InputAdornment position="end">/kg</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Daily Usage"
                type="number"
                defaultValue={selectedItem?.dailyUsage || ''}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg/day</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Reorder Level"
                type="number"
                defaultValue={selectedItem?.reorderLevel || ''}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select label="Supplier" defaultValue={selectedItem?.supplier || ''}>
                  {suppliers.map(supplier => (
                    <MenuItem key={supplier} value={supplier}>{supplier}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {dialogMode === 'add' ? 'Add Item' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default FeedInventory;