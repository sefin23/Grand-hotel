@@ .. @@
                 {booking.room && (
                   <p className="text-textSecondary mb-2">
-                    <span className="font-medium text-text">Room:</span> {booking.room.type} (${booking.room.price}/night)
+                    <span className="font-medium text-text">Room:</span> {booking.room.type} (₹{booking.room.price}/night)
                   </p>
                 )}
                 {booking.hall && (
                   <p className="text-textSecondary mb-2">
-                    <span className="font-medium text-text">Hall:</span> {booking.hall.type} (${booking.hall.price}/event)
+                    <span className="font-medium text-text">Hall:</span> {booking.hall.type} (₹{booking.hall.price}/event)
                   </p>
                 )}
@@ .. @@
                     <ul className="list-disc list-inside text-textSecondary">
                       {booking.foodOrders.map((food, idx) => (
-                        <li key={idx}>{food.name} x {food.quantity} (${(food.price * food.quantity).toFixed(2)})</li>
+                        <li key={idx}>{food.name} x {food.quantity} (₹{(food.price * food.quantity).toFixed(2)})</li>
                       ))}
                     </ul>
@@ .. @@
                 <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                   <p className="text-textSecondary text-sm">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
-                  <p className="text-2xl font-bold text-primary">Total: ${booking.totalAmount.toFixed(2)}</p>
+                  <p className="text-2xl font-bold text-primary">Total: ₹{booking.totalAmount.toFixed(2)}</p>
                 </div>