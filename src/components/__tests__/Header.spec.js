import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Header from '../Header.vue'

describe('Header', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Header')
  })
})