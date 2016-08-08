import Route from '../Route'





export default class Logout extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow () {
    if (this.appChannel.request('user').get('loggedIn')) {
      $.ajax({
        method: 'post',
        success: (response, status, xhr) => {
          console.log('logged out!')
          this.routerChannel.request('route', '/login')
        },
        url: '/api/logout'
      })

    } else {
      this.routerChannel.request('route', '/login')
    }
  }
}
