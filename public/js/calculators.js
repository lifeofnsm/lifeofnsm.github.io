  const BL = '#2563EB';
  const GR = '#059669';
  const RD = '#DC2626';
  let sipChartInst=null, lumpsumChartInst=null, goalChartInst=null, emiDonutInst=null, emiBalInst=null;
  let returnTabType = 'sip';

  function ss(id,rid){const v=parseFloat(document.getElementById(id).value);if(!isNaN(v))document.getElementById(rid).value=v;}
  function si(rid,id){document.getElementById(id).value=document.getElementById(rid).value;}
  function fmt(n){if(n>=10000000)return'₹'+(n/10000000).toFixed(2)+' Cr';if(n>=100000)return'₹'+(n/100000).toFixed(2)+' L';return'₹'+Math.round(n).toLocaleString('en-IN');}

  const CD = {
    plugins:{legend:{labels:{color:'#9CA3AF',font:{family:'Inter',size:11},boxWidth:12}},tooltip:{backgroundColor:'#111827',titleColor:'#fff',bodyColor:'#D1D5DB',borderColor:'#374151',borderWidth:1,padding:10,cornerRadius:8}},
    scales:{x:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10}},grid:{color:'#F3F4F6'}},y:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10},callback:v=>fmt(v)},grid:{color:'#F3F4F6'}}}
  };

  function showPanel(name,el){
    document.querySelectorAll('.calc-panel').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(t=>t.classList.remove('active'));
    document.getElementById('panel-'+name).classList.add('active');
    if(el)el.classList.add('active');
  }

  function switchReturnTab(type,el){
    returnTabType=type;
    document.querySelectorAll('#panel-sip .inner-tab').forEach(t=>t.classList.remove('active'));
    if(el)el.classList.add('active');
    document.getElementById('sip-inputs').style.display=type!=='lumpsum'?'':'none';
    document.getElementById('lumpsum-inputs').style.display=type==='lumpsum'?'':'none';
    const sf=document.getElementById('stepupRow');
    type==='stepup'?sf.classList.add('show'):sf.classList.remove('show');
    document.getElementById('sip-results').classList.remove('visible');
    document.getElementById('lumpsum-results').classList.remove('visible');
  }

  function setGoalPreset(amt,yrs,el){
    document.querySelectorAll('#goalPresets .preset-btn').forEach(b=>b.classList.remove('active'));
    if(el)el.classList.add('active');
    document.getElementById('g_goal').value=amt;document.getElementById('g_goalR').value=amt;
    document.getElementById('g_years').value=yrs;document.getElementById('g_yearsR').value=yrs;
    calcGoal();
  }
  function setEmiPreset(amt,rate,yrs,el){
    document.querySelectorAll('#emiPresets .preset-btn').forEach(b=>b.classList.remove('active'));
    if(el)el.classList.add('active');
    document.getElementById('e_amount').value=amt;document.getElementById('e_amountR').value=amt;
    document.getElementById('e_rate').value=rate;document.getElementById('e_rateR').value=rate;
    document.getElementById('e_years').value=yrs;document.getElementById('e_yearsR').value=yrs;
    calcEMI();
  }

  function calcSIP(){
    const monthly=parseFloat(document.getElementById('s_amount').value);
    const rate=parseFloat(document.getElementById('s_rate').value);
    const years=parseInt(document.getElementById('s_years').value);
    const stepup=returnTabType==='stepup'?parseFloat(document.getElementById('s_stepup').value)/100:0;
    if(!monthly||!rate||!years)return;
    const mr=rate/100/12;let total=0,invested=0,cur=monthly;const yd=[];
    for(let y=1;y<=years;y++){for(let m=0;m<12;m++){total=(total+cur)*(1+mr);invested+=cur;}yd.push({year:y,invested,value:total,returns:total-invested});if(stepup>0)cur*=(1+stepup);}
    document.getElementById('s_invested').textContent=fmt(invested);
    document.getElementById('s_returns').textContent=fmt(total-invested);
    document.getElementById('s_total').textContent=fmt(total);
    const tbody=document.getElementById('sipTable');tbody.innerHTML='';
    yd.forEach(r=>{const tr=document.createElement('tr');tr.innerHTML=`<td>Year ${r.year}</td><td>${fmt(r.invested)}</td><td style="color:${GR};font-weight:600">${fmt(r.returns)}</td><td style="color:${BL};font-weight:600">${fmt(r.value)}</td>`;tbody.appendChild(tr);});
    if(sipChartInst)sipChartInst.destroy();
    sipChartInst=new Chart(document.getElementById('sipChart').getContext('2d'),{type:'bar',data:{labels:yd.map(d=>'Yr '+d.year),datasets:[{label:'Invested',data:yd.map(d=>Math.round(d.invested)),backgroundColor:'#E5E7EB',borderColor:'#D1D5DB',borderWidth:1,borderRadius:3},{label:'Total Value',data:yd.map(d=>Math.round(d.value)),type:'line',borderColor:BL,backgroundColor:'rgba(37,99,235,0.06)',borderWidth:2,fill:false,tension:0.4,pointBackgroundColor:BL,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},...CD,plugins:{...CD.plugins,tooltip:{...CD.plugins.tooltip,callbacks:{label:c=>' '+c.dataset.label+': '+fmt(c.raw)}}}}});
    document.getElementById('sip-results').classList.add('visible');
  }

  function calcLumpsum(){
    const amount=parseFloat(document.getElementById('l_amount').value);
    const rate=parseFloat(document.getElementById('l_rate').value);
    const years=parseInt(document.getElementById('l_years').value);
    if(!amount||!rate||!years)return;
    const total=amount*Math.pow(1+rate/100,years);
    document.getElementById('l_invested').textContent=fmt(amount);
    document.getElementById('l_returns').textContent=fmt(total-amount);
    document.getElementById('l_total').textContent=fmt(total);
    const tbody=document.getElementById('lumpsumTable');tbody.innerHTML='';
    const lbls=[],vals=[];
    for(let y=1;y<=years;y++){const val=amount*Math.pow(1+rate/100,y);lbls.push('Yr '+y);vals.push(Math.round(val));const tr=document.createElement('tr');tr.innerHTML=`<td>Year ${y}</td><td style="color:${BL};font-weight:600">${fmt(val)}</td><td style="color:${GR};font-weight:600">${fmt(val-amount)}</td><td style="color:#6B7280">${((val/amount-1)*100).toFixed(1)}%</td>`;tbody.appendChild(tr);}
    if(lumpsumChartInst)lumpsumChartInst.destroy();
    lumpsumChartInst=new Chart(document.getElementById('lumpsumChart').getContext('2d'),{type:'line',data:{labels:lbls,datasets:[{label:'Investment Value',data:vals,borderColor:BL,backgroundColor:'rgba(37,99,235,0.06)',borderWidth:2,fill:true,tension:0.4,pointBackgroundColor:BL,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...CD.plugins.tooltip,callbacks:{label:c=>' Value: '+fmt(c.raw)}}},scales:{x:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10}},grid:{color:'#F3F4F6'}},y:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10},callback:v=>fmt(v)},grid:{color:'#F3F4F6'}}}}});
    document.getElementById('lumpsum-results').classList.add('visible');
  }

  function calcGoal(){
    const goal=parseFloat(document.getElementById('g_goal').value);
    const years=parseInt(document.getElementById('g_years').value);
    const rate=parseFloat(document.getElementById('g_rate').value);
    const inflation=parseFloat(document.getElementById('g_inflation').value);
    if(!goal||!years||!rate)return;
    const inflated=goal*Math.pow(1+inflation/100,years);
    const mr=rate/100/12,months=years*12;
    const sip=inflated*mr/(Math.pow(1+mr,months)-1);
    document.getElementById('g_sip').textContent=fmt(sip);
    document.getElementById('g_inflated').textContent=fmt(inflated);
    document.getElementById('g_invest').textContent=fmt(sip*months);
    const ms=document.getElementById('goalMilestones');ms.innerHTML='';
    [Math.floor(years*0.25),Math.floor(years*0.5),Math.floor(years*0.75),years].filter((v,i,a)=>v>0&&a.indexOf(v)===i).forEach(yr=>{const val=sip*(Math.pow(1+mr,yr*12)-1)/mr;const pct=Math.round(val/inflated*100);const c=document.createElement('div');c.className='ms-card';c.innerHTML=`<div class="ms-yr">After ${yr} Year${yr>1?'s':''}</div><div class="ms-val">${fmt(val)}</div><div class="ms-pct">${pct}% of goal reached</div>`;ms.appendChild(c);});
    const labels=[],inv=[],val=[],gl=[];
    for(let y=1;y<=years;y++){labels.push('Yr '+y);const m=y*12;const v=sip*(Math.pow(1+mr,m)-1)/mr;inv.push(Math.round(sip*m));val.push(Math.round(v));gl.push(Math.round(inflated));}
    if(goalChartInst)goalChartInst.destroy();
    goalChartInst=new Chart(document.getElementById('goalChart').getContext('2d'),{type:'bar',data:{labels,datasets:[{label:'Invested',data:inv,backgroundColor:'#E5E7EB',borderColor:'#D1D5DB',borderWidth:1,borderRadius:3},{label:'Portfolio Value',data:val,type:'line',borderColor:BL,backgroundColor:'rgba(37,99,235,0.06)',borderWidth:2,fill:false,tension:0.4,pointBackgroundColor:BL,pointRadius:3},{label:'Goal Target',data:gl,type:'line',borderColor:GR,borderWidth:1.5,borderDash:[6,4],fill:false,pointRadius:0}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},...CD,plugins:{...CD.plugins,tooltip:{...CD.plugins.tooltip,callbacks:{label:c=>' '+c.dataset.label+': '+fmt(c.raw)}}}}});
    document.getElementById('goal-results').classList.add('visible');
  }

  function calcEMI(){
    const principal=parseFloat(document.getElementById('e_amount').value);
    const annualRate=parseFloat(document.getElementById('e_rate').value);
    const years=parseInt(document.getElementById('e_years').value);
    if(!principal||!annualRate||!years)return;
    const mr=annualRate/100/12,months=years*12;
    const emi=principal*mr*Math.pow(1+mr,months)/(Math.pow(1+mr,months)-1);
    const totalPay=emi*months,totalInt=totalPay-principal;
    document.getElementById('e_emi').textContent=fmt(emi);
    document.getElementById('e_tenure').textContent=years+' year'+(years>1?'s':'');
    document.getElementById('e_principal').textContent=fmt(principal);
    document.getElementById('e_interest').textContent=fmt(totalInt);
    document.getElementById('e_total').textContent=fmt(totalPay);
    document.getElementById('e_ratio').textContent=((totalInt/principal)*100).toFixed(1)+'%';
    const tbody=document.getElementById('emiTable');tbody.innerHTML='';
    let bal=principal;const lbls=[],bals=[];
    for(let y=1;y<=years;y++){let yp=0,yi=0;for(let m=0;m<12;m++){const ip=bal*mr;const pp=emi-ip;yp+=pp;yi+=ip;bal-=pp;if(bal<0)bal=0;}lbls.push('Yr '+y);bals.push(Math.round(Math.max(bal,0)));const tr=document.createElement('tr');tr.innerHTML=`<td>Year ${y}</td><td style="color:${GR};font-weight:600">${fmt(yp)}</td><td style="color:${RD};font-weight:600">${fmt(yi)}</td><td>${fmt(Math.max(bal,0))}</td>`;tbody.appendChild(tr);}
    if(emiDonutInst)emiDonutInst.destroy();
    emiDonutInst=new Chart(document.getElementById('emiDonut').getContext('2d'),{type:'doughnut',data:{labels:['Principal','Interest'],datasets:[{data:[Math.round(principal),Math.round(totalInt)],backgroundColor:['rgba(37,99,235,0.7)','rgba(220,38,38,0.65)'],borderColor:['#2563EB','#DC2626'],borderWidth:1.5}]},options:{responsive:true,cutout:'65%',plugins:{legend:{labels:{color:'#6B7280',font:{family:'Inter',size:11},boxWidth:12}},tooltip:{...CD.plugins.tooltip,callbacks:{label:c=>' '+c.label+': '+fmt(c.raw)}}}}});
    if(emiBalInst)emiBalInst.destroy();
    emiBalInst=new Chart(document.getElementById('emiBalance').getContext('2d'),{type:'line',data:{labels:lbls,datasets:[{label:'Balance',data:bals,borderColor:BL,backgroundColor:'rgba(37,99,235,0.06)',borderWidth:2,fill:true,tension:0.4,pointBackgroundColor:BL,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...CD.plugins.tooltip,callbacks:{label:c=>' Balance: '+fmt(c.raw)}}},scales:{x:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10}},grid:{color:'#F3F4F6'}},y:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10},callback:v=>fmt(v)},grid:{color:'#F3F4F6'}}}}});
    document.getElementById('emi-results').classList.add('visible');
  }

  window.addEventListener('load',()=>{ calcSIP(); });

  // MONTE CARLO
  function rpRn(mean,std){let u,v;do{u=Math.random();}while(u===0);do{v=Math.random();}while(v===0);return mean+std*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
  function rpFmt(v){if(v<=0)return'₹0';if(v>=1e7)return'₹'+(v/1e7).toFixed(2)+' Cr';if(v>=1e5)return'₹'+(v/1e5).toFixed(2)+' L';return'₹'+Math.round(v).toLocaleString('en-IN');}
  function rpPctile(sorted,p){if(!sorted.length)return 0;const idx=(p/100)*(sorted.length-1),lo=Math.floor(idx),hi=Math.ceil(idx);return lo===hi?sorted[lo]:sorted[lo]+(sorted[hi]-sorted[lo])*(idx-lo);}
  function rpUpdHint(){const v=+document.getElementById('rp_expenses').value||0;document.getElementById('rp_exp_hint').textContent=rpFmt(v)+' / year · '+rpFmt(v/12)+' / month';}
  function rpUpdAlloc(){const eq=Math.min(100,Math.max(0,+document.getElementById('rp_equityAlloc').value||0));document.getElementById('rp_abar').style.width=eq+'%';document.getElementById('rp_eq_lbl').textContent='Equity '+eq+'%';document.getElementById('rp_dt_lbl').textContent='Debt '+(100-eq)+'%';}
  let rpTargetProb=85;
  function rpSetProb(el){document.querySelectorAll('.rp-pb').forEach(b=>b.classList.remove('active'));if(el)el.classList.add('active');rpTargetProb=el?+el.dataset.p:85;}
  let rpAdvOpen=false;
  function rpTogAdv(){rpAdvOpen=!rpAdvOpen;const ap=document.getElementById('rp_advPanel');const ar=document.getElementById('rp_arr');if(ap)ap.classList.toggle('open',rpAdvOpen);if(ar)ar.classList.toggle('open',rpAdvOpen);}
  function rpSim(corpus,expenses,yrs,eqPct,dPct,eqMn,eqSd,dtMn,dtSd,infMn,infSd,N){let success=0;const paths=[],finals=[];for(let s=0;s<N;s++){let c=corpus,exp=expenses;const path=[c];let ok=true;for(let y=0;y<yrs;y++){const portR=eqPct*rpRn(eqMn,eqSd)+dPct*rpRn(dtMn,dtSd);const inf=rpRn(infMn,infSd);c=c*(1+portR)-exp;exp=exp*(1+inf);if(c<=0){c=0;ok=false;for(let r=y;r<yrs;r++)path.push(0);break;}path.push(c);}if(ok)success++;paths.push(path);finals.push(c);}return{sr:(success/N)*100,paths,finals};}
  function rpFind(expenses,yrs,eqPct,dPct,eqMn,eqSd,dtMn,dtSd,infMn,infSd,tp){let lo=expenses*3,hi=expenses*200,best=hi;for(let i=0;i<22;i++){const mid=(lo+hi)/2;const{sr}=rpSim(mid,expenses,yrs,eqPct,dPct,eqMn,eqSd,dtMn,dtSd,infMn,infSd,300);if(sr>=tp){best=mid;hi=mid;}else{lo=mid;}}return best;}
  let rpFanInst=null,rpHistInst=null;
  const rpTT={backgroundColor:'#111827',titleColor:'#fff',bodyColor:'#D1D5DB',borderColor:'#374151',borderWidth:1,padding:10,cornerRadius:8,titleFont:{family:'Inter',weight:'600',size:11},bodyFont:{family:'Inter',size:11}};
  function rpBuildFan(paths,yrs){
    if(rpFanInst){rpFanInst.destroy();rpFanInst=null;}
    const labels=Array.from({length:yrs+1},(_,i)=>'Yr '+i);
    const bands={p5:[],p10:[],p25:[],p50:[],p75:[],p90:[],p95:[]};
    for(let y=0;y<=yrs;y++){const yv=paths.map(p=>p[y]??0).sort((a,b)=>a-b);bands.p5.push(rpPctile(yv,5));bands.p10.push(rpPctile(yv,10));bands.p25.push(rpPctile(yv,25));bands.p50.push(rpPctile(yv,50));bands.p75.push(rpPctile(yv,75));bands.p90.push(rpPctile(yv,90));bands.p95.push(rpPctile(yv,95));}
    const ds=[
      {data:bands.p95,borderWidth:0,pointRadius:0,fill:false,borderColor:'transparent',tension:0.35},
      {data:bands.p5,borderWidth:0,pointRadius:0,fill:'-1',backgroundColor:'rgba(37,99,235,0.05)',tension:0.35,borderColor:'transparent'},
      {data:bands.p90,borderWidth:0,pointRadius:0,fill:false,borderColor:'transparent',tension:0.35},
      {data:bands.p10,borderWidth:0,pointRadius:0,fill:'-1',backgroundColor:'rgba(37,99,235,0.08)',tension:0.35,borderColor:'transparent'},
      {data:bands.p75,borderWidth:0,pointRadius:0,fill:false,borderColor:'transparent',tension:0.35},
      {data:bands.p25,borderWidth:0,pointRadius:0,fill:'-1',backgroundColor:'rgba(37,99,235,0.12)',tension:0.35,borderColor:'transparent'},
      {label:'P90 — Good case',data:bands.p90,borderWidth:1.5,pointRadius:0,fill:false,borderColor:'rgba(5,150,105,0.6)',borderDash:[6,4],tension:0.35},
      {label:'P50 — Median',data:bands.p50,borderWidth:2.5,pointRadius:0,fill:false,borderColor:BL,tension:0.35},
      {label:'P10 — Poor case',data:bands.p10,borderWidth:1.5,pointRadius:0,fill:false,borderColor:'rgba(220,38,38,0.5)',borderDash:[6,4],tension:0.35}
    ];
    rpFanInst=new Chart(document.getElementById('rp_fanC').getContext('2d'),{type:'line',data:{labels,datasets:ds},options:{animation:false,responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#9CA3AF',font:{family:'Inter',size:11},boxWidth:18,usePointStyle:true,pointStyle:'line',filter:item=>!!item.text}},tooltip:{...rpTT,mode:'index',intersect:false,callbacks:{label:c=>c.dataset.label?c.dataset.label+': '+rpFmt(c.raw):null}}},scales:{x:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10},maxTicksLimit:12},grid:{color:'#F3F4F6'}},y:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10},callback:v=>rpFmt(v)},grid:{color:'#F3F4F6'}}}}});
  }
  function rpBuildHist(finals){
    if(rpHistInst){rpHistInst.destroy();rpHistInst=null;}
    const depleted=finals.filter(v=>v<=0).length,alive=finals.filter(v=>v>0);
    const BINS=16;const labels=['Depleted'],counts=[depleted],colors=['rgba(220,38,38,0.6)'];
    if(alive.length){const mn=Math.min(...alive),mx=Math.max(...alive),bw=(mx-mn)/BINS;for(let i=0;i<BINS;i++){const lo=mn+i*bw,hi=lo+bw;labels.push(rpFmt(lo));counts.push(alive.filter(v=>v>=lo&&(i===BINS-1?v<=hi:v<hi)).length);colors.push('rgba(37,99,235,0.55)');}}
    rpHistInst=new Chart(document.getElementById('rp_histC').getContext('2d'),{type:'bar',data:{labels,datasets:[{data:counts,backgroundColor:colors,borderWidth:0,borderRadius:3}]},options:{animation:false,responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...rpTT,callbacks:{label:c=>c.raw+' simulations'}}},scales:{x:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:9},maxRotation:55,maxTicksLimit:10},grid:{display:false}},y:{ticks:{color:'#9CA3AF',font:{family:'Inter',size:10}},grid:{color:'#F3F4F6'}}}}});
  }

  function rpGo(){
    const expenses=+document.getElementById('rp_expenses').value;
    const currentAge=+document.getElementById('rp_currentAge').value;
    const retAge=+document.getElementById('rp_retAge').value;
    const lifeExp=+document.getElementById('rp_lifeExp').value;
    const eqPct=Math.min(1,Math.max(0,(+document.getElementById('rp_equityAlloc').value||0)/100));
    const dPct=1-eqPct;
    const eqMn=+document.getElementById('rp_eqMean').value/100,eqSd=+document.getElementById('rp_eqStd').value/100;
    const dtMn=+document.getElementById('rp_dtMean').value/100,dtSd=+document.getElementById('rp_dtStd').value/100;
    const infMn=+document.getElementById('rp_infMean').value/100,infSd=+document.getElementById('rp_infStd').value/100;
    const yrs=lifeExp-retAge;
    const yearsToRetire=retAge-currentAge;
    if(yrs<=0){alert('Life expectancy must be greater than retirement age.');return;}
    if(yearsToRetire<0){alert('Retirement age must be greater than current age.');return;}
    if(!expenses){alert('Please enter annual expenses.');return;}
    const expensesAtRetirement=expenses*Math.pow(1+infMn,yearsToRetire);
    const btn=document.getElementById('rp_runBtn');
    btn.disabled=true;
    document.getElementById('rp-res').style.display='none';
    document.getElementById('rp_pgWrap').style.display='block';
    document.getElementById('rp_pgFill').style.width='0%';
    document.getElementById('rp_pgLbl').textContent='Finding optimal corpus for '+rpTargetProb+'% probability…';
    let pg=0;const pgT=setInterval(()=>{pg=Math.min(pg+1.8,85);document.getElementById('rp_pgFill').style.width=pg+'%';},80);
    setTimeout(()=>{
      const reqCorpus=rpFind(expensesAtRetirement,yrs,eqPct,dPct,eqMn,eqSd,dtMn,dtSd,infMn,infSd,rpTargetProb);
      document.getElementById('rp_pgLbl').textContent='Running 1,000 final simulations…';
      document.getElementById('rp_pgFill').style.width='88%';
      setTimeout(()=>{
        const{sr,paths,finals}=rpSim(reqCorpus,expensesAtRetirement,yrs,eqPct,dPct,eqMn,eqSd,dtMn,dtSd,infMn,infSd,1000);
        clearInterval(pgT);
        document.getElementById('rp_pgFill').style.width='100%';
        const sf=[...finals].sort((a,b)=>a-b);
        const p10v=rpPctile(sf,10),p50v=rpPctile(sf,50),p90v=rpPctile(sf,90);
        const swr=((expensesAtRetirement/reqCorpus)*100).toFixed(2),surv=Math.round(sr*10);
        document.getElementById('rp_heroEy').textContent='Financial Freedom Number at '+rpTargetProb+'% Success';
        document.getElementById('rp_heroVal').textContent=rpFmt(reqCorpus);
        document.getElementById('rp_heroSub').textContent='Today\'s ₹'+Math.round(expenses/12).toLocaleString('en-IN')+'/month → ₹'+Math.round(expensesAtRetirement/12).toLocaleString('en-IN')+'/month at age '+retAge+' after inflation. Corpus needed at retirement: '+rpFmt(reqCorpus)+'.';
        document.getElementById('rp_swr').textContent=swr+'%';
        document.getElementById('rp_yrs').textContent=yrs+' years';
        document.getElementById('rp_monthly').textContent=rpFmt(expensesAtRetirement/12);
        document.getElementById('rp_sim').textContent=surv+' / 1000';
        const circ=270.18,rf=document.getElementById('rp_ringFill'),rn=document.getElementById('rp_ringNum');
        let col=sr>=85?GR:sr>=70?'#D97706':RD;
        rf.style.stroke=col;rf.style.strokeDashoffset=circ*(1-sr/100);
        rn.textContent=sr.toFixed(1)+'%';rn.setAttribute('fill',col);
        let vt,vb,vc;
        if(sr>=85){vt='✅ Well-calibrated for your target.';vb='#ECFDF5';vc=GR;}
        else if(sr>=70){vt='⚠️ Slightly below target. Try a higher equity allocation.';vb='#FFFBEB';vc='#D97706';}
        else{vt='❌ High uncertainty. Consider reducing expenses or retiring later.';vb='#FEF2F2';vc=RD;}
        document.getElementById('rp_verdict').innerHTML=`<div class="rp-verdict-box" style="background:${vb};color:${vc};border:1px solid ${vc}40;margin-top:10px;">${vt}</div>`;
        const rows=[{lbl:'P10',color:RD,bg:'#FEF2F2',meaning:'Worst 10%',val:p10v},{lbl:'P50',color:BL,bg:'#EBF3FF',meaning:'Median outcome',val:p50v},{lbl:'P90',color:GR,bg:'#ECFDF5',meaning:'Best 10%',val:p90v}];
        const tbody=document.getElementById('rp_tBody');tbody.innerHTML='';
        rows.forEach(r=>{const tr=document.createElement('tr');tr.innerHTML=`<td><span class="rp-badge" style="background:${r.bg};color:${r.color}">${r.lbl}</span></td><td style="color:#6B7280;font-size:11px">${r.meaning}</td><td style="font-weight:700;color:#111827">${rpFmt(r.val)}</td>`;tbody.appendChild(tr);});
        rpBuildFan(paths,yrs);rpBuildHist(finals);
        // Personal note
        const H=`style="color:${BL};font-weight:600;font-style:normal;"`;
        document.getElementById('rp_noteText').innerHTML=
          `You spend <span ${H}>₹${Math.round(expenses/12).toLocaleString('en-IN')}/month</span> today. `+
          `By the time you reach <span ${H}>${retAge}</span>, inflation will push that to <span ${H}>₹${Math.round(expensesAtRetirement/12).toLocaleString('en-IN')}/month</span> — that is what your lifestyle will actually cost then. `+
          `To fund that lifestyle without a salary, you need a corpus large enough that its returns alone cover your expenses. `+
          `This calculator ran <span ${H}>1,000 different market scenarios</span> to find that number. `+
          `In <span ${H}>${surv} out of 1,000</span> futures, <span ${H}>${rpFmt(reqCorpus)}</span> is enough. Your money never runs out. That is financial freedom.`;
        setTimeout(()=>{
          document.getElementById('rp_pgWrap').style.display='none';
          document.getElementById('rp-res').style.display='block';
          btn.disabled=false;btn.textContent='↺ Recalculate';
          document.getElementById('rp-res').scrollIntoView({behavior:'smooth',block:'start'});
        },100);
      },80);
    },60);
  }
