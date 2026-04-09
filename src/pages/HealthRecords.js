import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Tooltip,
  LinearProgress,
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepConnector,
  stepConnectorClasses,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  CardMedia,
  CardActions,
  CardActionArea,
  Fade,
  Zoom,
  Grow,
  Slide,
  Collapse,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Backdrop,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  LocalHospital,
  Vaccines,
  Medication,
  Warning,
  ExpandMore,
  Upload,
  Camera,
  Image,
  ImageSearch,
  AutoAwesome,
  Biotech,
  Science,
  HealthAndSafety,
  MonitorHeart,
  Bloodtype,
  Favorite,
  CalendarToday,
  Schedule,
  AccessTime,
  Person,
  Phone,
  Email,
  Print,
  Download,
  Share,
  Refresh,
  MoreVert,
  FilterList,
  Sort,
  ViewModule,
  ViewList,
  ViewCompact,
  Dashboard,
  Settings,
  Help,
  Feedback,
  BugReport,
  CloudUpload,
  CloudDownload,
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
  Timer10,
  Timer3,
  HourglassTop,
  HourglassBottom,
  History,
  Timeline,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Error,
  Info,
  Warning as WarningIcon,
  Lightbulb,
  EmojiObjects,
  Psychology,
  Insights,
  Analytics,
  ShowChart,
  BubbleChart,
  MultilineChart,
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
  Star,
  StarBorder,
  Bookmark,
  BookmarkBorder,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  ViewCompact as ViewCompactIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, formatDistance, subDays, addDays, differenceInDays, isPast, isToday, isTomorrow } from 'date-fns';

// Mock data - Replace with API calls
const initialHealthRecords = [
  {
    id: 1,
    cattleId: 'C-2024-001',
    cattleName: 'Bossy',
    breed: 'Holstein',
    age: 4,
    recordType: 'Vaccination',
    description: 'Foot and Mouth Disease Vaccine',
    date: new Date(2024, 0, 15),
    nextDueDate: new Date(2024, 6, 15),
    administeredBy: 'Dr. Smith',
    administeredByContact: '+1-800-555-0123',
    cost: 45,
    status: 'Completed',
    diagnosis: 'Routine vaccination',
    symptoms: ['None', 'Routine check'],
    medications: [
      { name: 'FMD Vaccine', dosage: '2ml', frequency: 'Once', duration: '1 day' }
    ],
    attachments: [],
    notes: 'First vaccination of the year',
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 15),
  },
  {
    id: 2,
    cattleId: 'C-2024-002',
    cattleName: 'Bella',
    breed: 'Jersey',
    age: 3,
    recordType: 'Treatment',
    description: 'Mastitis Treatment',
    date: new Date(2024, 0, 10),
    nextDueDate: new Date(2024, 0, 17),
    administeredBy: 'Dr. Johnson',
    administeredByContact: '+1-800-555-0456',
    cost: 120,
    status: 'In Progress',
    diagnosis: 'Clinical Mastitis - Left front quarter',
    symptoms: ['Swollen udder', 'Reduced milk production', 'Fever'],
    medications: [
      { name: 'Cephaparin', dosage: '10ml', frequency: 'Every 12 hours', duration: '5 days' },
      { name: 'Anti-inflammatory', dosage: '5ml', frequency: 'Once daily', duration: '3 days' }
    ],
    attachments: [],
    notes: 'Cow showing improvement after 2 days of treatment',
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 12),
  },
  {
    id: 3,
    cattleId: 'C-2024-003',
    cattleName: 'Daisy',
    breed: 'Holstein',
    age: 5,
    recordType: 'Checkup',
    description: 'Regular Health Checkup',
    date: new Date(2024, 0, 5),
    nextDueDate: new Date(2024, 3, 5),
    administeredBy: 'Dr. Williams',
    administeredByContact: '+1-800-555-0789',
    cost: 60,
    status: 'Completed',
    diagnosis: 'Healthy - No issues detected',
    symptoms: ['None'],
    medications: [],
    attachments: [],
    notes: 'All vital signs normal. Recommended to continue current diet.',
    createdAt: new Date(2024, 0, 5),
    updatedAt: new Date(2024, 0, 5),
  },
  {
    id: 4,
    cattleId: 'C-2024-004',
    cattleName: 'Lily',
    breed: 'Brown Swiss',
    age: 2,
    recordType: 'Surgery',
    description: 'Hoof Trimming and Treatment',
    date: new Date(2024, 0, 3),
    nextDueDate: new Date(2024, 6, 3),
    administeredBy: 'Dr. Brown',
    administeredByContact: '+1-800-555-0321',
    cost: 200,
    status: 'Completed',
    diagnosis: 'Overgrown hooves with mild infection',
    symptoms: ['Lameness', 'Reluctance to walk', 'Hoof overgrowth'],
    medications: [
      { name: 'Antibiotic spray', dosage: 'Apply locally', frequency: 'Once daily', duration: '7 days' },
      { name: 'Pain relief', dosage: '5ml', frequency: 'Once daily', duration: '3 days' }
    ],
    attachments: [],
    notes: 'Hooves trimmed and treated. Cow recovering well.',
    createdAt: new Date(2024, 0, 3),
    updatedAt: new Date(2024, 0, 5),
  },
];

