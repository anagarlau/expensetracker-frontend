// const state = () => ({
//     token: ''
//   })
//
// const getters = {
//
// }
//
// /*asynchronous "mutations"*/
// const actions = {
//   login (){},
//   signup (context, payload){
//   //req to sign up
//     fetch(`https://expensetracker22.herokuapp.com/register`,
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email: payload.email, password: payload.password })
//       }).then((response) => {
//       console.log(response)
//       if(response.ok){
//         return response.json()
//       }else{
//         console.log(response)
//         throw new Error("Wrong Credentials")
//       }
//     }).then((data) => {
//       console.log("Token from Backend " + data.jwtToken)
//       context.commit('setToken', data.jwtToken)
//       localStorage.setItem('user', data.jwtToken)
//       this.$router.push('/')
//     })
//       .catch((e) => {
//         console.log(e)
//         this.error = e
//       })
//   }
//    // async login ({commit}, payload){
//    //   //post to route
//    //   console.log(payload)
//    //    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTYwODIwNjE3OSwiZXhwIjozNjAxNjA4MjA2MTc5fQ.BcHKT6ffgvkt0EztkJT35a0Yc7iWF9wkeNxKB4wSJEQ'
//    //    commit('setToken', token)
//    // }
// }
//
// const mutations = {
//   setToken (state,payload){
//     //payload = user input - here a string
//     //const newInput = payload
//     console.log("Payload in Mutation " + payload)
//     state.token=payload
//     console.log("Token " + state.token)
//   }
// }
//
// export default{
//
//   state,
// actions,
// getters,
// mutations
// }
