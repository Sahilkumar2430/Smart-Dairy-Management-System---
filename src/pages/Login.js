import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Link,
  Avatar,
  Grid,
  useTheme,
  Slide,
  Fade,
  Zoom,
  Grow,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  LocationOn,
  Agriculture,
  Pets,
  CalendarToday,
  CheckCircle,
  Error,
  Google,
  Facebook,
  Twitter,
  GitHub,
  Apple,
  Fingerprint,
  Security,
  VerifiedUser,
  AdminPanelSettings,
  AccountCircle,
  Badge,
  Store,
  Business,
  MenuBook,
  Grass,
  Egg,
  Cookie,
  Restaurant,
  LocalShipping,
  Warehouse,
  Savings,
  AccountBalance,
  Receipt,
  Payment,
  CreditCard,
  Calculate,
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
  History,
  Timeline,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  MonetizationOn,
  LocalHospital,
  Opacity,
  Inventory,
  Favorite,
  Add,
  Remove,
  Close,
  Done,
  ArrowBack,
  ArrowForward,
  ArrowUpward,
  ArrowDownward,
  Save,
  Settings,
  Help,
  Info,
  Warning,
  Lightbulb,
  AutoAwesome,
  Science,
  Biotech,
  Analytics,
  Insights,
  Psychology,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';

// Password strength checker
const checkPasswordStrength = (password) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  strength = Object.values(checks).filter(Boolean).length;

  return {
    score: strength,
    label: strength <= 2 ? 'Weak' : strength <= 3 ? 'Medium' : strength <= 4 ? 'Good' : 'Strong',
    color: strength <= 2 ? 'error' : strength <= 3 ? 'warning' : strength <= 4 ? 'info' : 'success',
    checks,
  };
};

