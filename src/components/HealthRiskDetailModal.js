import React, { useState, useEffect } from 'react';
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
  Alert,
  AlertTitle,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from '@mui/material';
import {
  Close,
  Warning,
  Info,
  CheckCircle,
  LocalHospital,
  Medication,
  Phone,
  Email,
  Schedule,
  Event,
  Assignment,
  TrendingUp,
  TrendingDown,
  Science,
  Biotech,
  HealthAndSafety,
  Save,
  Print,
  Share,
  Download,
  NotificationsActive,
  MedicalServices,
  Vaccines,
  Bloodtype,
  MonitorHeart,
  CalendarToday,
  AccessTime,
  Person,
  LocationOn,
  CloudDownload,
  OpenInNew,
} from '@mui/icons-material';
import { format } from 'date-fns';
import aiService from '../services/aiService';

function HealthRiskDetailModal({ open, onClose, prediction, onAction }) {
  const [loading, setLoading] = useState(false);
  const [actionPlan, setActionPlan] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [notes, setNotes] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [vetAppointment, setVetAppointment] = useState({
    date: new Date(),
    time: '10:00',
    vet: '',
    notes: ''
  });

  const steps = [
    {
      label: 'Immediate Actions',
      description: 'Take these actions within the next 24 hours',
      actions: prediction?.recommendations?.filter(r => r.urgency === 'immediate') || []
    },
    {
      label: 'Short-term Plan',
      description: 'Complete within 48-72 hours',
      actions: prediction?.recommendations?.filter(r => r.urgency === 'within 48 hours') || []
    },
    {
      label: 'Ongoing Monitoring',
      description: 'Daily tasks for the next week',
      actions: prediction?.recommendations?.filter(r => r.urgency === 'daily') || []
    }
  ];

  const handleActionClick = async (action) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSnackbar({
        open: true,
        message: `Action "${action}" marked as completed`,
        severity: 'success'
      });
      
      if (onAction) {
        onAction({
          type: 'health_action_completed',
          predictionId: prediction?.id,
          action: action
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to complete action',
        severity: 'error'
      });
    }
    setLoading(false);
  };

  const handleScheduleVet = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSnackbar({
        open: true,
        message: `Vet appointment scheduled for ${format(vetAppointment.date, 'MMM dd')} at ${vetAppointment.time}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to schedule appointment',
        severity: 'error'
      });
    }
    setLoading(false);
  };

  const handleDownloadReport = () => {
    const reportData = {
      ...prediction,
      generatedAt: new Date(),
      notes: notes
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_risk_${prediction?.cattleId}_${format(new Date(), 'yyyyMMdd')}.json`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Report downloaded successfully',
      severity: 'success'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Health Risk: ${prediction?.name}`,
          text: `${prediction?.condition} risk detected with ${prediction?.probability}% probability`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: 'Link copied to clipboard',
        severity: 'success'
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <LocalHospital sx={{ mr: 1, color: 'error.main' }} />
              <Typography variant="h6">
                Health Risk Analysis: {prediction?.name} ({prediction?.cattleId})
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Share">
                <IconButton onClick={handleShare} size="small">
                  <Share />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download Report">
                <IconButton onClick={handleDownloadReport} size="small">
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
            {/* Risk Overview */}
            <Grid item xs={12}>
              <Alert 
                severity={prediction?.risk === 'High' ? 'error' : prediction?.risk === 'Medium' ? 'warning' : 'info'}
                sx={{ mb: 2 }}
              >
                <AlertTitle>
                  {prediction?.risk} Risk Condition: {prediction?.condition}
                </AlertTitle>
                AI predicts {prediction?.probability}% probability of onset in {prediction?.daysToOnset} days
                (Confidence: {prediction?.confidence}%)
              </Alert>
            </Grid>

            {/* Key Factors */}
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

            {/* Probability Meter */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Risk Probability
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={prediction?.probability} 
                        color={prediction?.risk === 'High' ? 'error' : prediction?.risk === 'Medium' ? 'warning' : 'info'}
                        sx={{ height: 20, borderRadius: 2 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {prediction?.probability}%
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      Time to onset: {prediction?.daysToOnset} days
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Confidence interval: ±{100 - prediction?.confidence}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Action Plan Stepper */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Recommended Action Plan
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
                        {step.actions.map((action, actionIndex) => (
                          <ListItem key={actionIndex}>
                            <ListItemIcon>
                              <CheckCircle color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={action.action}
                              secondary={
                                <>
                                  <Typography variant="caption" display="block">
                                    Duration: {action.duration}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    Resources: {action.resources?.join(', ')}
                                  </Typography>
                                </>
                              }
                            />
                            <Button 
                              size="small" 
                              variant="outlined"
                              onClick={() => handleActionClick(action.action)}
                              disabled={loading}
                            >
                              Mark Done
                            </Button>
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

            {/* Medications */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Recommended Medications
                  </Typography>
                  <Grid container spacing={2}>
                    {prediction?.medications?.map((med, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Medication sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="subtitle2">{med.name}</Typography>
                          </Box>
                          <Typography variant="body2">
                            Dosage: {med.dosage} • Frequency: {med.frequency}
                          </Typography>
                          <Typography variant="body2">
                            Duration: {med.duration}
                          </Typography>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            sx={{ mt: 1 }}
                            onClick={() => window.open(`https://www.google.com/search?q=${med.name}+veterinary+medicine`, '_blank')}
                          >
                            Search Online
                          </Button>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Veterinarian Contact */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ bgcolor: 'primary.light' }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom color="white">
                    Veterinarian Contact
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center">
                        <Person sx={{ mr: 1, color: 'white' }} />
                        <Typography color="white">{prediction?.vetContact?.name}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center">
                        <Phone sx={{ mr: 1, color: 'white' }} />
                        <Typography color="white">
                          <a href={`tel:${prediction?.vetContact?.phone}`} style={{ color: 'white' }}>
                            {prediction?.vetContact?.phone}
                          </a>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center">
                        <Email sx={{ mr: 1, color: 'white' }} />
                        <Typography color="white">
                          <a href={`mailto:${prediction?.vetContact?.email}`} style={{ color: 'white' }}>
                            {prediction?.vetContact?.email}
                          </a>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Schedule Vet Appointment */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Schedule Vet Appointment
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    value={format(vetAppointment.date, 'yyyy-MM-dd')}
                    onChange={(e) => setVetAppointment({...vetAppointment, date: new Date(e.target.value)})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Time"
                    value={vetAppointment.time}
                    onChange={(e) => setVetAppointment({...vetAppointment, time: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={handleScheduleVet}
                    disabled={loading}
                    sx={{ height: '56px' }}
                  >
                    Schedule Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your observations or notes about this case..."
              />
            </Grid>

            {/* Similar Cases */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Similar Historical Cases
              </Typography>
              <List>
                {prediction?.similarCases?.map((case_, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Event fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`Case from ${case_.date}`}
                      secondary={case_.outcome}
                    />
                    <Button size="small" variant="text">
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
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
                message: 'Action plan saved',
                severity: 'success'
              });
            }}
          >
            Save Action Plan
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default HealthRiskDetailModal;