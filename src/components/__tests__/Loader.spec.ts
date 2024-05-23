import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loader from '@/components/Loader.vue'

describe('Loader', () => {
  it('renders the loader component', () => {
    const wrapper = mount(Loader)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').classes()).toContain('loader')
  })
})
