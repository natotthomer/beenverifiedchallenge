Rails.application.routes.draw do
  namespace :api do
    resources :links

    get '/top', to: 'links#top', as: 'top'
  end

  
  get '/:short_url', to: 'links#re_direct', as: 're_direct'
end
