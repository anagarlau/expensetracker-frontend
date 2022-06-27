import { mount, shallowMount } from '@vue/test-utils'

import NavBar from '@/components/NavBar'
import CategoriesView from '@/views/TransactionsView'
import TableCategories from '@/components/CategoriesViewComponents/TableCategories'
import AlertDelete from '@/components/CategoriesViewComponents/AlertDelete'
import { render } from 'vue'
import CategoryModal from '@/components/CategoriesViewComponents/CategoryModal'
import App from '@/App'
import Al from '@vuepic/vue-datepicker'


describe('Tests in CategoriesView', () => {
  it('tests if NavBar in View', () => {

    const wrapper = shallowMount(CategoriesView)
    const navbar = wrapper.findComponent(NavBar)
    expect(navbar.exists()).toBeTruthy()
  })

  it('counts numbers of rows in Component TableCategories', () => {

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

  it('Test if Table Row properly displays props', () => {
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



  it('Select Income Btn in Modal sets active class on Button', async () => {
    const wrapper = mount(CategoryModal)
    expect(wrapper.find('#income').classes()).not.toContain('active')
    expect(wrapper.find('#expense').classes()).toContain('active')

    await wrapper.find('#income').trigger('click')

   expect(wrapper.find('#expense').classes()).not.toContain('active')
    expect(wrapper.find('#income').classes()).toContain('active')
  })

  it('Test if Alert delete opens upon click event on row', () => {
    const wrapper = shallowMount(TableCategories, {
      propsData:{
        alert: false,
        selectedCat: null,
        categories: [

          {
            categoryName: "Abracadabra",
            categoryType: "INCOME",
            cid: 30,
            icon: "bi bi-headphones"
          }
        ]
      }
    })


    const row = wrapper.find(".alert")
    row.trigger('click')
    expect(row).toBeTruthy()
    expect(wrapper.vm.alert).toBe(true)
    expect(wrapper.vm.selectedCat.categoryName).toBe('Abracadabra')
    const alert = wrapper.find({ref: '#alertDelete'})
    expect(alert).toBeTruthy()

  })

})


