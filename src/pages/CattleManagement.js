import React, { useState } from 'react';
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
  Badge,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  FilterList,
  Download,
  Print,
  Pets,
  Female,
  Male,
  CalendarToday,
  LocalHospital,
  Opacity,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data
const cattleData = [
  {
    id: 1,
    tagId: 'C-2024-001',
    name: 'Bossy',
    breed: 'Holstein',
    gender: 'Female',
    age: '3 years',
    weight: '650 kg',
    healthStatus: 'Healthy',
    milkProduction: '25 L/day',
    lastCheckup: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    tagId: 'C-2024-002',
    name: 'Bella',
    breed: 'Jersey',
    gender: 'Female',
    age: '2 years',
    weight: '450 kg',
    healthStatus: 'Under Treatment',
    milkProduction: '18 L/day',
    lastCheckup: '2024-01-10',
    status: 'Active',
  },
  // Add more mock data...
];

function CattleManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCattle, setSelectedCattle] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (cattle = null) => {
    setSelectedCattle(cattle);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCattle(null);
    setOpenDialog(false);
  };

  const getHealthStatusColor = (status) => {
    switch(status) {
      case 'Healthy': return 'success';
      case 'Under Treatment': return 'warning';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Cattle Management
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{ mr: 2 }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add New Cattle
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
                    Total Cattle
                  </Typography>
                  <Typography variant="h4">156</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Pets />
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
                    Milking Cows
                  </Typography>
                  <Typography variant="h4">85</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Female />
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
                    Under Treatment
                  </Typography>
                  <Typography variant="h4" color="warning.main">12</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
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
                    Avg. Milk/Cow
                  </Typography>
                  <Typography variant="h4">22.5 L</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <Opacity />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by tag ID, name, or breed..."
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                label="Filter by Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
                <MenuItem value="deceased">Deceased</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Health</InputLabel>
              <Select
                label="Filter by Health"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="healthy">Healthy</MenuItem>
                <MenuItem value="treatment">Under Treatment</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
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

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All Cattle" />
          <Tab label="Milking Cows" />
          <Tab label="Heifers" />
          <Tab label="Calves" />
          <Tab label="Bulls" />
        </Tabs>
      </Box>

      {/* Cattle Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="cattle table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Tag ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Health Status</TableCell>
              <TableCell>Milk Production</TableCell>
              <TableCell>Last Checkup</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cattleData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cattle) => (
                <TableRow key={cattle.id} hover>
                  <TableCell>
                    <Chip 
                      label={cattle.tagId} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{cattle.name}</TableCell>
                  <TableCell>{cattle.breed}</TableCell>
                  <TableCell>
                    {cattle.gender === 'Female' ? 
                      <Female sx={{ color: 'error.main' }} /> : 
                      <Male sx={{ color: 'primary.main' }} />
                    }
                  </TableCell>
                  <TableCell>{cattle.age}</TableCell>
                  <TableCell>{cattle.weight}</TableCell>
                  <TableCell>
                    <Chip 
                      label={cattle.healthStatus} 
                      color={getHealthStatusColor(cattle.healthStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{cattle.milkProduction}</TableCell>
                  <TableCell>{cattle.lastCheckup}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton size="small" color="info">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(cattle)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error">
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
          count={cattleData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add/Edit Cattle Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCattle ? 'Edit Cattle' : 'Add New Cattle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tag ID"
                defaultValue={selectedCattle?.tagId}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                defaultValue={selectedCattle?.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Breed</InputLabel>
                <Select
                  label="Breed"
                  defaultValue={selectedCattle?.breed || ''}
                >
                  <MenuItem value="Holstein">Holstein</MenuItem>
                  <MenuItem value="Jersey">Jersey</MenuItem>
                  <MenuItem value="Brown Swiss">Brown Swiss</MenuItem>
                  <MenuItem value="Guernsey">Guernsey</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  defaultValue={selectedCattle?.gender || ''}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                defaultValue={selectedCattle?.weight?.replace(' kg', '')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                placeholder="Additional information about the cattle..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedCattle ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CattleManagement;