// Email validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Phone validation
const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return re.test(phone);
};

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // State management
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: 'error', checks: {} });

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    farmName: '',
    farmSize: '',
    farmType: 'dairy',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    role: 'farmer',
    agreeToTerms: false,
    receiveUpdates: false,
  });

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // Check for saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Check password strength
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    }
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate basic info
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }
      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!validatePhone(formData.phone)) {
        setError('Please enter a valid phone number');
        return;
      }
    } else if (activeStep === 1) {
      // Validate farm details
      if (!formData.farmName) {
        setError('Please enter your farm name');
        return;
      }
    } else if (activeStep === 2) {
      // Validate password
      if (!formData.password || !formData.confirmPassword) {
        setError('Please fill in all password fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (passwordStrength.score < 3) {
        setError('Please use a stronger password');
        return;
      }
    }
    setActiveStep(activeStep + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    dispatch(loginStart());

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user
      const user = users.find(u => u.email === formData.email);
      
      if (!user) {
        setError('No account found with this email');
        dispatch(loginFailure('No account found with this email'));
        setLoading(false);
        return;
      }

      // Check password (in real app, this would be hashed)
      if (user.password !== formData.password) {
        setError('Invalid password');
        dispatch(loginFailure('Invalid password'));
        setLoading(false);
        return;
      }

      // Save credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Create session token
      const token = btoa(`${user.email}:${Date.now()}`);
      
      // Store user session
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify({ 
        ...user, 
        password: undefined // Don't store password in session
      }));

      // Update Redux state
      dispatch(loginSuccess({ 
        user: { ...user, password: undefined }, 
        token 
      }));

      toast.success(`Welcome back, ${user.firstName}!`);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
      dispatch(loginFailure('Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    dispatch(loginStart());

    try {
      // Validate terms agreement
      if (!formData.agreeToTerms) {
        setError('You must agree to the terms and conditions');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if email already exists
      if (users.some(u => u.email === formData.email)) {
        setError('An account with this email already exists');
        setLoading(false);
        return;
      }

      // Create new user (in real app, password would be hashed)
      const newUser = {
        id: users.length + 1,
        ...formData,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        status: 'active',
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto login after registration
      const token = btoa(`${newUser.email}:${Date.now()}`);
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify({ 
        ...newUser, 
        password: undefined 
      }));

      dispatch(loginSuccess({ 
        user: { ...newUser, password: undefined }, 
        token 
      }));

      toast.success('Registration successful! Welcome to Smart Dairy!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
      dispatch(loginFailure('Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`Login with ${provider} coming soon!`);
  };

  const handleForgotPassword = () => {
    toast.success('Password reset link sent to your email!');
  };

  const steps = [
    {
      label: 'Personal Information',
      description: 'Tell us about yourself',
    },
    {
      label: 'Farm Details',
      description: 'Tell us about your farm',
    },
    {
      label: 'Create Password',
      description: 'Secure your account',
    },
  ];

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Zoom in={true} timeout={500}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, #2E7D32, #FFB74D, #2196F3)',
              },
            }}
          >
            {/* Logo and Title */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  margin: '0 auto 16px',
                }}
              >
                <Agriculture sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2E7D32, #2196F3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Smart Dairy Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {isLogin 
                  ? 'Welcome back! Please sign in to continue'
                  : 'Join us to start managing your dairy farm efficiently'
                }
              </Typography>
            </Box>

            {/* Toggle between Login and Register */}
            <Box sx={{ mb: 3, width: '100%' }}>
              <Button
                fullWidth
                variant={isLogin ? 'contained' : 'outlined'}
                onClick={() => setIsLogin(true)}
                sx={{ mb: 1 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant={!isLogin ? 'contained' : 'outlined'}
                onClick={() => {
                  setIsLogin(false);
                  setActiveStep(0);
                  setError('');
                }}
              >
                Create Account
              </Button>
            </Box>

            {error && (
              <Slide direction="down" in={!!error}>
                <Alert 
                  severity="error" 
                  sx={{ width: '100%', mb: 2 }}
                  icon={<Error />}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              </Slide>
            )}

            {success && (
              <Slide direction="down" in={!!success}>
                <Alert 
                  severity="success" 
                  sx={{ width: '100%', mb: 2 }}
                  icon={<CheckCircle />}
                  onClose={() => setSuccess('')}
                >
                  {success}
                </Alert>
              </Slide>
            )}

            {/* Login Form */}
            {isLogin ? (
              <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  <Button 
                    variant="text" 
                    onClick={handleForgotPassword}
                    sx={{ textTransform: 'none' }}
                  >
                    Forgot password?
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 2, 
                    mb: 2, 
                    py: 1.5,
                    position: 'relative',
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Chip label="OR" size="small" />
                </Divider>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton 
                    onClick={() => handleSocialLogin('Google')}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Google />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleSocialLogin('Facebook')}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleSocialLogin('Twitter')}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleSocialLogin('Apple')}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Apple />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              /* Registration Form with Stepper */
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                          {step.description}
                        </Typography>

                        {index === 0 && (
                          <Grow in={activeStep === 0}>
                            <Box>
                              <TextField
                                fullWidth
                                required
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Person color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                fullWidth
                                required
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Badge color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                fullWidth
                                required
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Email color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                                helperText={formData.email && !validateEmail(formData.email) ? 'Invalid email format' : ''}
                                error={formData.email && !validateEmail(formData.email)}
                              />
                              <TextField
                                fullWidth
                                required
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Phone color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                                helperText={formData.phone && !validatePhone(formData.phone) ? 'Invalid phone format' : ''}
                                error={formData.phone && !validatePhone(formData.phone)}
                              />
                            </Box>
                          </Grow>
                        )}

                        {index === 1 && (
                          <Grow in={activeStep === 1}>
                            <Box>
                              <TextField
                                fullWidth
                                required
                                label="Farm Name"
                                name="farmName"
                                value={formData.farmName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Store color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                fullWidth
                                label="Farm Size (acres)"
                                name="farmSize"
                                type="number"
                                value={formData.farmSize}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Agriculture color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <FormControl component="fieldset" sx={{ mb: 2 }}>
                                <FormLabel component="legend">Farm Type</FormLabel>
                                <RadioGroup
                                  row
                                  name="farmType"
                                  value={formData.farmType}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel value="dairy" control={<Radio />} label="Dairy" />
                                  <FormControlLabel value="mixed" control={<Radio />} label="Mixed" />
                                  <FormControlLabel value="organic" control={<Radio />} label="Organic" />
                                </RadioGroup>
                              </FormControl>
                              <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationOn color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                  <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    fullWidth
                                    label="ZIP"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Grow>
                        )}

                        {index === 2 && (
                          <Grow in={activeStep === 2}>
                            <Box>
                              <TextField
                                fullWidth
                                required
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Lock color="action" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                      >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              
                              {/* Password strength indicator */}
                              {formData.password && (
                                <Box sx={{ mb: 2 }}>
                                  <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography variant="caption">Password strength:</Typography>
                                    <Chip 
                                      label={passwordStrength.label}
                                      color={passwordStrength.color}
                                      size="small"
                                    />
                                  </Box>
                                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                                    {[1, 2, 3, 4].map((level) => (
                                      <Box
                                        key={level}
                                        sx={{
                                          flex: 1,
                                          height: 4,
                                          borderRadius: 2,
                                          bgcolor: level <= passwordStrength.score 
                                            ? (passwordStrength.color === 'error' ? '#f44336' :
                                               passwordStrength.color === 'warning' ? '#ff9800' :
                                               passwordStrength.color === 'info' ? '#2196f3' : '#4caf50')
                                            : 'grey.300',
                                        }}
                                      />
                                    ))}
                                  </Box>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                    {Object.entries(passwordStrength.checks).map(([key, value]) => (
                                      <Chip
                                        key={key}
                                        icon={value ? <CheckCircle /> : <Error />}
                                        label={key}
                                        size="small"
                                        color={value ? 'success' : 'error'}
                                        variant="outlined"
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              )}

                              <TextField
                                fullWidth
                                required
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <VerifiedUser color="action" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                      >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                error={formData.confirmPassword && formData.password !== formData.confirmPassword}
                                helperText={
                                  formData.confirmPassword && formData.password !== formData.confirmPassword
                                    ? 'Passwords do not match'
                                    : ''
                                }
                              />

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Typography variant="body2">
                                    I agree to the{' '}
                                    <Link href="#" underline="hover">
                                      Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="#" underline="hover">
                                      Privacy Policy
                                    </Link>
                                  </Typography>
                                }
                              />

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="receiveUpdates"
                                    checked={formData.receiveUpdates}
                                    onChange={handleChange}
                                    color="primary"
                                  />
                                }
                                label="I would like to receive updates and tips via email"
                              />
                            </Box>
                          </Grow>
                        )}

                        <Box sx={{ mb: 2, mt: 2 }}>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            disabled={loading}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                {activeStep === steps.length && (
                  <Slide direction="up" in={activeStep === steps.length}>
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        All steps completed - ready to create your account!
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleRegister}
                        disabled={loading}
                        sx={{ mt: 2 }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Create Account'}
                      </Button>
                    </Paper>
                  </Slide>
                )}
              </Box>
            )}

            {/* Footer Links */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                By continuing, you agree to our{' '}
                <Link href="#" underline="hover">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      </Box>
    </Container>
  );
}

export default Login;