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
  Checkbox,
  FormControlLabel,
  Rating,
  LinearProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  FilterList,
  Sort,
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
  Flag,
  Assignment,
  AssignmentTurnedIn,
  DateRange,
  PriorityHigh,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

// Mock data - replace with API calls
const initialTasks = [
  {
    id: 1,
    title: 'Vaccination Schedule',
    description: '15 cattle due for vaccination',
    category: 'health',
    priority: 'high',
    status: 'pending',
    dueDate: new Date(2024, 0, 16),
    assignedTo: 'Dr. Smith',
    createdAt: new Date(2024, 0, 10),
    completedAt: null,
  },
  {
    id: 2,
    title: 'Breeding Check',
    description: '5 cows in heat - check today',
    category: 'breeding',
    priority: 'urgent',
    status: 'in-progress',
    dueDate: new Date(2024, 0, 15),
    assignedTo: 'John Doe',
    createdAt: new Date(2024, 0, 12),
    completedAt: null,
  },
  {
    id: 3,
    title: 'Feed Order',
    description: 'Protein supplement running low',
    category: 'inventory',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date(2024, 0, 18),
    assignedTo: 'Mike Johnson',
    createdAt: new Date(2024, 0, 13),
    completedAt: null,
  },
  {
    id: 4,
    title: 'Equipment Maintenance',
    description: 'Milking machine service due',
    category: 'maintenance',
    priority: 'low',
    status: 'completed',
    dueDate: new Date(2024, 0, 10),
    assignedTo: 'Tech Team',
    createdAt: new Date(2024, 0, 5),
    completedAt: new Date(2024, 0, 10),
  },
  {
    id: 5,
    title: 'Financial Review',
    description: 'Monthly expense review',
    category: 'financial',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date(2024, 0, 25),
    assignedTo: 'Accountant',
    createdAt: new Date(2024, 0, 15),
    completedAt: null,
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [tasks, searchTerm, tabValue, filterStatus, filterPriority, filterCategory]);

  const calculateStats = () => {
    const now = new Date();
    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      pending: tasks.filter(t => t.status !== 'completed').length,
      overdue: tasks.filter(t => t.status !== 'completed' && isPast(t.dueDate) && !isToday(t.dueDate)).length,
    };
    setTaskStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tab filter (status)
    if (tabValue === 0) {
      // All tasks - no filter
    } else if (tabValue === 1) {
      filtered = filtered.filter(task => task.status === 'pending');
    } else if (tabValue === 2) {
      filtered = filtered.filter(task => task.status === 'in-progress');
    } else if (tabValue === 3) {
      filtered = filtered.filter(task => task.status === 'completed');
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(task => task.category === filterCategory);
    }

    setFilteredTasks(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (task = null) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
    setOpenDialog(false);
  };

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? { ...task, ...taskData } : task
      ));
      setSnackbar({
        open: true,
        message: 'Task updated successfully!',
        severity: 'success',
      });
    } else {
      // Create new task
      const newTask = {
        id: tasks.length + 1,
        ...taskData,
        createdAt: new Date(),
        status: 'pending',
        completedAt: null,
      };
      setTasks([...tasks, newTask]);
      setSnackbar({
        open: true,
        message: 'Task created successfully!',
        severity: 'success',
      });
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSnackbar({
      open: true,
      message: 'Task deleted successfully!',
      severity: 'success',
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date() : null,
          }
        : task
    ));
    setSnackbar({
      open: true,
      message: `Task marked as ${newStatus}!`,
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'health': return <LocalHospital />;
      case 'breeding': return <Favorite />;
      case 'inventory': return <Inventory />;
      case 'financial': return <MonetizationOn />;
      case 'maintenance': return <Assignment />;
      default: return <Assignment />;
    }
  };

  const getDueDateColor = (dueDate) => {
    if (isPast(dueDate) && !isToday(dueDate)) {
      return 'error';
    } else if (isToday(dueDate)) {
      return 'warning';
    } else if (isTomorrow(dueDate)) {
      return 'info';
    }
    return 'default';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Task Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Create Task
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Tasks
                  </Typography>
                  <Typography variant="h4">{taskStats.total}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assignment />
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
                    Completed
                  </Typography>
                  <Typography variant="h4" color="success.main">{taskStats.completed}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <AssignmentTurnedIn />
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
                    Pending
                  </Typography>
                  <Typography variant="h4" color="warning.main">{taskStats.pending}</Typography>
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
                    Overdue
                  </Typography>
                  <Typography variant="h4" color="error.main">{taskStats.overdue}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <PriorityHigh />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All Tasks" />
          <Tab label="Pending" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
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
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
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
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="breeding">Breeding</MenuItem>
                <MenuItem value="inventory">Inventory</MenuItem>
                <MenuItem value="financial">Financial</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
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

      {/* Tasks Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Status</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>
                    <Checkbox
                      checked={task.status === 'completed'}
                      onChange={(e) => handleStatusChange(
                        task.id, 
                        e.target.checked ? 'completed' : 'pending'
                      )}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircle />}
                      color="success"
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{task.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getCategoryIcon(task.category)}
                      label={task.category}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={getPriorityColor(task.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<DateRange />}
                      label={format(task.dueDate, 'MMM dd, yyyy')}
                      color={getDueDateColor(task.dueDate)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpenDialog(task)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => handleDeleteTask(task.id)}>
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
          count={filteredTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Create/Edit Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTask ? 'Edit Task' : 'Create New Task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                defaultValue={selectedTask?.title}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                defaultValue={selectedTask?.description}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  defaultValue={selectedTask?.category || ''}
                >
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="breeding">Breeding</MenuItem>
                  <MenuItem value="inventory">Inventory</MenuItem>
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  defaultValue={selectedTask?.priority || ''}
                >
                  <MenuItem value="urgent">Urgent</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  defaultValue={selectedTask?.dueDate || new Date()}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Assigned To"
                defaultValue={selectedTask?.assignedTo || ''}
              />
            </Grid>
            {selectedTask && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTask.status === 'completed'}
                      onChange={(e) => {}}
                    />
                  }
                  label="Mark as completed"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={() => handleSaveTask({})}>
            {selectedTask ? 'Update' : 'Create'}
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

export default Tasks;