import React, { useState } from 'react';
import { Calculator, Landmark, HandCoins, Info, TrendingUp } from 'lucide-react';
import { formatCOP } from '../../utils';

export default function FinancesTab({ careerData }) {
  const [activeDiscount, setActiveDiscount] = useState(0); // discount percentage

  if (!careerData) return null;

  const baseCost = careerData.costPerSemester;
  const discountAmount = baseCost * (activeDiscount / 100);
  const netCost = baseCost - discountAmount;

  const discounts = [
    { label: 'Sin Beca (0%)', value: 0 },
    { label: 'Beca Convenio (15%)', value: 15 },
    { label: 'Beca Deportiva/Cultural (30%)', value: 30 },
    { label: 'Beca Excelencia (50%)', value: 50 },
    { label: 'Beca Rectoría (75%)', value: 75 }
  ];

  return (
    <div className="tab-panel">
      <div className="finances-grid">
        
        {/* Tuition Simulator */}
        <div className="info-card finance-calculator-card">
          <div className="card-header-with-icon">
            <div className="header-icon-box">
              <Calculator />
            </div>
            <h3>Simulador Financiero de Matrícula</h3>
          </div>
          
          <p className="paragraph-text" style={{ fontSize: '14px', marginBottom: '20px' }}>
            Aplica becas de mérito académico, representación institucional o convenios especiales para simular el costo neto de tu semestre académico.
          </p>
          
          <div className="form-group">
            <label className="form-label">Seleccionar Tipo de Descuento</label>
            <div className="scholarship-options">
              {discounts.map(d => (
                <button
                  key={d.value}
                  className={`scholarship-btn ${activeDiscount === d.value ? 'active' : ''}`}
                  onClick={() => setActiveDiscount(d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tuition Breakdown */}
          <div className="tuition-breakdown">
            <div className="breakdown-row">
              <span>Valor Matrícula Ordinaria:</span>
              <span>{formatCOP(baseCost)}</span>
            </div>
            {activeDiscount > 0 && (
              <div className="breakdown-row discount-row">
                <span>Beca/Descuento ({activeDiscount}%):</span>
                <span>- {formatCOP(discountAmount)}</span>
              </div>
            )}
            <div className="breakdown-divider"></div>
            <div className="breakdown-row total-row">
              <span>Total Neto a Pagar:</span>
              <span style={{ color: 'var(--primary-blue)' }}>{formatCOP(netCost)}</span>
            </div>
          </div>
          
          <p className="cost-note">
            <Info />
            Nota: La simulación no incluye costos complementarios obligatorios como seguro estudiantil, carnetización y estampillas (aprox. $45.000 COP).
          </p>
        </div>

        {/* Financing and Scholarship Channels */}
        <div className="info-card financing-info-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-header-with-icon" style={{ marginBottom: 0 }}>
            <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.06)', color: '#10b981' }}>
              <HandCoins />
            </div>
            <h3>Financiación y Becas Oficiales</h3>
          </div>
          
          <p className="paragraph-text" style={{ fontSize: '14px' }}>
            NEXUS cuenta con convenios y programas para ayudarte a financiar tu educación superior:
          </p>

          <div className="financing-options-list" style={{ marginTop: 0 }}>
            {careerData.scholarships && careerData.scholarships.map((s, idx) => (
              <div className="finance-option-item" key={`s-${idx}`}>
                <div className="option-icon">
                  <Landmark />
                </div>
                <div className="option-details">
                  <h5>{s.name}</h5>
                  <p>{s.value}</p>
                </div>
              </div>
            ))}
            
            {careerData.financingOptions && careerData.financingOptions.map((f, idx) => (
              <div className="finance-option-item" key={`f-${idx}`}>
                <div className="option-icon" style={{ background: 'rgba(59, 130, 246, 0.08)', color: 'var(--primary-blue)' }}>
                  <Landmark />
                </div>
                <div className="option-details">
                  <h5>{f.name}</h5>
                  <p>{f.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inflation info */}
          <div className="inflation-info-box" style={{ margin: 0 }}>
            <TrendingUp />
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Incremento Anual de Matrícula:</strong>
              <div style={{ marginTop: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {careerData.annualIncrement}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                De acuerdo con el acuerdo directivo institucional, el incremento se calcula anualmente con base en el IPC de Colombia del año anterior más un porcentaje de sostenibilidad.
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