// Available cattle for selection
const availableCattle = [
  { id: 'C-2024-001', name: 'Bossy', breed: 'Holstein' },
  { id: 'C-2024-002', name: 'Bella', breed: 'Jersey' },
  { id: 'C-2024-003', name: 'Daisy', breed: 'Holstein' },
  { id: 'C-2024-004', name: 'Lily', breed: 'Brown Swiss' },
  { id: 'C-2024-005', name: 'Molly', breed: 'Holstein' },
  { id: 'C-2024-006', name: 'Rose', breed: 'Guernsey' },
];

// Disease detection models
const diseaseModels = {
  mastitis: {
    name: 'Mastitis',
    symptoms: ['Swollen udder', 'Reduced milk', 'Fever', 'Discolored milk'],
    treatment: 'Antibiotics, anti-inflammatories, frequent milking',
    confidence: 0.92,
  },
  lameness: {
    name: 'Lameness',
    symptoms: ['Limping', 'Reluctance to walk', 'Swollen joints', 'Abnormal posture'],
    treatment: 'Hoof trimming, pain relief, rest, antibiotics if infected',
    confidence: 0.88,
  },
  ketosis: {
    name: 'Ketosis',
    symptoms: ['Weight loss', 'Reduced appetite', 'Dull coat', 'Sweet breath'],
    treatment: 'Propylene glycol, energy supplements, glucose',
    confidence: 0.85,
  },
  pneumonia: {
    name: 'Pneumonia',
    symptoms: ['Coughing', 'Nasal discharge', 'Fever', 'Rapid breathing'],
    treatment: 'Antibiotics, anti-inflammatories, rest, good ventilation',
    confidence: 0.9,
  },
  footRot: {
    name: 'Foot Rot',
    symptoms: ['Lameness', 'Swollen foot', 'Foul odor', 'Lesions between toes'],
    treatment: 'Antibiotics, foot baths, cleaning, dry environment',
    confidence: 0.87,
  },
};

