import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  AlertTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from '@mui/material';
import {
  Close,
  Favorite,
  CalendarToday,
  AccessTime,
  Science,
  Biotech,
  CheckCircle,
  Warning,
  Info,
  Phone,
  Email,
  Schedule,
  Event,
  Assignment,
  TrendingUp,
  Save,
  Print,
  Share,
  Download,
  NotificationsActive,
  Opacity,
  Grass,
  Agriculture,
  LocalHospital,
  Timeline,
  ShowChart,
  BarChart,
  PieChart,
} from '@mui/icons-material';
import { format, addDays } from 'date-fns';

function BreedingDetailModal({ open, onClose, prediction, onAction }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSemen, setSelectedSemen] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const steps = [
    {
      label: 'Preparation Phase',
      description: 'Get ready for the breeding window',
      tasks: [
        'Check heat detection equipment',
        'Verify semen quality and storage',
        'Prepare breeding records',
        'Notify veterinarian'
      ]
    },
    {
      label: 'Heat Detection',
      description: 'Monitor for signs of heat',
      tasks: [
        'Observe every 4 hours starting 6 AM',
        'Check activity monitor data',
        'Look for mounting behavior',
        'Record any signs observed'
      ]
    },
    {
      label: 'Insemination',
      description: 'Perform AI during optimal window',
      tasks: [
        'Thaw semen correctly (35°C for 45 seconds)',
        'Load insemination gun',
        'Perform AI technique',
        'Record breeding details'
      ]
    },
    {
      label: 'Post-Breeding',
      description: 'Monitor and wait for confirmation',
      tasks: [
        'Watch for return to heat (18-24 days)',
        'Schedule pregnancy check (30-35 days)',
        'Update records',
        'Adjust nutrition if needed'
      ]
    }
  ];

  const handleScheduleBreeding = () => {
    setSnackbar({
      open: true,
      message: `Breeding scheduled for ${format(appointmentDate, 'MMM dd')} at ${appointmentTime}`,
      severity: 'success'
    });
  };

  const handleSelectSemen = (semenId) => {
    setSelectedSemen(semenId);
    setSnackbar({
      open: true,
      message: 'Semen selected successfully',
      severity: 'success'
    });
  };

  const handleDownloadPlan = () => {
    const planData = {
      ...prediction,
      selectedSemen,
      appointmentDate,
      appointmentTime,
      notes,
      generatedAt: new Date()
    };
    
    const blob = new Blob([JSON.stringify(planData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breeding_plan_${prediction?.cattleId}_${format(new Date(), 'yyyyMMdd')}.json`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Breeding plan downloaded',
      severity: 'success'
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Favorite sx={{ mr: 1, color: 'error.main' }} />
            <Typography variant="h6">
              Breeding Plan: {prediction?.name} ({prediction?.cattleId})
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Download Plan">
              <IconButton onClick={handleDownloadPlan} size="small">
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={() => window.print()} size="small">
                <Print />
              </IconButton>
            </Tooltip>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Overview Alert */}
          <Grid item xs={12}>
            <Alert severity="info" icon={<Biotech />}>
              <AlertTitle>Optimal Breeding Window</AlertTitle>
              <Typography variant="body2">
                Next heat predicted: {prediction?.nextHeatDate} (Confidence: {prediction?.confidence}%)
              </Typography>
              <Typography variant="body2">
                Optimal breeding window: {prediction?.optimalBreedingWindow?.start} to {prediction?.optimalBreedingWindow?.end}
              </Typography>
              <Typography variant="body2">
                Peak fertility: {prediction?.optimalBreedingWindow?.peakTime}
              </Typography>
            </Alert>
          </Grid>

          {/* Success Probability */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Success Probability
                </Typography>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={prediction?.successProbability} 
                      color="success"
                      sx={{ height: 20, borderRadius: 2 }}
                    />
                  </Box>
                  <Typography variant="body2">
                    {prediction?.successProbability}%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Based on age, health, and previous breeding history
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Factors */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Contributing Factors
                </Typography>
                <List dense>
                  {prediction?.factors?.map((factor, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Science fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={factor} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Breeding Plan Stepper */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Breeding Protocol
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      <Typography variant="caption">{step.description}</Typography>
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <List>
                      {step.tasks.map((task, taskIndex) => (
                        <ListItem key={taskIndex}>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={task} />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep(index + 1)}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={index === steps.length - 1}
                      >
                        Continue
                      </Button>
                      <Button
                        onClick={() => setActiveStep(index - 1)}
                        disabled={index === 0}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>

          {/* Semen Selection */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Select Semen
            </Typography>
            <Grid container spacing={2}>
              {prediction?.semenOptions?.map((semen) => (
                <Grid item xs={12} md={4} key={semen.id}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedSemen === semen.id ? 2 : 1,
                      borderColor: selectedSemen === semen.id ? 'primary.main' : 'divider'
                    }}
                    onClick={() => semen.available && handleSelectSemen(semen.id)}
                  >
                    <CardContent>
                      <Typography variant="subtitle2">{semen.id}</Typography>
                      <Typography variant="body2">Breed: {semen.breed}</Typography>
                      <Typography variant="body2">Conception: {semen.conception}</Typography>
                      <Typography variant="body2">Price: ${semen.price}</Typography>
                      <Chip 
                        label={semen.available ? 'Available' : 'Out of Stock'}
                        color={semen.available ? 'success' : 'error'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Schedule Breeding */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Schedule Breeding
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={format(appointmentDate, 'yyyy-MM-dd')}
                  onChange={(e) => setAppointmentDate(new Date(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="time"
                  label="Time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={handleScheduleBreeding}
                  sx={{ height: '56px' }}
                >
                  Schedule Breeding
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Previous Breedings */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Previous Breeding History
            </Typography>
            <List>
              {prediction?.previousBreedings?.map((breeding, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Event fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Breeding on ${breeding.date}`}
                    secondary={breeding.result === 'Successful' ? `Calf: ${breeding.calf}` : breeding.notes}
                  />
                  <Chip 
                    label={breeding.result}
                    color={breeding.result === 'Successful' ? 'success' : 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Breeding Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or observations..."
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Save />}
          onClick={() => {
            setSnackbar({
              open: true,
              message: 'Breeding plan saved',
              severity: 'success'
            });
          }}
        >
          Save Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BreedingDetailModal;