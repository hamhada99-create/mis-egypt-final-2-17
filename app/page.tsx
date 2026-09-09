'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [status, setStatus] = useState('');
  const [counts, setCounts] = useState<any>(null);

  async function loadCounts() {
    setStatus('جاري الاتصال...');
    const res = await fetch('/api/curriculum');
    const data = await res.json();
    if (data.ok) {
      setCounts(data.counts);
      setStatus('تم الاتصال بقاعدة البيانات.');
    } else {
      setStatus(data.error ?? 'تعذر الاتصال.');
    }
  }

  async function importOfficial() {
    setStatus('جاري استيراد الخطة الرسمية...');
    const curriculum = await fetch('/data/official-curriculum-2026-2027.json').then(r => r.json());
    const res = await fetch('/api/curriculum/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curriculum),
    });
    const data = await res.json();
    setStatus(data.ok
      ? `تم الاستيراد: ${data.gradeCount} صفوف، ${data.subjectCount} مواد، ${data.relationCount} ارتباطات.`
      : (data.error ?? 'فشل الاستيراد.'));
  }

  return (
    <main dir="rtl" style={{maxWidth: 1000, margin: '40px auto', padding: 24}}>
      <h1>لوحة إدارة MIS-EGYPT</h1>
      <p>إدارة الخطة الدراسية واستيراد بيانات المنهج الرسمية.</p>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', margin:'24px 0'}}>
        <button onClick={loadCounts}>فحص قاعدة البيانات</button>
        <button onClick={importOfficial}>استيراد خطة 2026–2027</button>
      </div>
      {status && <p>{status}</p>}
      {counts && (
        <section style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:12}}>
          {Object.entries(counts).map(([key, value]) => (
            <div key={key} style={{padding:16, border:'1px solid #ddd', borderRadius:12}}>
              <strong>{key}</strong><div style={{fontSize:28}}>{String(value)}</div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
