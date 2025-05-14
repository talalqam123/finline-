import React, { useRef, useState, useEffect } from 'react';
import { Button } from "../../ui/button";
import { Printer, FileText } from "lucide-react";
import { useBusinessReport } from '../../../context/BusinessReportContext';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Professional color palette
const CHART_COLORS = {
  revenue: '#4F46E5',
  costs: '#F59E0B',
  profit: '#10B981',
  productA: '#0EA5E9',
  productB: '#8B5CF6',
  productC: '#EC4899',
  primary: '#4F46E5'
};

function Home() {
  const reportRef = useRef(null);
  const { state, calculateFinancials, calculateProjectCosts, calculateWorkingCapital, formatMoney, formatTitle } = useBusinessReport();

  // Add print styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        /* Reset all margins and paddings */
        @page {
          margin: 0.5cm;
          size: A4;
        }

        /* Reset document layout */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          min-width: 100% !important;
          background: white !important;
        }

        /* Hide UI elements */
        .no-print, 
        button, 
        .print-button,
        nav,
        header,
        .settings-panel,
        [role="tablist"],
        [role="tab"],
        .preview-controls {
          display: none !important;
        }

        /* Optimize report container */
        #report-content {
          padding: 0 !important;
          margin: 0 auto !important;
          width: 100% !important;
          max-width: none !important;
          background: white !important;
          color: black !important;
          box-shadow: none !important;
          float: none !important;
          position: relative !important;
        }

        /* Adjust section spacing */
        section {
          page-break-inside: ${state.pdfSettings?.pageSpacing === 'onePerPage' ? 'avoid' : 'auto'};
          ${state.pdfSettings?.pageSpacing === 'onePerPage' ? 'page-break-after: always;' : ''}
          margin-bottom: 1.5cm !important;
        }

        /* Optimize tables for print */
        table {
          width: 100% !important;
          margin: 0 !important;
          page-break-inside: avoid;
        }

        /* Ensure charts print properly */
        .recharts-wrapper {
          width: 100% !important;
          page-break-inside: avoid;
          margin: 0 auto !important;
        }

        /* Adjust grid layouts for print */
        .grid {
          grid-template-columns: 1fr !important;
          gap: 1cm !important;
        }

        /* Remove decorative elements */
        * {
          box-shadow: none !important;
          text-shadow: none !important;
        }

        /* Ensure text is black for better print quality */
        p, h1, h2, h3, h4, h5, h6, span, td, th {
          color: black !important;
        }

        /* Optimize fonts for print */
        body {
          font-size: 12pt !important;
          line-height: 1.3 !important;
        }

        /* Ensure headers are properly sized */
        h1 { font-size: 24pt !important; }
        h2 { font-size: 20pt !important; }
        h3 { font-size: 16pt !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [state.pdfSettings?.pageSpacing]);

  return (
    <div className="mx-auto px-4 py-6">
      {/* Top Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-between items-center no-print">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-indigo-600 mr-2" />
          <h1 className="text-base font-bold text-gray-800">Business Report Dashboard</h1>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => window.print()}
            variant="default"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>
      
      {/* Report Content */}
      <div 
        ref={reportRef} 
        id="report-content" 
        className="bg-white p-8 rounded-lg shadow-sm print:shadow-none print:p-0 print:w-full print:max-w-none print:m-0 text-sm"
        style={{ pageBreakAfter: 'always' }}
      >
        {/* Cover Photo */}
        {state.pdfSettings?.coverPhoto ? (
          <div className="mb-12 -mx-8 -mt-8 print:mb-8">
            <div className="relative">
              <img 
                src={state.pdfSettings.coverPhoto} 
                alt="Report Cover" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h1 className="text-4xl font-bold text-white mb-2">{state.project.name || 'Business Report'}</h1>
                <p className="text-white/90 text-lg">{state.project.address}</p>
                <p className="text-white/80 mt-2 text-sm">
                  Business Report • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Header - Show only if no cover photo */
          <div className="mb-8 text-center pb-6 border-b border-indigo-100 print:mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-indigo-900">{state.project.name || 'Business Report'}</h1>
            <p className="text-sm text-gray-600">{state.project.address}</p>
            <p className="text-xs text-indigo-600 mt-2 font-semibold">
              Business Report • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        )}

        {/* Executive Summary - Always show */}
        <section className="mb-10 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Executive Summary</h2>
          <p className="text-gray-700">
            This comprehensive business report presents a detailed analysis of {state.project.name}, 
            highlighting its financial projections, market potential, and strategic planning. 
            The report is designed to provide stakeholders with actionable insights and a clear 
            understanding of the business proposition and its projected financial performance.
          </p>
        </section>
        
        {/* Project at a Glance - Show if basic project info exists */}
        {(state.project.status || state.project.industry || state.project.sector) && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Project at a Glance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 pb-2 border-b">Business Information</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold w-2/5 text-gray-600">Status</td>
                      <td className="py-2 text-gray-800">{state.project.status}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Industry</td>
                      <td className="py-2 text-gray-800">{state.project.industry}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Sector</td>
                      <td className="py-2 text-gray-800">{state.project.sector}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Constitution</td>
                      <td className="py-2 text-gray-800">{state.project.constitution}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Incorporation Date</td>
                      <td className="py-2 text-gray-800">{state.project.incorporationDate}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Project Location</td>
                      <td className="py-2 text-gray-800">{state.project.location}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Contact Person</td>
                      <td className="py-2 text-gray-800">{state.project.contactPerson}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 pb-2 border-b">Financial Overview</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold w-2/5 text-gray-600">Project Cost</td>
                      <td className="py-2 text-gray-800 font-medium">{formatMoney(state.project.cost)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Term Loan</td>
                      <td className="py-2 text-gray-800">{formatMoney(state.project.termLoan)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Working Capital</td>
                      <td className="py-2 text-gray-800">{formatMoney(state.project.workingCapital)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Net Worth</td>
                      <td className="py-2 text-gray-800 font-medium">{formatMoney(state.project.netWorth)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Year</td>
                      <td className="py-2 text-gray-800">{state.project.year}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-semibold text-gray-600">Email</td>
                      <td className="py-2 text-gray-800">{state.project.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
        
        {/* Promoter's Details - Show if promoters data exists */}
        {state.promoters && state.promoters.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Promoter's Details</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Position</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Experience</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Education</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Equity Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.promoters.map((promoter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-800 font-medium">{promoter.name}</td>
                      <td className="px-4 py-3 text-gray-600">{promoter.position}</td>
                      <td className="px-4 py-3 text-gray-600">{promoter.experience}</td>
                      <td className="px-4 py-3 text-gray-600">{promoter.education}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{promoter.equityShare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        
        {/* Financial Projections - Show if financial data exists */}
        {state.financials && state.financials.projections && state.financials.projections.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">{formatTitle("Financial Projections")}</h2>
            </div>
            
            <div className="overflow-x-auto mb-6 bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particulars</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Year 1</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Year 2</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Year 3</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Year 4</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Year 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.financials.projections.map((row, index) => (
                    <tr key={index} className={row.isTotal ? 'bg-indigo-50 font-semibold' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{row.particular}</td>
                      <td className="px-4 py-3 text-gray-800">{row.year1}</td>
                      <td className="px-4 py-3 text-gray-800">{row.year2}</td>
                      <td className="px-4 py-3 text-gray-800">{row.year3}</td>
                      <td className="px-4 py-3 text-gray-800">{row.year4}</td>
                      <td className="px-4 py-3 text-gray-800">{row.year5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Financial Charts */}
            <div className="space-y-8 mt-8">
              {/* Bar Chart for P&L Projection */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm w-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Profit & Loss Projection</h3>
                <div className="h-96 print:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={state.financials.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                      <YAxis tick={{ fill: '#6B7280' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', border: 'none' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.revenue} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="costs" name="Operating Costs" fill={CHART_COLORS.costs} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="profit" name="Net Profit" fill={CHART_COLORS.profit} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart for Revenue Sources */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm w-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Revenue Sources</h3>
                <div className="h-96 print:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={state.financials.revenueSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {state.financials.revenueSourceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={[CHART_COLORS.revenue, CHART_COLORS.productB, CHART_COLORS.productC][index % 3]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', border: 'none' }}
                        formatter={(value) => `${value}%`}
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Scope of the Project - Show if scope data exists */}
        {state.scope && state.scope.paragraphs && state.scope.paragraphs.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Scope of the Project</h2>
            </div>
            
            <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              {state.scope.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Market Potential & Strategy - Show if market data exists */}
        {state.market && (state.market.paragraphs?.length > 0 || state.market.list?.length > 0) && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Market Potential & Strategy</h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{state.market.paragraphs[0]}</p>
                <p className="text-gray-700 leading-relaxed">{state.market.paragraphs[1]}</p>
                
                <div className="pl-5 my-6 border-l-4 border-indigo-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Strategic Market Initiatives:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-xs">
                    {state.market.list.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
                
                {state.market.paragraphs2 && (
                  <p className="text-gray-700 leading-relaxed mt-4 font-medium">
                    {Array.isArray(state.market.paragraphs2) ? state.market.paragraphs2[0] : state.market.paragraphs2}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
        
        {/* Risks & Mitigation Strategy - Show if risks data exists */}
        {state.risks && state.risks.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Risks & Mitigation Strategy</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Risk Factor</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Impact</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Probability</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Mitigation Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.risks.map((risk, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-800 font-medium">{risk.factor || risk.risk}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          risk.impact.toLowerCase().includes('high') 
                            ? 'bg-red-100 text-red-800' 
                            : risk.impact.toLowerCase().includes('medium')
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {risk.impact}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          risk.probability.toLowerCase().includes('high') 
                            ? 'bg-red-100 text-red-800' 
                            : risk.probability.toLowerCase().includes('medium')
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {risk.probability}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{risk.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        
        {/* Assumptions - Show if assumptions exist */}
        {state.annexure?.assumptions && state.annexure.assumptions.trim() !== '' && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Assumptions</h2>
            </div>
            
            <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {state.annexure.assumptions}
              </div>
            </div>
          </section>
        )}

        {/* Annexure - Show if annexure text exists */}
        {state.annexure?.annexureText && state.annexure.annexureText.trim() !== '' && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Annexure</h2>
            </div>
            
            <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {state.annexure.annexureText}
              </div>
            </div>
          </section>
        )}

        {/* Project Cost - Show if project cost data exists */}
        {(state.projectCost?.length > 0 || state.workingCapital?.length > 0) && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Project Cost</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-lg font-semibold p-4 bg-indigo-50 text-indigo-800 border-b">Capital Expenditure</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particular</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {state.projectCost.map((cost, index) => (
                        <tr key={index} className={cost.isTotal ? 'bg-gray-100 font-medium' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-gray-800">{cost.particular}</td>
                          <td className="px-4 py-3 text-gray-800">{formatMoney(cost.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-lg font-semibold p-4 bg-indigo-50 text-indigo-800 border-b">Working Capital Computation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particular</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {state.workingCapital.map((cost, index) => (
                        <tr key={index} className={cost.isTotal ? 'bg-gray-100 font-medium' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-gray-800">{cost.particular}</td>
                          <td className="px-4 py-3 text-gray-800">{formatMoney(cost.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Total Yearly Expense */}
        {state.yearlyExpense && state.yearlyExpense.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Total Yearly Expense</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Item</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount ({state.pdfSettings?.currencySymbol || '₹'})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.yearlyExpense.map((item, index) => (
                    <tr key={index} className={item.isTotal ? 'bg-indigo-50 font-semibold' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{item.particular}</td>
                      <td className="px-4 py-3 text-gray-800 text-right">{formatMoney(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Means of Finance */}
        {state.meansOfFinance && state.meansOfFinance.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Means of Finance</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Item</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount ({state.pdfSettings?.currencySymbol || '₹'})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.meansOfFinance.map((item, index) => (
                    <tr key={index} className={item.isTotal ? 'bg-indigo-50 font-semibold' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{item.particular}</td>
                      <td className="px-4 py-3 text-gray-800 text-right">{formatMoney(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Profitability Statement */}
        {state.profitabilityStatement && state.profitabilityStatement.items.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Profitability Statement</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particulars</th>
                    {state.profitabilityStatement.years.map((year, index) => (
                      <th key={index} className="px-4 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider text-xs">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.profitabilityStatement.items.map((item, index) => (
                    <tr key={index} 
                      className={`${
                        item.isHeader ? 'bg-gray-100 font-semibold' :
                        item.isTotal ? 'bg-indigo-50 font-semibold' :
                        item.isSubtotal ? 'bg-gray-50 font-medium' :
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-800">{item.name}</td>
                      {item.values.map((value, vIndex) => (
                        <td key={vIndex} className="px-4 py-3 text-gray-800 text-right">
                          {formatMoney(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Cash Flow Statement */}
        {state.cashFlowStatement && state.cashFlowStatement.items.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Cash Flow Statement</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particulars</th>
                    {state.cashFlowStatement.years.map((year, index) => (
                      <th key={index} className="px-4 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider text-xs">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.cashFlowStatement.items.map((item, index) => (
                    <tr key={index} 
                      className={`${
                        item.isHeader ? 'bg-gray-100 font-semibold' :
                        item.isTotal ? 'bg-indigo-50 font-semibold' :
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-800">{item.name}</td>
                      {item.values.map((value, vIndex) => (
                        <td key={vIndex} className="px-4 py-3 text-gray-800 text-right">
                          {formatMoney(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Balance Sheet */}
        {state.balanceSheet && state.balanceSheet.years.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Balance Sheet</h2>
            </div>

            {state.balanceSheet.note && (
              <p className="text-sm text-gray-600 italic mb-4 text-right">{state.balanceSheet.note}</p>
            )}
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Liability</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Pre operative period</th>
                    {state.balanceSheet.years.map((year, index) => (
                      <th key={index} className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">
                        {year.year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Share holders funds */}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-3 text-gray-800">A. Share holders funds</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">**.**</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Capital</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.liability.shareHoldersFunds.capital)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Reserve & Surplus</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.liability.shareHoldersFunds.reserveSurplus)}
                      </td>
                    ))}
                  </tr>

                  {/* Non current Liabilities */}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-3 text-gray-800">B.Non current Liabilities</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">**.**</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Term loan</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.liability.nonCurrentLiabilities.termLoan)}
                      </td>
                    ))}
                  </tr>

                  {/* Current Liabilities */}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-3 text-gray-800">C.Current Liabilities</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">**.**</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Working capital loan</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.liability.currentLiabilities.workingCapitalLoan)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Account payable</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.liability.currentLiabilities.accountPayable)}
                      </td>
                    ))}
                  </tr>

                  {/* Total Liability */}
                  <tr className="bg-indigo-50 font-semibold">
                    <td className="px-4 py-3 text-gray-800">Total Liability</td>
                    <td className="px-4 py-3 text-center text-gray-800">{formatMoney(state.balanceSheet.preOperative.totals.liability)}</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.liability.totalLiability)}
                      </td>
                    ))}
                  </tr>

                  {/* Asset */}
                  <tr>
                    <td className="px-4 py-3 text-gray-800">Asset</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">**.**</td>
                    ))}
                  </tr>

                  {/* Non current Assets */}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-3 text-gray-800">A. Non current Assets</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">**.**</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Fixed Assets</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.asset.nonCurrentAssets.fixedAssets)}
                      </td>
                    ))}
                  </tr>

                  {/* Current Assets */}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-3 text-gray-800">B. Current Assets</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">**.**</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Inventory</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.asset.currentAssets.inventory)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Trade receivables</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.asset.currentAssets.tradeReceivables)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">Cash and cash equivalence</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.asset.currentAssets.cashAndEquivalents)}
                      </td>
                    ))}
                  </tr>

                  {/* Total Asset */}
                  <tr className="bg-indigo-50 font-semibold">
                    <td className="px-4 py-3 text-gray-800">Total Asset</td>
                    <td className="px-4 py-3 text-center text-gray-800">{formatMoney(state.balanceSheet.preOperative.totals.asset)}</td>
                    {state.balanceSheet.years.map((year, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">
                        {formatMoney(year.asset.totalAsset)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Repayment of Term Loan */}
        {state.termLoanRepayment && state.termLoanRepayment.schedule.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Repayment of Term Loan</h2>
            </div>

            {state.termLoanRepayment.note && (
              <p className="text-sm text-gray-600 italic mb-4 text-right">{state.termLoanRepayment.note}</p>
            )}
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Year</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Month</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Installment</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Outstanding at the beginning</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Principal repayment</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Interest</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount paid</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Outstanding at the end</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.termLoanRepayment.schedule.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-center text-gray-800">{item.year}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{item.month}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{item.installment}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{item.outstandingBeginning}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{formatMoney(item.principalRepayment)}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{item.interest}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{formatMoney(item.amountPaid)}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{item.outstandingEnd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Debt Service Coverage Ratio */}
        {state.debtServiceCoverage && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Debt Service Coverage Ratio</h2>
            </div>

            <p className="text-sm text-gray-600 italic mb-4 text-right">{state.debtServiceCoverage.note}</p>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particulars</th>
                    {state.debtServiceCoverage.years.map((year, index) => (
                      <th key={index} className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Receipts */}
                  <tr>
                    <td className="px-4 py-3 text-gray-800">Receipts</td>
                    <td colSpan={5}></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">a).Net Profit</td>
                    {state.debtServiceCoverage.receipts.netProfit.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">b).Depreciation</td>
                    {state.debtServiceCoverage.receipts.depreciation.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">c).Interest on termloan</td>
                    {state.debtServiceCoverage.receipts.interestOnTermLoan.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">Total</td>
                    {state.debtServiceCoverage.receipts.total.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800 font-medium">{value}</td>
                    ))}
                  </tr>

                  {/* Repayments */}
                  <tr>
                    <td className="px-4 py-3 text-gray-800">Repayments</td>
                    <td colSpan={5}></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">a).Loan Principal</td>
                    {state.debtServiceCoverage.repayments.loanPrincipal.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800 pl-8">b).Interest on termloan</td>
                    {state.debtServiceCoverage.repayments.interestOnTermLoan.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">Total</td>
                    {state.debtServiceCoverage.repayments.total.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800 font-medium">{value}</td>
                    ))}
                  </tr>

                  {/* DSCR */}
                  <tr className="bg-indigo-50 font-semibold">
                    <td className="px-4 py-3 text-gray-800">DSCR</td>
                    {state.debtServiceCoverage.dscr.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-gray-800 font-medium">
              Average DSCR: {state.debtServiceCoverage.averageDSCR}
            </p>
          </section>
        )}

        {/* Depreciation */}
        {state.depreciation && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Depreciation</h2>
            </div>

            <p className="text-sm text-gray-600 italic mb-4 text-right">{state.depreciation.note}</p>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particulars</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">Rate</th>
                    {state.depreciation.years.map((year, index) => (
                      <th key={index} className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider text-xs">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.depreciation.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-gray-800">{item.particular}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{item.rate}</td>
                      {item.values.map((value, vIndex) => (
                        <td key={vIndex} className="px-4 py-3 text-center text-gray-800">{value}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-3 text-gray-800">Less Deprecition</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.depreciation.lessDepreciation.values.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-800">Written down value</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.depreciation.writtenDownValue.values.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800">{value}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium">Total less depreciation</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.depreciation.totalLessDepreciation.values.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800 font-medium">{value}</td>
                    ))}
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-4 py-3 text-gray-800 font-semibold">Total written down value</td>
                    <td className="px-4 py-3 text-center text-gray-800">**.**</td>
                    {state.depreciation.totalWrittenDownValue.values.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-gray-800 font-semibold">{value}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Assumptions */}
        {state.assumptions && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Assumption</h2>
            </div>

            <div className="space-y-6">
              {/* Sales Projection */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-800 mb-4">{state.assumptions.salesProjection}</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr>
                        {Object.keys(state.assumptions.yearlyFigures).map((year, index) => (
                          <th key={index} className="px-4 py-2 text-center font-medium text-gray-700 bg-gray-50">{year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(state.assumptions.yearlyFigures).map((value, index) => (
                          <td key={index} className="px-4 py-2 text-center text-gray-800">{value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(state.assumptions.services).map(([service, value], index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded">
                      <span className="text-gray-700">{service}</span>
                      <span className="text-gray-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Expense Projection */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-800 mb-4">{state.assumptions.totalExpenseProjection.note}</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr>
                        {Object.keys(state.assumptions.totalExpenseProjection.years).map((year, index) => (
                          <th key={index} className="px-4 py-2 text-center font-medium text-gray-700 bg-gray-50">{year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(state.assumptions.totalExpenseProjection.years).map((value, index) => (
                          <td key={index} className="px-4 py-2 text-center text-gray-800">{value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Depreciation Details */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-800 mb-4">{state.assumptions.depreciationDetails.note}</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 bg-gray-50">Particulars</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-700 bg-gray-50">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.assumptions.depreciationDetails.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-gray-800">{item.particular}</td>
                          <td className="px-4 py-2 text-right text-gray-800">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <ul className="list-disc pl-5 space-y-2">
                  {state.assumptions.additionalNotes.map((note, index) => (
                    <li key={index} className="text-gray-700">{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Annual Sales/Revenue */}
        {state.annualSales && state.annualSales.items.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Annual Sales / Revenue</h2>
            </div>

            {state.annualSales.note && (
              <p className="text-sm text-gray-600 italic mb-4">{state.annualSales.note}</p>
            )}
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs w-16">Sl. no</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Item</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Sales Details</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider text-xs">Total ({state.pdfSettings?.currencySymbol || '₹'})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.annualSales.items.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{item.slNo}</td>
                      <td className="px-4 py-3 text-gray-800">{item.item}</td>
                      <td className="px-4 py-3 text-gray-600">{item.salesDetails}</td>
                      <td className="px-4 py-3 text-gray-800 text-right">{formatMoney(item.totalRs)}</td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50 font-semibold">
                    <td className="px-4 py-3 text-gray-800" colSpan="3">Total</td>
                    <td className="px-4 py-3 text-gray-800 text-right">{formatMoney(state.annualSales.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
        
        {/* Application of Funds - Show if funds data exists */}
        {state.applicationOfFunds && state.applicationOfFunds.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">Application of Funds</h2>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Particulars</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount ($)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {state.applicationOfFunds.map((fund, index) => (
                    <tr key={index} className={fund.isTotal ? 'bg-indigo-50 font-medium' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{fund.particular}</td>
                      <td className="px-4 py-3 text-gray-800">{formatMoney(fund.amount)}</td>
                      <td className="px-4 py-3 text-gray-800">{fund.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        
        {/* Conclusion - Always show */}
        <section className="mb-10 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Conclusion</h2>
          <p className="text-gray-700 mb-4">
            {state.project.name} presents a compelling business opportunity with strong market potential
            and a clear path to profitability. The detailed financial projections demonstrate the viability
            of the venture, while the comprehensive risk assessment and mitigation strategies address potential
            challenges. 
          </p>
          <p className="text-gray-700">
            We recommend proceeding with this project based on the analysis presented in this report,
            with careful attention to the implementation timeline and regular monitoring of key performance indicators.
          </p>
        </section>
        
        {/* Footer - Always show */}
        <footer className="mt-16 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <p>Business Report for {state.project.name}</p>
            <p>Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <p className="mt-2">Confidential Document - For internal use only</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;