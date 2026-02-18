import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import "./index.css";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
import LoginLayout from "./layouts/LoginLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NameFixing from "./pages/nameFixing/NameFixing";
import NameNumerologyResults from "./pages/nameFixing/NameNumerologyResults";
import MobileNumerology from "./pages/mobileNumerology/MobileNumerology";
import MobileNumerologyReport from "./pages/mobileNumerology/MobileNumerologyReport";
import AdvanceMobileNumerology from "./pages/mobileNumerology/AdvanceMobileNumerology";
import LoshuGridMastery from "./pages/loshuGridMastery/LoshuGridMastery";
import MatchLoshu from "./pages/loshuGridMastery/MatchLoshu";
import MatchVedic from "./pages/loshuGridMastery/MatchVedic";
import LoshuGridReport from "./pages/loshuGridMastery/LoshuGridReport";
import VedicSwitchwordReport from "./pages/vedicSwitchWord/VedicSwitchwordReport";
import VedicSwitchWord from "./pages/vedicSwitchWord/VedicSwitchWord";
import { AuthGuard } from "./layouts/AuthGuard";
import CrystalIntermediate from "./pages/crystal/CrystalIntermediate";
import CrystalAdvanced from "./pages/crystal/CrystalAdvanced";
import CrystalIntermediateReport from "./pages/crystal/CrystalIntermediateReport";
import CrystalAdvancedReport from "./pages/crystal/CrystalAdvancedReport";
import DivineHealingCodes from "./pages/divineHealingCodes/DivineHealingCodes";
import DivineHealingCodesReport from "./pages/divineHealingCodes/DivineHealingCodesReport";

function App() {
  return (
    <Router>
      <UserProvider>
        
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/name-fixing" element={<AuthGuard><NameFixing /></AuthGuard>} />
            <Route path="/name-fixing/:id" element={<AuthGuard><NameNumerologyResults /></AuthGuard>} />
            <Route path="/mobile-numerology" element={<AuthGuard><MobileNumerology /></AuthGuard>} />
            <Route path="/advance-mobile-numerology" element={<AuthGuard><AdvanceMobileNumerology /></AuthGuard>} />
            <Route path="/mobile-numerology/list" element={<AuthGuard><MobileNumerologyReport /></AuthGuard>} />
            <Route path="/loshu-grid-mastery" element={<AuthGuard><LoshuGridMastery /></AuthGuard>} />
            <Route path="/match-loshu" element={<AuthGuard><MatchLoshu /></AuthGuard>} />
            <Route path="/match-vedic" element={<AuthGuard><MatchVedic /></AuthGuard>} />
            <Route path="/loshu-grid/list" element={<AuthGuard><LoshuGridReport /></AuthGuard>} />
            <Route path="/vedic-switch-word" element={<AuthGuard><VedicSwitchWord /></AuthGuard>} />
            <Route path="/vedic-switchword/list" element={<AuthGuard><VedicSwitchwordReport /></AuthGuard>} />
            <Route path="/crystal-intermediate" element={<AuthGuard><CrystalIntermediate /></AuthGuard>} />
            <Route path="/crystal-advanced" element={<AuthGuard><CrystalAdvanced /></AuthGuard>} />
            <Route path="/crystal-intermediate/list" element={<AuthGuard><CrystalIntermediateReport /></AuthGuard>} />
            <Route path="/crystal-advanced/list" element={<AuthGuard><CrystalAdvancedReport /></AuthGuard>} />
            <Route path="/divine-healing-codes" element={<AuthGuard><DivineHealingCodes /></AuthGuard>} />  
            <Route path="/divine-healing-codes/list" element={<AuthGuard><DivineHealingCodesReport /></AuthGuard>} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
