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
  Divider,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
} from '@mui/material';
import {
  Search,
  FilterList,
  Refresh,
  LocalHospital,
  Opacity,
  Favorite,
  Inventory,
  MonetizationOn,
  Assignment,
  Person,
  CalendarToday,
  AccessTime,
  Download,
  Print,
  Delete,
  Visibility,
  Event,
  History,
} from '@mui/icons-material';
import { format, formatDistanceToNow } from 'date-fns';

// Mock data - replace with API calls
const initialActivities = [
  {
    id: 1,
    type: 'health',
    title: 'Vaccination Completed',
    description: '15 cattle vaccinated for Foot and Mouth Disease',
    user: 'Dr. Smith',
    timestamp: new Date(2024, 0, 15, 10, 30),
    metadata: {
      cattleIds: ['C-2024-001', 'C-2024-002', 'C-2024-003'],
      vaccineType: 'FMD Vaccine',
    },
  },
  {
    id: 2,
    type: 'milk',
    title: 'Milk Collection',
    description: '2450L milk collected from morning session',
    user: 'John Doe',
    timestamp: new Date(2024, 0, 15, 7, 15),
    metadata: {
      quantity: 2450,
      session: 'Morning',
      cowsMilked: 85,
    },
  },
  {
    id: 3,
    type: 'breeding',
    title: 'New Calf Born',
    description: 'Healthy calf born to cow ID #C-2024-015',
    user: 'Mike Johnson',
    timestamp: new Date(2024, 0, 14, 14, 20),
    metadata: {
      motherId: 'C-2024-015',
      calfId: 'C-2024-089',
      gender: 'Female',
      weight: '35 kg',
    },
  },
  {
    id: 4,
    type: 'inventory',
    title: 'Low Stock Alert',
    description: 'Protein supplement running low (below reorder level)',
    user: 'System',
    timestamp: new Date(2024, 0, 13, 9, 45),
    metadata: {
      item: 'Protein Supplement',
      currentStock: '250 kg',
      reorderLevel: '500 kg',
    },
  },
  {
    id: 5,
    type: 'financial',
    title: 'Monthly Revenue',
    description: 'Monthly revenue reached $45,800',
    user: 'Accountant',
    timestamp: new Date(2024, 0, 12, 11, 0),
    metadata: {
      amount: 45800,
      period: 'December 2023',
      type: 'Revenue',
    },
  },
  {
    id: 6,
    type: 'health',
    title: 'Treatment Administered',
    description: 'Mastitis treatment given to cow #C-2024-032',
    user: 'Dr. Johnson',
    timestamp: new Date(2024, 0, 12, 15, 30),
    metadata: {
      cattleId: 'C-2024-032',
      treatment: 'Antibiotics',
      dosage: '10ml',
    },
  },
  {
    id: 7,
    type: 'breeding',
    title: 'AI Procedure',
    description: 'Artificial insemination performed on 3 cows',
    user: 'Dr. Williams',
    timestamp: new Date(2024, 0, 11, 9, 0),
    metadata: {
      cattleIds: ['C-2024-045', 'C-2024-067', 'C-2024-078'],
      semenType: 'Holstein',
    },
  },
  {
    id: 8,
    type: 'inventory',
    title: 'New Stock Added',
    description: 'Added 1000kg of cattle feed to inventory',
    user: 'Sarah Wilson',
    timestamp: new Date(2024, 0, 10, 14, 15),
    metadata: {
      item: 'Cattle Feed',
      quantity: 1000,
      supplier: 'AgriSupply Co.',
    },
  },
  {
    id: 9,
    type: 'milk',
    title: 'Quality Test Results',
    description: 'Milk quality test passed with A grade',
    user: 'Lab Tech',
    timestamp: new Date(2024, 0, 9, 16, 45),
    metadata: {
      fatContent: '4.2%',
      protein: '3.4%',
      snf: '8.7%',
    },
  },
  {
    id: 10,
    type: 'financial',
    title: 'Expense Recorded',
    description: 'Purchased veterinary supplies worth $1,200',
    user: 'Accountant',
    timestamp: new Date(2024, 0, 8, 13, 20),
    metadata: {
      amount: 1200,
      category: 'Medical Supplies',
      vendor: 'VetCare',
    },
  },
];

