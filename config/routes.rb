Rails.application.routes.draw do
  get '/:short_url', to: 'api/links#re_direct', as: 're_direct'

  namespace :api do
    resources :links

    get '/top', to: 'links#top', as: 'top'
  end
end
