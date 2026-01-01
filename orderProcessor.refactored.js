/**
 * AFTER REFACTORING: Clean Order Processing Module
 *
 * Improvements:
 * - Single Responsibility Principle: Each function has one clear purpose
 * - Reduced nesting: Early returns and guard clauses
 * - Named constants: No magic numbers
 * - Separation of concerns: Validation, calculation, and side effects separated
 * - Better testability: Pure functions for calculations
 * - Improved readability: Clear function names and structure
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const DISCOUNT_RATES = {
  PREMIUM_HIGH_VOLUME: 0.15,    // 15% for premium users, 10+ items
  PREMIUM_MID_VOLUME: 0.10,     // 10% for premium users, 6-10 items
  PREMIUM_LOW_VOLUME: 0.05,     // 5% for premium users, 1-5 items
  REGULAR_HIGH_VOLUME: 0.05     // 5% for regular users, 10+ items
};

const SEASONAL_DISCOUNTS = {
  WINTER: { months: [11, 0], rate: 0.10 },  // December, January - 10%
  SUMMER: { months: [5, 6, 7], rate: 0.07 }  // June-August - 7%
};

const SHIPPING_COSTS = {
  THRESHOLD_FREE: 100,
  THRESHOLD_REDUCED: 50,
  COST_STANDARD: 10,
  COST_REDUCED: 5
};

const PAYMENT_FEES = {
  CREDIT_CARD: 0.029,  // 2.9%
  PAYPAL: 0.034        // 3.4%
};

const TAX_RATES = {
  CA: 0.0725,
  NY: 0.08,
  TX: 0.0625,
  DEFAULT: 0.05
};

const LOYALTY_POINTS_MULTIPLIER = {
  PREMIUM: 10,
  REGULAR: 20
};

const NOTIFICATION_THRESHOLD = 100;

// ============================================================================
// VALIDATION
// ============================================================================

function validateOrder(order, user, inventory) {
  if (!order) {
    return { valid: false, error: 'Order not found' };
  }

  if (!user) {
    return { valid: false, error: 'User not found' };
  }

  if (user.status !== 'active') {
    return { valid: false, error: 'User account is not active' };
  }

  if (!order.items || order.items.length === 0) {
    return { valid: false, error: 'Order has no items' };
  }

  return { valid: true };
}

function validateInventory(item, inventory) {
  if (!inventory[item.id]) {
    return { valid: false, error: `Item ${item.id} not found in inventory` };
  }

  if (inventory[item.id].quantity < item.quantity) {
    return { valid: false, error: `Insufficient inventory for item ${item.id}` };
  }

  return { valid: true };
}

// ============================================================================
// DISCOUNT CALCULATIONS
// ============================================================================

function calculateUserTypeDiscount(userType, quantity) {
  if (userType === 'premium') {
    if (quantity > 10) return DISCOUNT_RATES.PREMIUM_HIGH_VOLUME;
    if (quantity > 5) return DISCOUNT_RATES.PREMIUM_MID_VOLUME;
    return DISCOUNT_RATES.PREMIUM_LOW_VOLUME;
  }

  if (userType === 'regular' && quantity > 10) {
    return DISCOUNT_RATES.REGULAR_HIGH_VOLUME;
  }

  return 0;
}

function calculateSeasonalDiscount() {
  const currentMonth = new Date().getMonth();

  if (SEASONAL_DISCOUNTS.WINTER.months.includes(currentMonth)) {
    return SEASONAL_DISCOUNTS.WINTER.rate;
  }

  if (SEASONAL_DISCOUNTS.SUMMER.months.includes(currentMonth)) {
    return SEASONAL_DISCOUNTS.SUMMER.rate;
  }

  return 0;
}

function applyDiscount(price, discountRate) {
  return price * (1 - discountRate);
}

// ============================================================================
// PRICE CALCULATIONS
// ============================================================================

function calculateItemBasePrice(item) {
  return item.price * item.quantity;
}

function calculateShippingCost(subtotal) {
  if (subtotal >= SHIPPING_COSTS.THRESHOLD_FREE) {
    return 0;
  }

  if (subtotal >= SHIPPING_COSTS.THRESHOLD_REDUCED) {
    return SHIPPING_COSTS.COST_REDUCED;
  }

  return SHIPPING_COSTS.COST_STANDARD;
}

function calculateItemPrice(item, userType) {
  let price = calculateItemBasePrice(item);

  // Apply user type discount
  const userDiscount = calculateUserTypeDiscount(userType, item.quantity);
  price = applyDiscount(price, userDiscount);

  // Apply seasonal discount
  const seasonalDiscount = calculateSeasonalDiscount();
  price = applyDiscount(price, seasonalDiscount);

  return price;
}

function calculateTax(amount, userState, config) {
  if (!config.taxEnabled) {
    return 0;
  }

  const taxRate = TAX_RATES[userState] || TAX_RATES.DEFAULT;
  return amount * taxRate;
}

function calculatePaymentFee(amount, paymentMethod) {
  const feeRate = PAYMENT_FEES[paymentMethod.toUpperCase()] || 0;
  return amount * feeRate;
}

function roundToTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// ============================================================================
// INVENTORY MANAGEMENT
// ============================================================================

function reserveInventory(items, inventory) {
  const reserved = [];

  for (const item of items) {
    const validation = validateInventory(item, inventory);

    if (!validation.valid) {
      // Rollback previously reserved items
      rollbackInventory(reserved, inventory);
      return { success: false, error: validation.error };
    }

    inventory[item.id].quantity -= item.quantity;
    reserved.push(item);
  }

  return { success: true, reserved };
}

function rollbackInventory(items, inventory) {
  for (const item of items) {
    if (inventory[item.id]) {
      inventory[item.id].quantity += item.quantity;
    }
  }
}

// ============================================================================
// LOYALTY POINTS
// ============================================================================

function calculateLoyaltyPoints(total, userType) {
  const multiplier = LOYALTY_POINTS_MULTIPLIER[userType.toUpperCase()] ||
                     LOYALTY_POINTS_MULTIPLIER.REGULAR;
  return Math.floor(total / multiplier);
}

function updateLoyaltyPoints(user, points) {
  user.loyaltyPoints = (user.loyaltyPoints || 0) + points;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

function sendOrderNotifications(user, total) {
  const notifications = [];

  if (user.email) {
    console.log(`Sending confirmation email to ${user.email}`);
    notifications.push({ type: 'email', recipient: user.email });
  }

  if (user.phone && total > NOTIFICATION_THRESHOLD) {
    console.log(`Sending SMS to ${user.phone}`);
    notifications.push({ type: 'sms', recipient: user.phone });
  }

  return notifications;
}

// ============================================================================
// ORDER CREATION
// ============================================================================

function createOrderRecord(orderId, userId, total) {
  return {
    orderId,
    userId,
    total,
    status: 'confirmed',
    timestamp: new Date().toISOString()
  };
}

// ============================================================================
// LOGGING
// ============================================================================

function logItemProcessing(itemId, userId, price) {
  console.log(`Processed item ${itemId} for user ${userId}: $${price}`);
}

function logOrderSuccess(orderId, total) {
  console.log(`Order ${orderId} processed successfully. Total: $${total}`);
}

function logOrderFailure(orderId, error) {
  console.error(`Order ${orderId} failed: ${error}`);
}

// ============================================================================
// MAIN PROCESSING FUNCTION
// ============================================================================

function processOrder(order, user, inventory, config) {
  // Validate inputs
  const validation = validateOrder(order, user, inventory);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Reserve inventory
  const inventoryResult = reserveInventory(order.items, inventory);
  if (!inventoryResult.success) {
    logOrderFailure(order.id, inventoryResult.error);
    return { success: false, error: inventoryResult.error };
  }

  // Calculate item prices
  let subtotal = 0;
  for (const item of order.items) {
    const itemPrice = calculateItemPrice(item, user.type);
    subtotal += itemPrice;
    logItemProcessing(item.id, user.id, itemPrice);
  }

  // Calculate shipping
  const shippingCost = calculateShippingCost(subtotal);
  let total = subtotal + shippingCost;

  // Calculate tax
  const tax = calculateTax(total, user.state, config);
  total += tax;

  // Calculate payment fee
  const paymentFee = calculatePaymentFee(total, order.paymentMethod);
  total += paymentFee;

  // Round final total
  total = roundToTwoDecimals(total);

  // Create order record
  const orderRecord = createOrderRecord(order.id, user.id, total);

  // Send notifications (side effect)
  sendOrderNotifications(user, total);

  // Update loyalty points (side effect)
  const loyaltyPoints = calculateLoyaltyPoints(total, user.type);
  updateLoyaltyPoints(user, loyaltyPoints);

  // Log success
  logOrderSuccess(order.id, total);

  return {
    success: true,
    order: orderRecord,
    message: 'Order processed successfully'
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  processOrder,
  // Export helpers for testing
  validateOrder,
  validateInventory,
  calculateUserTypeDiscount,
  calculateSeasonalDiscount,
  calculateItemPrice,
  calculateTax,
  calculatePaymentFee,
  calculateLoyaltyPoints,
  reserveInventory,
  rollbackInventory
};
