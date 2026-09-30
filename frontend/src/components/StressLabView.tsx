import React, { useState } from 'react';
import { StressFrontierCard } from './StressFrontierCard';
import { ShieldAlert, Layers } from 'lucide-react';

interface PhcFragilityItem {
  rank: number;
  code: string;
  name: string;
  district: string;
  fragilityScore: number; // 0 to 100
  criticalVulnerability: string;
  firstServiceToFail: string;
  hoursToFailAtMinShock: number;
}

const SAMPLE_FRAGILITY_RANKINGS: PhcFragilityItem[] = [
  {
    rank: 1,
    code: 'PHC-DST-A1-06',
    name: 'PHC North Sector-6',
    district: 'District DST-A1',
    fragilityScore: 92.4,
    criticalVulnerability: 'Staff Nurse Shortage + Single Access Bridge',
    firstServiceToFail: 'Maternal Delivery',
    hoursToFailAtMinShock: 12.0,
  },
  {
    rank: 2,
    code: 'PHC-DST-B1-02',
    name: 'PHC Barani Sector-2',
    district: 'District DST-B1',
    fragilityScore: 88.6,
    criticalVulnerability: 'River Floodplain Inundation Cutoff',
    firstServiceToFail: 'Diarrhoeal Care',
    hoursToFailAtMinShock: 16.0,
  },
  {
    rank: 3,
    code: 'PHC-DST-A1-04',
    name: 'PHC North Sector-4',
    district: 'District DST-A1',
    fragilityScore: 84.1,
    criticalVulnerability: 'Rapid ORS Exhaustion during Monsoon Surge',
    firstServiceToFail: 'Diarrhoeal Care',
    hoursToFailAtMinShock: 18.0,
  },
  {
    rank: 4,
    code: 'PHC-DST-A1-05',
    name: 'PHC North Sector-5',
    district: 'District DST-A1',
    fragilityScore: 68.5,
    criticalVulnerability: 'Solar Battery Discharge on Rainy Days',
    firstServiceToFail: 'Vaccination',
    hoursToFailAtMinShock: 50.0,
  },
  {
    rank: 5,
    code: 'PHC-DST-A1-01',
    name: 'PHC North Sector-1',
    district: 'District DST-A1',
    fragilityScore: 62.0,
    criticalVulnerability: 'Secondary Route Transit Degradation',
    firstServiceToFail: 'Diarrhoeal Care',
    hoursToFailAtMinShock: 54.0,
  },
];

