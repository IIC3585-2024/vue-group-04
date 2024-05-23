import type { Trail } from '../types/Trail'
import { ConnectionError, NotFoundError, ServerError } from './errors'

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

export async function getTrails({ page = 1, limit = 9, title = '' } = {}): Promise<Trail[]> {
  let response: Response

  const url = UrlBuilder.apiUrl('/walks')
    .paginatedUrl(page, limit)
    .searchUrl('title', title)
    .toString()

  try {
    response = await fetch(url)
  } catch (error) {
    throw new ConnectionError()
  }

  if (response.status === 404) {
    throw new NotFoundError()
  }

  if (response.status !== 200) {
    throw new ServerError()
  }

  return await response.json()
}

export async function getTrail(id: string): Promise<Trail> {
  let response: Response
  try {
    const url = UrlBuilder.apiUrl('/walks') + `/${id}`
    response = await fetch(url)
  } catch (error) {
    throw new ConnectionError()
  }

  if (response.status === 404) {
    throw new NotFoundError()
  }

  if (response.status !== 200) {
    throw new ServerError()
  }

  return await response.json()
}

class UrlBuilder {
  private baseUrl: string
  private params: URLSearchParams

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.params = new URLSearchParams()
  }

  static apiUrl(url: string): UrlBuilder {
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`
    return new UrlBuilder(baseUrl)
  }

  paginatedUrl(page: number = 1, limit: number = 25): UrlBuilder {
    this.params.set('_page', page.toString())
    this.params.set('_limit', limit.toString())
    return this
  }

  searchUrl(key: string, value: string): UrlBuilder {
    this.params.set(`${key}_like`, value)
    return this
  }

  toString(): string {
    const queryString = this.params.toString()
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl
  }
}
