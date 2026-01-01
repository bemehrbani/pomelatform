import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import { Venture } from "@/components/Portfolio/VentureCard";

export default function Home() {
  const ventures: Venture[] = [
    {
      id: "1",
      name: "TonPals",
      description: "Telegram-based social payment solution for group expenses.",
      type: "Co-Founding",
      stage: "MVP",
      status: "Healthy",
      equity: 15.0,
      monthlyBurn: 2500,
      nextMilestone: "Mainnet Launch",
      nextMilestoneDate: "Jan 15, 2025"
    },
    {
      id: "2",
      name: "AlphaBet Games",
      description: "Play2Win gaming platform on TON blockchain.",
      type: "Internal",
      stage: "Growth",
      status: "At Risk",
      equity: 100.0,
      monthlyBurn: 8000,
      nextMilestone: "User Acquisition Campaign",
      nextMilestoneDate: "Feb 01, 2025"
    },
    {
      id: "3",
      name: "Nordic Health App",
      description: "Consulting project for Finnish healthtech startup.",
      type: "Client",
      stage: "Validation",
      status: "Healthy",
      equity: 0,
      monthlyBurn: 0, // Client pays us, burn is effectively negative/profit but here we track cost investment
      nextMilestone: "Prototype Sign-off",
      nextMilestoneDate: "Dec 30, 2024"
    },
    {
      id: "4",
      name: "SmartEscrow Protocol",
      description: "Internal DeFi tool for agency payment assurance.",
      type: "Internal",
      stage: "Idea",
      status: "Healthy",
      equity: 100,
      monthlyBurn: 500,
      nextMilestone: "Whitepaper Draft",
      nextMilestoneDate: "Jan 10, 2025"
    }
  ];

  const totalEquityValue = "€1.2M"; // Mock valuation
  const totalBurn = ventures.reduce((acc, v) => acc + v.monthlyBurn, 0);

  return (
    <div className="container">
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Portfolio Overview</h1>
          <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '600px' }}>
            Welcome back, Mahdi. You are managing <strong>{ventures.length} active ventures</strong>.
            <br />Current focus: <strong>Optimization & Launch</strong>.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '3rem', textAlign: 'right' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Total Portfolio Value</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{totalEquityValue}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Monthly Burn</div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#ef4444' }}>€{totalBurn.toLocaleString()}</div>
          </div>
        </div>
      </header>

      <PortfolioGrid ventures={ventures} />
    </div>
  );
}