export const StressLabView: React.FC = () => {
  const [selectedSubTab, setSelectedSubTab] = useState<'frontier' | 'fragility' | 'scenarios'>('frontier');

  return (
    <div className="stress-lab-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Subnavigation Bar */}
      <div className="panel-card" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Stress Lab & Resilience Frontier
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Quantitative reverse stress testing • Smallest plausible compound shock identification
            </p>
          </div>

          <div className="tab-pills">
            <button
              onClick={() => setSelectedSubTab('frontier')}
              className={`tab-pill ${selectedSubTab === 'frontier' ? 'active' : ''}`}
            >
              Resilience Frontier
            </button>
            <button
              onClick={() => setSelectedSubTab('fragility')}
              className={`tab-pill ${selectedSubTab === 'fragility' ? 'active' : ''}`}
            >
              Fragility Ranking
            </button>
            <button
              onClick={() => setSelectedSubTab('scenarios')}
              className={`tab-pill ${selectedSubTab === 'scenarios' ? 'active' : ''}`}
            >
              Scenario Comparison
            </button>
          </div>
        </div>
      </div>

      {/* 1. RESILIENCE FRONTIER */}
      {selectedSubTab === 'frontier' && <StressFrontierCard />}

      {/* 2. FRAGILITY RANKINGS */}
      {selectedSubTab === 'fragility' && (
        <div className="panel-card">
          <div className="panel-header">
            <div className="panel-header-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={20} color="#ef4444" />
                <h3 style={{ margin: 0 }}>Network Fragility Ranking</h3>
              </div>
              <p style={{ margin: '4px 0 0 0' }}>
                PHCs ordered by systemic vulnerability to combined shocks
              </p>
            </div>
            <span className="badge badge-critical">
              Top 3 Require Active Rebalance
            </span>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Facility</th>
                  <th>District</th>
                  <th>Fragility Score</th>
                  <th>First Service to Fail</th>
                  <th>Min Shock Horizon</th>
                  <th>Critical Vulnerability</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_FRAGILITY_RANKINGS.map((item) => (
                  <tr key={item.code}>
                    <td>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: item.rank <= 3 ? '#fee2e2' : '#f1f5f9',
                          color: item.rank <= 3 ? '#ef4444' : '#64748b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                        }}
                      >
                        #{item.rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{item.code}</div>
                    </td>
                    <td>{item.district}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, color: item.fragilityScore > 80 ? '#ef4444' : '#f59e0b' }}>
                          {item.fragilityScore.toFixed(1)}
                        </span>
                        <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                          <div
                            style={{
                              width: `${item.fragilityScore}%`,
                              height: '100%',
                              backgroundColor: item.fragilityScore > 80 ? '#ef4444' : '#f59e0b',
                              borderRadius: '3px',
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                        {item.firstServiceToFail}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: item.hoursToFailAtMinShock < 24 ? '#ef4444' : '#f59e0b' }}>
                        {item.hoursToFailAtMinShock} Hours
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#475569' }}>
                      {item.criticalVulnerability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SCENARIO COMPARISON */}
      {selectedSubTab === 'scenarios' && (
        <div className="panel-card">
          <div className="panel-header">
            <div className="panel-header-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={20} color="#0284c7" />
                <h3 style={{ margin: 0 }}>Scenario Stress Comparison Matrix</h3>
              </div>
              <p style={{ margin: '4px 0 0 0' }}>
                Side-by-side performance of primary care network across multi-hazard conditions
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
          }}>
            {/* Scenario 1: Baseline */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Baseline Conditions</h4>
                <span className="badge badge-healthy">Nominal</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div><strong>Rain:</strong> 1.0x (Normal)</div>
                <div><strong>Roads:</strong> 100% Passable</div>
                <div><strong>Staff:</strong> Full Roster (0% Absence)</div>
                <div><strong>Demand:</strong> 1.0x Expected</div>
                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
                <div style={{ color: '#059669', fontWeight: 700 }}>Service Continuity: 98.2%</div>
                <div style={{ color: '#64748b' }}>Compromised PHCs: 0</div>
              </div>
            </div>

            {/* Scenario 2: Monsoon Flood */}
            <div style={{ background: '#fffbeb', padding: '20px', borderRadius: '16px', border: '1px solid #fde68a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Monsoon Flash Flood</h4>
                <span className="badge badge-warning">High Risk</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div><strong>Rain:</strong> 2.8x (Heavy Inundation)</div>
                <div><strong>Roads:</strong> 35% Inundated / Blocked</div>
                <div><strong>Staff:</strong> 15% Commute Delays</div>
                <div><strong>Demand:</strong> 1.8x Diarrhoeal Spike</div>
                <hr style={{ border: 'none', borderTop: '1px solid #fde68a', margin: '8px 0' }} />
                <div style={{ color: '#d97706', fontWeight: 700 }}>Service Continuity: 78.4%</div>
                <div style={{ color: '#d97706' }}>Compromised PHCs: 3 facilities</div>
              </div>
            </div>

            {/* Scenario 3: Black Sky */}
            <div style={{ background: '#fff5f5', padding: '20px', borderRadius: '16px', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Compound Black Sky</h4>
                <span className="badge badge-critical">Critical</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div><strong>Rain:</strong> 3.5x Extreme Cloudburst</div>
                <div><strong>Roads:</strong> 60% Transit Cut</div>
                <div><strong>Staff:</strong> 40% Absence / Illness</div>
                <div><strong>Demand:</strong> 2.5x Epidemic Outbreak</div>
                <hr style={{ border: 'none', borderTop: '1px solid #fecaca', margin: '8px 0' }} />
                <div style={{ color: '#ef4444', fontWeight: 700 }}>Service Continuity: 48.0%</div>
                <div style={{ color: '#ef4444' }}>Compromised PHCs: 8 facilities</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
