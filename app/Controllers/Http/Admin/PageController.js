'use strict'

class PageController {
    async dashboard({ request, response, view }) {
        return view.render('admin.dashboard')
    }
}

module.exports = PageController