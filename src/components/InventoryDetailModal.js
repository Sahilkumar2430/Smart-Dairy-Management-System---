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
  Rating,
  Divider,
  Paper,
} from '@mui/material';
import {
  Close,
  Inventory,
  ShoppingCart,
  LocalShipping,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Store,
  Star,
  StarBorder,
  Phone,
  Email,
  Language,
  AccessTime,
  CheckCircle,
  Warning,
  Info,
  Save,
  Print,
  Share,
  Download,
  AddShoppingCart,
  RemoveShoppingCart,
  CompareArrows,
  PriceCheck,
} from '@mui/icons-material';
import { format, addDays } from 'date-fns';

function InventoryDetailModal({ open, onClose, prediction, onAction }) {
  const [orderQuantity, setOrderQuantity] = useState(prediction?.optimalOrder || 0);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderDate, setOrderDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handlePlaceOrder = () => {
    setSnackbar({
      open: true,
      message: `Order placed for ${orderQuantity} kg from ${selectedSupplier || 'selected supplier'}`,
      severity: 'success'
    });
  };

  const handleComparePrices = () => {
    window.open('https://www.google.com/search?q=agricultural+feed+prices', '_blank');
  };

  const handleContactSupplier = (supplier) => {
    window.open(`tel:${supplier.phone}`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Inventory sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">
              Inventory Management: {prediction?.item}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Compare Prices">
              <IconButton onClick={handleComparePrices} size="small">
                <CompareArrows />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Report">
              <IconButton onClick={() => {}} size="small">
                <Download />
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
          {/* Stock Alert */}
          <Grid item xs={12}>
            <Alert 
              severity={prediction?.daysRemaining < 10 ? 'error' : prediction?.daysRemaining < 15 ? 'warning' : 'info'}
            >
              <AlertTitle>Stock Status</AlertTitle>
              Current stock: {prediction?.currentStock} kg • 
              Daily usage: {prediction?.dailyUsage} kg • 
              Days remaining: {prediction?.daysRemaining} days
            </Alert>
          </Grid>

          {/* Stock Level */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Stock Level
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(prediction?.currentStock / (prediction?.dailyUsage * 30)) * 100}
                    color={prediction?.daysRemaining < 10 ? 'error' : prediction?.daysRemaining < 15 ? 'warning' : 'success'}
                    sx={{ height: 20, borderRadius: 2 }}
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Reorder Date
                    </Typography>
                    <Typography variant="body1">
                      {prediction?.reorderDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Optimal Order
                    </Typography>
                    <Typography variant="body1">
                      {prediction?.optimalOrder} kg
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Price Trend */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Price Trend
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  {prediction?.priceTrend?.includes('+') ? (
                    <TrendingUp color="error" sx={{ mr: 1 }} />
                  ) : (
                    <TrendingDown color="success" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="h4" color={prediction?.priceTrend?.includes('+') ? 'error' : 'success'}>
                    {prediction?.priceTrend}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  AI Recommendation: {prediction?.priceTrend?.includes('+') 
                    ? 'Buy now before prices increase' 
                    : 'Wait for better prices'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Suppliers */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Available Suppliers
            </Typography>
            <Grid container spacing={2}>
              {prediction?.suppliers?.map((supplier, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card 
                    variant="outlined"
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedSupplier === supplier.name ? 2 : 1,
                      borderColor: selectedSupplier === supplier.name ? 'primary.main' : 'divider'
                    }}
                    onClick={() => setSelectedSupplier(supplier.name)}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                        <Typography variant="subtitle2">{supplier.name}</Typography>
                        <Rating value={supplier.rating} readOnly size="small" precision={0.5} />
                      </Box>
                      <Typography variant="body2">
                        Price: ${supplier.price}/kg
                      </Typography>
                      <Typography variant="body2">
                        Delivery: {supplier.delivery}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactSupplier(supplier);
                          }}
                          sx={{ mr: 1 }}
                        >
                          Contact
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSupplier(supplier.name);
                          }}
                        >
                          Select
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Alternative Products */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Alternative Products
            </Typography>
            <List>
              {prediction?.alternativeProducts?.map((product, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Store />
                  </ListItemIcon>
                  <ListItemText 
                    primary={product.name}
                    secondary={`Protein: ${product.protein} • Price: $${product.price}/kg`}
                  />
                  <Button size="small" variant="outlined">
                    Compare
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Place Order */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Place Order
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Quantity (kg)"
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Delivery Date"
                  value={format(orderDate, 'yyyy-MM-dd')}
                  onChange={(e) => setOrderDate(new Date(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<AddShoppingCart />}
                  onClick={handlePlaceOrder}
                  sx={{ height: '56px' }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>
                Order Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body1">
                    ${(orderQuantity * (prediction?.suppliers?.[0]?.price || 40)).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1">
                    {format(addDays(orderDate, 3), 'MMM dd, yyyy')}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Terms
                  </Typography>
                  <Typography variant="body1">
                    Net 30 days
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body1">
                    Free
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Order Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions for delivery..."
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
              message: 'Order details saved',
              severity: 'success'
            });
          }}
        >
          Save Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InventoryDetailModal;