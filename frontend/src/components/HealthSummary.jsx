import Navbar from "./Navbar";
import Footer from "./Footer";

const keyMetrics = [
    { label: "Blood Pressure", value: "120/80 mmHg", indicator: "Normal", color: "text-success" },
    { label: "Heart Rate", value: "72 BPM", indicator: "Stable", color: "text-success" },
    { label: "Glucose Level", value: "95 mg/dL", indicator: "Ideal", color: "text-success" },
    { label: "Last Checkup", value: "3 weeks ago", indicator: "Recent", color: "text-warning" },
];

const medicalConditions = [
    "Seasonal Allergies (Mild)", 
    "Vitamin D Deficiency (Treated)", 
    "None"
];

// Helper component to visually represent a chart area with enhanced dummy visuals
const ChartPlaceholder = ({ title, height = '300px', chartType = 'Line Chart', primaryColor = 'bg-primary/20', visualType }) => {
    
    let chartVisual;

    if (visualType === 'line') {
        // Line/Area Chart Visual: Uses a simple CSS gradient/wave effect
        chartVisual = (
            <div className={`w-full h-full relative p-4`} style={{ background: 'linear-gradient(to top, var(--fallback-p,oklch(var(--p))) 50%, var(--fallback-a,oklch(var(--a))) 80%)', opacity: 0.7 }}>
                <div className="absolute inset-0 bg-base-100 opacity-40"></div>
                <div className="w-full h-1 bg-primary/80 absolute bottom-4"></div>
                <div className="w-1 h-full bg-base-content/50 absolute left-4 top-0"></div>
            </div>
        );
    } else if (visualType === 'bar') {
        // Bar Chart Visual: Uses DaisyUI progress bars arranged vertically
        const bars = [90, 60, 75, 85, 55, 100, 70];
        chartVisual = (
            <div className="w-full h-full p-6 flex items-end justify-around gap-2">
                {bars.map((value, index) => (
                    <progress 
                        key={index}
                        className={`progress ${index === bars.length - 1 ? 'progress-secondary' : 'progress-primary'} w-1/12 transform rotate-180`} 
                        value={value} 
                        max="100"
                        style={{ height: `${value}%`, writingMode: 'vertical-lr' }}
                    ></progress>
                ))}
            </div>
        );
    } else if (visualType === 'gauge') {
        // Simple Gauge/Doughnut Chart Visual
        chartVisual = (
            <div className="flex items-center justify-center h-full w-full">
                <div className="radial-progress text-accent text-3xl font-bold" style={{ "--value": 75, "--size": "10rem", "--thickness": "1rem" }} role="progressbar">
                    75%
                </div>
            </div>
        );
    }
    
    return (
        <div className="card shadow-xl bg-base-100">
            <div className="card-body p-6">
                <h3 className="card-title text-xl mb-4 text-base-content">{title}</h3>
                <div 
                    className={`w-full rounded-lg border border-base-content/30 flex items-center justify-center overflow-hidden`} 
                    style={{ height: height, backgroundColor: 'var(--fallback-b3,oklch(var(--b3)))' }}
                >
                    {chartVisual || <span className="text-base-content/70 font-mono text-center p-4">[{chartType} Placeholder]</span>}
                </div>
            </div>
        </div>
    );
};


export default function HealthSummary() {
    // Mock handler for navigation
    const mockViewChange = (view) => {
        console.log(`Navigating to view: ${view}`);
        // Instead of alert(), use console log as per instructions
        // alert(`Simulating navigation to ${view}.`); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar onViewChange={mockViewChange} />
            
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                
                <header className="text-center py-4 border-b border-base-300">
                    <h1 className="text-5xl font-extrabold text-base-content">
                        Personal Health <span className="text-accent">Summary</span>
                    </h1>
                    <p className="text-lg text-base-content/70 mt-2">
                        Your latest vitals, history, and medical records at a glance.
                    </p>
                </header>

                {/* --- 1. Vitals and Key Metrics (Uses DaisyUI Stats) --- */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-base-content">Current Vitals Snapshot 🩺</h2>
                    
                    <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full bg-base-200">
                        {keyMetrics.map((metric, index) => (
                            <div key={index} className="stat">
                                <div className="stat-title text-base-content/70">{metric.label}</div>
                                <div className={`stat-value ${metric.color}`}>{metric.value}</div>
                                <div className="stat-desc mt-1 font-semibold">{metric.indicator}</div>
                            </div>
                        ))}
                        <div className="stat">
                            <div className="stat-actions">
                                <button className="btn btn-sm btn-primary">View Full History</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. Chart Section (Attractive Placeholders) --- */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <h2 className="lg:col-span-2 text-2xl font-semibold text-base-content">Health Trend Visualizations 📈</h2>
                    
                    {/* Placeholder Chart 1: Blood Pressure Trends (Line/Area Visual) */}
                    <ChartPlaceholder 
                        title="Systolic & Diastolic BP Trends (30 Days)"
                        chartType="Area Chart"
                        visualType="line"
                    />

                    {/* Placeholder Chart 2: Resting Heart Rate Over Time (Bar Visual) */}
                    <ChartPlaceholder 
                        title="Resting Heart Rate Average (Weekly)"
                        chartType="Bar Chart"
                        visualType="bar"
                    />
                    
                    {/* Placeholder Chart 3: Medication Adherence (Gauge Visual) */}
                     <ChartPlaceholder 
                        title="Medication Adherence Score"
                        chartType="Gauge Chart"
                        visualType="gauge"
                        height="250px"
                    />
                </section>

                {/* --- 3. Medical History & Conditions --- */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-base-content">Allergies & Known Conditions 📝</h2>
                    <div className="card shadow-xl bg-base-100">
                        <div className="card-body">
                            <p className="text-base-content/80 font-bold mb-3">Known Active Conditions:</p>
                            <div className="flex flex-wrap gap-3">
                                {medicalConditions.map((condition, index) => (
                                    <div key={index} className={`badge badge-lg ${condition.includes("None") ? 'badge-info' : 'badge-warning'}`}>
                                        {condition}
                                    </div>
                                ))}
                            </div>

                            <div className="divider"></div>
                            
                            <h3 className="text-lg font-semibold text-base-content">Recent Activity Timeline</h3>
                            <ul className="timeline timeline-snap-icon max-w-lg timeline-vertical">
                                <li>
                                    <div className="timeline-middle text-success">✓</div>
                                    <div className="timeline-end timeline-box bg-base-300">Consultation with Dr. A. (Cardiology)</div>
                                    <hr className="bg-success" />
                                </li>
                                <li>
                                    <hr className="bg-success" />
                                    <div className="timeline-middle text-primary">●</div>
                                    <div className="timeline-end timeline-box bg-base-300">File Upload: Annual Lab Report</div>
                                    <hr className="bg-primary" />
                                </li>
                                <li>
                                    <hr className="bg-primary" />
                                    <div className="timeline-middle text-secondary">●</div>
                                    <div className="timeline-end timeline-box bg-base-300">Prescription Refill Request</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </main>
            
            <Footer />
        </div>
    );
}
