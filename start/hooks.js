const { hooks } = use('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const Env = use('Env')
    const View = use('View')

    View.global('urll', function(params) {
        return Env.get('APP_URL') + "/" + params
    })
    View.global('asset', function(params) {
        return Env.get('ASSET_URL') + "/" + params
    })
})