import React, { useRef, useState, useEffect } from 'react';
import { Button } from "../../../ui/button";
import { Printer, Download, FileText } from "lucide-react";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const { state, calculateFinancials, calculateProjectCosts, calculateWorkingCapital } = useBusinessReport();
  
  // Format currency
  const formatCurrency = (value) => {
    if (!value) return '$0';
    const numericValue = typeof value === 'string' ? 
      parseFloat(value.replace(/[$,]/g, '')) : 
      value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericValue);
  };

  // Calculate totals and percentages
  useEffect(() => {
    // Initialize financial calculations
    calculateFinancials({
      baseRevenue: 850000,
      growthRate: 0.2,
      operatingMargin: 0.3
    });

    // Calculate project costs
    calculateProjectCosts(state.projectCost);

    // Calculate working capital
    calculateWorkingCapital(state.workingCapital);
  }, []);

  // Generate PDF function
  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setIsGenerating(true);
    
    try {
      console.log('Generating PDF...');
      
      const reportElement = reportRef.current;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * pdfWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 1;
      
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = -pdfHeight * pageCount;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        pageCount++;
      }
      
      pdf.save(`${state.project.name.replace(/\s+/g, '_')}_business_report.pdf`);
      console.log('PDF generation completed.');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-indigo-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Business Report Dashboard</h1>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={generatePDF}
            disabled={isGenerating}
            variant="outline"
            className="flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full mr-1"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          
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
      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-sm print:shadow-none print:p-0">
        {/* Header */}
        <div className="mb-10 text-center pb-6 border-b border-indigo-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-indigo-900">{state.project.name || 'Business Report'}</h1>
          <p className="text-lg text-gray-600">{state.project.address}</p>
          <p className="text-md text-indigo-600 mt-2 font-semibold">
            Business Report • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Executive Summary */}
        <section className="mb-10 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Executive Summary</h2>
          <p className="text-gray-700">
            This comprehensive business report presents a detailed analysis of {state.project.name}, 
            highlighting its financial projections, market potential, and strategic planning. 
            The report is designed to provide stakeholders with actionable insights and a clear 
            understanding of the business proposition and its projected financial performance.
          </p>
        </section>
        
        {/* Section: Project at a Glance */}
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
                    <td className="py-2 text-gray-800 font-medium">{formatCurrency(state.project.cost)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-semibold text-gray-600">Term Loan</td>
                    <td className="py-2 text-gray-800">{formatCurrency(state.project.termLoan)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-semibold text-gray-600">Working Capital</td>
                    <td className="py-2 text-gray-800">{formatCurrency(state.project.workingCapital)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-semibold text-gray-600">Net Worth</td>
                    <td className="py-2 text-gray-800 font-medium">{formatCurrency(state.project.netWorth)}</td>
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
        
        {/* Section: Promoter's Details */}
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
        
        {/* Section: Financial Projections */}
        <section className="mb-10">
          <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
            <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Financial Projections</h2>
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
        
        {/* Section: Scope of the Project */}
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
        
        {/* Section: Market Potential & Strategy */}
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
                <h4 className="font-semibold text-gray-700 mb-2">Strategic Market Initiatives:</h4>
                <ul className="list-disc pl-5 space-y-2">
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
        
        {/* Section: Risks & Mitigation Strategy */}
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
        
        {/* Section: Project Cost */}
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
                        <td className="px-4 py-3 text-gray-800">{formatCurrency(cost.amount)}</td>
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
                        <td className="px-4 py-3 text-gray-800">{formatCurrency(cost.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section: Application of Funds */}
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
                    <td className="px-4 py-3 text-gray-800">{formatCurrency(fund.amount)}</td>
                    <td className="px-4 py-3 text-gray-800">{fund.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Conclusion */}
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
        
        {/* Footer */}
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