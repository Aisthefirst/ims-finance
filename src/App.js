import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoanCalculator from "./pages/LoanCalculator";
import JatuhTempoSugus from "./pages/JatuhTempo";
import Keterlambatan from "./pages/Keterlambatan";
import InputClient from "./pages/InputClient";
import CicilanClient from "./pages/CicilanClient";
import StatusCicilan from "./pages/StatusCicilan";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<InputClient />} />
          <Route path="/cicilan" element={<LoanCalculator />} />
          <Route path="/cicilanclient" element={<CicilanClient />} />
          <Route path="/jatuh-tempo" element={<JatuhTempoSugus />} />
          <Route path="/keterlambatan" element={<Keterlambatan />} />
          <Route path="/status" element={<StatusCicilan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import React from "react";
// import JatuhTempoSugus from "./JatuhTempoSugus";

// function App() {
//   return (
//     <div className="container">
//       <h1 className="my-4">Aplikasi Angsuran Kredit</h1>
//       <JatuhTempoSugus />
//     </div>
//   );
// }

// export default App;
