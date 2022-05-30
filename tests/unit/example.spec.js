import { shallowMount } from '@vue/test-utils'
import UserAuth from '@/components/AuthComp/UserAuth'

describe('UserAuth.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Welcome to Auth'
    const wrapper = shallowMount(UserAuth, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
