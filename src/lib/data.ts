export const reportData = {
  project: {
    name: "helto",
    address: "123 Business Park, City, Country",
    status: "New Project",
    industry: "Technology/SaaS",
    sector: "Information Technology",
    constitution: "Private Limited",
    incorporationDate: "01/06/2023",
    location: "City Name",
    contactPerson: "John Smith",
    cost: "$500,000",
    termLoan: "$350,000",
    workingCapital: "$150,000",
    netWorth: "$200,000",
    year: "2023",
    email: "contact@helto.com"
  },
  promoters: [
    {
      name: "David Johnson",
      position: "CEO & Founder",
      experience: "12 years",
      education: "MBA, Stanford",
      equityShare: "65%"
    },
    {
      name: "Sarah Chen",
      position: "CTO",
      experience: "8 years",
      education: "MS Computer Science, MIT",
      equityShare: "35%"
    }
  ],
  financials: {
    projections: [
      {
        particular: "Revenue",
        year1: "$250,000",
        year2: "$375,000",
        year3: "$550,000",
        year4: "$800,000",
        year5: "$1,200,000",
        isTotal: false
      },
      {
        particular: "Operating Costs",
        year1: "$180,000",
        year2: "$250,000",
        year3: "$330,000",
        year4: "$450,000",
        year5: "$650,000",
        isTotal: false
      },
      {
        particular: "EBITDA",
        year1: "$70,000",
        year2: "$125,000",
        year3: "$220,000",
        year4: "$350,000",
        year5: "$550,000",
        isTotal: false
      },
      {
        particular: "Depreciation",
        year1: "$30,000",
        year2: "$30,000",
        year3: "$30,000",
        year4: "$30,000",
        year5: "$30,000",
        isTotal: false
      },
      {
        particular: "Interest Expense",
        year1: "$25,000",
        year2: "$23,000",
        year3: "$20,000",
        year4: "$17,000",
        year5: "$14,000",
        isTotal: false
      },
      {
        particular: "Net Profit",
        year1: "$15,000",
        year2: "$72,000",
        year3: "$170,000",
        year4: "$303,000",
        year5: "$506,000",
        isTotal: true
      }
    ],
    chartData: [
      {
        name: "Year 1",
        revenue: 250000,
        costs: 180000,
        profit: 15000
      },
      {
        name: "Year 2",
        revenue: 375000,
        costs: 250000,
        profit: 72000
      },
      {
        name: "Year 3",
        revenue: 550000,
        costs: 330000,
        profit: 170000
      },
      {
        name: "Year 4",
        revenue: 800000,
        costs: 450000,
        profit: 303000
      },
      {
        name: "Year 5",
        revenue: 1200000,
        costs: 650000,
        profit: 506000
      }
    ],
    revenueSources: [
      { name: "Enterprise Clients", value: 45 },
      { name: "Mid-Market", value: 30 },
      { name: "Small Business", value: 15 },
      { name: "Consulting Services", value: 10 }
    ]
  },
  scope: {
    paragraphs: [
      "The project aims to develop a comprehensive software solution targeting the financial services sector, with a focus on enhancing operational efficiency through automation and data analytics. The solution will streamline workflow processes, reduce manual interventions, and provide real-time insights for decision-making. The core modules include customer relationship management, transaction processing, risk assessment, and reporting functionalities.",
      "The development will follow an agile methodology with four distinct phases spanning 18 months. Initial market testing indicates strong potential demand from mid-sized financial institutions seeking cost-effective digitalization solutions. The project's scalable architecture will allow for future expansions into adjacent financial service segments."
    ]
  },
  market: {
    paragraphs: [
      "Market research shows the global FinTech software solutions market is projected to grow at a CAGR of 23.5% over the next five years, reaching a value of $305 billion by 2027. Small and medium financial institutions are increasingly seeking technology partners to accelerate their digital transformation initiatives, creating a substantial addressable market for our solution.",
      "Our competitive advantage lies in providing an integrated platform that addresses multiple operational challenges while requiring minimal implementation effort. The go-to-market strategy involves a three-pronged approach:",
      "Initial customer acquisition costs are estimated at $12,000 per client, with lifetime value projections exceeding $180,000 over a five-year period, resulting in a healthy 15:1 LTV:CAC ratio."
    ],
    list: [
      "Direct sales to mid-sized financial institutions through a dedicated sales team",
      "Strategic partnerships with financial consultancies and system integrators",
      "Subscription-based model with tiered pricing based on feature set and user count"
    ]
  },
  risks: [
    {
      risk: "Market Competition",
      impact: "High",
      probability: "Medium",
      mitigation: "Focus on niche market segments initially; develop proprietary features"
    },
    {
      risk: "Regulatory Changes",
      impact: "High",
      probability: "High",
      mitigation: "Dedicated compliance team; regular updates to adapt to regulations"
    },
    {
      risk: "Development Delays",
      impact: "Medium",
      probability: "Medium",
      mitigation: "Agile methodology; regular sprints; contingency in timeline"
    },
    {
      risk: "Technical Scalability",
      impact: "High",
      probability: "Low",
      mitigation: "Cloud-native architecture; built-in load balancing; stress testing"
    },
    {
      risk: "Talent Acquisition",
      impact: "Medium",
      probability: "Medium",
      mitigation: "Competitive compensation; remote work options; partnerships with universities"
    }
  ],
  projectCost: [
    {
      particular: "Software Development",
      amount: "225,000",
      isTotal: false
    },
    {
      particular: "Hardware & Infrastructure",
      amount: "75,000",
      isTotal: false
    },
    {
      particular: "Office Space & Setup",
      amount: "50,000",
      isTotal: false
    },
    {
      particular: "Marketing & Sales",
      amount: "100,000",
      isTotal: false
    },
    {
      particular: "Contingencies",
      amount: "50,000",
      isTotal: false
    },
    {
      particular: "Total Project Cost",
      amount: "500,000",
      isTotal: true
    }
  ],
  workingCapital: [
    {
      particular: "Staff Salaries (3 months)",
      amount: "75,000",
      isTotal: false
    },
    {
      particular: "Operational Expenses (3 months)",
      amount: "45,000",
      isTotal: false
    },
    {
      particular: "Marketing & Sales (initial 3 months)",
      amount: "25,000",
      isTotal: false
    },
    {
      particular: "Miscellaneous",
      amount: "5,000",
      isTotal: false
    },
    {
      particular: "Total Working Capital",
      amount: "150,000",
      isTotal: true
    }
  ],
  applicationOfFunds: [
    {
      particular: "Software Development & Technology",
      amount: "225,000",
      percentage: "45%",
      isTotal: false
    },
    {
      particular: "Infrastructure & Equipment",
      amount: "75,000",
      percentage: "15%",
      isTotal: false
    },
    {
      particular: "Office Space & Setup",
      amount: "50,000",
      percentage: "10%",
      isTotal: false
    },
    {
      particular: "Working Capital",
      amount: "150,000",
      percentage: "30%",
      isTotal: false
    },
    {
      particular: "Total",
      amount: "500,000",
      percentage: "100%",
      isTotal: true
    }
  ]
};