function Activities() {
  const [activities, setActivities] = useState(initialActivities);
  const [filteredActivities, setFilteredActivities] = useState(initialActivities);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'list'

  // Get unique users for filter
  const uniqueUsers = ['all', ...new Set(activities.map(a => a.user))];

  useEffect(() => {
    applyFilters();
  }, [activities, searchTerm, tabValue, filterType, filterUser, dateRange]);

  const applyFilters = () => {
    let filtered = [...activities];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tab filter (time period)
    const now = new Date();
    if (tabValue === 1) { // Today
      filtered = filtered.filter(a => 
        a.timestamp.toDateString() === now.toDateString()
      );
    } else if (tabValue === 2) { // This Week
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = filtered.filter(a => a.timestamp >= weekAgo);
    } else if (tabValue === 3) { // This Month
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filtered = filtered.filter(a => a.timestamp >= monthAgo);
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(a => a.type === filterType);
    }

    // User filter
    if (filterUser !== 'all') {
      filtered = filtered.filter(a => a.user === filterUser);
    }

    // Sort by timestamp (most recent first)
    filtered.sort((a, b) => b.timestamp - a.timestamp);

    setFilteredActivities(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedActivity(null);
    setOpenDialog(false);
  };

  const handleDeleteActivity = (activityId) => {
    setActivities(activities.filter(a => a.id !== activityId));
    setSnackbar({
      open: true,
      message: 'Activity deleted successfully!',
      severity: 'success',
    });
  };

  const handleRefresh = () => {
    // Simulate refresh
    setSnackbar({
      open: true,
      message: 'Activities refreshed!',
      severity: 'success',
    });
  };

  const handleExport = () => {
    // Export logic here
    setSnackbar({
      open: true,
      message: 'Activities exported successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
      case 'health': return 'error.main';
      case 'milk': return 'info.main';
      case 'breeding': return 'success.main';
      case 'inventory': return 'warning.main';
      case 'financial': return 'primary.main';
      default: return 'grey.500';
    }
  };

  const getActivityBgColor = (type) => {
    switch(type) {
      case 'health': return 'error.light';
      case 'milk': return 'info.light';
      case 'breeding': return 'success.light';
      case 'inventory': return 'warning.light';
      case 'financial': return 'primary.light';
      default: return 'grey.100';
    }
  };

  // Calculate statistics
  const stats = {
    total: activities.length,
    health: activities.filter(a => a.type === 'health').length,
    milk: activities.filter(a => a.type === 'milk').length,
    breeding: activities.filter(a => a.type === 'breeding').length,
    inventory: activities.filter(a => a.type === 'inventory').length,
    financial: activities.filter(a => a.type === 'financial').length,
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Activity Log
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
            sx={{ mr: 2 }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={viewMode === 'table' ? <History /> : <Assignment />}
            onClick={() => setViewMode(viewMode === 'table' ? 'list' : 'table')}
          >
            {viewMode === 'table' ? 'List View' : 'Table View'}
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Total Activities
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'error.light' }}>
            <CardContent>
              <Box textAlign="center">
                <LocalHospital sx={{ fontSize: 30, color: 'error.main' }} />
                <Typography variant="h6">{stats.health}</Typography>
                <Typography variant="caption">Health</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'info.light' }}>
            <CardContent>
              <Box textAlign="center">
                <Opacity sx={{ fontSize: 30, color: 'info.main' }} />
                <Typography variant="h6">{stats.milk}</Typography>
                <Typography variant="caption">Milk</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Box textAlign="center">
                <Favorite sx={{ fontSize: 30, color: 'success.main' }} />
                <Typography variant="h6">{stats.breeding}</Typography>
                <Typography variant="caption">Breeding</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Box textAlign="center">
                <Inventory sx={{ fontSize: 30, color: 'warning.main' }} />
                <Typography variant="h6">{stats.inventory}</Typography>
                <Typography variant="caption">Inventory</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Box textAlign="center">
                <MonetizationOn sx={{ fontSize: 30, color: 'primary.main' }} />
                <Typography variant="h6">{stats.financial}</Typography>
                <Typography variant="caption">Financial</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All Time" />
          <Tab label="Today" />
          <Tab label="This Week" />
          <Tab label="This Month" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search activities..."
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
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={filterType}
                label="Activity Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="milk">Milk</MenuItem>
                <MenuItem value="breeding">Breeding</MenuItem>
                <MenuItem value="inventory">Inventory</MenuItem>
                <MenuItem value="financial">Financial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>User</InputLabel>
              <Select
                value={filterUser}
                label="User"
                onChange={(e) => setFilterUser(e.target.value)}
              >
                {uniqueUsers.map(user => (
                  <MenuItem key={user} value={user}>
                    {user === 'all' ? 'All Users' : user}
                  </MenuItem>
                ))}
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
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="week">Last 7 Days</MenuItem>
                <MenuItem value="month">Last 30 Days</MenuItem>
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

      {/* Activities Display */}
      {viewMode === 'table' ? (
        // Table View
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Type</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredActivities
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((activity) => (
                  <TableRow key={activity.id} hover>
                    <TableCell>
                      <Avatar sx={{ bgcolor: getActivityBgColor(activity.type) }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{activity.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{activity.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<Person />}
                        label={activity.user}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={format(activity.timestamp, 'PPpp')}>
                        <Chip
                          icon={<AccessTime />}
                          label={formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                          size="small"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleViewActivity(activity)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDeleteActivity(activity.id)}>
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
            count={filteredActivities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        // List View
        <Paper sx={{ p: 2 }}>
          <List>
            {filteredActivities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getActivityBgColor(activity.type) }}>
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">{activity.title}</Typography>
                        <Chip
                          size="small"
                          label={formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {activity.description}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Person fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                            {activity.user}
                          </Typography>
                          <CalendarToday fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {format(activity.timestamp, 'PP')}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                  <Box>
                    <IconButton size="small" onClick={() => handleViewActivity(activity)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteActivity(activity.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < filteredActivities.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Activity Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedActivity && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: getActivityBgColor(selectedActivity.type), mr: 2 }}>
                  {getActivityIcon(selectedActivity.type)}
                </Avatar>
                <Typography variant="h6">{selectedActivity.title}</Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedActivity.description}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    User
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Person sx={{ mr: 1, fontSize: 20 }} />
                    <Typography>{selectedActivity.user}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Timestamp
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                    <Typography>
                      {format(selectedActivity.timestamp, 'PPPP p')}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Additional Details
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <pre style={{ margin: 0, fontFamily: 'inherit' }}>
                      {JSON.stringify(selectedActivity.metadata, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                startIcon={<Print />}
                onClick={() => window.print()}
              >
                Print
              </Button>
            </DialogActions>
          </>
        )}
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

export default Activities;