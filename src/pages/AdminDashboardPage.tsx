@@ .. @@
 import React, { useEffect, useState } from 'react'
 import { useAuthStore } from '../store/authStore'
 import { useNavigate } from 'react-router-dom'
 import {
   LayoutDashboard,
   Bed,
   Users,
   Utensils,
   Loader2,
   XCircle,
   CheckCircle,
   Clock,
   DollarSign,
   Calendar,
   Download,
+  CalendarCheck,
 } from 'lucide-react'
 import axios from 'axios'