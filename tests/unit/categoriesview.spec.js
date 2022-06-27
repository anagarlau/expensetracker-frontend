import { mount, shallowMount } from '@vue/test-utils'

import NavBar from '@/components/NavBar'
import CategoriesView from '@/views/TransactionsView'
import TableCategories from '@/components/CategoriesViewComponents/TableCategories'
import AlertDelete from '@/components/CategoriesViewComponents/AlertDelete'
import { render } from 'vue'
import CategoryModal from '@/components/CategoriesViewComponents/CategoryModal'


describe('Components Categories.vue', () => {
  it('abc', () => {

    const wrapper = shallowMount(CategoriesView)
    const navbar = wrapper.findComponent(NavBar)
    expect(navbar.exists()).toBeTruthy()
  })

  it('count category loop', () => {

    const wrapper = mount(TableCategories, {
      propsData:{
       categories: [
          {
            categoryName: "Abracadrabra",
            categoryType: "INCOME",
            cid: 30,
            icon: "bi bi-headphones"
          },
          {
            categoryName: "Food and Drinks",
            categoryType: "EXPENSE",
            cid: 26,
            icon: "bi bi-cash-coin"
          }
        ]
      }
    })

    const rows = wrapper.findAll('.catRow')
    expect(rows.length).toBe(2)
  })

  it('Test Category Table Row', () => {
    const cat = {
      categoryName: "Abracadrabra",
      categoryType: "INCOME",
      cid: 30,
      icon: "bi bi-headphones"
    }
    const wrapper = mount(TableCategories, {
        propsData:{
        categories: [
          {
            categoryName: "Abracadrabra",
            categoryType: "INCOME",
            cid: 30,
            icon: "bi bi-headphones"
          }
        ]
      }
    })

    const rows = wrapper.findAll('.catRow')
    const name = rows[0].find(".catName")
    const description = rows[0].find(".catType")
    const expectedText = cat.categoryType[0] + cat.categoryType.substring(1).toLowerCase()
    expect(description.text()).toBe(expectedText)
    expect(name.text()).toBe(cat.categoryName)
  })

  it('Row Click Event', () => {
    const wrapper = mount(CategoryModal)
    const postButton = wrapper.find('#post')
    const spy = jest.spyOn(wrapper.vm, 'postCategory')
    postButton.trigger('click')
    expect(spy).toHaveBeenCalled()


  })


})


