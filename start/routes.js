'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const View = use('View')

View.global('ok', function() {
    return 'Dikky'
})

// View.global('name', 'UserController.name')

// Route.on('/').render('welcome')
Route.get('admin/login', 'UserController.loginPage').as('login')
Route.post('admin/login', 'UserController.login')
Route.group(() => {
    Route.get('/', 'Admin/PageController.dashboard').as('dashboard')
    Route.get('logout', 'UserController.logout').as('logout')
        // Route.resource('users', 'UserController')
    Route.resource('packet', 'Admin/PacketController')

    Route.resource('booking', 'Admin/BookingController')
    Route.get('booking/accpet/:id', 'Admin/BookingController.accept').as('booking.accept')

    Route.resource('testimonial', 'Admin/TestimonialController')
}).prefix('admin').middleware('login')
Route.get('/', 'PageController.index').as('users.index')
Route.post('/book', 'PageController.booking').as('users.booking.store')
Route.get('/checkout', 'PageController.checkout').as('users.checkout')
Route.post('/checkout', 'PageController.checkoutStore').as('users.checkout.store')