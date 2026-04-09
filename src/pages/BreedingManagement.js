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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Badge,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Favorite,
  PregnantWoman,
  ChildCare,
  CalendarToday,
  Healing,
  Science,
  MonitorHeart,
  NotificationsActive,
  CheckCircle,
  Cancel,
  Warning,
  Event,
  Timeline,
  BarChart,
  Assessment,
  Download,
  Print,
  Refresh,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Pets,
  Female,
  Male,
  Today,
  DateRange,
  AccessTime,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addDays, differenceInDays, isAfter, isBefore, isToday, isFuture } from 'date-fns';

// Mock data - replace with API calls
const initialBreedingRecords = [
  {
    id: 1,
    cowId: 'C-2024-001',
    cowName: 'Bossy',
    breed: 'Holstein',
    heatDate: new Date(2024, 0, 10),
    inseminationDate: new Date(2024, 0, 11),
    bullSemen: 'Holstein #HB-123',
    breedingType: 'AI',
    technician: 'Dr. Smith',
    pregnancyStatus: 'confirmed',
    pregnancyCheckDate: new Date(2024, 1, 10),
    dueDate: new Date(2024, 9, 20),
    calvingDate: null,
    calfDetails: null,
    notes: 'First insemination',
    createdAt: new Date(2024, 0, 11),
    updatedAt: new Date(2024, 0, 11),
  },
  {
    id: 2,
    cowId: 'C-2024-015',
    cowName: 'Daisy',
    breed: 'Jersey',
    heatDate: new Date(2024, 0, 12),
    inseminationDate: new Date(2024, 0, 13),
    bullSemen: 'Jersey #JB-456',
    breedingType: 'Natural',
    technician: 'John Doe',
    pregnancyStatus: 'pending',
    pregnancyCheckDate: new Date(2024, 1, 13),
    dueDate: null,
    calvingDate: null,
    calfDetails: null,
    notes: 'Second insemination',
    createdAt: new Date(2024, 0, 13),
    updatedAt: new Date(2024, 0, 13),
  },
  {
    id: 3,
    cowId: 'C-2024-032',
    cowName: 'Bella',
    breed: 'Holstein',
    heatDate: new Date(2024, 0, 5),
    inseminationDate: new Date(2024, 0, 6),
    bullSemen: 'Holstein #HB-789',
    breedingType: 'AI',
    technician: 'Dr. Johnson',
    pregnancyStatus: 'confirmed',
    pregnancyCheckDate: new Date(2024, 1, 6),
    dueDate: new Date(2024, 9, 15),
    calvingDate: null,
    calfDetails: null,
    notes: 'Third lactation',
    createdAt: new Date(2024, 0, 6),
    updatedAt: new Date(2024, 0, 6),
  },
  {
    id: 4,
    cowId: 'C-2024-078',
    cowName: 'Lily',
    breed: 'Brown Swiss',
    heatDate: new Date(2024, 0, 8),
    inseminationDate: new Date(2024, 0, 9),
    bullSemen: 'Brown Swiss #BS-234',
    breedingType: 'AI',
    technician: 'Dr. Smith',
    pregnancyStatus: 'negative',
    pregnancyCheckDate: new Date(2024, 1, 9),
    dueDate: null,
    calvingDate: null,
    calfDetails: null,
    notes: 'Will re-breed next cycle',
    createdAt: new Date(2024, 0, 9),
    updatedAt: new Date(2024, 0, 9),
  },
  {
    id: 5,
    cowId: 'C-2024-091',
    cowName: 'Molly',
    breed: 'Holstein',
    heatDate: new Date(2023, 8, 15),
    inseminationDate: new Date(2023, 8, 16),
    bullSemen: 'Holstein #HB-567',
    breedingType: 'AI',
    technician: 'Dr. Williams',
    pregnancyStatus: 'calved',
    pregnancyCheckDate: new Date(2023, 9, 16),
    dueDate: new Date(2024, 5, 23),
    calvingDate: new Date(2024, 5, 20),
    calfDetails: {
      id: 'C-2024-089',
      gender: 'Female',
      weight: '38 kg',
      healthStatus: 'Healthy',
    },
    notes: 'Easy calving, healthy calf',
    createdAt: new Date(2023, 8, 16),
    updatedAt: new Date(2024, 5, 20),
  },
];

