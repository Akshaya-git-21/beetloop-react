import React from 'react';
import Icon from '../../components/Icon.jsx';

const label = { display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 };
const input = { width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' };
const select = { ...input, background: '#fff' };
const card = { background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '22px 24px' };
const sectionHead = (letter, name) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{letter}</span>
    <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 15, color: 'var(--beet-700)' }}>{name}</span>
  </div>
);

export default function CreateCampaignModal({ vm }) {
  const {
    cmpFormOpen, cmpf, cmpFormTitle, cmpFormCode, cmpFormSaveLabel, cmpFormClose, cmpCanDelete, cmpFormDelete, cmpFormSave,
    cmpSections, cmpSetName, cmpSetType, cmpSetObjective, cmpSetStatus, cmpSetBrand, cmpSetDept, cmpSetCycle, cmpSetStart, cmpSetEnd,
    cmpSetOwner, cmpSetBudget, cmpSetGoal, cmpSetCountries, cmpSetIndustries, cmpSetAudience, cmpSetPersona, cmpSetCompanySize,
    cmpPeopleNames, cmpKpiForm, cmpAddKpi, cmpEffortForm, cmpAddEffort, cmpEffortEmpty, cmpTeamForm, cmpAddTeam,
  } = vm;
  const f = cmpf || {};
  return (
    <React.Fragment>
      {Boolean(cmpFormOpen) && (
        <React.Fragment>
          <div style={{ position: 'fixed', inset: 0, zIndex: 160, background: 'var(--surface-100)', display: 'flex', flexDirection: 'column', animation: 'blrise .28s var(--ease-out)' }}>
            <header style={{ flex: 'none', background: '#fff', borderBottom: '1px solid var(--line-200)', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Campaign configuration</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 22, color: 'var(--beet-700)', margin: 0 }}>{cmpFormTitle}</h3>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: 'var(--ink-400)' }}>{cmpFormCode}</span>
                </div>
              </div>
              {Boolean(cmpCanDelete) && (
                <button onClick={cmpFormDelete} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid var(--danger-300, #e5a3a3)', color: 'var(--danger-600)', borderRadius: 11, padding: '9px 15px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
                  <Icon name="trash-2" style={{ width: 16, height: 16 }} />Delete
                </button>
              )}
              <button onClick={cmpFormClose} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid var(--line-300)', color: 'var(--ink-700)', borderRadius: 11, padding: '9px 15px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="x" style={{ width: 16, height: 16 }} />Close
              </button>
              <button onClick={cmpFormSave} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 7, background: '#7A1C46', border: 'none', color: '#fff', borderRadius: 11, padding: '9px 18px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="check" style={{ width: 16, height: 16 }} />{cmpFormSaveLabel}
              </button>
            </header>

            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
              <nav style={{ flex: 'none', width: 236, borderRight: '1px solid var(--line-200)', background: '#fff', padding: '20px 14px', overflowY: 'auto' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-400)', padding: '0 10px 10px' }}>Sections</div>
                {(cmpSections || []).map((s, i) => (
                  <a key={i} href="#" onClick={s.go} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 10, fontSize: 12.5, fontWeight: 700, textDecoration: 'none', marginBottom: 3, color: s.active ? 'var(--beet-700)' : 'var(--ink-500)', background: s.active ? 'var(--orchid-100)' : 'transparent' }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, background: s.badgeBg, color: s.badgeColor }}>{s.letter}</span>
                    {s.name}
                  </a>
                ))}
              </nav>

              <div className="blscroll" style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
                <div style={{ maxWidth: 880, margin: '0 auto', padding: '28px 34px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                  <div id="cmpA" style={card}>
                    {sectionHead('A', 'Campaign basics')}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div><label style={label}>Campaign name *</label><input value={f.name || ''} onChange={cmpSetName} placeholder="e.g. Q3 SEO push — Pubrica" style={input} /></div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div><label style={label}>Campaign type</label>
                          <select value={f.type || ''} onChange={cmpSetType} style={select}>
                            {['SEO Campaign','Content Campaign','SMM Campaign','Website Campaign','Email Campaign','Analytics Campaign'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Campaign objective</label>
                          <select value={f.objective || ''} onChange={cmpSetObjective} style={select}>
                            {['Lead Generation','Brand Awareness','Product Launch','Demand Generation','Customer Retention','Thought Leadership'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Brand / company</label>
                          <select value={f.brand || ''} onChange={cmpSetBrand} style={select}>
                            {['Beetloop','Pubrica','Food Research Lab','Statswork','Tutors India'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Department / division</label>
                          <select value={f.dept || ''} onChange={cmpSetDept} style={select}>
                            {['SEO','Content','SMM','Web Development','Design'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Cycle</label>
                          <select value={f.cycle || ''} onChange={cmpSetCycle} style={select}>
                            {['Q1 2026','Q2 2026','Q3 2026','Q4 2026','Annual 2026'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Status</label>
                          <select value={f.status || ''} onChange={cmpSetStatus} style={select}>
                            {['Draft','Planning','Live','Paused','Scheduled','Completed'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Start date</label><input type="date" value={f.start || ''} onChange={cmpSetStart} style={{ ...input, color: 'var(--ink-700)' }} /></div>
                        <div><label style={label}>End date</label><input type="date" value={f.end || ''} onChange={cmpSetEnd} style={{ ...input, color: 'var(--ink-700)' }} /></div>
                        <div><label style={label}>Campaign owner</label>
                          <select value={f.owner || ''} onChange={cmpSetOwner} style={select}>
                            <option value="">— Select owner —</option>
                            {(cmpPeopleNames || []).map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div><label style={label}>Budget</label><input value={f.budget || ''} onChange={cmpSetBudget} placeholder="e.g. ₹4,50,000" style={input} /></div>
                      </div>
                    </div>
                  </div>

                  <div id="cmpB" style={card}>
                    {sectionHead('B', 'Goal & scope')}
                    <label style={label}>Campaign goal</label>
                    <textarea value={f.goal || ''} onChange={cmpSetGoal} rows="3" placeholder="e.g. Generate 4,000 qualified leads for research-writing services from organic search this quarter." style={{ ...input, resize: 'vertical' }} />
                    <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 6 }}>State the outcome in numbers — it becomes the yardstick for the KPIs you link in section D.</div>
                  </div>

                  <div id="cmpC" style={card}>
                    {sectionHead('C', 'Target audience')}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div><label style={label}>Target countries</label><input value={f.countries || ''} onChange={cmpSetCountries} placeholder="e.g. India, UAE, Singapore, UK" style={input} /></div>
                        <div><label style={label}>Target industries</label><input value={f.industries || ''} onChange={cmpSetIndustries} placeholder="e.g. Education, Healthcare, Pharma" style={input} /></div>
                        <div><label style={label}>Decision-making persona</label><input value={f.persona || ''} onChange={cmpSetPersona} placeholder="e.g. Research Director / Head of R&D" style={input} /></div>
                        <div><label style={label}>Company size</label>
                          <select value={f.companySize || ''} onChange={cmpSetCompanySize} style={select}>
                            {['Individual / 1–50','50–500 employees','200–2,000 employees','2,000+ employees','All sizes'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                      <div><label style={label}>Target audience</label><input value={f.audience || ''} onChange={cmpSetAudience} placeholder="e.g. Researchers, PhD scholars, academic institutions" style={input} /></div>
                    </div>
                  </div>

                  <div id="cmpD" style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      {sectionHead('D', 'Linked KPIs')}
                      <button onClick={cmpAddKpi} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 12, height: 12 }} />Add KPI</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {(cmpKpiForm || []).map(k => (
                        <div key={k.i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 8, alignItems: 'center', border: '1px solid var(--line-200)', borderRadius: 12, padding: 10 }}>
                          <input value={k.kpi || ''} onChange={k.setKpi} placeholder="KPI name" style={input} />
                          <input value={k.target || ''} onChange={k.setTarget} placeholder="Target" style={input} />
                          <input value={k.current || ''} onChange={k.setCurrent} placeholder="Current" style={input} />
                          <input value={k.unit || ''} onChange={k.setUnit} placeholder="Unit" style={input} />
                          {k.canRemove ? <button onClick={k.remove} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger-600)', display: 'flex' }}><Icon name="trash-2" style={{ width: 15, height: 15 }} /></button> : <span />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div id="cmpE" style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      {sectionHead('E', 'Effort lines')}
                      <button onClick={cmpAddEffort} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 12, height: 12 }} />Add effort line</button>
                    </div>
                    {Boolean(cmpEffortEmpty) && <div style={{ fontSize: 12.5, color: 'var(--ink-500)', marginBottom: 8 }}>No effort lines yet — add the output volume this campaign needs.</div>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {(cmpEffortForm || []).map(e => (
                        <div key={e.i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr 1fr auto', gap: 8, alignItems: 'center', border: '1px solid var(--line-200)', borderRadius: 12, padding: 10 }}>
                          <input value={e.name || ''} onChange={e.setName} placeholder="Effort line name" style={input} />
                          <input value={e.qty || ''} onChange={e.setQty} placeholder="Qty" style={input} />
                          <input value={e.unit || ''} onChange={e.setUnit} placeholder="Unit" style={input} />
                          <input value={e.cadence || ''} onChange={e.setCadence} placeholder="Cadence" style={input} />
                          <select value={e.mode || 'direct'} onChange={e.setMode} style={select}>
                            <option value="direct">Direct</option>
                            <option value="enabler">Enabler</option>
                          </select>
                          {e.canRemove ? <button onClick={e.remove} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger-600)', display: 'flex' }}><Icon name="trash-2" style={{ width: 15, height: 15 }} /></button> : <span />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div id="cmpF" style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      {sectionHead('F', 'Campaign team')}
                      <button onClick={cmpAddTeam} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 12, height: 12 }} />Add member</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {(cmpTeamForm || []).map(t => (
                        <div key={t.i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'center', border: '1px solid var(--line-200)', borderRadius: 12, padding: 10 }}>
                          <select value={t.who || ''} onChange={t.setWho} style={select}>
                            <option value="">— Select person —</option>
                            {(cmpPeopleNames || []).map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <input value={t.role || ''} onChange={t.setRole} placeholder="Role on this campaign" style={input} />
                          {t.canRemove ? <button onClick={t.remove} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger-600)', display: 'flex' }}><Icon name="trash-2" style={{ width: 15, height: 15 }} /></button> : <span />}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
