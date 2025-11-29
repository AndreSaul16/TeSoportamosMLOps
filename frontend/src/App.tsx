import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Menu from './pages/Menu';
import DashboardBI from './pages/DashboardBI';
import ETLView from './pages/ETLView';
import ClientListView from './pages/ClientListView';
import CreateView from './pages/CreateView';
import UpdateView from './pages/UpdateView';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/etl" element={<ETLView />} />
                    <Route path="/list" element={<ClientListView />} />
                    <Route path="/create" element={<CreateView />} />
                    <Route path="/update" element={<UpdateView />} />
                    <Route path="/dashboard" element={<DashboardBI />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
