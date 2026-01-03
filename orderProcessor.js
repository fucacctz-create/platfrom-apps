/**
 * BEFORE REFACTORING: Complex Order Processing Function
 *
 * This function demonstrates common complexity issues:
 * - Multiple responsibilities (validation, calculation, notification, logging)
 * - Deep nesting (3-4 levels)
 * - Long function (100+ lines)
 * - Poor naming and magic numbers
 * - Mixed concerns
 * - Difficult to test and maintain
 */

function processOrder(order, user, inventory, config) {
  // Check if order exists
  if (order) {
    // Check if user exists
    if (user) {
      // Check if user is active
      if (user.status === 'active') {
        // Check if order has items
        if (order.items && order.items.length > 0) {
          let total = 0;
          let hasError = false;
          let errorMsg = '';

          // Process each item
          for (let i = 0; i < order.items.length; i++) {
            const item = order.items[i];

            // Check inventory
            if (inventory[item.id]) {
              if (inventory[item.id].quantity >= item.quantity) {
                // Calculate price with discounts
                let price = item.price * item.quantity;

                // Apply user type discount
                if (user.type === 'premium') {
                  if (item.quantity > 10) {
                    price = price * 0.85; // 15% discount
                  } else if (item.quantity > 5) {
                    price = price * 0.90; // 10% discount
                  } else {
                    price = price * 0.95; // 5% discount
                  }
                } else if (user.type === 'regular') {
                  if (item.quantity > 10) {
                    price = price * 0.95; // 5% discount
                  }
                }

                // Apply seasonal discount
                const now = new Date();
                const month = now.getMonth();
                if (month === 11 || month === 0) { // December or January
                  price = price * 0.90; // 10% winter discount
                } else if (month >= 5 && month <= 7) { // June, July, August
                  price = price * 0.93; // 7% summer discount
                }

                // Add shipping cost
                if (price < 50) {
                  price += 10; // Standard shipping
                } else if (price < 100) {
                  price += 5; // Reduced shipping
                }
                // Free shipping over 100

                total += price;

                // Update inventory
                inventory[item.id].quantity -= item.quantity;

                // Log transaction
                console.log(`Processed item ${item.id} for user ${user.id}: $${price}`);

              } else {
                hasError = true;
                errorMsg = `Insufficient inventory for item ${item.id}`;
                break;
              }
            } else {
              hasError = true;
              errorMsg = `Item ${item.id} not found in inventory`;
              break;
            }
          }

          if (!hasError) {
            // Apply tax
            if (config.taxEnabled) {
              const taxRate = user.state === 'CA' ? 0.0725 :
                            user.state === 'NY' ? 0.08 :
                            user.state === 'TX' ? 0.0625 : 0.05;
              total = total * (1 + taxRate);
            }

            // Check payment method and apply fees
            if (order.paymentMethod === 'credit_card') {
              total = total * 1.029; // 2.9% processing fee
            } else if (order.paymentMethod === 'paypal') {
              total = total * 1.034; // 3.4% processing fee
            }

            // Round to 2 decimal places
            total = Math.round(total * 100) / 100;

            // Create order record
            const orderRecord = {
              orderId: order.id,
              userId: user.id,
              total: total,
              status: 'confirmed',
              timestamp: new Date().toISOString()
            };

            // Send confirmation email
            if (user.email) {
              console.log(`Sending confirmation email to ${user.email}`);
              // Email sending logic would go here
            }

            // Send SMS if phone exists and total > 100
            if (user.phone && total > 100) {
              console.log(`Sending SMS to ${user.phone}`);
              // SMS sending logic would go here
            }

            // Update user loyalty points
            if (user.type === 'premium') {
              user.loyaltyPoints = (user.loyaltyPoints || 0) + Math.floor(total / 10);
            } else {
              user.loyaltyPoints = (user.loyaltyPoints || 0) + Math.floor(total / 20);
            }

            // Log success
            console.log(`Order ${order.id} processed successfully. Total: $${total}`);

            return {
              success: true,
              order: orderRecord,
              message: 'Order processed successfully'
            };

          } else {
            // Rollback inventory changes
            for (let i = 0; i < order.items.length; i++) {
              const item = order.items[i];
              if (inventory[item.id] && inventory[item.id].quantity < inventory[item.id].originalQuantity) {
                inventory[item.id].quantity = inventory[item.id].originalQuantity;
              }
            }

            console.error(`Order ${order.id} failed: ${errorMsg}`);
            return {
              success: false,
              error: errorMsg
            };
          }

        } else {
          return {
            success: false,
            error: 'Order has no items'
          };
        }
      } else {
        return {
          success: false,
          error: 'User account is not active'
        };
      }
    } else {
      return {
        success: false,
        error: 'User not found'
      };
    }
  } else {
    return {
      success: false,
      error: 'Order not found'
    };
  }
}

module.exports = { processOrder };
