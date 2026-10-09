import { useEffect, useRef } from 'react'

const sectionLabels: Record<string, string> = {
  home: 'EXPLORE',
  work: 'DISCOVER',
  experience: 'JOURNEY',
  about: 'CREATE',
  contact: 'CONNECT',
}

export default function SectionCursor({ reducedMotion, disabled }: {
  reducedMotion: boolean
  disabled: boolean
}) {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = cursor.current
    if (!element || reducedMotion || disabled) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0
    let previousX = 0
    let previousY = 0

    const hide = () => {
      cancelAnimationFrame(frame)
      element.dataset.visible = 'false'
    }
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== 'mouse' || document.hidden) {
        hide()
        return
      }
      const target = event.target
      if (!(target instanceof Element)) return
      const section = target.closest('section[id]')
      const sectionId = section?.id ?? 'home'
      const interactive = !!target.closest('a, button, canvas')
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const tiltX = Math.max(-25, Math.min(25, (event.clientY - previousY) * -0.8))
        const tiltY = Math.max(-25, Math.min(25, (event.clientX - previousX) * 0.8))
        const x = Math.min(event.clientX + 24, window.innerWidth - 94)
        const y = Math.min(event.clientY + 24, window.innerHeight - 96)
        element.style.transform = `translate3d(${Math.max(0, x)}px, ${Math.max(0, y)}px, 0)`
        element.style.setProperty('--tilt-x', `${tiltX}deg`)
        element.style.setProperty('--tilt-y', `${tiltY}deg`)
        element.dataset.section = sectionId
        element.dataset.interactive = String(interactive)
        element.dataset.visible = 'true'
        const label = element.querySelector('.cursor-label')
        if (label) label.textContent = interactive ? 'OPEN' : sectionLabels[sectionId] ?? 'EXPLORE'
        previousX = event.clientX
        previousY = event.clientY
      })
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    window.addEventListener('scroll', hide, { passive: true })
    window.addEventListener('keydown', hide)
    document.addEventListener('visibilitychange', hide)
    finePointer.addEventListener('change', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      window.removeEventListener('scroll', hide)
      window.removeEventListener('keydown', hide)
      document.removeEventListener('visibilitychange', hide)
      finePointer.removeEventListener('change', hide)
    }
  }, [reducedMotion, disabled])

  return (
    <div ref={cursor} className="section-cursor" data-visible="false" aria-hidden="true">
      <div className="cursor-sculpture">
        <span className="cursor-orbit cursor-orbit-one" />
        <span className="cursor-orbit cursor-orbit-two" />
        <span className="cursor-orbit cursor-orbit-three" />
        <span className="cursor-core" />
        <span className="cursor-satellite" />
      </div>
      <span className="cursor-label">EXPLORE</span>
    </div>
  )
}
