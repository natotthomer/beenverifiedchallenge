Rails.application.routes.draw do
  root to: "static_pages#root"

  get '/pages/top', to: 'static_pages#root'

  get '/:short_url', to: 'api/links#re_direct', as: 're_direct'

  namespace :api do
    resources :links

    get '/top', to: 'links#top', as: 'top'
  end
end
