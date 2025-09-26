@@ .. @@
             <div className="bg-background p-6 rounded-xl border border-border shadow-md flex flex-col items-center justify-center">
               <p className="text-textSecondary text-lg mb-2">Total Revenue</p>
-              <span className="text-5xl font-extrabold text-success">${report.totalRevenue.toFixed(2)}</span>
+              <span className="text-5xl font-extrabold text-success">₹{report.totalRevenue.toFixed(2)}</span>
             </div>
@@ .. @@
                     <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-primary">
-                      ${booking.totalAmount.toFixed(2)}
+                      ₹{booking.totalAmount.toFixed(2)}
                     </td>