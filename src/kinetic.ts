export function kinetic(node: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
  const area = node.closest('section') ?? node
  let teardown = () => {}

  const setup = () => {
    teardown()
    if (reduced.matches || !finePointer.matches) return
    const letters = [...node.querySelectorAll<HTMLElement>('[data-kinetic-letter]')]
    let frame = 0

    const reset = () => {
      cancelAnimationFrame(frame)
      for (const letter of letters) letter.style.removeProperty('--w')
    }

    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const weights = letters.map((letter) => {
          const rect = letter.getBoundingClientRect()
          const dx = event.clientX - rect.left - rect.width / 2
          const dy = event.clientY - rect.top - rect.height / 2
          const spread = rect.height * 1.1
          const falloff = Math.exp(-(dx * dx + dy * dy) / (2 * spread * spread))
          const base = Number(getComputedStyle(letter).getPropertyValue('--base')) || 750
          return Math.round(base + (900 - base) * falloff)
        })
        letters.forEach((letter, i) => letter.style.setProperty('--w', String(weights[i])))
      })
    }

    area.addEventListener('pointermove', move)
    area.addEventListener('pointerleave', reset)
    teardown = () => {
      reset()
      area.removeEventListener('pointermove', move)
      area.removeEventListener('pointerleave', reset)
    }
  }

  setup()
  reduced.addEventListener('change', setup)
  finePointer.addEventListener('change', setup)

  return {
    destroy() {
      teardown()
      reduced.removeEventListener('change', setup)
      finePointer.removeEventListener('change', setup)
    },
  }
}

export function splitWords(text: string) {
  let index = 0
  return text.split(' ').map((word) => {
    const letters = [...word].map((char) => ({ char, i: index++ }))
    index++
    return letters
  })
}
