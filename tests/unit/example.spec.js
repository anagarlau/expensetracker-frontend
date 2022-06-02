import { shallowMount } from '@vue/test-utils'
import UserAuth from '@/components/UserAuth'

describe('UserAuth.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Welcome'
    const wrapper = shallowMount(UserAuth, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
