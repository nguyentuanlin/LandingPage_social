import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiMessageSquare,
  FiCpu,
  FiShoppingCart,
  FiGrid,
  FiBox,
  FiPackage,
  FiFileText,
  FiTruck,
  FiPercent,
  FiDollarSign,
  FiStar,
  FiBookOpen,
  FiChevronDown,
} from 'react-icons/fi'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

const Solutions = () => {
  const sections = useMemo(() => ([
    { id: 'intro', label: 'Giới thiệu', icon: FiMessageSquare },
    { id: 'intelligence', label: 'TLL Intelligence', icon: FiCpu },
    { id: 'omni-experience', label: 'Trải nghiệm mua hàng đa kênh', icon: FiShoppingCart },
    { id: 'centralized-management', label: 'Quản lý đa kênh tập trung', icon: FiGrid },
    { id: 'product', label: 'Quản lý sản phẩm', icon: FiBox },
    { id: 'inventory', label: 'Quản lý kho', icon: FiPackage },
    { id: 'orders', label: 'Quản lý đơn hàng', icon: FiFileText },
    { id: 'shipping', label: 'Vận chuyển, thanh toán', icon: FiTruck },
    { id: 'promotions', label: 'Quản lý khuyến mãi', icon: FiPercent },
    { id: 'finance', label: 'Sổ quỹ, thu chi', icon: FiDollarSign },
    { id: 'csi', label: 'CSI (Đo hài lòng)', icon: FiStar },
    { id: 'kpi', label: 'Công thức & KPI', icon: FiBookOpen },
  ]), [])

  const [active, setActive] = useState('intro')
  const [openId, setOpenId] = useState('intro')
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root: null, rootMargin: '-160px 0px -40% 0px', threshold: [0.2, 0.4, 0.6, 0.8] }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  // CSI calculator state
  const [csat, setCsat] = useState(82) // 0-100
  const [resolution, setResolution] = useState(88) // 0-100
  const [speed, setSpeed] = useState(100) // 0-100

  const csi = useMemo(() => {
    const score = 0.5 * csat + 0.3 * resolution + 0.2 * speed
    return Math.round(score)
  }, [csat, resolution, speed])

  // Interactive CSI (emotion/time) calculator
  const [reiText, setReiText] = useState('-0.2, 0.6, 0.3, -0.1')
  const [dtText, setDtText] = useState('3600, 7200, 86400, 172800')
  const [nmsgInput, setNmsgInput] = useState(120)
  const [ngapInput, setNgapInput] = useState(2)
  const [lambdaVal, setLambdaVal] = useState(0.3)
  const [alphaVal, setAlphaVal] = useState(0.5)
  const [betaVal, setBetaVal] = useState(1e-6)

  const parseNumbers = (s) => (s || '').split(/[\s,]+/).map((v) => parseFloat(v)).filter((n) => !Number.isNaN(n))
  const reiArr = useMemo(() => parseNumbers(reiText), [reiText])
  const dtArr = useMemo(() => parseNumbers(dtText), [dtText])
  const neCalc = Math.min(reiArr.length, dtArr.length)
  const wArr = useMemo(() => dtArr.slice(0, neCalc).map((d) => Math.exp(-betaVal * d)), [dtArr, neCalc, betaVal])
  const numerator = useMemo(() => reiArr.slice(0, neCalc).reduce((acc, r, i) => acc + r * wArr[i], 0), [reiArr, neCalc, wArr])
  const nbar = Math.max(0, nmsgInput - neCalc)
  const denom = useMemo(() => wArr.reduce((a, b) => a + b, 0) + lambdaVal * (nbar + alphaVal * ngapInput), [wArr, lambdaVal, nbar, alphaVal, ngapInput])
  const csiEmoRaw = denom > 0 ? numerator / denom : 0
  const csiEmo = Math.max(-1, Math.min(1, csiEmoRaw))
  const interp = (x) => {
    if (x >= 0.7) return 'Very Satisfied'
    if (x >= 0.3) return 'Satisfied'
    if (x >= -0.3) return 'Neutral'
    if (x >= -0.7) return 'Dissatisfied'
    return 'Very Dissatisfied'
  }
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <section ref={containerRef} className="relative py-16 px-4" id="solutions">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] gap-6">
        <div className="md:sticky md:top-20 h-max">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-2">
            {sections.map((s) => {
              const Icon = s.icon
              const isOpen = openId === s.id
              const isActive = active === s.id
              return (
                <div key={s.id} className={`rounded-xl mb-2 last:mb-0 transition-colors ${isActive ? 'ring-1 ring-cyan-400/60 bg-white/5' : 'bg-white/0'}`}>
                  <button
                    onClick={() => { setOpenId(isOpen ? '' : s.id); handleNavClick(s.id) }}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-3 text-white">
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold text-sm md:text-base">{s.label}</span>
                    </span>
                    <FiChevronDown className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 text-white/70 text-sm">
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Highlights</li>
                        <li>Key metrics</li>
                        <li>Integrations</li>
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-16">
          <motion.div id="intro" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Giới thiệu</h3>
            <p className="text-white/70">TLL Omnichannel giúp hợp nhất các kênh (Facebook, Telegram, Gmail, Zalo, Website chat) vào một inbox, tích hợp AI để tự động phản hồi và tối ưu vận hành.</p>
          </motion.div>

          <motion.div id="intelligence" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">TLL Intelligence</h3>
            <ul className="text-white/70 space-y-2">
              <li>RAG trả lời ngữ cảnh theo tri thức doanh nghiệp</li>
              <li>STT cho voice messages (Google Speech-to-Text)</li>
              <li>Gửi tin nhắn định lịch theo chiến dịch</li>
            </ul>
          </motion.div>

          <motion.div id="omni-experience" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Trải nghiệm mua hàng đa kênh</h3>
            <ul className="text-white/70 space-y-2">
              <li>Kết nối Facebook, Telegram, Gmail, Zalo, Web chat</li>
              <li>Đồng bộ hội thoại về một luồng thống nhất</li>
              <li>Phân công, SLA, gợi ý trả lời thông minh</li>
            </ul>
          </motion.div>

          <motion.div id="centralized-management" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Quản lý đa kênh tập trung</h3>
            <ul className="text-white/70 space-y-2">
              <li>Nhật ký khách hàng, nhãn/nhóm, ghi chú</li>
              <li>Mẫu tin nhắn nhanh, kịch bản bot theo giờ</li>
              <li>Báo cáo theo kênh/nhân viên</li>
            </ul>
          </motion.div>

          <motion.div id="product" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Quản lý sản phẩm</h3>
            <p className="text-white/70">SKU, thuộc tính, biến thể; đồng bộ tồn kho theo kênh.</p>
          </motion.div>

          <motion.div id="inventory" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Quản lý kho</h3>
            <p className="text-white/70">Nhập/xuất/chuyển kho, cảnh báo tồn, định mức.</p>
          </motion.div>

          <motion.div id="orders" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Quản lý đơn hàng</h3>
            <p className="text-white/70">Tạo/đồng bộ đơn, trạng thái, đổi trả, ghi chú nội bộ.</p>
          </motion.div>

          <motion.div id="shipping" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Vận chuyển, thanh toán</h3>
            <p className="text-white/70">Kết nối hãng vận chuyển, COD/online, đối soát phí.</p>
          </motion.div>

          <motion.div id="promotions" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Quản lý khuyến mãi</h3>
            <p className="text-white/70">Mã giảm, combo, flash sale; phân khúc & gợi ý upsell.</p>
          </motion.div>

          <motion.div id="finance" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Sổ quỹ, thu chi</h3>
            <p className="text-white/70">Dòng tiền theo kênh/chiến dịch; báo cáo lợi nhuận gộp.</p>
          </motion.div>

          <motion.div id="csi" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">CSI – Customer Satisfaction Index</h3>
                <p className="text-white/70 mb-4">Điểm tổng hợp từ 3 yếu tố: CSAT (hài lòng), Tỷ lệ giải quyết, Tốc độ phản hồi.</p>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-white/70 text-sm mb-1"><span>CSAT</span><span>{csat}</span></div>
                    <input type="range" min={0} max={100} value={csat} onChange={(e)=>setCsat(parseInt(e.target.value))} className="w-full accent-cyan-400" />
                  </div>
                  <div>
                    <div className="flex justify-between text-white/70 text-sm mb-1"><span>Resolution rate</span><span>{resolution}%</span></div>
                    <input type="range" min={0} max={100} value={resolution} onChange={(e)=>setResolution(parseInt(e.target.value))} className="w-full accent-emerald-400" />
                  </div>
                  <div>
                    <div className="flex justify-between text-white/70 text-sm mb-1"><span>Response speed</span><span>{speed}</span></div>
                    <input type="range" min={0} max={100} value={speed} onChange={(e)=>setSpeed(parseInt(e.target.value))} className="w-full accent-violet-400" />
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-white/80">
                    <div className="mb-1">
                      <BlockMath math={'CSI = 0.5\\times CSAT + 0.3\\times Resolution + 0.2\\times Speed'} />
                    </div>
                    <div className="text-white/60 font-mono text-sm">Ví dụ hiện tại: 0.5×{csat} + 0.3×{resolution} + 0.2×{speed} = <span className="text-white font-semibold">{csi}</span></div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[320px] flex items-center justify-center">
                <div className="relative w-44 h-44">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(#22d3ee ${csi * 3.6}deg, rgba(255,255,255,0.08) 0)`
                    }}
                  />
                  <div className="absolute inset-3 rounded-full bg-[#0a1128] flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <div className="text-4xl font-black text-white">{csi}</div>
                      <div className="text-xs uppercase tracking-wide text-white/60">CSI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Toggle advanced */}
            <div className="mt-6">
              <button onClick={()=>setShowAdvanced((v)=>!v)} className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition">
                {showAdvanced ? 'Ẩn chi tiết công thức' : 'Xem chi tiết công thức'}
              </button>
            </div>
            {showAdvanced && (
            <div className="mt-8 grid lg:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                <h4 className="text-xl font-semibold text-white mb-3">CSI theo cảm xúc và thời gian</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Danh sách r_i (cường độ cảm xúc, [-1..1], cách nhau bởi dấu phẩy)</label>
                    <textarea value={reiText} onChange={(e)=>setReiText(e.target.value)} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none" placeholder="-0.2, 0.6, 0.3, -0.1" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Danh sách Δt_i (giây từ tin nhắn tới hiện tại)</label>
                    <textarea value={dtText} onChange={(e)=>setDtText(e.target.value)} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none" placeholder="3600, 7200, 86400, 172800" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">n_msg (tổng tin nhắn)</label>
                    <input type="number" value={nmsgInput} onChange={(e)=>setNmsgInput(parseInt(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">n_gap (khoảng trống lớn)</label>
                    <input type="number" value={ngapInput} onChange={(e)=>setNgapInput(parseInt(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div className="text-xs text-white/60 flex items-end">ne tính từ độ dài ngắn hơn của 2 danh sách</div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">λ (lambda)</label>
                    <input type="number" step="0.1" value={lambdaVal} onChange={(e)=>setLambdaVal(parseFloat(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">α (alpha)</label>
                    <input type="number" step="0.1" value={alphaVal} onChange={(e)=>setAlphaVal(parseFloat(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">β (beta)</label>
                    <input type="number" step="0.000001" value={betaVal} onChange={(e)=>setBetaVal(parseFloat(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/60">
                  <span className="mr-3">ne = {neCalc}</span>
                  <span className="mr-3">n̄e = {Math.max(0, nmsgInput - neCalc)}</span>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-5 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="relative w-44 h-44 mx-auto">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: `conic-gradient(#22d3ee ${((csiEmo+1)/2)*360}deg, rgba(255,255,255,0.08) 0)` }}
                    />
                    <div className="absolute inset-3 rounded-full bg-[#0a1128] flex items-center justify-center border border-white/10">
                      <div>
                        <div className="text-3xl font-black text-white">{csiEmo.toFixed(2)}</div>
                        <div className="text-xs uppercase tracking-wide text-white/60">CSI (emo)</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white/80">Mức: <span className="font-semibold">{interp(csiEmo)}</span></div>
                </div>
              </div>
            </div>
            )}
            {/* CSI detailed formula */}
            {showAdvanced && (
            <div className="mt-8 grid lg:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                <h4 className="text-xl font-semibold text-white mb-3">Chi tiết công thức CSI (Cảm xúc + trọng số thời gian)</h4>
                <ul className="list-disc list-inside text-white/80 space-y-1 mb-4">
                  <li>Số tin nhắn khách hàng trong 1 tháng <span className="font-mono">n_msg</span></li>
                  <li>Khoảng cách giữa các tin nhắn theo giây (để tính <span className="font-mono">Δt</span>)</li>
                  <li>Số tin nhắn có cảm xúc tiêu cực/căng thẳng trong 1 tháng <span className="font-mono">n_e</span></li>
                  <li>Số tin nhắn không gán nhãn cảm xúc <span className="font-mono">n̄_e</span> (<span className="font-mono">n̄_e + n_e = n_msg</span>)</li>
                  <li>Tập cảm xúc khách hàng <span className="font-mono">n_emotion</span>, mỗi giá trị trong khoảng <span className="font-mono">[-1, 1]</span></li>
                </ul>
                <div className="rounded-lg bg-[#0b1533] border border-white/10 p-4 overflow-x-auto">
                  <div className="text-white">
                    <BlockMath math={'CSI = \\frac{\\sum_{i=1}^{n_e} (r_i \\cdot w_{t_i})}{\\sum_{i=1}^{n_e} w_{t_i} + \\lambda \\cdot (\\bar{n}_e + \\alpha \\cdot n_{gap})}'} />
                    <div className="mt-3">
                      <BlockMath math={'w_{t_i} = e^{-\\beta \\cdot \\Delta t_i}'} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-white/80 text-sm">
                  <div>• <span className="font-mono">rᵢ</span>: cường độ cảm xúc của tin nhắn i, <span className="font-mono">rᵢ ∈ [-1,1]</span></div>
                  <div>• <span className="font-mono">wᵢ</span>: trọng số thời gian ưu tiên tin nhắn gần đây, <span className="font-mono">wᵢ = e^(−β·Δtᵢ)</span>, <span className="font-mono">Δtᵢ</span>: giây từ tin nhắn i đến hiện tại</div>
                  <div>• <span className="font-mono">n_e</span>: số tin nhắn có cảm xúc</div>
                  <div>• <span className="font-mono">n̄_e</span>: số tin nhắn không có cảm xúc, <span className="font-mono">n̄_e = n_msg − n_e</span></div>
                  <div>• <span className="font-mono">n_gap</span>: số khoảng trống lớn giữa các tin nhắn (<span className="font-mono">Δt &gt; T_threshold</span>, ví dụ 1 ngày = 86400s)</div>
                  <div>• <span className="font-mono">λ, α, β</span>: hệ số hiệu chỉnh (khuyến nghị: <span className="font-mono">λ=0.3</span>, <span className="font-mono">α=0.5</span>, <span className="font-mono">β=1e−6</span>)</div>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                <h4 className="text-xl font-semibold text-white mb-3">Bảng diễn giải thực tế của CSI</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-white/80 border-separate" style={{borderSpacing: 0}}>
                    <thead>
                      <tr className="text-white">
                        <th className="border-b border-white/20 py-2 px-3">Khoảng CSI</th>
                        <th className="border-b border-white/20 py-2 px-3">Mức độ hài lòng</th>
                        <th className="border-b border-white/20 py-2 px-3">Diễn giải</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[0.7, 1.0]</td>
                        <td className="border-b border-white/10 py-2 px-3">Rất hài lòng</td>
                        <td className="border-b border-white/10 py-2 px-3">Cảm xúc rất tích cực, tương tác gần đây chủ động, có khả năng giới thiệu.</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[0.3, 0.7)</td>
                        <td className="border-b border-white/10 py-2 px-3">Hài lòng</td>
                        <td className="border-b border-white/10 py-2 px-3">Tích cực chiếm ưu thế, ít phàn nàn, khách ổn định.</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[−0.3, 0.3)</td>
                        <td className="border-b border-white/10 py-2 px-3">Trung lập</td>
                        <td className="border-b border-white/10 py-2 px-3">Cảm xúc pha trộn/yếu, tương tác thấp hoặc phản hồi cân bằng.</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[−0.7, −0.3)</td>
                        <td className="border-b border-white/10 py-2 px-3">Không hài lòng</td>
                        <td className="border-b border-white/10 py-2 px-3">Tiêu cực chiếm ưu thế, nguy cơ rời bỏ sớm, cần can thiệp.</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">[−1.0, −0.7)</td>
                        <td className="py-2 px-3">Rất không hài lòng</td>
                        <td className="py-2 px-3">Tiêu cực mạnh, rủi ro rời bỏ cao, có thể để lại đánh giá xấu.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            )}
          </motion.div>

          <motion.div id="kpi" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Công thức & KPI</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-white/80">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">CSAT</div>
                <div className="font-mono text-sm">CSAT = (Số phản hồi Hài lòng / Tổng phản hồi) × 100%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">NPS</div>
                <div className="font-mono text-sm">NPS = ((% Promoters − % Detractors)) × 100%</div>
                <div className="text-xs text-white/60 mt-1">Promoter: 9–10, Passive: 7–8, Detractor: 0–6</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">Resolution Rate</div>
                <div className="font-mono text-sm">RR = (Số ticket đã giải quyết / Tổng ticket) × 100%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">First Response Time</div>
                <div className="font-mono text-sm">FRT = Tổng thời gian phản hồi đầu tiên / Số hội thoại</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">Average Handling Time</div>
                <div className="font-mono text-sm">AHT = (Talk + Hold + Wrap-up) / Số tương tác</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">SLA Met</div>
                <div className="font-mono text-sm">SLA% = (Số phản hồi đúng SLA / Tổng phản hồi) × 100%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">Conversion Rate</div>
                <div className="font-mono text-sm">CR = (Số đơn hàng / Số lead) × 100%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">Retention Rate</div>
                <div className="font-mono text-sm">Retention = (KH cuối kỳ − KH mới) / KH đầu kỳ × 100%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="font-semibold mb-2">LTV (Lifetime Value)</div>
                <div className="font-mono text-sm">LTV = ARPU × Gross Margin × Thời gian gắn bó</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Solutions
