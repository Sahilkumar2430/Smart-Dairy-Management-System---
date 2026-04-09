import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Badge,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import {
  Save,
  PhotoCamera,
  Notifications,
  Security,
  Language,
  Palette,
  Person,
  Email,
  Phone,
  LocationOn,
  VpnKey,
  Delete,
  Edit,
  Visibility,
  VisibilityOff,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  CloudUpload,
  Backup,
  Restore,
  Settings as SettingsIcon,
  AccountCircle,
  Lock,
  NotificationsActive,
  DarkMode,
  LightMode,
  Translate,
  AttachMoney,
  CalendarToday,
  Timer,
  WbSunny,
  Storage,
  Api,
  Webhook,
  Business,
  Store,
  Assessment,
  BarChart,
  Download,
  Upload,
  Print,
  Share,
  Link,
  GitHub,
  Google,
  Apple,
  Help,
  Info,
  Warning as WarningIcon,
  CheckCircle,
  Error,
  Favorite,
  Home,
  Work,
  School,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/slices/authSlice';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get current user from Redux store
  const { user: currentUser, token } = useSelector((state) => state.auth);
  
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User profile state
  const [profile, setProfile] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    farmName: '',
    farmSize: '',
    farmType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    bio: '',
    avatar: '',
    role: '',
    joinDate: null,
    preferences: {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      darkMode: false,
      language: 'English',
      currency: 'USD',
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  });

  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setLoading(true);
    try {
      // Try to get from Redux store first
      if (currentUser) {
        setProfile({
          ...profile,
          ...currentUser,
          joinDate: currentUser.joinDate ? new Date(currentUser.joinDate) : new Date(),
        });
      } else {
        // Fallback to localStorage
        const storedUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setProfile({
            ...profile,
            ...userData,
            joinDate: userData.joinDate ? new Date(userData.joinDate) : new Date(),
          });
        } else if (users.length > 0) {
          // If no current user but users exist, use the first one (for demo)
          const firstUser = users[0];
          setProfile({
            ...profile,
            ...firstUser,
            joinDate: firstUser.joinDate ? new Date(firstUser.joinDate) : new Date(),
          });
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    }
    setLoading(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handlePreferenceChange = (field, value) => {
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [field]: value,
      },
    });
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfile({
      ...profile,
      socialLinks: {
        ...profile.socialLinks,
        [platform]: value,
      },
    });
  };

  const handleSwitchChange = (name) => (e) => {
    handlePreferenceChange(name, e.target.checked);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({
          ...profile,
          avatar: e.target.result,
        });
        setSnackbar({
          open: true,
          message: 'Profile picture updated successfully!',
          severity: 'success',
        });
        setAvatarDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    setLoading(true);
    
    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find and update the current user
      const updatedUsers = users.map(user => {
        if (user.email === profile.email) {
          return {
            ...user,
            ...profile,
            updatedAt: new Date().toISOString(),
          };
        }
        return user;
      });

      // If user not found, add them (for demo purposes)
      if (!updatedUsers.find(u => u.email === profile.email)) {
        updatedUsers.push({
          ...profile,
          id: users.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify({ 
        ...profile, 
        password: undefined 
      }));

      // Update Redux store
      dispatch(updateUser(profile));

      setSnackbar({
        open: true,
        message: 'Settings saved successfully!',
        severity: 'success',
      });

      // Reload user data
      loadUserData();
    } catch (error) {
      console.error('Error saving settings:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save settings',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match!',
        severity: 'error',
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 8 characters long',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find and update user's password
      const updatedUsers = users.map(user => {
        if (user.email === profile.email) {
          // In a real app, you'd verify the current password and hash the new one
          return {
            ...user,
            password: passwordData.newPassword,
            updatedAt: new Date().toISOString(),
          };
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setSnackbar({
        open: true,
        message: 'Password changed successfully!',
        severity: 'success',
      });

      setPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setSnackbar({
        open: true,
        message: 'Failed to change password',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedEmail');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && !profile.firstName) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Settings
      </Typography>

      {/* Profile Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  size="small"
                  sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                  onClick={() => setAvatarDialogOpen(true)}
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              }
            >
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 100,
                  height: 100,
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              >
                {profile.firstName?.[0]}{profile.lastName?.[0]}
              </Avatar>
            </Badge>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {profile.role || 'Farm Owner'} • Member since {profile.joinDate ? format(profile.joinDate, 'MMMM yyyy') : 'N/A'}
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <Chip label={profile.email} size="small" icon={<Email />} />
              <Chip label={profile.phone || 'No phone'} size="small" icon={<Phone />} />
            </Box>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Settings Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<Person />} label="Profile" />
          <Tab icon={<Business />} label="Farm Details" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<Security />} label="Security" />
          <Tab icon={<Language />} label="Preferences" />
          <Tab icon={<Link />} label="Social Links" />
        </Tabs>
      </Paper>

      {/* Profile Tab */}
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profile.firstName || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profile.lastName || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profile.email || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profile.phone || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={3}
                value={profile.bio || ''}
                onChange={handleProfileChange}
                placeholder="Tell us a bit about yourself..."
              />
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Farm Details Tab */}
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Farm Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Farm Name"
                name="farmName"
                value={profile.farmName || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Store />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Farm Size (acres)"
                name="farmSize"
                type="number"
                value={profile.farmSize || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Assessment />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Farm Type</InputLabel>
                <Select
                  name="farmType"
                  value={profile.farmType || 'dairy'}
                  onChange={handleProfileChange}
                  label="Farm Type"
                >
                  <MenuItem value="dairy">Dairy Farm</MenuItem>
                  <MenuItem value="mixed">Mixed Farm</MenuItem>
                  <MenuItem value="organic">Organic Farm</MenuItem>
                  <MenuItem value="conventional">Conventional Farm</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={profile.address || ''}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={profile.city || ''}
                onChange={handleProfileChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={profile.state || ''}
                onChange={handleProfileChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={profile.zipCode || ''}
                onChange={handleProfileChange}
              />
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Notifications Tab */}
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <List>
            <ListItem>
              <ListItemIcon>
                <NotificationsActive />
              </ListItemIcon>
              <ListItemText 
                primary="Push Notifications"
                secondary="Receive notifications in your browser"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={profile.preferences?.notifications || false}
                  onChange={handleSwitchChange('notifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText 
                primary="Email Alerts"
                secondary="Receive updates via email"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={profile.preferences?.emailAlerts || false}
                  onChange={handleSwitchChange('emailAlerts')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText 
                primary="SMS Alerts"
                secondary="Receive text messages for urgent updates"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={profile.preferences?.smsAlerts || false}
                  onChange={handleSwitchChange('smsAlerts')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </TabPanel>

      {/* Security Tab */}
      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Button
            variant="outlined"
            startIcon={<VpnKey />}
            onClick={() => setPasswordDialogOpen(true)}
            fullWidth
            sx={{ mb: 2 }}
          >
            Change Password
          </Button>

          <Alert severity="info">
            <Typography variant="body2">
              Last password change: {format(new Date(), 'MMMM dd, yyyy')}
            </Typography>
          </Alert>
        </Paper>
      </TabPanel>

      {/* Preferences Tab */}
      <TabPanel value={tabValue} index={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Preferences
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={profile.preferences?.language || 'English'}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  label="Language"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={profile.preferences?.currency || 'USD'}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  label="Currency"
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="INR">INR (₹)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.preferences?.darkMode || false}
                    onChange={handleSwitchChange('darkMode')}
                  />
                }
                label="Dark Mode"
              />
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Social Links Tab */}
      <TabPanel value={tabValue} index={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Social Media Links
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Facebook"
                value={profile.socialLinks?.facebook || ''}
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook />
                    </InputAdornment>
                  ),
                }}
                placeholder="https://facebook.com/yourpage"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Twitter"
                value={profile.socialLinks?.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter />
                    </InputAdornment>
                  ),
                }}
                placeholder="https://twitter.com/yourhandle"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instagram"
                value={profile.socialLinks?.instagram || ''}
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
                placeholder="https://instagram.com/yourprofile"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn"
                value={profile.socialLinks?.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedIn />
                    </InputAdornment>
                  ),
                }}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} /> : <Save />}
          onClick={handleSaveSettings}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>

      {/* Avatar Upload Dialog */}
      <Dialog open={avatarDialogOpen} onClose={() => setAvatarDialogOpen(false)}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<CloudUpload />}
            sx={{ height: 100 }}
          >
            Choose Image
            <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} />
          </Button>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ''}
            helperText={
              passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ''
                ? 'Passwords do not match'
                : ''
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Change Password'}
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

export default Settings;