@@ .. @@
       <div className="pt-8 border-t border-border flex flex-col items-center gap-6">
         <div className="flex items-center gap-4 text-4xl font-extrabold text-text">
           <DollarSign className="w-8 h-8 text-primary" />
-          Total: <span className="text-primary">${calculateTotal().toFixed(2)}</span>
+          Total: <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
         </div>