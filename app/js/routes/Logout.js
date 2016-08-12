import Route from '../Route'





export default class Logout extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow () {
    let user = this.appChannel.request('user')

    if (user.get('loggedIn')) {
      $.ajax({
        method: 'post',
        success: (response, status, xhr) => {
          user.logout()
          this.routerChannel.request('route', '/login')
        },
        url: '/api/logout'
      })

    } else {
      this.routerChannel.request('route', '/login')
    }
  }
}
