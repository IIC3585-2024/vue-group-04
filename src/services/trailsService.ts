import type { Trail } from '../types'

export async function obtainRandomTrails(num: number): Promise<Trail[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/walks`)
  if (response.status !== 200) {
    throw new Error('Failed to fetch trails')
  }
  const typedTrailsData: Trail[] = await response.json()

  const selected: Trail[] = []
  const usedIndices = new Set<number>()

  while (selected.length < num && usedIndices.size < typedTrailsData.length) {
    const randomIndex: number = Math.floor(Math.random() * typedTrailsData.length)
    if (!usedIndices.has(randomIndex)) {
      selected.push(typedTrailsData[randomIndex])
      usedIndices.add(randomIndex)
    }
  }

  return selected
}

export async function getTrail(id: string): Promise<Trail> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/walks/${id}`)
  if (response.status !== 200) {
    throw new Error('Failed to fetch trail')
  }
  return await response.json()
}
