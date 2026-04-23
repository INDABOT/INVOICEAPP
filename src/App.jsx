import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetails from './pages/InvoiceDetails';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-light transition-colors duration-300 dark:bg-dark lg:flex-row">
      <Sidebar />
      
      {/* 1. This Wrapper handles the offset for the fixed sidebar */}
      <div className="flex flex-1 flex-col pt-[72px] lg:pl-[103px] lg:pt-0">
        
        {/* 2. This Main tag centers the content beautifully in the remaining space */}
        <main className="mx-auto w-full max-w-[730px] px-6 py-8 md:px-12 md:py-14 lg:px-0 lg:py-16">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/invoice/:id" element={<InvoiceDetails />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;