/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Opportunities from './pages/Opportunities';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import VulnerabilityRegistry from './pages/VulnerabilityRegistry';
import ShepherdOS from './pages/ShepherdOS';
import Invoices from './pages/Invoices';
import AgentWorkload from './pages/AgentWorkload';

import Reports from './pages/Reports';
import Projects from './pages/Projects';
import Expenses from './pages/Expenses';
import Campaigns from './pages/Campaigns';
import ContentPipeline from './pages/ContentPipeline';
import Partners from './pages/Partners';
import RiskRegister from './pages/RiskRegister';
import KnowledgeBase from './pages/KnowledgeBase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="clients" element={<Clients />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          
          <Route path="finance-invoices" element={<Invoices />} />
          <Route path="finance-expenses" element={<Expenses />} />
          <Route path="reports" element={<Reports />} />

          <Route path="marketing-campaigns" element={<Campaigns />} />
          <Route path="marketing-content" element={<ContentPipeline />} />
          
          <Route path="partners" element={<Partners />} />
          <Route path="vulnerability-registry" element={<VulnerabilityRegistry />} />
          <Route path="shepherdos" element={<ShepherdOS />} />
          <Route path="risk-register" element={<RiskRegister />} />

          <Route path="ai-agent-workload" element={<AgentWorkload />} />
          <Route path="ai-knowledge-base" element={<KnowledgeBase />} />
          
          {/* Fallback for any missed routes */}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}