function HealthRecords() {
  const theme = useTheme();
  
  // State management
  const [healthRecords, setHealthRecords] = useState(initialHealthRecords);
  const [filteredRecords, setFilteredRecords] = useState(initialHealthRecords);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [customStartDate, setCustomStartDate] = useState(subDays(new Date(), 30));
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewMode, setViewMode] = useState('table');
  const [expandedSections, setExpandedSections] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    recordType: '',
    cattleId: '',
    cattleName: '',
    breed: '',
    age: '',
    description: '',
    diagnosis: '',
    symptoms: [],
    date: new Date(),
    nextDueDate: null,
    administeredBy: '',
    administeredByContact: '',
    cost: '',
    status: 'Pending',
    medications: [],
    notes: '',
  });

  // Image detection states
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // AI detection states
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    totalTreatments: 0,
    totalVaccinations: 0,
    dueSoon: 0,
    medications: 0,
    criticalCases: 0,
    recoveryRate: 0,
    averageCost: 0,
  });

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [healthRecords, searchTerm, tabValue, filterType, filterStatus, dateRange, customStartDate, customEndDate]);

  const applyFilters = () => {
    let filtered = [...healthRecords];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.cattleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.cattleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.administeredBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tab filter
    const now = new Date();
    if (tabValue === 1) { // Due Soon
      filtered = filtered.filter(record => 
        record.nextDueDate && 
        differenceInDays(record.nextDueDate, now) <= 7 &&
        differenceInDays(record.nextDueDate, now) >= 0
      );
    } else if (tabValue === 2) { // Overdue
      filtered = filtered.filter(record => 
        record.nextDueDate && isPast(record.nextDueDate) && !isToday(record.nextDueDate)
      );
    } else if (tabValue === 3) { // Critical
      filtered = filtered.filter(record => record.status === 'Critical');
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(record => record.recordType === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(record => record.status === filterStatus);
    }

    // Date range filter
    if (dateRange === 'today') {
      filtered = filtered.filter(record => isToday(record.date));
    } else if (dateRange === 'week') {
      const weekAgo = subDays(new Date(), 7);
      filtered = filtered.filter(record => record.date >= weekAgo);
    } else if (dateRange === 'month') {
      const monthAgo = subDays(new Date(), 30);
      filtered = filtered.filter(record => record.date >= monthAgo);
    } else if (dateRange === 'custom') {
      filtered = filtered.filter(record => 
        record.date >= customStartDate && record.date <= customEndDate
      );
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => b.date - a.date);

    setFilteredRecords(filtered);
  };

  const calculateStats = () => {
    const now = new Date();
    const totalTreatments = healthRecords.filter(r => r.recordType === 'Treatment').length;
    const totalVaccinations = healthRecords.filter(r => r.recordType === 'Vaccination').length;
    const dueSoon = healthRecords.filter(r => 
      r.nextDueDate && 
      differenceInDays(r.nextDueDate, now) <= 7 &&
      differenceInDays(r.nextDueDate, now) >= 0
    ).length;
    const medications = healthRecords.reduce((sum, r) => sum + (r.medications?.length || 0), 0);
    const criticalCases = healthRecords.filter(r => r.status === 'Critical').length;
    const completedCases = healthRecords.filter(r => r.status === 'Completed').length;
    const recoveryRate = healthRecords.length > 0 ? (completedCases / healthRecords.length) * 100 : 0;
    const totalCost = healthRecords.reduce((sum, r) => sum + (r.cost || 0), 0);
    const averageCost = healthRecords.length > 0 ? totalCost / healthRecords.length : 0;

    setStats({
      totalTreatments,
      totalVaccinations,
      dueSoon,
      medications,
      criticalCases,
      recoveryRate: recoveryRate.toFixed(1),
      averageCost: averageCost.toFixed(2),
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If cattle is selected, auto-fill cattle name and breed
    if (name === 'cattleId' && value) {
      const selectedCattle = availableCattle.find(c => c.id === value);
      if (selectedCattle) {
        setFormData(prev => ({
          ...prev,
          cattleName: selectedCattle.name,
          breed: selectedCattle.breed,
        }));
      }
    }
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSymptomsChange = (e) => {
    const value = e.target.value;
    const symptomsArray = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setFormData({
      ...formData,
      symptoms: symptomsArray,
    });
  };

  // Handle image upload for disease detection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyze image for disease detection
  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis - Replace with actual API call
    setTimeout(() => {
      // Mock detection results
      const diseases = Object.keys(diseaseModels).map(key => ({
        ...diseaseModels[key],
        probability: Math.random() * 100,
      }));
      
      // Sort by probability and get top 3
      const topResults = diseases
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3)
        .map(d => ({
          ...d,
          probability: Math.round(d.probability * 100) / 100,
        }));
      
      setDetectionResults(topResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  // AI symptom analysis
  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzingAI(true);
    
    // Simulate AI analysis - Replace with actual API call
    setTimeout(() => {
      // Mock analysis
      const possibleDiseases = Object.keys(diseaseModels)
        .map(key => ({
          ...diseaseModels[key],
          match: Math.random() * 100,
          confidence: Math.random() * 100,
        }))
        .sort((a, b) => b.match - a.match)
        .slice(0, 3)
        .map(d => ({
          ...d,
          match: Math.round(d.match * 100) / 100,
          confidence: Math.round(d.confidence * 100) / 100,
        }));
      
      setAiAnalysis({
        symptoms: symptoms.split(',').map(s => s.trim()),
        possibleDiseases,
        recommendations: [
          'Consult veterinarian immediately',
          'Isolate affected animal',
          'Monitor temperature twice daily',
          'Increase fluid intake',
        ],
        urgency: possibleDiseases[0]?.match > 70 ? 'High' : possibleDiseases[0]?.match > 40 ? 'Medium' : 'Low',
      });
      
      setIsAnalyzingAI(false);
    }, 2000);
  };

  const handleOpenDialog = (mode, record = null) => {
    setDialogMode(mode);
    setSelectedRecord(record);
    
    if (record) {
      // Populate form with record data for edit/view
      setFormData({
        recordType: record.recordType || '',
        cattleId: record.cattleId || '',
        cattleName: record.cattleName || '',
        breed: record.breed || '',
        age: record.age || '',
        description: record.description || '',
        diagnosis: record.diagnosis || '',
        symptoms: record.symptoms || [],
        date: record.date || new Date(),
        nextDueDate: record.nextDueDate || null,
        administeredBy: record.administeredBy || '',
        administeredByContact: record.administeredByContact || '',
        cost: record.cost || '',
        status: record.status || 'Pending',
        medications: record.medications || [],
        notes: record.notes || '',
      });
    } else {
      // Reset form for add mode
      setFormData({
        recordType: '',
        cattleId: '',
        cattleName: '',
        breed: '',
        age: '',
        description: '',
        diagnosis: '',
        symptoms: [],
        date: new Date(),
        nextDueDate: null,
        administeredBy: '',
        administeredByContact: '',
        cost: '',
        status: 'Pending',
        medications: [],
        notes: '',
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRecord(null);
    setOpenDialog(false);
  };

  const handleSaveRecord = () => {
    // Validate required fields
    if (!formData.recordType || !formData.cattleId || !formData.description) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    // Find cattle details
    const selectedCattle = availableCattle.find(c => c.id === formData.cattleId);
    
    if (dialogMode === 'edit' && selectedRecord) {
      // Update existing record
      const updatedRecords = healthRecords.map(record => 
        record.id === selectedRecord.id 
          ? { 
              ...record, 
              ...formData,
              cattleName: selectedCattle?.name || formData.cattleName,
              breed: selectedCattle?.breed || formData.breed,
              updatedAt: new Date(),
            } 
          : record
      );
      setHealthRecords(updatedRecords);
      setSnackbar({
        open: true,
        message: 'Health record updated successfully!',
        severity: 'success',
      });
    } else if (dialogMode === 'add') {
      // Create new record
      const newRecord = {
        id: healthRecords.length + 1,
        ...formData,
        cattleName: selectedCattle?.name || '',
        breed: selectedCattle?.breed || '',
        age: selectedCattle ? 3 : 0, // Default age or calculate from DOB
        medications: [],
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setHealthRecords([newRecord, ...healthRecords]);
      setSnackbar({
        open: true,
        message: 'Health record added successfully!',
        severity: 'success',
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteRecord = (recordId) => {
    setHealthRecords(healthRecords.filter(r => r.id !== recordId));
    setSnackbar({
      open: true,
      message: 'Health record deleted successfully!',
      severity: 'success',
    });
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
    const headers = ['Date', 'Cattle ID', 'Cattle Name', 'Type', 'Description', 'Diagnosis', 'Status', 'Cost'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(r => [
        format(r.date, 'yyyy-MM-dd'),
        r.cattleId,
        r.cattleName,
        r.recordType,
        `"${r.description}"`,
        `"${r.diagnosis}"`,
        r.status,
        r.cost,
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_records_${format(new Date(), 'yyyyMMdd')}.csv`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Records exported successfully!',
      severity: 'success',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Health Records',
          text: `Health records summary - ${filteredRecords.length} records`,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Vaccination': return 'success';
      case 'Treatment': return 'warning';
      case 'Checkup': return 'info';
      case 'Surgery': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Vaccination': return <Vaccines />;
      case 'Treatment': return <Medication />;
      case 'Checkup': return <MonitorHeart />;
      case 'Surgery': return <LocalHospital />;
      default: return <LocalHospital />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Health Records Management
        </Typography>
        <Box>
          <Tooltip title="AI Disease Detection">
            <Button
              variant="outlined"
              startIcon={<AutoAwesome />}
              onClick={() => setAiDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              AI Detection
            </Button>
          </Tooltip>
          <Tooltip title="Detect from Image">
            <Button
              variant="outlined"
              startIcon={<ImageSearch />}
              onClick={() => setImageDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              Image Analysis
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
          <Tooltip title="Share">
            <IconButton onClick={handleShare} sx={{ mr: 1 }}>
              <Share />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton onClick={() => window.print()} sx={{ mr: 1 }}>
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="View mode">
            <IconButton 
              onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
              sx={{ mr: 1 }}
            >
              {viewMode === 'table' ? <ViewModule /> : <ViewList />}
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog('add')}
          >
            Add Health Record
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
                    Total Treatments
                  </Typography>
                  <Typography variant="h4">{stats.totalTreatments}</Typography>
                  <Typography variant="body2" color="success.main">
                    +{stats.totalVaccinations} vaccinations
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <LocalHospital />
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
                    Due Soon
                  </Typography>
                  <Typography variant="h4" color="warning.main">{stats.dueSoon}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next 7 days
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Schedule />
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
                    Critical Cases
                  </Typography>
                  <Typography variant="h4" color="error.main">{stats.criticalCases}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Need attention
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Warning />
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
                    Recovery Rate
                  </Typography>
                  <Typography variant="h4" color="success.main">{stats.recoveryRate}%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Cost: ${stats.averageCost}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <HealthAndSafety />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All Records" />
          <Tab label="Due Soon" />
          <Tab label="Overdue" />
          <Tab label="Critical" />
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
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Vaccination">Vaccination</MenuItem>
                <MenuItem value="Treatment">Treatment</MenuItem>
                <MenuItem value="Checkup">Checkup</MenuItem>
                <MenuItem value="Surgery">Surgery</MenuItem>
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
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </FormControl>
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
          <Grid item xs={12} md={dateRange === 'custom' ? 1 : 3}>
            <Button fullWidth variant="outlined" startIcon={<FilterListIcon />}>
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Health Records Display */}
      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Date</TableCell>
                <TableCell>Cattle</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Next Due</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow key={record.id} hover>
                    <TableCell>{format(record.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.light' }}>
                          {record.cattleName[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{record.cattleName}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {record.cattleId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getTypeIcon(record.recordType)}
                        label={record.recordType}
                        color={getTypeColor(record.recordType)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={record.description}>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                          {record.description}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={record.diagnosis}>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                          {record.diagnosis}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {record.nextDueDate ? (
                        <Chip
                          label={format(record.nextDueDate, 'MMM dd, yyyy')}
                          color={isPast(record.nextDueDate) && !isToday(record.nextDueDate) ? 'error' : 'default'}
                          size="small"
                          variant="outlined"
                        />
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        color={getStatusColor(record.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleOpenDialog('view', record)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => handleOpenDialog('edit', record)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDeleteRecord(record.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add to favorites">
                        <IconButton size="small" onClick={() => toggleFavorite(record.id)}>
                          {favorites.includes(record.id) ? <Star color="warning" /> : <StarBorder />}
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
            count={filteredRecords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Grid container spacing={3}>
          {filteredRecords
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((record) => (
              <Grid item xs={12} md={6} lg={4} key={record.id}>
                <Zoom in={true}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ bgcolor: getTypeColor(record.recordType) + '.main', mr: 2 }}>
                            {getTypeIcon(record.recordType)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">{record.cattleName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {record.cattleId}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={record.status}
                          color={getStatusColor(record.status)}
                          size="small"
                        />
                      </Box>

                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarToday fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Date"
                            secondary={format(record.date, 'PPP')}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocalHospital fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Type"
                            secondary={record.recordType}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Info fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Diagnosis"
                            secondary={record.diagnosis}
                          />
                        </ListItem>
                        {record.medications.length > 0 && (
                          <ListItem>
                            <ListItemIcon>
                              <Medication fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Medications"
                              secondary={record.medications.map(m => m.name).join(', ')}
                            />
                          </ListItem>
                        )}
                      </List>

                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => handleOpenDialog('view', record)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
        </Grid>
      )}

      {/* Add/Edit Health Record Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' && 'Add New Health Record'}
          {dialogMode === 'edit' && 'Edit Health Record'}
          {dialogMode === 'view' && 'Health Record Details'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedRecord && dialogMode === 'view' ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">{selectedRecord.cattleName}</Typography>
                  <Chip
                    label={selectedRecord.status}
                    color={getStatusColor(selectedRecord.status)}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {selectedRecord.cattleId} • {selectedRecord.breed} • {selectedRecord.age} years
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date
                </Typography>
                <Typography>{format(selectedRecord.date, 'PPPP')}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Record Type
                </Typography>
                <Chip
                  icon={getTypeIcon(selectedRecord.recordType)}
                  label={selectedRecord.recordType}
                  color={getTypeColor(selectedRecord.recordType)}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography>{selectedRecord.description}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Diagnosis
                </Typography>
                <Typography>{selectedRecord.diagnosis}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Symptoms
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {selectedRecord.symptoms.map((symptom, index) => (
                    <Chip key={index} label={symptom} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Medications
                </Typography>
                <List>
                  {selectedRecord.medications.map((med, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Medication fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={med.name}
                        secondary={`${med.dosage} • ${med.frequency} • ${med.duration}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Administered By
                </Typography>
                <Box display="flex" alignItems="center">
                  <Person fontSize="small" sx={{ mr: 1 }} />
                  <Typography>{selectedRecord.administeredBy}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Contact
                </Typography>
                <Box display="flex" alignItems="center">
                  <Phone fontSize="small" sx={{ mr: 1 }} />
                  <Typography>{selectedRecord.administeredByContact}</Typography>
                </Box>
              </Grid>

              {selectedRecord.nextDueDate && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Next Due Date
                  </Typography>
                  <Typography>{format(selectedRecord.nextDueDate, 'PPPP')}</Typography>
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cost
                </Typography>
                <Typography>${selectedRecord.cost}</Typography>
              </Grid>

              {selectedRecord.notes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Notes
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography>{selectedRecord.notes}</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Record Type</InputLabel>
                  <Select
                    name="recordType"
                    value={formData.recordType}
                    onChange={handleSelectChange}
                    label="Record Type"
                  >
                    <MenuItem value="Vaccination">Vaccination</MenuItem>
                    <MenuItem value="Treatment">Treatment</MenuItem>
                    <MenuItem value="Checkup">Regular Checkup</MenuItem>
                    <MenuItem value="Surgery">Surgery</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Select Cattle</InputLabel>
                  <Select
                    name="cattleId"
                    value={formData.cattleId}
                    onChange={handleSelectChange}
                    label="Select Cattle"
                  >
                    {availableCattle.map(cattle => (
                      <MenuItem key={cattle.id} value={cattle.id}>
                        {cattle.name} ({cattle.id}) - {cattle.breed}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Diagnosis"
                  name="diagnosis"
                  multiline
                  rows={2}
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Symptoms (comma separated)"
                  value={formData.symptoms?.join(', ') || ''}
                  onChange={handleSymptomsChange}
                  placeholder="e.g., fever, swelling, reduced appetite"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={(date) => handleDateChange('date', date)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Next Due Date"
                    value={formData.nextDueDate}
                    onChange={(date) => handleDateChange('nextDueDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Administered By"
                  name="administeredBy"
                  value={formData.administeredBy}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="administeredByContact"
                  value={formData.administeredByContact}
                  onChange={handleInputChange}
                  placeholder="+1-800-555-0123"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cost"
                  name="cost"
                  type="number"
                  value={formData.cost}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleSelectChange}
                    label="Status"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about the health record..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {dialogMode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {dialogMode !== 'view' && (
            <Button variant="contained" onClick={handleSaveRecord}>
              {dialogMode === 'add' ? 'Save Record' : 'Update Record'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Image Detection Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <ImageSearch sx={{ mr: 1, color: 'primary.main' }} />
            Disease Detection from Image
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<CloudUpload />}
              sx={{ height: 100, border: '2px dashed', borderColor: 'primary.main' }}
            >
              Upload Image for Analysis
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>

            {imagePreview && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }}
                />
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    startIcon={isAnalyzing ? <CircularProgress size={20} /> : <AutoAwesome />}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                  </Button>
                </Box>
              </Box>
            )}

            {detectionResults && !isAnalyzing && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Detection Results
                </Typography>
                <Grid container spacing={2}>
                  {detectionResults.map((result, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined" sx={{ 
                        borderLeft: 6, 
                        borderLeftColor: result.probability > 70 ? 'error.main' : 
                                        result.probability > 40 ? 'warning.main' : 'info.main'
                      }}>
                        <CardContent>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                              <Typography variant="subtitle1">{result.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {result.symptoms.slice(0, 3).join(' • ')}
                              </Typography>
                            </Box>
                            <Box textAlign="right">
                              <Typography variant="h6" color={
                                result.probability > 70 ? 'error.main' :
                                result.probability > 40 ? 'warning.main' : 'info.main'
                              }>
                                {result.probability}%
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                probability
                              </Typography>
                            </Box>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={result.probability} 
                            color={result.probability > 70 ? 'error' : result.probability > 40 ? 'warning' : 'info'}
                            sx={{ mt: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Treatment:</strong> {result.treatment}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(0)}%
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button 
                    variant="contained"
                    onClick={() => {
                      setImageDialogOpen(false);
                      handleOpenDialog('add');
                    }}
                  >
                    Create Health Record
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* AI Symptom Analysis Dialog */}
      <Dialog open={aiDialogOpen} onClose={() => setAiDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
            AI Symptom Analysis
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Describe Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., fever, swollen udder, reduced appetite, lethargy"
              helperText="Enter symptoms separated by commas"
            />
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={analyzeSymptoms}
                disabled={isAnalyzingAI || !symptoms.trim()}
                startIcon={isAnalyzingAI ? <CircularProgress size={20} /> : <AutoAwesome />}
              >
                {isAnalyzingAI ? 'Analyzing...' : 'Analyze Symptoms'}
              </Button>
            </Box>

            {aiAnalysis && !isAnalyzingAI && (
              <Box sx={{ mt: 3 }}>
                <Alert 
                  severity={aiAnalysis.urgency === 'High' ? 'error' : aiAnalysis.urgency === 'Medium' ? 'warning' : 'info'}
                  sx={{ mb: 2 }}
                >
                  <AlertTitle>{aiAnalysis.urgency} Urgency Detected</AlertTitle>
                  Based on the symptoms, immediate veterinary attention may be required.
                </Alert>

                <Typography variant="h6" gutterBottom>
                  Possible Conditions
                </Typography>
                <Grid container spacing={2}>
                  {aiAnalysis.possibleDiseases.map((disease, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle1">{disease.name}</Typography>
                            <Chip 
                              label={`${disease.match}% match`}
                              color={disease.match > 70 ? 'error' : disease.match > 40 ? 'warning' : 'info'}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Symptoms: {disease.symptoms.join(', ')}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={disease.match} 
                            color={disease.match > 70 ? 'error' : disease.match > 40 ? 'warning' : 'info'}
                            sx={{ mt: 1, height: 4, borderRadius: 2 }}
                          />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Recommended Treatment:</strong> {disease.treatment}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Recommended Actions
                  </Typography>
                  <List>
                    {aiAnalysis.recommendations.map((rec, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={rec} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button 
                    variant="contained"
                    onClick={() => {
                      setAiDialogOpen(false);
                      handleOpenDialog('add');
                    }}
                    sx={{ mr: 1 }}
                  >
                    Create Health Record
                  </Button>
                  <Button variant="outlined">
                    Consult Veterinarian
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
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

export default HealthRecords;