const bullsSemen = [
  { id: 'HB-123', breed: 'Holstein', name: 'Holstein #HB-123' },
  { id: 'HB-567', breed: 'Holstein', name: 'Holstein #HB-567' },
  { id: 'HB-789', breed: 'Holstein', name: 'Holstein #HB-789' },
  { id: 'JB-456', breed: 'Jersey', name: 'Jersey #JB-456' },
  { id: 'BS-234', breed: 'Brown Swiss', name: 'Brown Swiss #BS-234' },
];

const technicians = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'John Doe', 'Mike Wilson'];

function BreedingManagement() {
  const [breedingRecords, setBreedingRecords] = useState(initialBreedingRecords);
  const [filteredRecords, setFilteredRecords] = useState(initialBreedingRecords);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBreed, setFilterBreed] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    cowId: '',
    heatDate: new Date(),
    inseminationDate: new Date(),
    bullSemen: '',
    breedingType: 'AI',
    technician: '',
    pregnancyStatus: 'pending',
    notes: '',
  });
  const [stats, setStats] = useState({
    inHeat: 0,
    pregnant: 0,
    dueToCalve: 0,
    calvesBorn: 0,
    conceptionRate: 0,
    avgServicesPerConception: 0,
  });

  // Available cows (mock data)
  const availableCows = [
    { id: 'C-2024-001', name: 'Bossy', breed: 'Holstein' },
    { id: 'C-2024-015', name: 'Daisy', breed: 'Jersey' },
    { id: 'C-2024-032', name: 'Bella', breed: 'Holstein' },
    { id: 'C-2024-078', name: 'Lily', breed: 'Brown Swiss' },
    { id: 'C-2024-091', name: 'Molly', breed: 'Holstein' },
    { id: 'C-2024-102', name: 'Rose', breed: 'Guernsey' },
  ];

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [breedingRecords, searchTerm, tabValue, filterStatus, filterBreed, filterType]);

  const applyFilters = () => {
    let filtered = [...breedingRecords];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.cowId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.cowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.bullSemen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (record.technician && record.technician.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(record => record.pregnancyStatus === 'pending');
    } else if (tabValue === 2) {
      filtered = filtered.filter(record => record.pregnancyStatus === 'confirmed');
    } else if (tabValue === 3) {
      filtered = filtered.filter(record => record.pregnancyStatus === 'calved');
    } else if (tabValue === 4) {
      filtered = filtered.filter(record => record.pregnancyStatus === 'negative');
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(record => record.pregnancyStatus === filterStatus);
    }

    // Breed filter
    if (filterBreed !== 'all') {
      filtered = filtered.filter(record => record.breed === filterBreed);
    }

    // Breeding type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(record => record.breedingType === filterType);
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => b.inseminationDate - a.inseminationDate);

    setFilteredRecords(filtered);
  };

  const calculateStats = () => {
    const now = new Date();
    
    // Cows in heat (mock data - in real app, this would come from heat detection)
    const inHeat = 5;

    // Pregnant cows
    const pregnant = breedingRecords.filter(r => 
      r.pregnancyStatus === 'confirmed' || r.pregnancyStatus === 'pending'
    ).length;

    // Due to calve in next 30 days
    const dueToCalve = breedingRecords.filter(r => 
      r.pregnancyStatus === 'confirmed' && 
      r.dueDate && 
      differenceInDays(r.dueDate, now) <= 30 &&
      differenceInDays(r.dueDate, now) >= 0
    ).length;

    // Calves born this month
    const calvesBorn = breedingRecords.filter(r => 
      r.pregnancyStatus === 'calved' && 
      r.calvingDate &&
      r.calvingDate.getMonth() === now.getMonth() &&
      r.calvingDate.getFullYear() === now.getFullYear()
    ).length;

    // Conception rate
    const totalBreedings = breedingRecords.length;
    const successfulBreedings = breedingRecords.filter(r => 
      r.pregnancyStatus === 'confirmed' || r.pregnancyStatus === 'calved'
    ).length;
    const conceptionRate = totalBreedings > 0 
      ? ((successfulBreedings / totalBreedings) * 100).toFixed(1)
      : 0;

    // Average services per conception
    // This would need more data in real app

    setStats({
      inHeat,
      pregnant,
      dueToCalve,
      calvesBorn,
      conceptionRate,
      avgServicesPerConception: 1.8,
    });
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
    if (record) {
      setFormData({
        cowId: record.cowId,
        heatDate: record.heatDate,
        inseminationDate: record.inseminationDate,
        bullSemen: record.bullSemen,
        breedingType: record.breedingType,
        technician: record.technician,
        pregnancyStatus: record.pregnancyStatus,
        notes: record.notes || '',
      });
    } else {
      setFormData({
        cowId: '',
        heatDate: new Date(),
        inseminationDate: new Date(),
        bullSemen: '',
        breedingType: 'AI',
        technician: '',
        pregnancyStatus: 'pending',
        notes: '',
      });
    }
    setActiveStep(0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRecord(null);
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveRecord = () => {
    if (dialogMode === 'edit' && selectedRecord) {
      // Update existing record
      setBreedingRecords(breedingRecords.map(record => 
        record.id === selectedRecord.id 
          ? { 
              ...record, 
              ...formData,
              updatedAt: new Date(),
            } 
          : record
      ));
      setSnackbar({
        open: true,
        message: 'Breeding record updated successfully!',
        severity: 'success',
      });
    } else if (dialogMode === 'add') {
      // Create new record
      const newRecord = {
        id: breedingRecords.length + 1,
        ...formData,
        cowName: availableCows.find(c => c.id === formData.cowId)?.name || '',
        breed: availableCows.find(c => c.id === formData.cowId)?.breed || '',
        pregnancyCheckDate: addDays(formData.inseminationDate, 30),
        dueDate: formData.pregnancyStatus === 'confirmed' 
          ? addDays(formData.inseminationDate, 283) 
          : null,
        calvingDate: null,
        calfDetails: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBreedingRecords([newRecord, ...breedingRecords]);
      setSnackbar({
        open: true,
        message: 'Breeding record added successfully!',
        severity: 'success',
      });
    }
    handleCloseDialog();
  };

  const handleDeleteRecord = (recordId) => {
    setBreedingRecords(breedingRecords.filter(record => record.id !== recordId));
    setSnackbar({
      open: true,
      message: 'Breeding record deleted successfully!',
      severity: 'success',
    });
  };

  const handleUpdatePregnancyStatus = (recordId, status) => {
    setBreedingRecords(breedingRecords.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            pregnancyStatus: status,
            dueDate: status === 'confirmed' 
              ? addDays(record.inseminationDate, 283) 
              : null,
            updatedAt: new Date(),
          } 
        : record
    ));
    setSnackbar({
      open: true,
      message: `Pregnancy status updated to ${status}!`,
      severity: 'success',
    });
  };

  const handleRecordCalving = (recordId) => {
    // This would open a calving details dialog
    const record = breedingRecords.find(r => r.id === recordId);
    if (record) {
      // Mock calving data
      const updatedRecord = {
        ...record,
        pregnancyStatus: 'calved',
        calvingDate: new Date(),
        calfDetails: {
          id: `C-${new Date().getFullYear()}-${String(breedingRecords.length + 1).padStart(3, '0')}`,
          gender: Math.random() > 0.5 ? 'Female' : 'Male',
          weight: `${Math.floor(Math.random() * 10 + 30)} kg`,
          healthStatus: 'Healthy',
        },
        updatedAt: new Date(),
      };
      setBreedingRecords(breedingRecords.map(r => r.id === recordId ? updatedRecord : r));
      setSnackbar({
        open: true,
        message: 'Calving recorded successfully!',
        severity: 'success',
      });
    }
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
    const headers = ['Date', 'Cow ID', 'Cow Name', 'Breed', 'Bull/Semen', 'Type', 'Technician', 'Status', 'Due Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(r => [
        format(r.inseminationDate, 'yyyy-MM-dd'),
        r.cowId,
        r.cowName,
        r.breed,
        r.bullSemen,
        r.breedingType,
        r.technician,
        r.pregnancyStatus,
        r.dueDate ? format(r.dueDate, 'yyyy-MM-dd') : '',
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breeding_report_${format(new Date(), 'yyyyMMdd')}.csv`;
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'negative': return 'error';
      case 'calved': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle />;
      case 'pending': return <AccessTime />;
      case 'negative': return <Cancel />;
      case 'calved': return <ChildCare />;
      default: return <RadioButtonUnchecked />;
    }
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const days = differenceInDays(dueDate, new Date());
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days <= 7) return `${days} days (soon)`;
    return `${days} days`;
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return 'default';
    const days = differenceInDays(dueDate, new Date());
    if (days < 0) return 'error';
    if (days <= 7) return 'warning';
    if (days <= 30) return 'info';
    return 'success';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Breeding Management
        </Typography>
        <Box>
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
            New Breeding Record
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
                    In Heat
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {stats.inHeat}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Need attention
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Favorite />
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
                    Pregnant
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats.pregnant}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Confirmed
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <PregnantWoman />
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
                    Due to Calve
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.dueToCalve}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Next 30 days
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <CalendarToday />
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
                    Calves Born
                  </Typography>
                  <Typography variant="h4" color="info.main">
                    {stats.calvesBorn}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    This month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <ChildCare />
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
                    Conception Rate
                  </Typography>
                  <Typography variant="h4" color="primary.main">
                    {stats.conceptionRate}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg: {stats.avgServicesPerConception} services
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assessment />
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
          <Tab label="Pending" />
          <Tab label="Confirmed" />
          <Tab label="Calved" />
          <Tab label="Negative" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by cow ID, name, bull/semen..."
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
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="negative">Negative</MenuItem>
                <MenuItem value="calved">Calved</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Breed</InputLabel>
              <Select
                value={filterBreed}
                label="Breed"
                onChange={(e) => setFilterBreed(e.target.value)}
              >
                <MenuItem value="all">All Breeds</MenuItem>
                <MenuItem value="Holstein">Holstein</MenuItem>
                <MenuItem value="Jersey">Jersey</MenuItem>
                <MenuItem value="Brown Swiss">Brown Swiss</MenuItem>
                <MenuItem value="Guernsey">Guernsey</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value="AI">AI</MenuItem>
                <MenuItem value="Natural">Natural</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button fullWidth variant="outlined" startIcon={<FilterList />}>
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Breeding Records Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Date</TableCell>
              <TableCell>Cow</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Bull/Semen</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Days Until Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record) => (
                <TableRow key={record.id} hover>
                  <TableCell>{format(record.inseminationDate, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{record.cowName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.cowId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{record.breed}</TableCell>
                  <TableCell>{record.bullSemen}</TableCell>
                  <TableCell>
                    <Chip 
                      label={record.breedingType} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(record.pregnancyStatus)}
                      label={record.pregnancyStatus}
                      color={getStatusColor(record.pregnancyStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {record.dueDate ? format(record.dueDate, 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell>
                    {record.dueDate && record.pregnancyStatus === 'confirmed' && (
                      <Chip
                        label={getDaysUntilDue(record.dueDate)}
                        color={getDueDateColor(record.dueDate)}
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog('view', record)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog('edit', record)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    {record.pregnancyStatus === 'confirmed' && (
                      <Tooltip title="Record Calving">
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleRecordCalving(record.id)}
                        >
                          <ChildCare />
                        </IconButton>
                      </Tooltip>
                    )}
                    {record.pregnancyStatus === 'pending' && (
                      <>
                        <Tooltip title="Confirm Pregnancy">
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleUpdatePregnancyStatus(record.id, 'confirmed')}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark Negative">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleUpdatePregnancyStatus(record.id, 'negative')}
                          >
                            <Cancel />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="Delete">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteRecord(record.id)}
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
          count={filteredRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Breeding Record Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'add' && 'New Breeding Record'}
          {dialogMode === 'edit' && 'Edit Breeding Record'}
          {dialogMode === 'view' && 'Breeding Record Details'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedRecord && dialogMode === 'view' ? (
            // View Mode
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">
                    {selectedRecord.cowName} ({selectedRecord.cowId})
                  </Typography>
                  <Chip
                    icon={getStatusIcon(selectedRecord.pregnancyStatus)}
                    label={selectedRecord.pregnancyStatus}
                    color={getStatusColor(selectedRecord.pregnancyStatus)}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Breed
                </Typography>
                <Typography>{selectedRecord.breed}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Breeding Type
                </Typography>
                <Typography>{selectedRecord.breedingType}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Heat Date
                </Typography>
                <Typography>{format(selectedRecord.heatDate, 'PPPP')}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Insemination Date
                </Typography>
                <Typography>{format(selectedRecord.inseminationDate, 'PPPP')}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Bull/Semen
                </Typography>
                <Typography>{selectedRecord.bullSemen}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Technician
                </Typography>
                <Typography>{selectedRecord.technician}</Typography>
              </Grid>

              {selectedRecord.pregnancyCheckDate && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pregnancy Check Date
                  </Typography>
                  <Typography>{format(selectedRecord.pregnancyCheckDate, 'PPPP')}</Typography>
                </Grid>
              )}

              {selectedRecord.dueDate && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Due Date
                  </Typography>
                  <Typography>{format(selectedRecord.dueDate, 'PPPP')}</Typography>
                </Grid>
              )}

              {selectedRecord.calvingDate && (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Calving Date
                    </Typography>
                    <Typography>{format(selectedRecord.calvingDate, 'PPPP')}</Typography>
                  </Grid>
                  {selectedRecord.calfDetails && (
                    <>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Calf Details
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Calf ID
                        </Typography>
                        <Typography>{selectedRecord.calfDetails.id}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Gender
                        </Typography>
                        <Box display="flex" alignItems="center">
                          {selectedRecord.calfDetails.gender === 'Female' ? 
                            <Female sx={{ color: 'error.main', mr: 1 }} /> : 
                            <Male sx={{ color: 'primary.main', mr: 1 }} />
                          }
                          <Typography>{selectedRecord.calfDetails.gender}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography>{selectedRecord.calfDetails.weight}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Health Status
                        </Typography>
                        <Chip 
                          label={selectedRecord.calfDetails.healthStatus}
                          color="success"
                          size="small"
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}

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
            // Add/Edit Mode with Stepper
            <Box sx={{ mt: 1 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel>Cow Selection</StepLabel>
                  <StepContent>
                    <FormControl fullWidth required sx={{ mt: 2 }}>
                      <InputLabel>Select Cow</InputLabel>
                      <Select
                        name="cowId"
                        value={formData.cowId}
                        onChange={handleInputChange}
                        label="Select Cow"
                      >
                        {availableCows.map(cow => (
                          <MenuItem key={cow.id} value={cow.id}>
                            {cow.name} ({cow.id}) - {cow.breed}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box sx={{ mb: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!formData.cowId}
                      >
                        Next
                      </Button>
                    </Box>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel>Breeding Details</StepLabel>
                  <StepContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Heat Date"
                            value={formData.heatDate}
                            onChange={(date) => handleDateChange('heatDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth required />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Insemination Date"
                            value={formData.inseminationDate}
                            onChange={(date) => handleDateChange('inseminationDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth required />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Breeding Type</InputLabel>
                          <Select
                            name="breedingType"
                            value={formData.breedingType}
                            onChange={handleInputChange}
                            label="Breeding Type"
                          >
                            <MenuItem value="AI">Artificial Insemination (AI)</MenuItem>
                            <MenuItem value="Natural">Natural Breeding</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Bull/Semen</InputLabel>
                          <Select
                            name="bullSemen"
                            value={formData.bullSemen}
                            onChange={handleInputChange}
                            label="Bull/Semen"
                          >
                            {bullsSemen.map(bull => (
                              <MenuItem key={bull.id} value={bull.name}>
                                {bull.name} ({bull.breed})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth required>
                          <InputLabel>Technician</InputLabel>
                          <Select
                            name="technician"
                            value={formData.technician}
                            onChange={handleInputChange}
                            label="Technician"
                          >
                            {technicians.map(tech => (
                              <MenuItem key={tech} value={tech}>{tech}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box sx={{ mb: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Next
                      </Button>
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel>Additional Information</StepLabel>
                  <StepContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <Typography variant="subtitle2" gutterBottom>
                            Initial Pregnancy Status
                          </Typography>
                          <RadioGroup
                            name="pregnancyStatus"
                            value={formData.pregnancyStatus}
                            onChange={handleInputChange}
                          >
                            <FormControlLabel 
                              value="pending" 
                              control={<Radio />} 
                              label="Pending (awaiting confirmation)" 
                            />
                            <FormControlLabel 
                              value="confirmed" 
                              control={<Radio />} 
                              label="Confirmed (already confirmed)" 
                            />
                          </RadioGroup>
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
                          placeholder="Any additional notes about the breeding..."
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mb: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleSaveRecord}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {dialogMode === 'add' ? 'Save Record' : 'Update Record'}
                      </Button>
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              </Stepper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {dialogMode === 'view' ? 'Close' : 'Cancel'}
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

export default BreedingManagement;