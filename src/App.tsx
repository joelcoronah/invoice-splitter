// import { InvoiceSplitter } from "./components/invoice-splitter";

import { InvoiceSplitter } from "./components/invoice-splitter";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10">
          <InvoiceSplitter />
        </div>
      </div>
    </div>
  );
}

export default App;
